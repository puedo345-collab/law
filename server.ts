import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// 상담 신청 인메모리 임시 보관소
const consultations: any[] = [];

// Gemini API 클라이언트 초기화 (Lazy or Optional fallback)
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API Client successfully initialized.");
  } catch (err) {
    console.error("Failed to initialize Gemini API Client:", err);
  }
} else {
  console.log("Missing or default GEMINI_API_KEY. System will use mathematical legal evaluation fallback.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API 1: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API 2: 상담 신청 접수 (리드 제네레이션)
  app.post("/api/consultation", (req, res) => {
    const { name, phone, debtAmount, income, assetAmount, dependents, debtReason, location, isJobStable, extraMessage } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "이름과 연락처는 필수 입력 항목입니다." });
    }

    const newConsultation = {
      id: "C" + Math.floor(100000 + Math.random() * 900000),
      name,
      phone,
      debtAmount: Number(debtAmount) || 0,
      income: Number(income) || 0,
      assetAmount: Number(assetAmount) || 0,
      dependents: Number(dependents) || 0,
      debtReason: debtReason || "생활비 및 사업자금 부족",
      location: location || "서울/경기",
      isJobStable: !!isJobStable,
      extraMessage: extraMessage || "",
      createdAt: new Date().toISOString(),
    };

    consultations.push(newConsultation);
    console.log("새 법률 상담 신청이 접수되었습니다:", newConsultation);

    res.json({
      success: true,
      message: "상담 신청이 정상적으로 완료되었습니다. 최단 시간 내 전문 변호사가 직접 연락드리겠습니다.",
      data: newConsultation
    });
  });

  // API 3: AI 기반 자가 채무 분석 및 탕감률 판단
  app.post("/api/ai-diagnosis", async (req, res) => {
    const { debtAmount, income, assetAmount, dependents, debtReason, isJobStable } = req.body;

    // 파라미터 유효성 검사
    const parsedDebt = Number(debtAmount) || 0;
    const parsedIncome = Number(income) || 0;
    const parsedAsset = Number(assetAmount) || 0;
    const parsedDependents = Number(dependents) || 0;
    const reason = debtReason || "기타 채무 발생";
    const steadyJob = !!isJobStable;

    // 1. 수학적/규칙 기반 자가진단 (Fallback 로직 겸 1차 필터링)
    // 2026년 기준 중위소득 및 가구원수별 최저생계비 대략 계산
    // 1인가구: 133만원, 2인가구: 220만원, 3인가구: 282만원, 4인가구: 343만원 수준 (60% 수준 보정)
    // 최저생계비 = 100만 + 부양가족(또는 동반가구원) 수 * 50만 대략 계산
    const minimumLivingCost = Math.max(135 + (parsedDependents * 60), 100); 

    let recommendedType: "rehabilitation" | "bankruptcy" | "consultation_first" = "consultation_first";
    let estimatedReductionRate = 0;
    let monthlyPayment = 0;
    let repaymentPeriod = 36;

    // 회생 조건: 채무가 자산보다 많아야 함, 무담보채무 10억 이하 (담보 15억 이하), 지속적인 소득이 최저생계비보다 많아야 함
    const hasSurplusIncome = parsedIncome > minimumLivingCost;
    const isDebtMoreThanAssets = parsedDebt > parsedAsset;

    if (parsedDebt < 1000) {
      // 채무액 1,000만원 미만은 신용회복위원회 프리워크아웃이나 단순 상담이 더 어울림
      recommendedType = "consultation_first";
      estimatedReductionRate = 0;
      monthlyPayment = parsedIncome * 0.2;
    } else if (isDebtMoreThanAssets && steadyJob && hasSurplusIncome) {
      // 개인회생 가용
      recommendedType = "rehabilitation";
      // 월 변제금 = 소득 - 최저생계비
      monthlyPayment = Math.max(parsedIncome - minimumLivingCost, 15); // 최소 15만원
      const totalRepay = monthlyPayment * 36;
      const outstanding = parsedDebt - totalRepay;
      if (outstanding > 0) {
        estimatedReductionRate = Math.min(Math.floor((outstanding / parsedDebt) * 100), 90);
      } else {
        estimatedReductionRate = 10; // 최소 탕감
      }
    } else if (isDebtMoreThanAssets && (!steadyJob || !hasSurplusIncome)) {
      // 소득이 없거나 생계비보다 적어 개인파산 고려
      recommendedType = "bankruptcy";
      estimatedReductionRate = 100; // 파산은 면책 시 전액 탕감
      monthlyPayment = 0;
      repaymentPeriod = 0;
    }

    // fallback 진단 텍스트 초안
    let fallbackText = `### ⚖️ 법률 진단 소견서 (임시 분석)

귀하께서 남겨주신 소중한 재무 정보를 바탕으로 분석한 임시 법률 의견서입니다.

1. **상황 분석**: 현재 총 채무는 **${parsedDebt.toLocaleString()}만원**인 반면, 보유 자산은 **${parsedAsset.toLocaleString()}만원**으로 파악됩니다. 채무액이 자산 규모를 초과하여 지급불능의 우려가 있는 상태입니다.
2. **소득 및 생계비**: 현재 월 소득은 **${parsedIncome.toLocaleString()}만원**이며, 부양가족 ${parsedDependents}명을 고려한 산정 최저생계비는 약 **${minimumLivingCost.toLocaleString()}만원**입니다.
3. **진단 결과**:
   - ${recommendedType === "rehabilitation" 
       ? `귀하는 매달 꾸준한 소득이 생계비 이상 발생하므로 **'개인회생 제도'**가 가장 유용합니다. 월 약 **${Math.floor(monthlyPayment)}만원**씩 36개월간 변제하신 후 남은 **약 ${estimatedReductionRate}%의 채무(약 ${Math.floor(parsedDebt * estimatedReductionRate / 100).toLocaleString()}만원)**는 전부 합법적으로 면책(탕감)받으실 수 있습니다.` 
       : recommendedType === "bankruptcy"
       ? `귀하는 현재 월 소득이 최저생계비에 미치지 못하거나 변제 능력이 부족하여 **'개인파산 및 면책 제도'**에 적합할 가능성이 높습니다. 법원을 통해 면책 결정을 받을 경우, 세금 등 비면책 채권을 제외한 **채무 전액(100%)을 면제**받고 새 출발을 하실 수 있습니다.`
       : `현재 총 채무액 규모(${parsedDebt.toLocaleString()}만원)가 상대적으로 적거나 상황이 유동적이므로, 개인회생보다는 **'신용회복위원회 워크아웃'** 또는 변호사와의 직접 유선 상담을 통해 맞춤형 채무 조정을 먼저 진행하는 것을 권장해 드립니다.`
     }

*본 보고서는 시스템 자동 분석 결과이며, 채무 발생 시기, 최근 대출 비율(최근 1년 이내 대출액), 보증채무 동반 여부 등에 따라 구체적인 탕감율 및 변제액이 달라질 수 있습니다. 정확한 법적 인가를 위해 대표 변호사 무료 전화/대면 상담을 신청해 주세요.*`;

    // 만약 Gemini API 클라이언트가 존재하면 정교한 AI 심층 의견서를 작성하여 덮어씁니다.
    if (ai) {
      try {
        const prompt = `
당신은 대한민국 최고의 개인회생 및 파산 전문 파트너 법률 AI 보좌관입니다.
다음 상황의 의뢰인을 따뜻하게 위로하고, 그를 위한 법리적 가능성을 철저하게 분석한 '맞춤형 AI 채무 진단서'를 마크다운 리포트로 전달해 주세요.

[의뢰인 상태 데이터]
- 총 채무액(빚): ${parsedDebt} 만원
- 월 평균 소득: ${parsedIncome} 만원
- 보유 재산 가치: ${parsedAsset} 만원
- 부양가족 수: ${parsedDependents} 명 (본인 제외 또는 포함 상태)
- 채무 원인/사유: ${reason}
- 직업 안정성(정기 소득): ${steadyJob ? "정기적이고 확실한 소득 있음" : "불투명하거나 무직 상태"}

[분석 요구 조건]
1. 정서적 공감: 무거운 채무와 독촉으로 고통받았을 의뢰인에게 따뜻하며 어조는 정중하고 지적인 공감을 건네세요.
2. 법률 적격 판단: 채무자 구제 제도의 한국 법률 규정(채무자 회생 및 파산에 관한 법률)에 근거해 '개인회생' 신청이 유리한지, 아니면 '개인파산' 신청이 유리한지 명확히 제언하세요.
3. 예상 변제금 계산 프로세스: 월 소득에서 최저생계비를 제한 '월 변제금' 계산 방식을 설명하고, 대략적인 탕감 예정 비율과 새 출발 시점을 상세히 설명하세요.
4. 기각률 최소화 조언: 면책이나 승인(인가)을 받기 위해 특히 주의해야 할 점(채무 발생 원인(도박/주식/코인은 회생 가능하나 조건 변동), 최근 채무 비중(최근 1년 이내 수령 대출), 재산 가액의 명확한 산정법 등)을 맞춤형 팁으로 기재해 주세요.
5. 상담 신청 독려: 정확하고 확실한 안전 인가를 위해 마지막엔 당 사무소 변호사 1:1 무료 상담이 핵심임을 자연스럽고 신뢰감 있게 표현하십시오.

[출력 형식 제한]
반드시 다음 스키마 형태로 JSON 응답을 해야 합니다. JSON 외의 텍스트가 섞이면 안 됩니다.
{
  "recommendedType": "rehabilitation" | "bankruptcy" | "consultation_first",
  "estimatedReductionRate": number (0에서 95 사이의 정수값),
  "monthlyPayment": number (월 예상 변제금액, 만원 단위 정수),
  "repaymentPeriod": number (회생의 경우 대개 36 또는 60, 파산은 0),
  "analysisText": "마크다운(Markdown) 포맷으로 쓰여진 자상하고 지적인 신뢰도 높은 한국어 AI 종합 진단 분석서 전체"
}
`;

        const geminiRes = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                recommendedType: {
                  type: Type.STRING,
                  description: "rehabilitation, bankruptcy, or consultation_first",
                },
                estimatedReductionRate: {
                  type: Type.INTEGER,
                  description: "The estimated percentage of debt reduction (0 to 95)",
                },
                monthlyPayment: {
                  type: Type.INTEGER,
                  description: "Estimated monthly payment in 10,000 KRW (integer)",
                },
                repaymentPeriod: {
                  type: Type.INTEGER,
                  description: "Repayment period in months (usually 36 or 60 for rehabilitation, 0 for bankruptcy)",
                },
                analysisText: {
                  type: Type.STRING,
                  description: "Full markdown expert legal analysis paper and empathetic counseling note on South Korean Debt restructuring system",
                }
              },
              required: ["recommendedType", "estimatedReductionRate", "monthlyPayment", "repaymentPeriod", "analysisText"]
            }
          }
        });

        const textOutput = geminiRes.text?.trim() || "{}";
        const parsedJson = JSON.parse(textOutput);

        return res.json({
          success: true,
          recommendedType: parsedJson.recommendedType || recommendedType,
          estimatedReductionRate: typeof parsedJson.estimatedReductionRate === 'number' ? parsedJson.estimatedReductionRate : estimatedReductionRate,
          monthlyPayment: typeof parsedJson.monthlyPayment === 'number' ? parsedJson.monthlyPayment : monthlyPayment,
          repaymentPeriod: typeof parsedJson.repaymentPeriod === 'number' ? parsedJson.repaymentPeriod : repaymentPeriod,
          analysisText: parsedJson.analysisText || fallbackText,
          isFallback: false
        });

      } catch (err) {
        console.error("Gemini AI API Call failed, falling back to local system analytics.", err);
        // Fallback 여전히 동작
      }
    }

    // fallback 반환
    res.json({
      success: true,
      recommendedType,
      estimatedReductionRate,
      monthlyPayment,
      repaymentPeriod,
      analysisText: fallbackText,
      isFallback: true
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULLSTACK] Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();

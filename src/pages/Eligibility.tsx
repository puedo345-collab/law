import { useState } from "react";
import { Check, UserCheck, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight, HelpCircle as QuestionIcon } from "lucide-react";
import { EligibilityChecklist } from "../types";

const CHECKLIST_ITEMS: EligibilityChecklist[] = [
  { id: "q1", question: "현재 총 채무(빚)의 금액이 최소 1,000만 원 이상입니까?", category: "both", isRequiredYes: true },
  { id: "q2", question: "보유하고 있는 총 재산(집, 차, 예금 등)보다 채무액이 더 많습니까?", category: "both", isRequiredYes: true },
  { id: "q3", question: "매달 최저생계비(1인가구 약 133만원 등) 이상의 꾸준하고 반복적인 소득이 있습니까?", category: "rehabilitation", isRequiredYes: true },
  { id: "q4", question: "현재 수입이 아예 없거나, 아르바이트 및 소득이 생계비보다도 훨씬 적습니까?", category: "bankruptcy", isRequiredYes: true },
  { id: "q5", question: "부양가족(미성년 자녀, 65세 이상 고령 부모 등)이 함께 거주하고 있습니까?", category: "both", isRequiredYes: false },
  { id: "q6", question: "최근 1~2년 이내에 발생한 채무 비율이 70%를 넘지 않습니까?", category: "rehabilitation", isRequiredYes: false },
];

interface EligibilityProps {
  onNavigate: (path: string) => void;
}

export default function Eligibility({ onNavigate }: EligibilityProps) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: checked }));
  };

  const handleRunDiagnosis = () => {
    const isQ1Yes = !!answers["q1"];
    const isQ2Yes = !!answers["q2"];
    const isQ3Yes = !!answers["q3"];
    const isQ4Yes = !!answers["q4"];

    if (!isQ1Yes) {
      setDiagnosticResult("debt_too_low");
    } else if (!isQ2Yes) {
      setDiagnosticResult("asset_too_high");
    } else if (isQ3Yes && !isQ4Yes) {
      setDiagnosticResult("rehabilitation_candidate");
    } else if (!isQ3Yes || isQ4Yes) {
      setDiagnosticResult("bankruptcy_candidate");
    } else {
      setDiagnosticResult("complex_situation");
    }
  };

  return (
    <div id="eligibility-page" className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#D97706]/90 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3">
            신청 자격 간편 체크
          </span>
          <h1 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight mb-3">
            어떤 제도가 나에게 맞을까요?
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            개인회생과 개인파산은 각각 다른 자격 조건을 가집니다. 아래 가이드라인과 
            인터랙티브 진단을 통해 나에게 확실하게 무불이행 면책을 제공할 제도를 확인해 보세요.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1 & 2: Eligibility Criteria Details & Comparison */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. 개인회생 vs 개인파산 자격 조건 설명 카드 */}
            <div id="eligibility-details-card" className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 border-l-4 border-[#1E3A8A] pl-3 mb-6">
                두 채무조정 제도의 신청 요건 요약
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rehabilitation Box */}
                <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <h3 className="font-bold text-[#1E3A8A] text-lg">개인회생 자격 요건</h3>
                  </div>
                  <ul className="space-y-3.5 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-blue-600 mt-1 mr-2 shrink-0 animate-pulse" />
                      <span>무담보 10억, 담보 15억 이하의 확실한 부채</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-blue-600 mt-1 mr-2 shrink-0" />
                      <span><strong>반복적이고 지속적이며 정기적인 소득</strong></span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-blue-600 mt-1 mr-2 shrink-0" />
                      <span>월 소득이 법정 가구별 최저생계비보다 커야 함</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-blue-600 mt-1 mr-2 shrink-0" />
                      <span>본인의 총 재산(집, 차 등)가치 보다 부채가 더 많아야 함</span>
                    </li>
                  </ul>
                </div>

                {/* Bankruptcy Box */}
                <div className="p-5 bg-amber-50/45 rounded-xl border border-amber-100">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="w-2 h-2 bg-[#D97706] rounded-full"></span>
                    <h3 className="font-bold text-[#D97706] text-lg">개인파산 자격 요건</h3>
                  </div>
                  <ul className="space-y-3.5 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-[#D97706] mt-1 mr-2 shrink-0 animate-pulse" />
                      <span>현재 최저생계비 이하의 저소득자 또는 <strong>소득 무(無)</strong></span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-[#D97706] mt-1 mr-2 shrink-0" />
                      <span>지급 불능의 고령, 장애, 질병으로 노동 능력이 없는 채무자</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-[#D97706] mt-1 mr-2 shrink-0" />
                      <span>마찬가지로 총 재산보다 총 부채액이 월등히 커야 함</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-[#D97706] mt-1 mr-2 shrink-0" />
                      <span>면책불허가 사유(과도한 낭비, 도진 사행성 범죄 등) 비중이 적을 것</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. 대조 차트 / 비교표 */}
            <div id="comparison-table-card" className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 border-l-4 border-[#1E3A8A] pl-3 mb-6">
                회생 vs 파산 한눈에 비교하는 차이표
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="bg-[#1E3A8A] text-white text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 border-b font-semibold">비교 항목</th>
                      <th className="px-4 py-3 border-b font-semibold bg-[#1E3A8A]/90">개인회생 제도</th>
                      <th className="px-4 py-3 border-b font-semibold">개인파산 및 면책</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-semibold text-gray-950 bg-slate-50">제도 성격</td>
                      <td className="px-4 py-3">3~5년간 일부 변제 후 잔액 면책</td>
                      <td className="px-4 py-3">신청 즉시 보유 재산 청산 후 전액 면책</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-semibold text-gray-950 bg-slate-50">소득 여부</td>
                      <td className="px-4 py-3 text-blue-700 font-bold">필수 (직장인, 개인사업자, 농어민 등)</td>
                      <td className="px-4 py-3 text-amber-700">무관 (무직, 생계비 이하 저소득, 고령자)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-semibold text-gray-950 bg-slate-50">최대 탕감율</td>
                      <td className="px-4 py-3"><strong>원금 최대 90%</strong>, 이자 100%</td>
                      <td className="px-4 py-3"><strong>원리금 100% 면책</strong> (세금 제외)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-semibold text-gray-950 bg-slate-50">본인 재산 상태</td>
                      <td className="px-4 py-3">부동산, 자동차 보유 및 유지 가능</td>
                      <td className="px-4 py-3">원칙적으로 전부 처분하여 채무 변제</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-semibold text-gray-950 bg-slate-50">대외적 신분</td>
                      <td className="px-4 py-3">직급 유지 가능, 불이익 없음</td>
                      <td className="px-4 py-3">법적으로 당연퇴직 주주 임원 자격 해임(면책시 복권)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-semibold text-gray-950 bg-slate-50">보증인 영향</td>
                      <td className="px-4 py-3">보증인에게 변제 독촉 유지(보증인도 함께조정 필요)</td>
                      <td className="px-4 py-3 flex-wrap">면책 효력이 보증인에게는 미치지 않음</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Column 3: Instant 자격요건 자가진단 (체크리스트) */}
          <div className="space-y-6">
            <div id="self-test-container" className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200 sticky top-24">
              <div className="flex items-center space-x-2 text-slate-800 mb-2">
                <UserCheck className="w-5 h-5 text-[#D97706]" />
                <h3 className="font-bold text-lg">내 자격 요건 모의 진단</h3>
              </div>
              <p className="text-gray-500 text-xs mb-5">
                해당하는 항목에 체크하시면, 즉시 대략적인 적격 보고서를 제공해 드립니다.
              </p>

              {/* Checklist inputs */}
              <div className="space-y-4">
                {CHECKLIST_ITEMS.map((item) => (
                  <label
                    id={`label-${item.id}`}
                    key={item.id}
                    className="flex items-start space-x-3 p-3 text-xs bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer transition border border-transparent hover:border-slate-200"
                  >
                    <input
                      id={`chk-${item.id}`}
                      type="checkbox"
                      checked={!!answers[item.id]}
                      onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                      className="mt-0.5 rounded text-[#1E3A8A] focus:ring-[#1E3A8A] w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="text-gray-800 leading-normal block">{item.question}</span>
                      {item.isRequiredYes && (
                        <span className="inline-block px-1.5 py-0.2 bg-[#1E3A8A]/10 text-[#1E3A8A] text-[9px] font-bold rounded mt-1">
                          필수 요건
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {/* Diagnosis button */}
              <button
                id="btn-run-diagnosis"
                onClick={handleRunDiagnosis}
                className="w-full mt-6 py-3 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-bold rounded-xl text-sm shadow transition duration-200 cursor-pointer active:scale-98"
              >
                진단 결과 확인하기
              </button>

              {/* Result output */}
              {diagnosticResult && (
                <div id="diagnostic-result-output" className="mt-5 pt-4 border-t border-gray-100 animate-fadeIn text-left">
                  <h4 className="font-bold text-sm text-gray-900 mb-2">💡 결과 안내:</h4>
                  
                  {diagnosticResult === "debt_too_low" && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-start space-x-1.5 border border-red-100">
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                      <div>
                        총 채무액이 1,000만 원 미만이신 경우, 일반 도산제도보다는 신용회복위원회의 소액 채무조정 워크아웃이 비용적인 면에서 더 유리할 수 있습니다.
                      </div>
                    </div>
                  )}

                  {diagnosticResult === "asset_too_high" && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-start space-x-1.5 border border-red-100">
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                      <div>
                        보유하고 계신 차량, 분양권, 주택 등의 자산 가치가 총 부채금액보다 높은 경우, 법규 상 지급 불능으로 인정받기 어렵습니다. 숨어있는 추가 세부 빚 채무나 보증 채무가 있는지 상담해 보세요.
                      </div>
                    </div>
                  )}

                  {diagnosticResult === "rehabilitation_candidate" && (
                    <div className="p-3 bg-blue-50 text-[#1E3A8A] text-xs rounded-lg space-y-2 border border-blue-100">
                      <p className="font-bold">✅ 개인회생 제도가 강력히 권장됩니다!</p>
                      <p className="text-gray-600 leading-relaxed">
                        정기적인 소득이 있으며 자산보다 채무액이 급격히 크시기 때문에 법원을 통해 기각율을 최소화하는 개인회생 시 최대 90% 부채 탕감이 기대됩니다.
                      </p>
                    </div>
                  )}

                  {diagnosticResult === "bankruptcy_candidate" && (
                    <div className="p-3 bg-amber-50 text-amber-800 text-xs rounded-lg space-y-2 border border-amber-100">
                      <p className="font-bold">✅ 개인파산 및 전액 면책 고려 대상입니다.</p>
                      <p className="text-gray-600 leading-relaxed">
                        소득이 없거나 소득이 부양가족 생계비에 미치지 못하여 더는 감당할 수 없는 상태이므로, 잔존 채무 전액(100%)을 면제해주는 파산/면책 신청이 가장 타당합니다.
                      </p>
                    </div>
                  )}

                  {diagnosticResult === "complex_situation" && (
                    <div className="p-3 bg-slate-50 text-slate-700 text-xs rounded-lg space-y-1.5 border border-slate-200">
                      <p className="font-bold">정밀 법률 검토가 필요합니다.</p>
                      <p className="leading-relaxed">
                        기재 조건이 복합적이어서 도산전문 법무법인 보좌관과 변호사의 상세 진단이 필요합니다.
                      </p>
                    </div>
                  )}

                  <button
                    id="btn-goto-ai-consulting"
                    onClick={() => { onNavigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="w-full mt-3.5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1 cursor-pointer transition"
                  >
                    <span>더 똑똑한 AI 정밀 분석서 받기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

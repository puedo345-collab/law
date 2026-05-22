import { useState, FormEvent } from "react";
import { 
  Building2, Phone, Sparkles, Scale, ShieldAlert, BadgeCheck, HelpCircle, 
  TrendingDown, ArrowRight, BookOpen, UserCheck, AlertTriangle, Lightbulb, Clock 
} from "lucide-react";
import { SuccessCase } from "../types";

const HERO_KEY_MESSAGES = [
  "최대 90% 채무 탕감, 합법적인 국가 구제",
  "기각 시 100% 환불 보장, 서약서 우선 작성",
  "모든 상담 기록은 100% 안전 비밀 유지"
];

const PAIN_POINTS = [
  {
    title: "끝나지 않는 빚 독촉과 추심 전화",
    desc: "매장이나 가정을 수시로 찾아오거나 종일 울리는 문자 추심에 하루하루 정상적인 수면도 일상도 불가능한 처참한 현실.",
    badge: "추심 압박"
  },
  {
    title: "급여 압류와 직장 해고 리스크",
    desc: "통장이 연이어 막히면서 신용카드 정지는 물론, 급여 가압류 통보가 직장에 도달할까 전전긍긍하는 고립무원의 공포.",
    badge: "급재산 압류"
  },
  {
    title: "끝없이 불어나는 가혹한 이자 늪",
    desc: "소득 전체를 다 털어 부어도 전월 원금은 전혀 줄어들지 않고 고금리 대출 이자와 연체 이자가 눈덩이처럼 쌓이는 재앙.",
    badge: "이자 누적"
  },
  {
    title: "보증채무로 가정이 해체되는 심정",
    desc: "본인이 쓰지 않은 지인이나 가족의 연대보증 채무 책임으로 인해 가족관계가 망가지고 평화가 무참히 깨져버린 파탄 상황.",
    badge: "가족 불화"
  }
];

const ADVANTAGES = [
  {
    title: "원금 최대 90% 탕감 결정",
    desc: "법적 기준과 의뢰인 소득/생계비 비중을 최대한 상향 소명하여 이자는 100%, 원금은 압도적으로 최대 90%까지 합법 탕감 처분받도록 설계합니다.",
    icon: TrendingDown
  },
  {
    title: "신청 즉시 채권 추심 독촉 차단",
    desc: "상담 후 법원에 접수하고 최단 3일~7일 안에 발령되는 '금지명령'을 통해 사행성 독촉 전화, 내용증명, 직장 가압류를 일체 정지시킵니다.",
    icon: ShieldAlert
  },
  {
    title: "기각 시 수임 계약금 100% 환불 보장",
    desc: "최적화된 보좌위원팀이 서류 심사를 총력 전담하므로 기각률은 사실상 제로에 수렴합니다. 만일 기각 결정 시 수임비를 일체 몰수하지 않고 100% 환급합니다.",
    icon: BadgeCheck
  },
  {
    title: "재산 보유 및 신뢰 신분 유지 가능",
    desc: "본인 소유의 부동산, 자동차, 보증금 수준을 정상적으로 확보하며 시중 공무원, 임원 등 대외 신분상 불이익 일체 없이 회생을 전폭 조력합니다.",
    icon: Scale
  }
];

const SUCCESS_CASES: SuccessCase[] = [
  {
    id: "case-1",
    title: "30대 직장인 무리한 주식/코인 투자 채무 극복",
    debtBefore: 8700,
    debtLeft: 1130,
    reductionRate: 87,
    period: "5.5개월 완수",
    age: "34세",
    occupation: "IT 기업 정규직 주임",
    feedback: "투자 실패로 퇴직금 중간정산까지 하려다 절망 직전에 희망센터를 찾아갔습니다. 도산 법원의 강력 보정 명령도 완벽하게 서류 대치 소명해주시더니 87% 원금 탕감을 받아 새 인생을 살고 있습니다. 매달 단 31만원 변제 중입니다.",
    details: "최근 1년 이내의 신규 대출 비중이 높았던 사안이었으나 대출금사용 목적이 도박 범죄가 아닌 신용 생활비 누락 보완 건임을 변수 소명하여 전업 회생 인가를 확보하였습니다."
  },
  {
    id: "case-2",
    title: "40대 자영업자 코로나 장기 영업종료 폐업 수습",
    debtBefore: 15400,
    debtLeft: 1540,
    reductionRate: 90,
    period: "6개월 완수",
    age: "47세",
    occupation: "프랜차이즈 매장 대표",
    feedback: "빚이 1억 5천만 원이 넘자 일가족 동반 파탄을 심각히 우려했습니다. 홍길동 변호사님의 꼼꼼한 세목별 자산 재분석과 공제를 통해 배우자 재산 가치를 방어하고 무이자 탕감 극대치 90% 인가를 받았습니다! 정말 눈물이 흐르도록 감사드립니다.",
    details: "사업자 처분 관련 미정산 미지급금 내역을 세밀하게 분해 진술하여 자영업자 변제 자금을 획기적으로 감축시킨 도산법 상 우수 성과 지표 사례입니다."
  },
  {
    id: "case-3",
    title: "60대 고령자 소득 부재 전액 파산/면책 대안",
    debtBefore: 4500,
    debtLeft: 0,
    reductionRate: 100,
    period: "4개월 완수",
    age: "62세",
    occupation: "노동력 상실 무직 고령",
    feedback: "일할 힘마저 없고 아픈 기력에 4천만 원의 이자 일일 독촉이 지속되었습니다. 첫 방문 시 변호사님께서 정중히 위로하시고 파산 서류를 대행하여 착수해 주시어 단 4개월 만에 전액 면책 선고를 받았습니다. 이제는 당당한 신용 활동을 합니다.",
    details: "건강 이상 소견서를 정규 법원 원장으로 변론 첨부하여 근로 노동 능력이 전무함을 논리적으로 입증, 기각 심리를 신속히 뛰어넘어 만장일치 파산 승인을 확보했습니다."
  }
];

interface HomeProps {
  onNavigate: (path: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  // Hero section quick state inputs
  const [quickName, setQuickName] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const [quickDebt, setQuickDebt] = useState(3000);
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [quickLoading, setQuickLoading] = useState(false);

  const handleHeroSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) {
      alert("이름과 휴대폰 번호는 무료 간편 접수 필수 요건입니다.");
      return;
    }

    setQuickLoading(true);
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quickName,
          phone: quickPhone,
          debtAmount: quickDebt,
          income: 150, // default placeholder for brief calculation
          assetAmount: 500,
          dependents: 0,
          debtReason: "[빠른신청] 메인 배너 간편접수",
          location: "서울/경기",
          isJobStable: true
        })
      });

      const res = await response.json();
      if (res.success) {
        setQuickSubmitted(true);
        setQuickName("");
        setQuickPhone("");
      } else {
        alert(res.error || "신청에 실패했습니다. 다시 확인해 주세요.");
      }
    } catch (err) {
      alert("서버 통신 실패. 대표전화 1600-0000 으로 직동 주시면 보다 신속히 비공개 상담을 잡아드립니다.");
    } finally {
      setQuickLoading(false);
    }
  };

  return (
    <div id="home-page" className="min-h-screen bg-[#F8FAFC]">
      
      {/* 1. HERO SECTION (강렬한 헤드라인 및 빠른 상담 신청 폼) */}
      <section 
        id="hero-banner" 
        className="relative bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#0F172A] text-white pt-32 pb-20 sm:pb-28 overflow-hidden"
      >
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Messages Left */}
            <div className="lg:col-span-7 col-span-1 text-left space-y-6">
              
              <div className="inline-flex items-center space-x-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
                <Sparkles className="w-4 h-4 text-[#D97706] animate-pulse" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-gray-200 uppercase">
                  대한변협 공식 등록 도산 전문 법률 대안 서비스
                </span>
              </div>

              {/* Title Header */}
              <h1 className="text-3xl sm:text-5xl font-sans font-extrabold text-white leading-tight">
                감당하기 힘든 빚,<br />
                <span className="text-[#D97706] underline decoration-wavy decoration-orange-400">새로운 시작</span>을 위한 확실한 해결책
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-100 max-w-xl leading-relaxed">
                채무자 회생 및 파산법에 근거하여 귀하의 무거운 부채 부담을 대폭 감소합니다. 
                법원의 매서운 심사 소명도 도산 전문 전담팀의 확실한 가이드와 100% 환불 보장 서약으로 무장하여 기각 없이 합법 인가를 달성해 드립니다.
              </p>

              {/* Unique Quick Stats Checklists */}
              <div className="pt-4 divide-y divide-white/10 max-w-md">
                {HERO_KEY_MESSAGES.map((msg, mIdx) => (
                  <div key={mIdx} className="flex items-center space-x-2.5 py-2.5">
                    <span className="w-1.5 h-1.5 bg-[#D97706] rounded-full shrink-0"></span>
                    <span className="text-xs sm:text-sm font-medium text-slate-100">{msg}</span>
                  </div>
                ))}
              </div>

              {/* Responsive Link to details */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate("/eligibility")}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl border border-white/20 flex items-center space-x-1 transition cursor-pointer"
                >
                  <span>상세 자격조건 먼저 진단해보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Quick Consultation Form Box Right */}
            <div className="lg:col-span-5 col-span-1 bg-white text-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl border border-sky-150/20 text-left">
              <div className="border-b pb-3 mb-4 border-slate-100">
                <span className="text-[#D97706] text-xs font-bold block mb-1">3초 간편 접수</span>
                <h3 className="font-bold text-gray-900 text-lg">1:1 비공개 빚 해방 전화상담</h3>
                <p className="text-gray-500 text-[10px] sm:text-xs">이름과 휴대폰 번호만 남기시면 2시간 내 변호사가 직접 소견을 드립니다.</p>
              </div>

              {quickSubmitted ? (
                <div id="quick-success-panel" className="py-8 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <BadgeCheck className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-base">무료 상담 신청 완료!</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto leading-normal">
                    전담 변호사 1차 심사 전담팀이 가장 안전하며 가명 노출이 없는 연락처로 조속히 전폭적인 전화를 드리겠습니다.
                  </p>
                  <button
                    onClick={() => setQuickSubmitted(false)}
                    className="mt-2.5 px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                  >
                    추가 접수하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">의뢰인 성함 (가명 기재 가능) *</label>
                    <input
                      id="hero-input-name"
                      type="text"
                      required
                      placeholder="예: 홍길동"
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">휴대폰 연락처 *</label>
                    <input
                      id="hero-input-phone"
                      type="tel"
                      required
                      placeholder="예: 010-0000-0000"
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">대략적인 예상 총 채무액</label>
                    <div className="relative">
                      <input
                        id="hero-input-debt"
                        type="number"
                        placeholder="예: 3000"
                        value={quickDebt || ""}
                        onChange={(e) => setQuickDebt(Number(e.target.value))}
                        className="w-full text-xs p-3 pr-8 rounded-lg border border-slate-200 focus:outline-none"
                      />
                      <span className="absolute right-3 top-3.5 text-[10px] text-gray-400 font-bold">만원</span>
                    </div>
                  </div>

                  <button
                    id="hero-btn-submit"
                    type="submit"
                    disabled={quickLoading}
                    className="w-full py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-xl text-xs sm:text-sm tracking-wide shadow-md transition transform active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>1:1 비공개 무료 상담 신청하기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-center font-mono text-[9px] text-gray-400">
                    전국 1:1 전화 대응 접수: <a href="tel:1600-0000" className="underline hover:text-gray-600">1600-0000</a>
                  </div>
                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS SECTION (채무자의 고충 공감 섹션) */}
      <section id="pain-points" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-[#1E3A8A] font-extrabold text-xs uppercase tracking-widest block mb-2 font-mono">
            Relentless financial distress
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-sans font-bold text-slate-900 tracking-tight leading-normal">
            매일 아침 눈을 뜨는 것이 숨이 턱턱 막히고<br />
            막막하지 않으셨습니까?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-xs sm:text-sm mt-3 leading-relaxed">
            채무자가 겪는 아픔은 겪어보지 않은 사람은 단 1%도 알지 못합니다. 
            의도치 않은 고난에 빠진 귀하의 상처를 무상 법률지원센터가 진지하고 책임 있게 어루만지겠습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
            {PAIN_POINTS.map((point, idx) => (
              <div 
                id={`pain-card-${idx}`}
                key={idx} 
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md hover:border-slate-200 transition duration-350"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-block text-[10px] font-bold text-red-600 bg-red-50/75 border border-red-100 px-2 py-0.5 rounded-full">
                    {point.badge}
                  </span>
                  <span className="text-xs text-slate-350 font-mono font-bold">0{idx + 1}</span>
                </div>
                <h3 className="font-bold text-[#1E3A8A] text-sm/relaxed sm:text-base/relaxed">
                  {point.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white inline-block p-4 rounded-xl shadow-sm border border-slate-100 max-w-3xl">
            <span className="text-xs text-gray-600">
              💡 <strong>더 나은 출구:</strong> 정부 산하 신용회복제도 및 대한민국 민법, 회생파산법을 이용하면, 변제의 의지만 있는 상태에서 <strong>모든 독촉 추심 행위는 합법적으로 전면 차단</strong>되며 압류도 신속 해제가 확보됩니다.
            </span>
          </div>

        </div>
      </section>

      {/* 3. FEATURES SECTION (개인회생/파산 제도의 장점 및 탕감 효과) */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-3">
            <span className="inline-block bg-[#D97706]/10 text-[#D97706] text-xs font-bold px-3 py-1 rounded-full">
              핵심적인 해결책 제시
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-sans font-bold text-slate-900 tracking-tight">
              불이익 없이 안전하게 빚을 정리하는 방법
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
              우리는 편법이 아닌 가계 생계를 끝까지 유지하기 위한 합법 대안만을 제시합니다. 
              희망법률지원센터가 드리는 확실한 4대 서약 혜택을 확인해 보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {ADVANTAGES.map((adv, idx) => {
              const IconComp = adv.icon;
              return (
                <div 
                  id={`adv-box-${idx}`}
                  key={idx} 
                  className="flex items-start space-x-4 p-5 hover:bg-slate-50 rounded-2xl transition duration-200 text-left"
                >
                  <div className="p-3 bg-blue-50 text-[#1E3A8A] rounded-xl shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                      {adv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Interactive Path Calculator Link Section */}
          <div className="mt-14 p-6 sm:p-8 bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] rounded-3xl text-white text-left shadow-lg flex flex-col md:flex-row items-center justify-between">
            <div className="space-y-2 mb-4 md:mb-0 max-w-xl">
              <span className="inline-block px-2 py-0.5 bg-white/10 text-white text-[10px] font-bold rounded">무상 배포</span>
              <h3 className="text-xl sm:text-2xl font-bold font-sans">나의 부채 탕감률은 얼마나 될까요?</h3>
              <p className="text-xs text-slate-200 leading-normal font-sans">
                인공지능 모델이 대한민국 변제 및 자산 소명 규정에 의거하여, 귀하에게 예상되는 월 납부 비용과 원금 면책 비율을 즉시 원클릭으로 정형 연산해 드립니다.
              </p>
            </div>
            <button
              id="goto-contact-ai-link"
              onClick={() => onNavigate("/contact")}
              className="px-6 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-xl text-xs sm:text-sm tracking-wide transition transform hover:translate-x-1 cursor-pointer"
            >
              1초 만에 AI 탕감률 자가진단서 받기 →
            </button>
          </div>

        </div>
      </section>

      {/* 4. PROOF SECTION (실제 인가 결정 성공 사례 및 후기) */}
      <section id="proof-cases" className="py-20 bg-slate-50 border-y border-slate-150/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-3">
            <span className="inline-block bg-[#1E3A8A]/10 text-[#1E3A8A] text-xs font-bold px-3 py-1 rounded-full">
              성공 인가 사례 보고
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-sans font-bold text-slate-900 tracking-tight">
              절망에서 새로운 삶의 날개를 단 의뢰인 성공 목록
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
              최근 1년 법원 접수 인원 중, 기각 없이 80~90% 이상의 부채 탕감을 확보하며 
              정상적 경제 기반을 개시한 실제 보정 통지 사례입니다.
            </p>
          </div>

          {/* Success cases grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            {SUCCESS_CASES.map((scase, idx) => (
              <div 
                id={`scase-card-${scase.id}`}
                key={scase.id} 
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Card Header stats */}
                  <div className="flex items-center justify-between border-b pb-3 mb-4 border-slate-100">
                    <span className="text-[10px] text-[#1E3A8A] font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                      {scase.occupation} ({scase.age})
                    </span>
                    <span className="text-xs font-mono font-bold text-[#D97706] flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {scase.period}
                    </span>
                  </div>

                  {/* Main case rate badge */}
                  <div className="mb-4 flex items-baseline space-x-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-[#D97706]">
                      {scase.reductionRate}%
                    </span>
                    <span className="text-xs text-gray-500 font-semibold font-sans">원금 탕감 인가 완료</span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm/relaxed sm:text-base/relaxed mb-3">
                    "{scase.title}"
                  </h3>

                  <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl leading-relaxed mb-4">
                    {scase.feedback}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-50 text-[11px] text-[#1E3A8A] flex items-start space-x-1">
                  <Lightbulb className="w-3.5 h-3.5 text-[#D97706] mt-0.5 shrink-0" />
                  <p className="leading-relaxed">
                    <strong>보정 소명 정보:</strong> {scase.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick legal stats banner */}
          <div className="mt-12 bg-white rounded-2xl p-5 border border-slate-200/50 text-slate-500 text-xs text-center flex flex-wrap justify-center items-center gap-4 sm:gap-10">
            <div>
              <span>누적 법률 구조 승인: </span>
              <strong className="text-slate-800 font-bold ml-1">5,400건+</strong>
            </div>
            <div>
              <span>기각율 수임료 반환: </span>
              <strong className="text-[#D97706] font-bold ml-1">100% 전액환불</strong>
            </div>
            <div>
              <span>지정 관할 지방법원 대응: </span>
              <strong className="text-blue-700 font-medium ml-1">전국 14개 회생 지방법원 전체 통일대응</strong>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CTA SECTION (하단 1:1 무료 상담 신청) */}
      <section id="cta-bottom" className="py-20 bg-slate-900 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-[#1E3A8A] to-[#D97706]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <span className="inline-block bg-[#D97706] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            100% Confidential free consulting
          </span>
          <h2 className="text-2xl sm:text-4xl font-sans font-extrabold max-w-2xl mx-auto leading-tight">
            어두운 수렁 속의 고민, 이제는 저희 손을 잡아주십시오.
          </h2>
          <p className="text-gray-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            한없이 길어 보였던 부채 연쇄 적자의 늪을, 법적인 권리를 적극행사하여 매듭지어야 합니다. 
            처음부터 무제한 성실상담을 무상 보장합니다. 주저 없이 똑똑하게 새 보금자리를 잡으세요.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              id="cta-btn-main-apply"
              onClick={() => { onNavigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-xl text-sm transition transform hover:scale-101 cursor-pointer shadow-lg shadow-orange-700/30"
            >
              1:1 비공개 비밀 무료 채무 진단서 작성하기
            </button>
            <a
              id="phone-link-cta"
              href="tel:1600-0000"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-sm border border-white/20 transition block"
            >
              ☎ 즉시 무료 전화연결: 1600-0000
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}

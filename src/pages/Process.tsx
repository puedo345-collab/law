import { useState } from "react";
import { Clock, CheckSquare, FileText, Landmark, HelpingHand, ChevronDown, ChevronUp, DollarSign, Wallet } from "lucide-react";
import { ServiceProcessStep } from "../types";

const PROCESS_STEPS: ServiceProcessStep[] = [
  {
    stepNumber: 1,
    title: "상담 및 서류 준비 (상황 분석)",
    duration: "1~3일 소요",
    description: "전문 변호사와 비공개 맞춤 분석 후 채무 상황에 따른 필요 서류를 전달 및 도산 전문 전담팀에서 맞춤 가이드라인을 작성합니다.",
    details: ["총 채무 증명서 및 부채 규모 확인원 발급", "재산 증명 서류, 소득 입증 자료 취합", "최적의 변제 계획 대안 초안 검토"]
  },
  {
    stepNumber: 2,
    title: "법원 신청서 접수 및 금지명령(중요)",
    duration: "접수 후 3~7일 이내",
    description: "법원에 개인회생/파산 신청서를 신속하게 접수하며, 동시에 채권자들의 도를 넘은 모든 독촉, 압류, 추심을 합법적으로 금지하는 '금지 및 중지명령'을 신청합니다.",
    details: ["법정 금지/중지 명령 결정 통지", "독촉 전화, 문자메시지, 직장 압류 차단 완료", "압류 상태의 은행 계좌 해제 법적 가이드"]
  },
  {
    stepNumber: 3,
    title: "법원 1차 보정 권고 및 소명",
    duration: "신청 후 1~2개월 이내",
    description: "법원 회생위원이 제출된 대출 사유, 변제율 산정에 관한 추가 소명 및 보정 명령을 내립니다. 가장 기각률이 높은 단계로, 당 법무법인의 철저한 서류 검증 소명을 통해 인가율을 보장합니다.",
    details: ["최근 1년 이내 차용 대출 사유 소서 소명", "재산 가치 재산정 및 가구 최저생계비 재조정 소명", "회생위원 대면 및 비대면 밀착 방어"]
  },
  {
    stepNumber: 4,
    title: "개시 결정 및 채권자 집회",
    duration: "신청서 접수 후 3~5개월 이내",
    description: "신청인의 소득과 변제 계획안이 정당하다고 확인되면 법원의 개시 결정이 내려지며, 법원에 출석하여 채권자들과 대면 집회를 갖습니다. (변호사 대리 지원)",
    details: ["회생 전용 가상 법원 전용 계좌 부여 개시", "해당 계좌로 월 변제금 첫 납입 시작", "채권자 이의신청 방어 업무 조력"]
  },
  {
    stepNumber: 5,
    title: "최종 인가 결정 및 새 출발",
    duration: "신청 후 6~8개월 이내",
    description: "변제계획안이 최종 인가(승인) 고시되며, 신용불량자 등록이 즉시 전면 해제됩니다. 매월 산정된 변제금을 36개월간 성실히 납부하면 남머지 모든 빚은 100% 탕감 면책됩니다.",
    details: ["원금 최대 90% 및 이자 100% 잔액 탕감 확보", "모든 압류 기록 해제 및 신용 등급 복구 시작", "체크카드 발급, 청약, 적금 등 정상 경제 활동 전면 회복"]
  }
];

const REQUIRED_DOCUMENTS = [
  {
    category: "주민센터(동사무소) 발급 서류",
    items: [
      "주민등록등본 1통 / 초본(지번 및 상세 이력 포함) 1통",
      "가족관계증명서(상세) 및 혼인관계증명서(상세) 각 1통",
      "인감증명서 (본인의 채권자 수 + 3통 여유있게)",
      "지방세 세목별 과세증명서 1통 (최근 5개년치 등본 주소지 전체 포함)"
    ]
  },
  {
    category: "직장 및 소득 증빙 서류",
    items: [
      "근로소득원천징수영수증 또는 급여명세서 (최근 1년치)",
      "예상 퇴직금 확인서 (또는 퇴직연금 가입 확인서)",
      "사업자일 경우: 사업자등록증명원, 부가가치세과세표준증명원 (최근 3년치)",
      "소득 진술서 및 통장 급여 입금 내역 거래 원장 (최근 1년치)"
    ]
  },
  {
    category: "은행 및 재산 소명 서류",
    items: [
      "주거래 은행 예금 거래 내역 원장 (최근 1년치)",
      "보험계약조회서 및 해약 환급금 예상 내역서",
      "임대차계약서 사본 (또는 부동산 등기부 등본)",
      "자동차등록원부 (갑/을 부 전무 포함 - 소유 시)"
    ]
  }
];

interface ProcessProps {
  onNavigate: (path: string) => void;
}

export default function Process({ onNavigate }: ProcessProps) {
  const [expandedDocIdx, setExpandedDocIdx] = useState<number | null>(0);

  const toggleDocAccordion = (idx: number) => {
    setExpandedDocIdx(expandedDocIdx === idx ? null : idx);
  };

  return (
    <div id="process-page" className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
          <span className="inline-block bg-[#D97706]/90 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3">
            알기 쉬운 타임라인
          </span>
          <h1 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight mb-3">
            기각 없는 안심 5단계 진행 여정
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            신청부터 인가 결정, 그리고 최종 면책까지 수백 건의 성공 데이터를 가진 전담 정밀 변호사가 
            불안해하실 필요 없이 정시 소명하고 안심 케어해 드립니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Column: Timeline Flow */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-[#1E3A8A] pl-3 mb-6">
              실무 절차 타임라인 가이드
            </h2>

            {/* Vertical timeline stack */}
            <div id="timeline-flow" className="relative border-l-2 border-slate-200 ml-4 pl-6 sm:pl-8 space-y-10 py-2">
              {PROCESS_STEPS.map((step, idx) => (
                <div id={`timeline-step-${step.stepNumber}`} key={idx} className="relative group">
                  
                  {/* Circle Pin indicator */}
                  <span className="absolute -left-[39px] sm:-left-[47px] top-1.5 flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-[#1E3A8A] text-[#1E3A8A] font-bold text-xs sm:text-sm group-hover:bg-[#1E3A8A] group-hover:text-white transition duration-300 shadow-sm z-10">
                    {step.stepNumber}
                  </span>

                  {/* Step Body */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200 hover:border-slate-200">
                    <div className="flex flex-wrap items-center justify-between mb-3 text-left">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-[#1E3A8A] transition-colors">
                        {step.title}
                      </h3>
                      <span className="inline-flex items-center text-xs font-semibold text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 mt-1 sm:mt-0">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 text-left">
                      {step.description}
                    </p>

                    {/* Sub bullet checklist items */}
                    <div className="bg-slate-50 p-3 sm:p-4 rounded-xl">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 text-left">핵심 조치 & 성과 지표</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 text-left">
                        {step.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-center space-x-1.5">
                            <CheckSquare className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Check required documents & Installments info */}
          <div className="space-y-8">
            
            {/* 1. Required Documents Checklists Accordion */}
            <div id="docs-accordion-card" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
              <div className="flex items-center space-x-2 text-slate-800 mb-2">
                <FileText className="w-5 h-5 text-[#1E3A8A]" />
                <h3 className="font-bold text-lg">필수 준비 서류 안내</h3>
              </div>
              <p className="text-xs text-gray-500 mb-5 leading-normal">
                서류 준비가 미비하면 보정이 지체되거나 기각될 수 있습니다. 전담팀이 서류 발급 대행 가이드를 통해 손쉽게 준비하도록 도와드립니다.
              </p>

              {/* Accordion List */}
              <div className="space-y-3">
                {REQUIRED_DOCUMENTS.map((docCategory, idx) => {
                  const isExpanded = expandedDocIdx === idx;
                  return (
                    <div id={`doc-cat-${idx}`} key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                      <button
                        id={`btn-doc-toggle-${idx}`}
                        onClick={() => toggleDocAccordion(idx)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition duration-150 cursor-pointer text-left"
                      >
                        <span className="font-bold text-xs sm:text-sm text-gray-800 truncate">{docCategory.category}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                      </button>

                      {isExpanded && (
                        <div className="p-4 bg-white divide-y divide-slate-50 animate-fadeIn">
                          {docCategory.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="py-2.5 text-xs text-gray-600 flex items-start">
                              <span className="w-1.5 h-1.5 bg-[#D97706] rounded-full mt-1.5 mr-2 shrink-0"></span>
                              <span className="leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Flat/Deferred Fee System (분납) info card */}
            <div id="installment-price-card" className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] rounded-2xl p-6 text-white text-left shadow-lg border border-blue-900/40 relative overflow-hidden">
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                <Wallet className="w-40 h-40 object-cover" />
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <div className="p-2 bg-white/10 rounded-lg text-[#D97706]">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-md text-white">수임료 무이자 분납제 도입</h3>
              </div>

              <p className="text-gray-200 text-xs leading-relaxed mb-4">
                당장 수임료 수십~백여만 원이 없어 빚 독촉을 견디고 고뇌하는 분들의 심정을 잘 알고 있습니다. 희망법률지원센터는 <strong>최대 3개월~5개월 자체 무이자 분납제</strong>를 실천하고 있습니다.
              </p>

              <div className="bg-black/20 p-3.5 rounded-xl border border-white/5 space-y-2 mb-5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300">상담 비용</span>
                  <span className="font-bold text-green-300">100% 무상 수기 검토</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300">부채증명 대행비</span>
                  <span className="font-bold text-gray-100">원가 대리 발급</span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-white/10 pt-2">
                  <span className="text-white font-semibold">초기 수임 계약금</span>
                  <span className="font-bold text-[#D97706] text-sm">무이자 분납 지원</span>
                </div>
              </div>

              <button
                id="btn-process-page-cta"
                onClick={() => { onNavigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="w-full py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-lg text-xs tracking-wider uppercase text-center cursor-pointer transition active:scale-95 shadow"
              >
                1:1 맞춤 분납 설계 견적 받기
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

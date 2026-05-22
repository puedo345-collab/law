import { useState, ChangeEvent, FormEvent } from "react";
import { 
  Building2, Phone, Mail, Clock, MapPin, Keyboard, Sparkles, AlertTriangle, 
  HelpCircle, Star, ArrowRight, Loader2, CheckCircle2, ShieldCheck, Download, Printer 
} from "lucide-react";
import { ConsultationRequest, AiDiagnosisResult } from "../types";

interface ContactProps {
  onNavigate: (path: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  // 상담 및 진단 입력을 위한 공통 상태
  const [formData, setFormData] = useState<ConsultationRequest>({
    name: "",
    phone: "",
    debtAmount: 3500, // 기본 3,500 만원
    income: 210, // 기본 210 만원
    assetAmount: 800, // 기본 800 만원
    dependents: 1, // 부양가족 수
    debtReason: "생활비 및 가계 생계 적자",
    location: "서울/경기",
    isJobStable: true,
    extraMessage: ""
  });

  // 상태 관리들
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showAiResult, setShowAiResult] = useState(false);
  const [aiResult, setAiResult] = useState<AiDiagnosisResult | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "debtAmount" || name === "income" || name === "assetAmount" || name === "dependents" 
          ? Number(value) 
          : value
      }));
    }
  };

  // 1. 일반 1:1 유선 상담 신청 제출 처리
  const handleSubmitConsultation = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("이름과 연락처는 필수 기재 사항입니다.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();
      if (resData.success) {
        setSubmitted(true);
        setSubmitMessage(resData.message || "상담 신청이 정상적으로 완료되었습니다. 최단 시간 내 전문 변호사가 직접 연락드리겠습니다.");
        setShowAiResult(false);
      } else {
        alert(resData.error || "상담 신청 도중 예기치 못한 에러가 발생했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("서버 연결 실패. 유선 전화 1600-0000 으로 직접 연락주시면 감사하겠습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 2. AI 탕감율 및 자가 진단 보고서 발급 신청
  const handleRequestAiDiagnosis = async () => {
    if (!formData.name || !formData.phone) {
      alert("AI 분석 결과를 유선 전달 드리기 위해 이름과 전화번호는 기입해주셔야 합니다.");
      return;
    }

    setLoading(true);
    setShowAiResult(false);
    try {
      const response = await fetch("/api/ai-diagnosis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: AiDiagnosisResult = await response.json();
      setAiResult(data);
      setShowAiResult(true);
      
      // 상담 신청도 자동 접수되도록 백그라운드 호출
      fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, extraMessage: `[AI 진단서 동시 출력] ${formData.extraMessage || ""}` })
      }).catch(err => console.log("background consultation log sub", err));

    } catch (err) {
      console.error(err);
      alert("AI 서버 분석 연동에 실패했습니다. 유선으로 직접 연락주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#D97706]/90 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3">
            비대면 지원센터
          </span>
          <h1 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight mb-3">
            자가 진단 및 1:1 상담 신청
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            모든 상담 내용은 신상 및 신용 보호 비밀 서약서에 의거하여 기밀 유지 처리됩니다. 
            상세한 재무 수치를 아래 입력하시고 맞춤 자문 방향성을 무상 지원받아보세요.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (Forms & Diagnostics) (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* If Form is submitted for consultation and not diagnosing AI */}
            {submitted && !showAiResult ? (
              <div id="submit-success-box" className="bg-white p-8 rounded-2xl shadow-md border-2 border-green-200 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">상담이 정상 접수되었습니다!</h2>
                <p className="text-gray-600 text-sm leading-relaxed max-w-lg mx-auto">
                  {submitMessage}
                </p>
                <div className="p-4 bg-slate-50 rounded-xl max-w-sm mx-auto text-xs text-left space-y-2">
                  <p className="font-semibold text-slate-800">● 안심 보장 수칙</p>
                  <p className="text-slate-600">1. 본 센터는 신분 노출이 없는 전화 비공개 상담을 주도합니다.</p>
                  <p className="text-slate-600">2. 수임료 분납 지원 및 착수 단계 연기 시스템이 곧 설계됩니다.</p>
                </div>
                <div className="pt-2">
                  <button
                    id="btn-back-form"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold hover:bg-[#1E40AF] transition"
                  >
                    새로운 자가진단표 작성하기
                  </button>
                </div>
              </div>
            ) : (
              <div id="contact-form-container" className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
                <div className="flex items-center space-x-2 text-slate-800 mb-2">
                  <Keyboard className="w-5 h-5 text-[#1E3A8A]" />
                  <h3 className="font-bold text-lg">채무 자가진단 및 상담 신청양식</h3>
                </div>
                <p className="text-xs text-gray-500 mb-6 leading-normal">
                  상태를 세밀하게 적을수록 정확한 AI 탕감률 소견 및 변호사 검토가 제공됩니다. (수치 대략 기입 가능)
                </p>

                <form onSubmit={handleSubmitConsultation} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">성명 또는 닉네임 *</label>
                      <input
                        id="input-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="실명 혹은 비공개 칭호 기입"
                        className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                      />
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">연락처 *</label>
                      <input
                        id="input-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="예: 010-1234-5678"
                        className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Debt Amount */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">총 채무액 (만원)</label>
                      <div className="relative">
                        <input
                          id="input-debtAmount"
                          type="number"
                          name="debtAmount"
                          value={formData.debtAmount || ""}
                          onChange={handleInputChange}
                          className="w-full text-xs p-3 pr-8 rounded-lg border border-slate-200 focus:outline-none focus:ring-1"
                        />
                        <span className="absolute right-3 top-3.5 text-[10px] text-gray-400 font-bold">만원</span>
                      </div>
                      <span className="text-[10px] text-gray-400 block mt-1">예: 3500만원 = '3500' 기재</span>
                    </div>

                    {/* Monthly Income */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">월 평균 소득 (만원)</label>
                      <div className="relative">
                        <input
                          id="input-income"
                          type="number"
                          name="income"
                          value={formData.income || ""}
                          onChange={handleInputChange}
                          className="w-full text-xs p-3 pr-8 rounded-lg border border-slate-200 focus:outline-none focus:ring-1"
                        />
                        <span className="absolute right-3 top-3.5 text-[10px] text-gray-400 font-bold">만원</span>
                      </div>
                      <span className="text-[10px] text-gray-400 block mt-1">무직일 경우 0 기재</span>
                    </div>

                    {/* Asset Amount */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">총 재산 가치 (만원)</label>
                      <div className="relative">
                        <input
                          id="input-assetAmount"
                          type="number"
                          name="assetAmount"
                          value={formData.assetAmount || ""}
                          onChange={handleInputChange}
                          className="w-full text-xs p-3 pr-8 rounded-lg border border-slate-200 focus:outline-none focus:ring-1"
                        />
                        <span className="absolute right-3 top-3.5 text-[10px] text-gray-400 font-bold">만원</span>
                      </div>
                      <span className="text-[10px] text-gray-400 block mt-1">집 보증금,차,예금 등 전 자산 합</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Dependents */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">부양 가족 수</label>
                      <select
                        id="select-dependents"
                        name="dependents"
                        value={formData.dependents}
                        onChange={handleInputChange}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none placeholder-gray-400"
                      >
                        <option value="0">본인 1인 (0명)</option>
                        <option value="1">부양가족 1명 (총 2인가구)</option>
                        <option value="2">부양가족 2명 (총 3인가구)</option>
                        <option value="3">부양가족 3명 이상 (4인 이상)</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">관할 거주 지역</label>
                      <select
                        id="select-location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none"
                      >
                        <option value="서울/경기">서울 / 인천 / 경기도</option>
                        <option value="강원도">강원도</option>
                        <option value="충청도">대전 / 충청도</option>
                        <option value="경상도">부산 / 대구 / 울산 / 경상도</option>
                        <option value="전라도">광주 / 전라도 / 제주도</option>
                      </select>
                    </div>

                    {/* Is Job Stable Checkbox equivalent selection */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">정기/꾸준 소득 여부</label>
                      <select
                        id="select-isJobStable"
                        name="isJobStable"
                        value={formData.isJobStable ? "true" : "false"}
                        onChange={(e) => setFormData(prev => ({ ...prev, isJobStable: e.target.value === "true" }))}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none"
                      >
                        <option value="true">매달 고정 수입 있음</option>
                        <option value="false">일용직/무직/수동적 수입</option>
                      </select>
                    </div>
                  </div>

                  {/* Debt Reason */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">채무 발생 주요 사유</label>
                    <input
                      id="input-debtReason"
                      type="text"
                      name="debtReason"
                      value={formData.debtReason}
                      onChange={handleInputChange}
                      placeholder="예: 생계 적자, 폐업 수습, 주식/투자 손실, 보증 등"
                      className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">기타 문의사항 및 독촉 애로점</label>
                    <textarea
                      id="input-extraMessage"
                      name="extraMessage"
                      rows={2.5}
                      value={formData.extraMessage}
                      onChange={handleInputChange}
                      placeholder="독촉 전화 횟수, 신용 대출 연체 상태 및 불안하신 점을 편하게 남겨주세요."
                      className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none resize-none font-sans"
                    ></textarea>
                  </div>

                  {/* Notice Alert */}
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#1E3A8A] mt-0.5 shrink-0" />
                    <span className="text-[11px] text-[#1E3A8A] leading-relaxed">
                      작성하신 연락처와 정보는 승인 결정 가능성 시뮬레이션 진단 이후 절대 제3자 및 외부에 공개되지 않으며 전량 보안 및 삭제 처리됩니다.
                    </span>
                  </div>

                  {/* Direct Action Buttons Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Submit Consultation */}
                    <button
                      id="btn-submit-consulting"
                      type="submit"
                      disabled={loading}
                      className="py-3 px-4 bg-slate-800 hover:bg-slate-900 border-2 border-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm tracking-wide flex items-center justify-center space-x-2 cursor-pointer transition disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <span>1:1 기밀 유선 상담 우선 접수</span>
                      )}
                    </button>

                    {/* Launch AI Smart Restructure Diagnostician! */}
                    <button
                      id="btn-submit-ai-spec"
                      type="button"
                      disabled={loading}
                      onClick={handleRequestAiDiagnosis}
                      className="py-3 px-4 bg-gradient-to-r from-[#D97706] to-[#B45309] text-white font-bold rounded-xl text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer transition transform active:scale-98 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-100 animate-pulse" />
                          <span>AI 모의 법률 탕감율 평가서 즉시 출력</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* AI Diagnostics Assessment Paper Output Render Panel */}
            {showAiResult && aiResult && (
              <div id="ai-diagnose-result-panel" className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-[#D97706] text-left animate-fadeIn">
                
                {/* Visual Official Ticket Header */}
                <div className="flex flex-wrap items-center justify-between border-b pb-4 mb-5 border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[#D97706]" />
                    <h4 className="font-serif font-bold text-base sm:text-lg text-gray-900">
                      AI 부채 조정 & 인가 검토 보고서
                    </h4>
                  </div>
                  
                  {/* Print and Save Options */}
                  <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                    <button
                      id="btn-print-ai"
                      onClick={handlePrint}
                      className="p-1 px-2 hover:bg-slate-100 rounded text-xs flex items-center space-x-1 border border-slate-100 cursor-pointer"
                    >
                      <Printer className="w-3 h-3 text-slate-500" />
                      <span>인쇄</span>
                    </button>
                    <span className="text-[10px] bg-amber-50 rounded px-1.5 py-0.5 border border-amber-200 text-[#D97706] font-mono">
                      REF-{Math.floor(Math.random() * 900000 + 100000)}
                    </span>
                  </div>
                </div>

                {/* Main dynamic numbers highlights block */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {/* Restructure system category */}
                  <div className="p-3 bg-slate-50 rounded-xl text-center border">
                    <span className="inline-block text-[10px] text-gray-400 font-bold mb-0.5 block">권장 구제 제도</span>
                    <span className="text-sm font-extrabold text-[#1E3A8A]">
                      {aiResult.recommendedType === "rehabilitation" 
                        ? "개인회생 제도 적격" 
                        : aiResult.recommendedType === "bankruptcy"
                        ? "개인파산 및 면책 적격"
                        : "유선 무료 1차 상담"}
                    </span>
                  </div>

                  {/* Reduction estimation rate */}
                  <div className="p-3 bg-amber-50/45 rounded-xl text-center border border-amber-100">
                    <span className="inline-block text-[10px] text-amber-600 font-bold mb-0.5 block">예상 최대 부채 탕감율</span>
                    <span className="text-xl font-black text-[#D97706]">
                      {aiResult.estimatedReductionRate}%
                    </span>
                  </div>

                  {/* Monthly payment */}
                  <div className="p-3 bg-slate-50 rounded-xl text-center border">
                    <span className="inline-block text-[10px] text-gray-400 font-bold mb-0.5 block">예상 월 변제금</span>
                    <span className="text-sm font-extrabold text-[#1E3A8A]">
                      {aiResult.monthlyPayment > 0 ? `약 ${aiResult.monthlyPayment}만 원` : "0원 (전액 탕감 목표)"}
                    </span>
                  </div>
                </div>

                {/* Full Markdown Detailed Paragraph view with raw conversion support */}
                <div id="ai-md-text-container" className="prose prose-sm max-w-none text-gray-700 leading-relaxed font-sans space-y-4 text-xs sm:text-sm bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  <div className="whitespace-pre-wrap">
                    {aiResult.analysisText}
                  </div>
                </div>

                {/* Quick CTA to move forward */}
                <div className="mt-6 p-4 rounded-xl bg-[#1E3A8A] text-white flex flex-col sm:flex-row items-center justify-between text-left">
                  <div className="space-y-1 mb-3 sm:mb-0">
                    <p className="font-bold text-xs sm:text-sm">위 보고서를 토대로 담당 변호사 유선 매칭을 진행할까요?</p>
                    <p className="text-[10px] text-slate-200">체크된 가구원 소득액 보정 작업을 가감없이 무료로 진수받습니다.</p>
                  </div>
                  <a
                    id="btn-goto-ai-match"
                    href="tel:1600-0000"
                    className="px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs rounded-lg flex items-center space-x-1.5 shrink-0 transition"
                  >
                    <span>1600-0000 전화 발급 매칭</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            )}

          </div>

          {/* Right Column (Map, Contact Info, Way to come) (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Quick Contact Info Cards */}
            <div id="contact-info-card" className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-sm text-gray-900 mb-4 tracking-tight border-b pb-2">방문 및 유선 지원 정보</h3>
              
              <ul className="space-y-4 text-xs sm:text-sm text-gray-600">
                <li className="flex items-start space-x-3">
                  <Building2 className="w-4 h-4 text-[#1E3A8A] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-gray-800 block">사무소명</span>
                    <span>법률사무소 희망 (서초 본사)</span>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-gray-800 block">전화상담</span>
                    <a href="tel:1600-0000" className="text-[#D97706] font-bold underline hover:opacity-80">
                      1600-0000 (평일/야간 주말 24시 접수 대기)
                    </a>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-gray-800 block">운영 시간</span>
                    <span>대면 평일 09:00 - 18:30 (이후 시간 사전 예약제 운영)</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-gray-800 block">도로명 주소</span>
                    <span>서울특별시 서초구 서초대로 250, 5층 (서초동, 법조센터빌딩 법무법인 희망)</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Simulated Interactive Map Representation */}
            <div id="simulated-map-card" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <span className="font-bold text-xs text-gray-500 block uppercase tracking-wider">가까운 법조 타운 약도 오시는 길</span>
              
              {/* Rendered map preview using Tailwind graphics */}
              <div className="relative w-full h-48 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                
                {/* Visual streets layout simulation */}
                <div className="absolute inset-0 bg-slate-100 opacity-80 flex flex-col justify-between p-4">
                  <div className="w-full h-1 bg-white shadow-inner transform rotate-12"></div>
                  <div className="w-full h-1 bg-white shadow-inner transform -rotate-6"></div>
                  <div className="w-1 bg-white h-full shadow-inner absolute left-1/3 top-0"></div>
                  <div className="w-1 bg-white h-full shadow-inner absolute left-2/3 top-0"></div>
                </div>

                {/* Simulated markers with labels */}
                <div className="relative z-10 text-center space-y-1">
                  {/* Metro Station 1 */}
                  <span className="inline-flex items-center space-x-1 px-2 py-1 bg-white text-[9px] font-bold text-orange-600 rounded-md shadow border border-orange-100 absolute left-4 bg-orange-55/90 top-1/4">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping"></span>
                    <span>3호선 서초역 2번 출구</span>
                  </span>

                  {/* Attorney Office Station Marker */}
                  <div className="p-2.5 bg-[#1E3A8A] text-white rounded-full shadow-lg border-2 border-white inline-block animate-bounce">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="block text-[10px] font-extrabold text-[#1E3A8A] bg-white px-2 py-0.5 rounded shadow whitespace-nowrap">
                    희망법률지원센터 (법조센터 5층)
                  </span>

                  {/* Supreme Court Marker Label */}
                  <span className="inline-block text-[9px] text-gray-400 bg-white/95 px-1.5 py-0.5 rounded border border-gray-200 absolute right-6 bottom-10">
                    대검찰청 / 대법원 사거리
                  </span>
                </div>

                {/* Zoom tools mockup */}
                <div className="absolute top-2 right-2 flex flex-col space-y-1 bg-white rounded shadow p-1">
                  <button onClick={() => alert("지도는 확대 고해상도 모드로 고정 상태입니다.")} className="w-5 h-5 text-xs text-slate-800 font-bold hover:bg-slate-50 rounded">+</button>
                  <button onClick={() => alert("지도는 확대 고해상도 모드로 고정 상태입니다.")} className="w-5 h-5 text-xs text-slate-800 font-bold hover:bg-slate-50 rounded">-</button>
                </div>
              </div>

              {/* Transit Details text description */}
              <div className="bg-slate-50 p-3 rounded-xl space-y-2 text-xs text-gray-600">
                <p>
                  🚗 <strong>무료 주차 정보:</strong> 빌딩 우측 전용 주차타워(SUV 포함) 무료 리프트 주차장 이용 및 주차권 도장 지원합니다.
                </p>
                <p>
                  🚇 <strong>지하철 도보 길안내:</strong> 서초역 2번 출구로 나와 교대역 방면 약 110m 걷다 보면 서초빌딩 5층에 위치해 있습니다. (도보 2분)
                </p>
              </div>
            </div>

            {/* Kakao 1:1 Contact Bubble Mock */}
            <div id="kakao-mock-card" className="bg-[#FEE500] text-[#191919] p-4.5 rounded-2xl flex items-center justify-between shadow border border-yellow-300">
              <div className="space-y-0.5 text-left pr-2">
                <span className="font-extrabold text-xs sm:text-sm tracking-tight block">카카오톡 1:1 비밀 간편 상담</span>
                <span className="text-[10px] text-[#191919]/75 block leading-relaxed">
                  전화가 불안하시거나 근무 중이시라면, 메신저로 24시간 간편 질의응답을 지원합니다.
                </span>
              </div>
              <button
                id="btn-kakao-link"
                onClick={() => alert("카카오톡 비밀 상담 전용 채널 '희망법률지원센터'로 연동 신청됩니다. 모바일 기기 권장.")}
                className="px-3.5 py-1.5 bg-[#191919] hover:bg-black/95 text-[#FEE500] text-[10px] font-black rounded-lg shrink-0 cursor-pointer transition"
              >
                채팅 시작
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

import { Shield, Handshake, CheckCircle2, MapPin, Mail, Phone, Clock } from "lucide-react";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#0F172A] text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Guarantees & Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-800">
          <div id="footer-guarantee-1" className="flex items-start space-x-3">
            <div className="p-3 bg-[#1E3A8A]/50 rounded-lg text-[#D97706] mt-1 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">철저한 비밀 원칙 엄수</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                모든 개인정보 및 채무 분석, 상담 기록은 100% 암호화 처리되며, 최종 기각 또는 진행 여부와 무관하게 법적으로 철저히 비밀이 보장됩니다.
              </p>
            </div>
          </div>

          <div id="footer-guarantee-2" className="flex items-start space-x-3">
            <div className="p-3 bg-[#1E3A8A]/50 rounded-lg text-[#D97706] mt-1 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">기각 시 100% 수임료 환불 보장</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                희망법률지원센터는 의뢰인 맞춤형 성실 심사를 원칙으로 합니다. 법원 심사 과정에서 고객 귀책사유가 없음에도 최종 기각될 시 수임료를 전액 환불합니다.
              </p>
            </div>
          </div>

          <div id="footer-guarantee-3" className="flex items-start space-x-3">
            <div className="p-3 bg-[#1E3A8A]/50 rounded-lg text-[#D97706] mt-1 shrink-0">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">수임료 최대 5회 무이자 분납제</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                극심한 생활고를 겪고 있는 채무자 분들의 처지를 공감하여, 수임료 일시 납부 부담을 덜어드리기 위한 자체 3회~5회 무이자 분할 납부 시스템을 지원합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Directory Links & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 py-12">
          {/* Column 1: Firm Intro */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-white font-serif font-semibold text-lg hover:text-gray-300">
                희망법률 개인회생파산 지원센터
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              신뢰할 수 있는 도산 전문 대표변호사와 최적화된 법률 지원단이 한 팀이 되어, 다시 웃는 내일과 확실한 부채 탈출을 실현합니다.
            </p>
            <div className="flex items-center space-x-2.5 text-xs text-gray-500">
              <span>● 서울 본사</span>
              <span>● 대전 지사</span>
              <span>● 부산 지사</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">서비스 바로가기</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  종합 무료 지원센터 홈
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate("/eligibility"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  개인회생/파산 자격 조건 상세 확인
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate("/process"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  법원 신청 및 인가 결정 단계별 절차
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate("/about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  대표 변호사 철학 및 지표 안내
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="hover:text-white transition cursor-pointer text-left"
                >
                  AI 채무 무상 탕감율 자가진단
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">고객 상담 정보</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#D97706]" />
                <span className="text-gray-300 font-bold">전국 대표번호: 1600-0000</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>평일: 09:00 - 21:00 (주말/야간 연중무휴 접수 가능)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>support@hope-rehabilitation.kr</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gray-500 mt-1 shrink-0" />
                <span>서울특별시 서초구 서초대로 250, 5층 (법조센터빌딩 법무법인 희망)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Warning Clause (Disclaimers) */}
          <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-800/60">
            <h4 className="text-[#D97706] font-bold text-xs mb-2">💡 유의 사항 및 면책 조항</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              본 웹사이트에서 제공하는 자가진단 및 AI 모의 리포트는 대한민국 통합 도산법률 연구 데이터에 기반한 정보성 자료로서, 법원의 최종 판결과 다를 수 있습니다. 정확한 법률 효력을 얻기 위해서는 반드시 법무법인 소속 변호사와의 개별 정식 법률 자문 대면 심사를 통하셔야 합니다.
            </p>
          </div>
        </div>

        {/* Legal Corporate Info & Copyright */}
        <div className="pt-8 mt-4 border-t border-gray-800 text-center md:text-left md:flex md:items-center md:justify-between text-xs text-gray-500">
          <div className="space-y-1">
            <p>상호: 법률사무소 희망 | 대표자: 홍길동 도산 전문 변호사 | 변호사등록번호: 제2015-12345호 | 사업자등록번호: 120-00-00000</p>
            <p>© {currentYear} 희망법률 개인회생파산 지원센터. All rights reserved. Powered by Server-side Legal Knowledge Modeling Engine.</p>
          </div>
          <div className="mt-4 md:mt-0 flex justify-center space-x-4">
            <a href="#" className="hover:text-gray-400 transition" onClick={(e) => e.preventDefault()}>개인정보처리방침</a>
            <a href="#" className="hover:text-gray-400 transition" onClick={(e) => e.preventDefault()}>이용약관</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

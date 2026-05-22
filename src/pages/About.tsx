import { Scale, Award, ShieldAlert, GraduationCap, CheckCircle2, MapPin, Users, HeartHandshake } from "lucide-react";

interface AboutProps {
  onNavigate: (path: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const stats = [
    { value: "5,400건+", label: "누적 법률 회생 상담" },
    { value: "98.7%", label: "법원 인가 결정 성공률" },
    { value: "432억 원", label: "누적 의뢰인 탕감 완료액" },
    { value: "100%", label: "기각 시 수임료 환불제" },
  ];

  const credentials = [
    "대한변호사협회 등록 도산 전문 변호사 (제2015-12345호)",
    "서울회생법원 법인파산관재인 경력 역임",
    "한국도산법학회 정회원 및 학술 위원",
    "KBS, MBC, SBS 채널 다수 법률 자문 출연",
    "前 서울지방변호사회 인권위원회 위원",
    "서울대학교 법과대학 법학전문대학원 학석사 졸업",
  ];

  return (
    <div id="about-page" className="min-h-screen bg-[#F8FAFC] pt-24 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#D97706]/90 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3">
            대표 변호사 소개
          </span>
          <h1 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight mb-3">
            의뢰인의 아픔을 가장 철저히 공감하는 동반자
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            사업 실패, 보증 채무, 뜻밖의 실직으로 혼자 짊어지기 힘든 무게였을 것입니다. 
            이제는 검증된 도산 전문 리더십팀과 함께 법률적 구제를 확실하게 보장받으세요.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Stats Section (Bento Grid Style) */}
        <section id="about-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              id={`stat-card-${idx}`}
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center relative overflow-hidden group hover:border-slate-200 transition"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#1E3A8A] transform origin-left"></div>
              <span className="block text-2xl sm:text-3.5xl font-extrabold text-[#1E3A8A] mb-1.5 transition-all">
                {stat.value}
              </span>
              <span className="block text-xs sm:text-sm text-gray-500 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </section>

        {/* Lawyer Profile Section */}
        <section id="lawyer-profile" className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Col: Headshot Placeholder with Legal Vignette */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-md bg-gradient-to-tr from-[#1E3A8A] to-[#1E40AF] flex flex-col justify-end p-6 border-4 border-white">
                {/* Visual Representation of attorney using styled colors and overlay */}
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition"></div>
                <div className="absolute inset-x-0 top-12 flex justify-center text-white/10">
                  <Scale className="w-48 h-48" />
                </div>
                
                {/* Meta details at the bottom of the photo */}
                <div className="relative z-10 text-white text-left">
                  <div className="bg-[#D97706] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded inline-block mb-2">
                    도산전문 대표변호사
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">홍 길 동 (Hong Gil-Dong)</h3>
                  <p className="text-xs text-slate-200 mt-1">대한변호사협회 제2015-12345호 등록</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-2 text-xs text-slate-500">
                <span className="flex items-center"><Award className="w-3.5 h-3.5 text-[#D97706] mr-1" /> 서울회생법원 제휴</span>
                <span>|</span>
                <span className="flex items-center"><ShieldAlert className="w-3.5 h-3.5 text-blue-600 mr-1" /> 비밀유지 서약</span>
              </div>
            </div>

            {/* Right Col: Personal Philosophy & History Details */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[#D97706] font-bold text-xs uppercase tracking-widest block">
                Message from Professional Attorney
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                "빚은 부끄러운 죄가 아닙니다.<br />
                다시 딛고 일어설 법률상의 정당한 권리입니다."
              </h2>
              
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-sans">
                <p>
                  안녕하십니까. 희망법률지원센터 대표변호사 홍길동입니다. 
                  우리가 인생을 살아가다 보면 사업 실패, 예기치 못한 건강 악화, 혹은 타인의 보증 등으로 해마다 감당할 수 없을 만큼의 이자 독촉에 시달리는 날벼락 같은 시련을 마주하곤 합니다.
                </p>
                <p>
                  대한민국 법원 제도는 성실하지만 불운한 채무자가 채권자의 가혹한 추심에서 영구히 벗어나, 다시 사회에 성실히 경제적으로 복귀하도록 돕기 위해 <strong>'개인회생 및 면책 규정'</strong>을 마련해 두고 있습니다.
                </p>
                <p>
                  일부 악성 브로커나 무분별한 단순 사무소와 달리, 저희는 법원 기각 시 100% 수임료를 환불해드리는 확고한 고객보호조치를 기반으로 책임감 있는 정밀 분석만을 담당합니다. 의뢰인 한 분 한 분의 자산과 독촉 소명 서류를 직접 꼼꼼하게 검수하며 끝까지 새 경제적 탄생을 지지하겠습니다.
                </p>
              </div>

              {/* Biography Bullet lists */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 flex items-center mb-3">
                  <GraduationCap className="w-4 h-4 text-[#1E3A8A] mr-1.5" />
                  대표 변호사 약력 및 정회원 이력
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 font-sans">
                  {credentials.map((cred, cIdx) => (
                    <div key={cIdx} className="flex items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-1.5 mt-0.5 shrink-0" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Philosophy details Row */}
        <section id="our-phil-section" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="p-3 bg-blue-50 text-[#1E3A8A] rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-2">실력과 전문성 중심</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              매년 개정되는 채무자 회생법 및 판례 트렌드를 철저하게 분석하며 가구별 생계비를 최대한 확보하여 매달 납입할 변제 단가를 낮춰 드립니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="p-3 bg-amber-50 text-[#D97706] rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-2">일대일 전담 밀착 지원</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              진행 도중 담당자가 바뀌는 번거로움과 누수 없이, 첫 접수부터 최종 개시 명령서 수령까지 변호사와 3인 전문 보좌진이 원팀으로 전담 관리합니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="p-3 bg-green-50 text-green-700 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-2 font-sans">동반자 정신과 공감대</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              우리를 찾아주신 한 분 한 분이 신용불량 굴레에서 벗어날 때까지 성실하고 투명하며 비대면 카톡 상담을 포함한 폭넓은 편의를 아우르겠습니다.
            </p>
          </div>
        </section>

        {/* CTA Banner Section */}
        <section id="about-page-cta" className="bg-[#1E3A8A] rounded-3xl p-8 sm:p-10 text-white text-center relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-sans font-bold">지금, 새로운 출발의 첫 매듭을 지어보세요</h3>
            <p className="text-sm text-gray-100 leading-relaxed">
              언제나 부담 없는 무료 상담이 열려 있습니다. 채무액 규모나 현재 소득, 자산을 기반으로 탕감 가능성을 즉각 무료 판단해 드립니다.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                id="about-cta-sub"
                onClick={() => { onNavigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="px-6 py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-xl text-sm transition shadow-lg cursor-pointer"
              >
                1:1 비공개 상담 및 AI 채무 진단서 작성
              </button>
              <a
                id="about-phone-cta"
                href="tel:1600-0000"
                className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-sm border border-white/25 transition block"
              >
                1600-0000 간편 유선 전화
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

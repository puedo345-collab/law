import { useState, useEffect } from "react";
import { Scale, Phone, Menu, X, Landmark, Calculator, BookOpen, UserCheck, HelpCircle } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "홈", path: "/", icon: Landmark },
    { name: "자격 조건", path: "/eligibility", icon: UserCheck },
    { name: "진행 절차", path: "/process", icon: BookOpen },
    { name: "변호사 소개", path: "/about", icon: Scale },
    { name: "AI 채무 진단", path: "/contact", icon: Calculator },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1E3A8A]/95 text-white shadow-lg backdrop-blur-md py-3"
          : "bg-transparent text-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => handleLinkClick("/")}
            className="flex items-center space-x-2 text-left hover:opacity-90 transition-opacity cursor-pointer group"
          >
            <div className="p-2 bg-[#D97706] rounded-lg text-white group-hover:scale-105 transition-transform">
              <Scale id="header-logo-icon" className="w-6 h-6" />
            </div>
            <div>
              <span className="font-sans font-bold text-lg sm:text-xl tracking-tight block">
                희망법률지원센터
              </span>
              <span className="font-mono text-[10px] text-gray-200 tracking-wider block">
                PERSONAL REHABILITATION & BANKRUPTCY
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  id={`nav-item-desktop-${item.path.replace("/", "root")}`}
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-250 cursor-pointer ${
                    isActive
                      ? "bg-[#D97706] text-white font-semibold"
                      : "text-gray-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Call to Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              id="header-phone-btn"
              href="tel:1600-0000"
              className="flex items-center space-x-1 text-[#D97706] bg-white px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-gray-100 transition shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 fill-[#D97706]" />
              <span>무료전화: 1600-0000</span>
            </a>
            <button
              id="header-cta-btn"
              onClick={() => handleLinkClick("/contact")}
              className="px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-full shadow-md transition transform active:scale-95 cursor-pointer"
            >
              1:1 비공개 상담 신청
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <a
              id="mobile-phone-quick"
              href="tel:1600-0000"
              className="mr-3 p-1.5 bg-white/10 rounded-full hover:bg-white/20 text-white"
              title="전화 연결"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition"
            >
              {isOpen ? (
                <X id="mobile-menu-close" className="w-6 h-6" />
              ) : (
                <Menu id="mobile-menu-open" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-[#1E3A8A]/98 backdrop-blur-lg border-t border-white/10">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  id={`nav-item-mobile-${item.path.replace("/", "root")}`}
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition cursor-pointer ${
                    isActive
                      ? "bg-[#D97706] text-white"
                      : "text-gray-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 text-gray-200" />
                  <span>{item.name}</span>
                </button>
              );
            })}
            <div className="pt-3 border-t border-white/10 flex flex-col space-y-2.5 px-4">
              <a
                id="mobile-phone-cta"
                href="tel:1600-0000"
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-white text-[#1E3A8A] font-bold rounded-lg text-sm text-center shadow"
              >
                <Phone className="w-4 h-4" />
                <span>무료 전화상담: 1600-0000</span>
              </a>
              <button
                id="mobile-cta-btn"
                onClick={() => handleLinkClick("/contact")}
                className="w-full py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-lg text-sm text-center shadow-lg transition"
              >
                1:1 무료 AI 채무 진단서 작성
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

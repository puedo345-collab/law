import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Eligibility from "./pages/Eligibility";
import Process from "./pages/Process";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  // Simple & Robust state routing mapping
  const [currentPath, setCurrentPath] = useState<string>("/");

  // Handle back/forward button native browser support for an SPA feel
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const validPaths = ["/", "/eligibility", "/process", "/about", "/contact"];
      if (validPaths.includes(path)) {
        setCurrentPath(path);
      } else {
        setCurrentPath("/");
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    
    // Initialize
    handleLocationChange();

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderActivePage = () => {
    switch (currentPath) {
      case "/":
        return <Home onNavigate={navigateTo} />;
      case "/eligibility":
        return <Eligibility onNavigate={navigateTo} />;
      case "/process":
        return <Process onNavigate={navigateTo} />;
      case "/about":
        return <About onNavigate={navigateTo} />;
      case "/contact":
        return <Contact onNavigate={navigateTo} />;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div id="app-root-container" className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Dynamic Navigation Header */}
      <Header currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Container */}
      <main id="app-main-content" className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

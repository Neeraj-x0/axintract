import React, { useEffect, useRef, useState } from "react";
import { SpotifyOutlined, AppleOutlined, GoogleOutlined, AmazonOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";

const companies = [
  {
    name: "Spotify",
    icon: <SpotifyOutlined />,
  },
  {
    name: "Apple",
    icon: <AppleOutlined />,
  },
  {
    name: "Google",
    icon: <GoogleOutlined />,
  },
  {
    name: "Amazon",
    icon: <AmazonOutlined />,
  },
  {
    name: "Facebook",
    icon: <FacebookOutlined />,
  },
  {
    name: "Instagram",
    icon: <InstagramOutlined />,
  },
  {
    name: "Twitter",
    icon: <TwitterOutlined />,
  },
];

function Companies() {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint in Tailwind
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Auto-scrolling effect for mobile carousel
  useEffect(() => {
    if (!isMobile || !carouselRef.current) return;
    
    let animationId;
    let scrollPosition = 0;
    const scrollWidth = carouselRef.current.scrollWidth;
    const clientWidth = carouselRef.current.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    
    const scroll = () => {
      if (!carouselRef.current) return;
      
      scrollPosition += 1;
      
      if (scrollPosition >= maxScroll) {
        // Reset to beginning with a smooth transition
        scrollPosition = 0;
        carouselRef.current.scrollTo({
          left: 0,
          behavior: 'auto'
        });
      } else {
        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'auto'
        });
      }
      
      animationId = requestAnimationFrame(scroll);
    };
    
    // Start scrolling after a short delay
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(scroll);
    }, 1000);
    
    // Pause scrolling when user interacts with the carousel
    const pauseScrolling = () => {
      cancelAnimationFrame(animationId);
    };
    
    const resumeScrolling = () => {
      animationId = requestAnimationFrame(scroll);
    };
    
    carouselRef.current.addEventListener('mouseenter', pauseScrolling);
    carouselRef.current.addEventListener('touchstart', pauseScrolling);
    carouselRef.current.addEventListener('mouseleave', resumeScrolling);
    carouselRef.current.addEventListener('touchend', resumeScrolling);
    
    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('mouseenter', pauseScrolling);
        carouselRef.current.removeEventListener('touchstart', pauseScrolling);
        carouselRef.current.removeEventListener('mouseleave', resumeScrolling);
        carouselRef.current.removeEventListener('touchend', resumeScrolling);
      }
    };
  }, [isMobile]);

  return (
    <div className="py-5 mb-10 border-b border-solid border-b-gray-200">
      <div className="container mx-auto px-4">
        {/* Mobile: Auto-scrolling carousel */}
        <div className={`sm:hidden overflow-hidden`}>
          <div 
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Add duplicates at the end for seamless looping */}
            {[...companies, ...companies].map((company, index) => (
              <div 
                key={`${company.name}-${index}`} 
                className="flex-shrink-0 flex items-center justify-center"
              >
                <div className="text-4xl transition-all hover:scale-110 hover:text-blue-500 px-4">
                  {company.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 justify-items-center">
          {companies.map((company) => (
            <div key={company.name} className="flex items-center justify-center">
              <div className="text-4xl md:text-5xl lg:text-6xl transition-all hover:scale-110 hover:text-blue-500">
                {company.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add a custom style to hide scrollbar
const ScrollbarHideStyle = () => {
  return (
    <style jsx global>{`
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  );
};

function EnhancedCompanies() {
  return (
    <>
      <ScrollbarHideStyle />
      <Companies />
    </>
  );
}

export default EnhancedCompanies;
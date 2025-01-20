import React, { useState, useEffect } from "react";
import "./AnimatedCards.css";
import SnowEffect from "../SnowEffect";

const AnimatedCards = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [languageStats, setLanguageStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [showProjects2, setShowProjects2] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  const handleMouseMove = (e) => {
    const bounds = 40;
    
    const logo = document.querySelector('.logo');
    const logoRect = logo.getBoundingClientRect();
    const logoX = logoRect.left + logoRect.width / 2;
    const logoY = logoRect.top + logoRect.height / 2;
    
    const deltaX = e.clientX - logoX;
    const deltaY = e.clientY - logoY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = window.innerWidth / 2;
    
    const x = (deltaX / maxDistance) * bounds;
    const y = (deltaY / maxDistance) * bounds;
    
    setMousePosition({
      x: Math.max(-bounds, Math.min(bounds, x)),
      y: Math.max(-bounds, Math.min(bounds, y))
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScroll = (e) => {
    // e.preventDefault();
    
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (!scrolled) {
      setScrolled(true);
      setTimeout(() => {
        setShowCards(true);
        setIsAnimating(false);
      }, 1200);
    } else if (scrolled && !showProjects && e.deltaY > 0) {
      setShowProjects(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    } else if (scrolled && showProjects && !showProjects2 && e.deltaY > 0) {
      setShowProjects2(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    } else if (scrolled && showProjects && showProjects2 && e.deltaY < 0) {
      setShowProjects2(false);
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    } else if (scrolled && showProjects && !showProjects2 && e.deltaY < 0) {
      setShowProjects(false);
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    } else {
      setScrolled(false);
      setShowCards(false);
      setShowProjects(false);
      setShowProjects2(false);
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimating) return;

      if (e.deltaY > 0) {
        if (!scrolled) {
          handleScroll(e);
        } else if (scrolled && !showProjects) {
          handleScroll(e);
        } else if (scrolled && showProjects && !showProjects2) {
          handleScroll(e);
        }
      } else if (e.deltaY < 0) {
        if (showProjects2) {
          handleScroll(e);
        } else if (showProjects && !showProjects2) {
          handleScroll(e);
        } else if (scrolled && !showProjects) {
          handleScroll(e);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrolled, showProjects, showProjects2, isAnimating]);

  useEffect(() => {
    const fetchLanguageStats = async () => {
      try {
        const headers = GITHUB_TOKEN
          ? { Authorization: `token ${GITHUB_TOKEN}` }
          : {};

        const reposResponse = await fetch(
          `https://api.github.com/users/Teoory/repos`,
          { headers }
        );

        if (!reposResponse.ok) {
          throw new Error("GitHub API'den veri alınamadı!");
        }

        const reposData = await reposResponse.json();
        let aggregatedLanguages = {};

        // Her depo için languages_url'leri çek
        await Promise.all(
          reposData.map(async (repo) => {
            const langResponse = await fetch(repo.languages_url, { headers });
            const langData = await langResponse.json();

            // Dilleri birleştir
            for (const [language, lines] of Object.entries(langData)) {
              aggregatedLanguages[language] = (aggregatedLanguages[language] || 0) + lines;
            }
          })
        );

        setLanguageStats(aggregatedLanguages);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguageStats();
  }, []);

  const formatLines = (lines) => {
    return lines.toLocaleString();
  };

  const languageIcons = {
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "NodeJS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    "NextJS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "TailwindCSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    "BootStrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg",
    "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    "C": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    "ShaderLab": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
    "Lua": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
    "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    "Jenkins": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedLanguages = windowWidth > 768 ? 6 : 4;

  const getCircleText = (text) => {
    if (windowWidth <= 576) {
      return text.split(' ')[0];
    }
    return text;
  };

  return (
    <div className="cards-container">
      <div className="scroll-buttons">
        <button onClick={() => handleScroll({ deltaY: -1 })} className="scroll-button up">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
        <button onClick={() => handleScroll({ deltaY: 1 })} className="scroll-button down">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      <div className={`header-section ${scrolled ? 'moved' : ''}`}>
        <div className="logo-area">
          <div 
            className="logo"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              backgroundImage: `url(https://fiyasko-blog-app.s3.eu-central-1.amazonaws.com/profilePhotos/1707751879463_btnrffs.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </div>
        </div>

        
        <div className="github-section">
        <div className="github-stats">
            <div className="stat-box">
              <h3>
                <img src="https://github.com/fluidicon.png" alt="Github" />
                Github
              </h3>
              <span><a href="https://github.com/Teoory?tab=repositories" target="_blank" rel="noopener noreferrer nofollow">Github'a Git</a></span>
            </div>

            <div className="stat-box">
              <h3>
                <img src="https://www.linkedin.com/favicon.ico" alt="Linkedin" />
                Linkedin
              </h3>
              <span><a href="https://www.linkedin.com/in/berkay-koksal/" target="_blank" rel="noopener noreferrer nofollow">Linkedin'e Git</a></span>
            </div>
            
            <div className="stat-box">
              <h3>
                <img src="https://kofu.com.tr/favicon.ico" alt="Kofu Blog" />
                Kofu Blog
              </h3>
              <span><a href="https://kofu.com.tr" target="_blank" rel="noopener">Kofu Blog'a Git</a></span>
            </div>
          </div>
          
          <div className="contributions-graph">
            <img 
              src="https://ghchart.rshah.org/Teoory" 
              alt="Teoory's Github Contribution Graph"
              className="contribution-img"
            />
          </div>
          
          {(languageStats !== null || languageStats !== 0) && !loading && (
            <h3 className="github-stats-header" style={{color:'#f9f9f9',textDecoration:'underline',textAlign:'center'}}>Alttaki veriler Public Repolarımdan alınmıştır!</h3>
          )}
          <div className="github-stats">
            {Object.entries(languageStats)
              .sort(([, a], [, b]) => b - a)
              .slice(0, displayedLanguages)
              .map(([language, lines]) => (
                <div className="stat-box" key={language}>
                  <h3>
                    {languageIcons[language] && (
                      <img 
                        src={languageIcons[language]} 
                        alt={language}
                      />
                    )}
                    {language}
                  </h3>
                  <span>{formatLines(lines)} satır</span>
                </div>
              ))}
          </div>

          
        </div>

        <div className="circles-area">
          <div className="circle-container">
            <div className={`circle ${scrolled ? 'move-left' : ''}`} style={{backgroundColor: '#2563eb'}}>35+</div>
            <div className="circle-text">{getCircleText("Freelance İş ve Memnun Müşteri")}</div>
          </div>
          
          <div className="circle-container">
            <div className={`circle ${scrolled ? 'move-center' : ''}`} style={{backgroundColor: '#059669'}}>90+</div>
            <div className="circle-text">{getCircleText("Toplam Proje")}</div>
          </div>
          
          <div className="circle-container">
            <div className={`circle ${scrolled ? 'move-right' : ''}`} style={{backgroundColor: '#c2410c'}}>
              {(() => {
                const total = Object.values(languageStats).reduce((acc, curr) => acc + curr, 0);
                if (total >= 1000000) {
                  return `${(total / 1000000).toFixed(1)}M+`;
                } else if 
                  (total >= 1000) {
                  return `${(total / 1000).toFixed(1)}K+`;
                }
                return `${total.toLocaleString()} satır`;
              })()}
            </div>
            <div className="circle-text">{getCircleText("Toplam Satır")}</div>
          </div>
        </div>
        
      </div>

      <div className={`cards-section ${showCards && !showProjects ? 'visible' : ''} ${showProjects ? 'moved' : ''}`}>
        <div className={`info-card ${showCards ? 'visible' : ''}`} id="left-card">
          <h3 className="contact-title">Hakkımda</h3>
          <p>Merhaba ben Berkay Köksal, 23 yaşındayım, İstanbul'da ikamet ediyorum. Hayatımın son 8 senesini kendimi yazılım alanında geliştirmekle uğraştım. Bunun ilk 3 yılı Unity ile oyun geliştirme çalışmaları, 5 yılı Web geliştirme oldu. 2021 tarihinden itibaren Freelance olarak web geliştirme yapmaktayım.</p>
        </div>

        <div className={`info-card ${showCards ? 'visible' : ''}`} id="center-card">
          <h3 className="contact-title">Kullandığım Programlar</h3>
          <p>Ben Bir MERN Stack Developerım. Kullandığım programlar: ReactJS, MongoDB, ExpressJS, NodeJS, NextJS, HTML5, CSS3, TailwindCSS, BootStrap, NodeMailer, PostgreSQL, AWS S3 Bucket, Figma, Adobe Xd, Adobe Photoshop etc.</p>
        </div>

        <div className={`info-card ${showCards ? 'visible' : ''}`} id="right-card">
          <h3 className="contact-title">İletişim</h3>
          <p>Alttaki kanallar üzerinden benimle iletişime geçebilirsiniz.</p>
          <div className="contact">
            <p>
              <a href="https://www.linkedin.com/in/berkay-koksal/" target="_blank" rel="noopener noreferrer">
                <img src="https://www.linkedin.com/favicon.ico" alt="Linkedin" />
                Linkedin
              </a>
            </p>
            <p>
              <a href="mailto:kkslsb.info@gmail.com">
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" alt="Gmail" />
                Kkslsb.info@gmail.com
              </a>
            </p>
            <p>
              <a href="https://wa.me/+905079073856">
                <img src="https://static.whatsapp.net/rsrc.php/v4/yz/r/ujTY9i_Jhs1.png" alt="Whatsapp" />
                Whatsapp
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className={`projects-section ${showProjects && !showProjects2 ? 'visible' : ''} ${showProjects2 ? 'moved' : ''}`}>
      <p className="other-projects-text">diğer projelerime ulaşmak için benimle iletişime geçebilirsiniz.</p>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-item left">
            <div className="project-card">
              <div className="project-image" style={{backgroundImage: `url(https://fit-diyet-app.s3.eu-central-1.amazonaws.com/uploads/1736191577849_7obsh2k.jpg)`}}></div>
              <div className="project-info">
                <h3 className="contact-title">Kofu Blog</h3>
                <p>Kofu Blog, 2024 yılında başlatılan bir blog platformudur. Bu platform sayesinde kullanıcılar blog yazılarını paylaşabilir, okuyabilir ve yorum yapabilirler. Blog yazıları, kategoriye göre sınıflandırılmıştır ve kullanıcılar bu kategoriler arasında geçiş yapabilirler.</p>
                <a href="https://kofu.com.tr" target="_blank" rel="noopener noreferrer">
                  Link: https://kofu.com.tr
                </a>
              </div>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="project-card">
              <div className="project-image" style={{backgroundImage: `url(https://fit-diyet-app.s3.eu-central-1.amazonaws.com/uploads/1736191578440_tsaa644.jpg)`}}></div>
              <div className="project-info">
                <h3 className="contact-title">KaansZone</h3>
                <p>Afrika ve Avrupa'da inşaat malzemeleri tedariği ve uygulama hizmetleri sunuyoruz. Türkiye'de villa, fabrika ve otel gibi anahtar teslim projeler yapıyoruz. Ayrıca VR ve AI destekli inşaat yönetimi yazılımları geliştiriyoruz.</p>
                <a href="https://kaanszone.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Link: https://kaanszone.vercel.app/
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className={`projects-section-2 ${showProjects2 ? 'visible' : ''}`}>
        <p className="other-projects-text">diğer projelerime ulaşmak için benimle iletişime geçebilirsiniz.</p>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-item left">
            <div className="project-card">
              <div className="project-image" style={{backgroundImage: `url(https://fit-diyet-app.s3.eu-central-1.amazonaws.com/uploads/1736191579018_khnu0m.jpg)`}}></div>
              <div className="project-info">
                <h3 className="contact-title">Cofiwo</h3>
                <p>Afrika ve Avrupa'da inşaat malzemeleri tedariği ve uygulama hizmetleri sunuyoruz. Türkiye'de villa, fabrika ve otel gibi anahtar teslim projeler yapıyoruz. Ayrıca VR ve AI destekli inşaat yönetimi yazılımları geliştiriyoruz.</p>
                <a href="https://cofiwo-client.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Link: https://cofiwo-client.vercel.app/
                </a>
              </div>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="project-card">
              <div className="project-image" style={{backgroundImage: `url(https://fit-diyet-app.s3.eu-central-1.amazonaws.com/uploads/1736192115985_o25x18.png)`}}></div>
              <div className="project-info">
                <h3 className="contact-title">Guess to story App</h3>
                <p>Bir kişi hikaye anlatıcısı olur,Oyuncular bu hikayenin ipucu cümlesinden yola çıkarak anlatıcıya evet/hayır veya doğru/yanlış soruları sorarak hikayeyi ve olayı çözmeye çalışırlar.</p>
                <a href="https://guess-to-story-app.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Link: https://guess-to-story-app.vercel.app/
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCards;

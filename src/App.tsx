import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LeadForm from './components/LeadForm';
import CoverageMap from './components/CoverageMap';
import FloaterButtons from './components/FloaterButtons';
import EnhancedSEO from './components/EnhancedSEO';
import { ALL_LOCATIONS, getBySlug, generateLocationContent, OFFICIAL_NEIGHBORHOODS, NEARBY_CITIES, LocationInfo } from './data/locations';
import { SERVICES_LIST, getServiceBySlug, generateServiceContent } from './data/services';
import { BLOG_POSTS, getPostBySlug } from './data/blog';
import { 
  Phone, MessageSquare, ShieldCheck, Clock, Check, Star, 
  ChevronRight, ArrowRight, HelpCircle, AlertTriangle, ExternalLink, 
  Droplet, Hammer, Cpu, Camera, Flame, Award, ThumbsUp, MapPin,
  Compass, Milestone
} from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Sync state on navigation/history change
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handleLocationChange);
    // Overriding pushState to listen to changes
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // Safe router parser
  let matchedView = 'home';
  let matchedSlug = '';

  if (currentPath === '/' || currentPath === '') {
    matchedView = 'home';
  } else if (currentPath.startsWith('/servico/')) {
    matchedView = 'service';
    matchedSlug = currentPath.substring(9);
  } else if (currentPath.startsWith('/bairro/')) {
    matchedView = 'location';
    matchedSlug = currentPath.substring(8);
  } else if (currentPath.startsWith('/cidade/')) {
    matchedView = 'location';
    matchedSlug = currentPath.substring(8);
  } else if (currentPath === '/blog') {
    matchedView = 'blog-index';
  } else if (currentPath.startsWith('/blog/')) {
    matchedView = 'blog-post';
    matchedSlug = currentPath.substring(6);
  } else if (currentPath === '/mapa-do-site') {
    matchedView = 'sitemap';
  } else if (currentPath === '/contato') {
    matchedView = 'contact';
  } else if (currentPath === '/quem-somos') {
    matchedView = 'about';
  } else {
    // Fallback to home
    matchedView = 'home';
  }

  // Common SEO variables and canonical construction
  const siteUrl = "https://aguafacil.app.br";
  const getCanonical = (path: string) => `${siteUrl}${path}`;

  // Default SEO setup for main home
  let seoTitle = "DESENTUPIDORA CURITIBA 24 HORAS | Orçamento Grátis Água Fácil";
  let seoDescription = "Desentupidora Água Fácil Curitiba. Atendimento urgente 24h em todos os bairros e região metropolitana. Desentupimento de esgotos, vasos, pias, ralos e caixas de gordura com garantia.";
  let seoKeywords = "desentupidora curitiba, desentupidora em curitiba, desentupidora 24 horas curitiba, desentupimento curitiba, limpa fossa curitiba, hidrojateamento curitiba, desentupidora perto de mim, desentupidora emergencia curitiba, limpeza de caixa de gordura curitiba";
  let seoSchema: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Desentupidora Água Fácil Curitiba",
    "image": "https://img.supremamidia.com/suprema-img.png",
    "@id": "https://aguafacil.app.br/#localbusiness",
    "url": "https://aguafacil.app.br",
    "telephone": "+55-41-3345-1194",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Central de Atendimento Curitiba",
      "addressLocality": "Curitiba",
      "addressRegion": "PR",
      "postalCode": "80000-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -25.4284,
      "longitude": -49.2733
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://aguafacil.app.br",
      "https://supremasite.com.br"
    ]
  };

  // Render individual views
  const renderNavbarAndBody = () => {
    switch (matchedView) {
      case 'home':
        return <HomeView navigateTo={navigateTo} />;
      case 'service':
        const sInfo = getServiceBySlug(matchedSlug);
        if (!sInfo) return <NotFoundView navigateTo={navigateTo} />;
        
        const sContent = generateServiceContent(sInfo);
        seoTitle = `${sContent.title} | Água Fácil`;
        seoDescription = `${sContent.intro.substring(0, 150)}... Soluções rápidas e limpas de desentupimento com atendimento imediato 24 Horas.`;
        seoKeywords = `${sInfo.name} curitiba, ${sInfo.name} em curitiba, desentupidora curitiba, desentupir ${sInfo.name.toLowerCase()}`;
        
        seoSchema = [
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": sInfo.name,
            "provider": {
              "@type": "LocalBusiness",
              "name": "Desentupidora Água Fácil Curitiba",
              "telephone": "+55-41-3345-1194",
              "url": "https://aguafacil.app.br"
            },
            "description": sInfo.shortDesc,
            "areaServed": "Curitiba"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": sContent.faqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
              }
            }))
          }
        ];
        return <ServiceView service={sInfo} content={sContent} navigateTo={navigateTo} />;

      case 'location':
        const lInfo = getBySlug(matchedSlug);
        if (!lInfo) return <NotFoundView navigateTo={navigateTo} />;

        const lContent = generateLocationContent(lInfo);
        seoTitle = `${lContent.title} | Curitiba PR`;
        seoDescription = `Desentupidora Água Fácil ${lInfo.type === 'city' ? `em ${lInfo.name}` : `no bairro ${lInfo.name}`}. Atendimento imediato 24h em até 30 minutos com orçamento grátis.`;
        seoKeywords = `desentupidora ${lInfo.name}, desentupimento ${lInfo.name}, desentupidora 24h ${lInfo.name}, limpa fossa ${lInfo.name}`;
        
        seoSchema = [
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Desentupidora Água Fácil - Unidade ${lInfo.name}`,
            "telephone": "+55-41-3345-1194",
            "url": `${siteUrl}${currentPath}`,
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": lInfo.lat,
              "longitude": lInfo.lng
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": `Atendimento Local em ${lInfo.name}`,
              "addressLocality": lInfo.name,
              "addressRegion": "PR",
              "addressCountry": "BR"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": lContent.faqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
              }
            }))
          }
        ];
        return <LocationView location={lInfo} content={lContent} navigateTo={navigateTo} />;

      case 'blog-index':
        seoTitle = "Blog Técnico sobre Desentupimentos e Manutenções Hidráulicas";
        seoDescription = "Confira dicas fundamentais de prevenção de entupimentos de pias, vasos, ralos, além de esclarecer preços, legislações de caixas de gordura e mais.";
        return <BlogIndexView navigateTo={navigateTo} />;

      case 'blog-post':
        const post = getPostBySlug(matchedSlug);
        if (!post) return <NotFoundView navigateTo={navigateTo} />;

        seoTitle = `${post.title} | Dicas Úteis Água Fácil`;
        seoDescription = post.shortDesc;
        seoSchema = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "datePublished": post.publishDate,
          "author": {
            "@type": "Organization",
            "name": "Desentupidora Água Fácil"
          },
          "description": post.shortDesc
        };
        return <BlogPostView post={post} navigateTo={navigateTo} />;

      case 'sitemap':
        seoTitle = "Mapa do Site | Desentupidora Água Fácil Curitiba";
        seoDescription = "Consulte o mapa de navegação completo contendo todas as páginas e coberturas de atendimento da desentupidora Água Fácil.";
        return <SitemapView navigateTo={navigateTo} />;

      case 'contact':
        seoTitle = "Contato desentupimento 24h Curitiba | Água Fácil";
        seoDescription = "Fale agora com a nossa central de atendimento ou mande uma mensagem de WhatsApp. Atendimento em até 30 minutos em Curitiba e Região.";
        return <ContactView navigateTo={navigateTo} />;

      case 'about':
        seoTitle = "Quem Somos - Desentupidora Água Fácil Curitiba";
        seoDescription = "Conheça a história, filosofia e compromisso com saneamento e rapidez da Desentupidora Água Fácil no Paraná.";
        return <AboutView navigateTo={navigateTo} />;

      default:
        return <HomeView navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Search engine crawl metadata dynamic inject */}
      <EnhancedSEO 
        title={seoTitle} 
        description={seoDescription} 
        canonicalUrl={getCanonical(currentPath)} 
        keywords={seoKeywords}
        schema={seoSchema}
      />
      
      <Header />
      
      <main className="flex-grow">
        {renderNavbarAndBody()}
      </main>

      <Footer />
      
      {/* Sticky Call Buttons and WhatsApp badges */}
      <FloaterButtons />
    </div>
  );
}

// ----------------------------------------------------
// VÍDEO INSTITUCIONAL COMPONENTS
// ----------------------------------------------------
function YouTubeVideoSection({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`py-16 border-b ${dark ? 'bg-slate-950 border-slate-900' : 'bg-gradient-to-b from-blue-50/40 to-sky-50/20 border-blue-100'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest inline-block font-mono ${dark ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-blue-100 border border-blue-200 text-blue-700'}`}>
            VÍDEO INSTITUCIONAL ÁGUA FÁCIL
          </span>
          <h2 className={`text-2xl font-black uppercase tracking-tight text-center ${dark ? 'text-white' : 'text-slate-900'}`}>
            Nossa Operação e Qualidade na Prática
          </h2>
          <p className={`${dark ? 'text-slate-400' : 'text-slate-600'} text-xs sm:text-sm font-semibold leading-relaxed text-center text-justify md:text-center px-4`}>
            Assista ao nosso vídeo e conheça nosso maquinário, agilidade de resposta em 30 minutos e compromisso total de preço justo com os moradores de Curitiba.
          </p>
        </div>
        
        <div className={`relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border ${dark ? 'border-slate-800' : 'border-blue-100'}`}>
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/SnnZmIU-ZrE" 
            title="Desentupidora Água Fácil Curitiba" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

function InnerYouTubeVideo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="space-y-4 pt-4 pb-4">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-4">
        <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest inline-block font-mono ${dark ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-blue-100 border border-blue-200 text-blue-700'}`}>
          VÍDEO INSTITUCIONAL ÁGUA FÁCIL
        </span>
        <h3 className={`text-lg sm:text-xl font-black uppercase tracking-tight text-center ${dark ? 'text-white' : 'text-slate-900'}`}>
          Operação em Curitiba e Região
        </h3>
      </div>
      <div className={`relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border ${dark ? 'border-slate-800' : 'border-blue-150'}`}>
        <iframe 
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/SnnZmIU-ZrE" 
          title="Desentupidora Água Fácil" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// VIEW: HOME
// ----------------------------------------------------
function HomeView({ navigateTo }: { navigateTo: (p: string) => void }) {
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [activeDesktopSlide, setActiveDesktopSlide] = useState(0);
  const [activeMobileSlide, setActiveMobileSlide] = useState(0);

  const desktopSlides = [
    "https://img.aguafacil.app.br/slider-desentope-cic-cwb.jpg",
    "https://img.aguafacil.app.br/slider-desentope-cic.jpg",
    "https://img.aguafacil.app.br/slider-desentope.jpg"
  ];

  const mobileSlides = [
    "https://img.aguafacil.app.br/slider-mobile-cic-agua-facil.jpg",
    "https://img.aguafacil.app.br/slider-mobile-cic.jpg"
  ];

  useEffect(() => {
    const desktopInterval = setInterval(() => {
      setActiveDesktopSlide((prev) => (prev + 1) % desktopSlides.length);
    }, 5000);

    const mobileInterval = setInterval(() => {
      setActiveMobileSlide((prev) => (prev + 1) % mobileSlides.length);
    }, 5000);

    return () => {
      clearInterval(desktopInterval);
      clearInterval(mobileInterval);
    };
  }, []);

  // Filter local highlights
  const displayedOfficial = showAllLocations ? OFFICIAL_NEIGHBORHOODS : OFFICIAL_NEIGHBORHOODS.slice(0, 16);
  const displayedUnofficial = showAllLocations 
    ? ALL_LOCATIONS.filter(l => l.type === 'unofficial') 
    : ALL_LOCATIONS.filter(l => l.type === 'unofficial').slice(0, 6);
  const displayedCities = showAllLocations ? NEARBY_CITIES : NEARBY_CITIES.slice(0, 5);

  return (
    <>
      {/* PREMIUM HERO IMAGE SLIDER BLOCK */}
      <div className="relative w-full overflow-hidden bg-slate-900 border-b border-slate-200">
        {/* Desktop Slider Section (Hidden on Mobile) */}
        <div className="hidden md:block relative w-full overflow-hidden bg-slate-950">
          {desktopSlides.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Banner Desentupidora Água Fácil ${idx + 1}`}
              referrerPolicy="no-referrer"
              loading={idx === 0 ? "eager" : "lazy"}
              className={`w-full h-auto transition-all duration-1000 ease-in-out ${
                idx === activeDesktopSlide 
                  ? "relative opacity-100 scale-100 z-10 block" 
                  : "absolute top-0 left-0 opacity-0 scale-105 z-0 pointer-events-none"
              }`}
            />
          ))}
          {/* Subtle overlay shading for quality depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-slate-950/10 z-20 pointer-events-none"></div>
          
          {/* Slider indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
            {desktopSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDesktopSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeDesktopSlide 
                    ? "w-8 bg-blue-600 shadow-md" 
                    : "w-2.5 bg-white/70 hover:bg-white"
                }`}
                aria-label={`Ir para o slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Slider Section (Hidden on Desktop) */}
        <div className="block md:hidden relative w-full overflow-hidden bg-slate-950">
          {mobileSlides.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Banner Móvel Desentupidora ${idx + 1}`}
              referrerPolicy="no-referrer"
              loading={idx === 0 ? "eager" : "lazy"}
              className={`w-full h-auto transition-all duration-1000 ease-in-out ${
                idx === activeMobileSlide 
                  ? "relative opacity-100 scale-100 z-10 block" 
                  : "absolute top-0 left-0 opacity-0 scale-105 z-0 pointer-events-none"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-slate-950/10 z-20 pointer-events-none"></div>
          
          {/* Slider indicators for mobile */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30">
            {mobileSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMobileSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeMobileSlide 
                    ? "w-7 bg-blue-600 shadow-lg" 
                    : "w-2.5 bg-white/80 hover:bg-white"
                }`}
                aria-label={`Ir para o slide móvel ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MARQUEE 1: PROMOTIONAL & CONTACT STRIP (BEFORE HERO) */}
      <section className="bg-slate-950 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-200 text-xs py-3 border-b border-blue-900/40 relative overflow-hidden select-none w-full shadow-md z-20">
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap min-w-max hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {/* Block 1 */}
            <div className="flex items-center gap-8 pr-8">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black px-2 py-0.5 rounded text-[10px] tracking-widest uppercase font-mono shrink-0">
                ⚡ PROMOÇÃO DO DIA
              </span>
              <span className="font-extrabold text-white text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Qualquer desentupimento de pias, ralos ou vasos à partir de apenas <span className="text-green-400 font-black underline decoration-green-500/50">R$ 50,00 reais</span> o Serviço! Aproveite Já!
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <a href="tel:4133451194" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold transition-colors shrink-0">
                <Phone size={12} className="text-blue-500 fill-blue-500/10 shrink-0" />
                <span>PLANTÃO TELEFONE FIXO 24H:</span>
                <span className="font-mono text-white underline decoration-blue-500/30">(41) 3345-1194</span>
              </a>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <a href="https://wa.me/5541995694912?text=Olá,%20gostaria%20de%2520um%2520orçamento%20de%20desentupimento." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 font-bold transition-colors shrink-0">
                <MessageSquare size={12} className="text-green-500 fill-green-500/10 shrink-0" />
                <span>CHAME NO WHATSAPP:</span>
                <span className="font-mono text-white underline decoration-green-500/30">(41) 99569-4912</span>
              </a>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium text-[12px] sm:text-[13px] shrink-0">
                <Clock size={12} className="text-blue-400 shrink-0" />
                <span>CHEGADA RÁPIDA EM CURITIBA EM 30 MINUTOS !</span>
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium text-[12px] sm:text-[13px] shrink-0">
                <ShieldCheck size={12} className="text-blue-400 shrink-0" />
                <span>VISITA E ORÇAMENTO TOTALMENTE GRÁTIS - SEM TAXA DE DESLOCAMENTO !</span>
              </span>
            </div>

            {/* Block 2 */}
            <div className="flex items-center gap-8 pr-8">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black px-2 py-0.5 rounded text-[10px] tracking-widest uppercase font-mono shrink-0">
                ⚡ PROMOÇÃO DO DIA
              </span>
              <span className="font-extrabold text-white text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Qualquer desentupimento de pias, ralos ou vasos à partir de apenas <span className="text-green-400 font-black underline decoration-green-500/50">R$ 50,00 reais</span> o Serviço! Aproveite Já!
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <a href="tel:4133451194" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold transition-colors shrink-0">
                <Phone size={12} className="text-blue-500 fill-blue-500/10 shrink-0" />
                <span>PLANTÃO TELEFONE FIXO 24H:</span>
                <span className="font-mono text-white underline decoration-blue-500/30">(41) 3345-1194</span>
              </a>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <a href="https://wa.me/5541995694912?text=Olá,%20gostaria%20de%2520um%2520orçamento%20de%20desentupimento." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 font-bold transition-colors shrink-0">
                <MessageSquare size={12} className="text-green-500 fill-green-500/10 shrink-0" />
                <span>CHAME NO WHATSAPP:</span>
                <span className="font-mono text-white underline decoration-green-500/30">(41) 99569-4912</span>
              </a>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium text-[12px] sm:text-[13px] shrink-0">
                <Clock size={12} className="text-blue-400 shrink-0" />
                <span>CHEGADA RÁPIDA EM CURITIBA EM 30 MINUTOS !</span>
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium text-[12px] sm:text-[13px] shrink-0">
                <ShieldCheck size={12} className="text-blue-400 shrink-0" />
                <span>VISITA E ORÇAMENTO TOTALMENTE GRÁTIS - SEM TAXA DE DESLOCAMENTO !</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-white pt-16 pb-24 md:pb-32 overflow-hidden border-b border-indigo-100">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-105/30 via-white to-white z-0"></div>
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-55 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero left details */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-widest animate-pulse">
              <Clock size={12} className="text-blue-600 animate-spin" />
              <span>Plantão de Emergência 24 Horas Ativo</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              <span className="block mb-2">Desentupidora Curitiba 24 Horas</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-650">Atendimento Rápido</span>
              <span className="block text-slate-800 text-2xl sm:text-3xl font-extrabold mt-1">Em Qualquer Região e Bairro</span>
            </h1>
            
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-semibold text-center text-justify md:text-left max-w-xl">
              Equipe especializada em desentupimento residencial, comercial e industrial com equipamentos modernos, hidrojateamento de alta pressão e atendimento emergencial 24h.
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-3 pt-3 justify-center lg:justify-start">
              <a 
                href="#agendamento" 
                className="w-full max-w-[280px] sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-blue-650 to-blue-700 hover:from-blue-600 hover:to-blue-650 text-white font-black text-xs uppercase tracking-wider text-center transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Solicitar Orçamento Grátis
              </a>
              <a 
                href="https://wa.me/5541995694912?text=Olá,%20gostaria%20de%20um%20orçamento%20urgente%20de%20desentupimento%20para%20minha%2520residência." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full max-w-[280px] sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <MessageSquare className="text-green-600 fill-green-600/10 shrink-0" size={14} />
                <span>Chamar no WhatsApp</span>
              </a>
            </div>

            {/* Checkmark Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 pt-6 border-t border-slate-200 w-full text-left">
              <span className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                <Check size={14} className="text-green-600 stroke-[3] shrink-0" />
                <span>Atendimento 24 Horas</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                <Check size={14} className="text-green-600 stroke-[3] shrink-0" />
                <span>Orçamento Gratuito</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                <Check size={14} className="text-green-600 stroke-[3] shrink-0" />
                <span>Garantia de Serviço</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                <Check size={14} className="text-green-600 stroke-[3] shrink-0" />
                <span>Chegada em 30 min</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                <Check size={14} className="text-green-600 stroke-[3] shrink-0" />
                <span>Equipe Especializada</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                <Check size={14} className="text-green-600 stroke-[3] shrink-0" />
                <span>Maquinário Moderno</span>
              </span>
            </div>
          </div>

          {/* Hero right Form container */}
          <div className="lg:col-span-5 w-full" id="agendamento">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* NEUROMARKETING / HIGH-CONVERTING SALES MARQUEE STRIP */}
      <section className="bg-slate-950 bg-gradient-to-r from-slate-950 via-blue-950/20 to-slate-950 text-slate-200 text-xs py-3.5 border-b border-t border-blue-900/40 relative overflow-hidden select-none w-full shadow-lg z-20">
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap min-w-max hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {/* Block 1 */}
            <div className="flex items-center gap-10 pr-10">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white font-black px-2.5 py-1 rounded text-[10px] tracking-widest uppercase shrink-0 shadow-[0_0_12px_rgba(220,38,38,0.5)]">
                🚨 ALERTA DE SAÚDE E SEGURANÇA
              </span>
              <span className="font-extrabold text-white text-[12px] sm:text-[13px] tracking-wide shrink-0">
                O esgoto entupido atrai pragas e bactérias nocivas! Resolva hoje mesmo antes que o refluxo destrua seus móveis e canos!
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">★</span>

              <span className="inline-flex items-center gap-1.5 bg-blue-600/20 border border-blue-500/35 text-blue-400 font-black px-2.5 py-1 rounded text-[10px] tracking-widest uppercase shrink-0">
                ⭐ PROVA SOCIAL REAL
              </span>
              <span className="font-extrabold text-slate-100 text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Mais de <span className="text-blue-400 underline decoration-blue-500/40">12.000 famílias</span> curitibanas atendidas com nota máxima e aprovação imediata de 100%!
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">★</span>

              <span className="inline-flex items-center gap-1.5 bg-green-600 text-white font-black px-2.5 py-1 rounded text-[10px] tracking-widest uppercase shrink-0 shadow-[0_0_12px_rgba(22,163,74,0.5)]">
                🎁 SUPER DESCONTO HOJE
              </span>
              <span className="font-extrabold text-white text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Desentupimentos especializados a partir de apenas <span className="text-green-400 font-black underline decoration-green-500/40">R$ 50,00 reais</span> o Serviço completo!
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">★</span>

              <span className="inline-flex items-center gap-1.5 bg-yellow-500 text-slate-950 font-black px-2.5 py-1 rounded text-[10px] tracking-widest uppercase shrink-0">
                🛠️ TECNOLOGIA PREVENTIVA
              </span>
              <span className="font-extrabold text-slate-100 text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Zero Quebra-Quebra! Equipamentos por vídeo-inspeção computadorizada que evitam danos dolorosos em pisos e azulejos!
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">★</span>

              <span className="inline-flex items-center gap-1.5 bg-sky-600/20 border border-sky-450/30 text-sky-400 font-black px-2.5 py-1 rounded text-[10px] tracking-widest uppercase shrink-0">
                🎯 COMPROMISSO INCONDICIONAL
              </span>
              <span className="font-extrabold text-white text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Visita técnica e orçamento <span className="text-yellow-400 font-black">100% GRÁTIS</span> e sem taxas ocultas! Ligue Fixo (41) 3345-1194 ou WhatsApp (41) 99569-4912!
              </span>
            </div>

            {/* Block 2 (Duplicate for Seamless Loop) */}
            <div className="flex items-center gap-10 pr-10">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white font-black px-2.5 py-1 rounded text-[10px] tracking-widest uppercase shrink-0 shadow-[0_0_12px_rgba(220,38,38,0.5)]">
                🚨 ALERTA DE SAÚDE E SEGURANÇA
              </span>
              <span className="font-extrabold text-white text-[12px] sm:text-[13px] tracking-wide shrink-0">
                O esgoto entupido atrai pragas e bactérias nocivas! Resolva hoje mesmo antes que o refluxo destrua seus móveis e canos!
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">★</span>

              <span className="inline-flex items-center gap-1.5 bg-blue-600/20 border border-blue-500/35 text-blue-400 font-black px-2.5 py-1 rounded text-[10px] tracking-widest uppercase shrink-0">
                ⭐ PROVA SOCIAL REAL
              </span>
              <span className="font-extrabold text-slate-100 text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Mais de <span className="text-blue-400 underline decoration-blue-500/40">12.000 famílias</span> curitibanas atendidas com nota máxima e aprovação imediata de 100%!
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">★</span>

              <span className="inline-flex items-center gap-1.5 bg-green-600 text-white font-black px-2.5 py-1 rounded text-[10px] tracking-widest uppercase shrink-0 shadow-[0_0_12px_rgba(22,163,74,0.5)]">
                🎁 SUPER DESCONTO HOJE
              </span>
              <span className="font-extrabold text-white text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Desentupimentos especializados a partir de apenas <span className="text-green-400 font-black underline decoration-green-500/40">R$ 50,00 reais</span> o Serviço completo!
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">★</span>

              <span className="inline-flex items-center gap-1.5 bg-yellow-500 text-slate-950 font-black px-2.5 py-1 rounded text-[10px] tracking-widest uppercase shrink-0">
                🛠️ TECNOLOGIA PREVENTIVA
              </span>
              <span className="font-extrabold text-slate-100 text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Zero Quebra-Quebra! Equipamentos por vídeo-inspeção computadorizada que evitam danos dolorosos em pisos e azulejos!
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">★</span>

              <span className="inline-flex items-center gap-1.5 bg-sky-600/20 border border-sky-450/30 text-sky-400 font-black px-2.5 py-1 rounded text-[10px] tracking-widest uppercase shrink-0">
                🎯 COMPROMISSO INCONDICIONAL
              </span>
              <span className="font-extrabold text-white text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Visita técnica e orçamento <span className="text-yellow-400 font-black">100% GRÁTIS</span> e sem taxas ocultas! Ligue Fixo (41) 3345-1194 ou WhatsApp (41) 99569-4912!
              </span>
            </div>
          </div>
        </div>
      </section>

      <YouTubeVideoSection />

      {/* 2. AUTHORITY METRIC STATS SECTION */}
      <section className="bg-white border-b border-slate-200 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">+15 Anos</h3>
              <p className="text-[10px] md:text-xs uppercase font-mono text-slate-500 tracking-wider">De Experiência Local</p>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-blue-600">+12.000</h3>
              <p className="text-[10px] md:text-xs uppercase font-mono text-slate-500 tracking-wider">Serviços Realizados</p>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-green-600">+5.000</h3>
              <p className="text-[10px] md:text-xs uppercase font-mono text-slate-500 tracking-wider">Clientes Atendidos</p>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-red-600">+70 Bairros</h3>
              <p className="text-[10px] md:text-xs uppercase font-mono text-slate-500 tracking-wider">Atendidos Ativamente</p>
            </div>
            
            <div className="col-span-2 md:col-span-1 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center flex-col gap-1">
              <div className="flex items-center gap-0.5 text-yellow-500">
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
              </div>
              <h3 className="text-lg font-black text-blue-900">4.9 / 5.0</h3>
              <p className="text-[10px] uppercase font-mono text-blue-700 tracking-wider">Avaliação no Google</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PREMIUM SERVICES GRID SECTION */}
      <section className="bg-gradient-to-b from-sky-50/40 via-white to-blue-50/30 py-16 md:py-24 border-b border-indigo-50" id="servicos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 px-4">
            <span className="px-3 py-1 rounded bg-blue-100 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-widest inline-block">
              Liderança e Tecnologia
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight text-center">
              SERVIÇOS PROFISSIONAIS DE DESENTUPIMENTO
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium text-center text-justify md:text-center">
              Atuamos com equipamentos importados, sondas eletrorrotativas avançadas e hidrojateamento térmico para resolver qualquer obstrução sanitária de forma definitiva, rápida e sem sujeira.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_LIST.map((s) => {
              // Map icon string to actual Lucide component
              const iconMap: Record<string, any> = {
                "Droplets": Droplet, "Wrench": Hammer, "ShieldCheck": ShieldCheck,
                "Activity": Cpu, "FolderHeart": Award, "Hammer": Hammer,
                "FileText": Clock, "Wind": Clock, "Trash2": Flame,
                "Camera": Camera, "TrendingUp": ThumbsUp, "Sparkles": ShieldCheck
              };
              const Comp = iconMap[s.iconName] || Droplet;

              return (
                <div 
                  key={s.slug} 
                  onClick={() => navigateTo(`/servico/${s.slug}`)}
                  className="bg-white border border-slate-200 hover:border-blue-500/50 rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 bg-blue-50 text-blue-600 inline-block rounded-lg border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mb-4">
                      <Comp size={22} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 hover:text-blue-600 transition-colors uppercase tracking-tight mb-2.5">
                      {s.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {s.shortDesc}
                    </p>
                  </div>
                  
                  <span className="text-xs text-blue-600 group-hover:text-blue-700 font-bold flex items-center gap-1.5 pt-2 border-t border-slate-100 mt-auto">
                    <span>Aprender Mais</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. ANTES E DEPOIS / REAL EQUIPAMENTO CAROUSEL */}
      <section className="bg-gradient-to-br from-white via-slate-50 to-blue-50/50 py-16 md:py-24 border-t border-b border-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <span className="px-3 py-1 rounded bg-blue-105 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-widest inline-block">
                Comprometimento Técnico
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight leading-snug">
                MÁQUINAS PROFISSIONAIS DE ALTA COMBATIBILIDADE
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold text-justify md:text-left">
                Nós não utilizamos arames, cabos improvisados ou soda cáustica corrosiva na sua tubulação. Nessas equipes chegam munidas de maquinário eletrorrotativo de marca internacional <strong>K-50</strong> e <strong>K-500 Roto-Rooter</strong>, além de jatos hidrossolúveis de alta pressão.
              </p>

              <div className="space-y-3 pt-2 text-left">
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed"><strong>Vídeo Inspeção Completa:</strong> Microcâmeras de alta definição eliminam a necessidade de 'quebra-quebra' desnecessário de pisos residenciais.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed"><strong>Cabos Helicoidais de Titânio:</strong> Capazes de fazer curvas de 90° graus em canulações estreitas sem obstruir.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed"><strong>Hidrojateamento Próprio:</strong> Equipamentos de alta escalabilidade com pressão superior de até 15.000 PSI para lavar canos por completo.</p>
                </div>
              </div>
            </div>

            {/* Before and After Visual Simulators with CSS */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-lg p-5 flex flex-col justify-between">
                <div>
                  <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block mb-3">CANO OBSTRUÍDO (ANTES)</span>
                  <div className="aspect-video bg-white border border-slate-200 rounded-lg flex items-center justify-center p-4 relative overflow-hidden mb-4">
                    <div className="w-16 h-16 rounded-full border-8 border-slate-300 bg-red-50 text-red-600 flex items-center justify-center font-bold font-mono text-center relative z-10 animate-pulse text-lg">
                      95%
                    </div>
                    {/* Visual depiction of grease build up in CSS */}
                    <div className="absolute inset-0 bg-yellow-600/10 mix-blend-color-burn"></div>
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-400">Vídeo Insp - Obstrução Severa de Gordura</div>
                  </div>
                  <h4 className="text-sm font-black text-slate-900">Canal Condomínio Prejudicado</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">Solidificação extrema de gordura vegetal e restos alimentares causando refluxo generalizado.</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-lg p-5 flex flex-col justify-between">
                <div>
                  <span className="bg-green-100 text-green-700 border border-green-200 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block mb-3">CANO HIGIENIZADO (DEPOIS)</span>
                  <div className="aspect-video bg-white border border-slate-200 rounded-lg flex items-center justify-center p-4 relative overflow-hidden mb-4">
                    <div className="w-16 h-16 rounded-full border-8 border-green-300 bg-green-50 text-green-600 flex items-center justify-center font-bold font-mono z-10 text-lg">
                      0%
                    </div>
                    <div className="absolute inset-0 bg-blue-100/10"></div>
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-400">Vídeo Insp - Limpeza Plena Concluída</div>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 font-sans">Fluxo Hidráulico Totalmente Livre</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">Após o uso do maquinário rotativo e hidrojateamento, o encanamento retorna ao diâmetro original.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. DYNAMIC COMPARISON TABLE (LIGHT THEME) */}
      <section className="bg-gradient-to-b from-blue-50/10 via-sky-50/30 to-white py-16 md:py-24 border-b border-indigo-50" id="diferenciais">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 px-4">
            <span className="px-3 py-1 rounded bg-blue-100 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-widest inline-block">
              Por que nos escolher
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight text-center">
              ÁGUA FÁCIL CONTRA CONCORRENTES LOCAIS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold text-center text-justify md:text-center">
              Compare as metodologias operacionais, clareza e garantias oferecidas pela nossa empresa séria para ver por que lideramos as buscas orgânicas de Curitiba.
            </p>
          </div>

          {/* Table styling */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xl bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-extrabold uppercase text-[11px] font-mono tracking-wider">
                  <th className="p-4 sm:p-5">Diferenciais Essenciais</th>
                  <th className="p-4 bg-blue-50/60 text-blue-700 border-l border-r border-blue-100 font-black">Água Fácil (Empresa Líder)</th>
                  <th className="p-4 text-slate-500">Concorrentes Clássicos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700">
                <tr>
                  <td className="p-4 font-bold text-slate-900">Tempo de Atendimento</td>
                  <td className="p-4 bg-blue-50/20 text-blue-800 border-l border-r border-blue-100/60 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check size={14} className="text-green-600 shrink-0 stroke-[3]" />
                      <span>Em até 30 minutos no local</span>
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">2 a 4 horas (ou somente dia seguinte)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Garantia Técnica</td>
                  <td className="p-4 bg-blue-50/20 text-blue-800 border-l border-r border-blue-100/60 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check size={14} className="text-green-600 shrink-0 stroke-[3]" />
                      <span>De 30 a 90 dias por escrito</span>
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">Sem garantia ou apenas 'de boca'</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Equipamentos Utilizados</td>
                  <td className="p-4 bg-blue-50/20 text-blue-800 border-l border-r border-blue-100/60 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check size={14} className="text-green-600 shrink-0 stroke-[3]" />
                      <span>Sonda eletrorrotativa & hidrojateamento</span>
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">Soda corrosiva ou arames frágeis</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Plantão aos Domingos/Madrugada</td>
                  <td className="p-4 bg-blue-50/20 text-blue-800 border-l border-r border-blue-100/60 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check size={14} className="text-green-600 shrink-0 stroke-[3]" />
                      <span>Sim! Equipes 24 horas ativas</span>
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">Apenas horário comercial padrão</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Orçamento de Visita</td>
                  <td className="p-4 bg-blue-50/20 text-blue-800 border-l border-r border-blue-100/60 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check size={14} className="text-green-600 shrink-0 stroke-[3]" />
                      <span>Gratuito, sem compromisso técnico</span>
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">Cobram taxa de visita inicial</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Regularidade Legal</td>
                  <td className="p-4 bg-blue-50/20 text-blue-800 border-l border-r border-blue-100/60 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Check size={14} className="text-green-600 shrink-0 stroke-[3]" />
                      <span>Em conformidade com IAT, Sanepar e Vigilância</span>
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">Amadores e técnicos autônomos sem CNPJ</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE COVERAGE MAP & REGIONAL JUICE (LIGHT THEME) */}
      <section className="bg-gradient-to-br from-white via-indigo-50/10 to-blue-50/40 py-16 md:py-24 border-b border-indigo-50" id="cobertura">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 px-4">
            <span className="px-3 py-1 rounded bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest inline-block">
              Nossa Unidade Local
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight text-center">
              COBERTURA COMPLETA EM CURITIBA E RM
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold text-center text-justify md:text-center">
              Consulte no mapa abaixo a proximidade de nossas equipes móveis para o seu endereço comercial ou condomínio. Mandamos técnicos imediatamente.
            </p>
          </div>

          <CoverageMap />

        </div>
      </section>

      {/* 7. ALL ACCRUAL NEIGHBORHOODS INDEX FOR SEAMLESS SEO AND ROUTING (COLLAPSIBLE / LIGHT THEME) */}
      <section className="bg-gradient-to-b from-blue-50/20 via-sky-50/10 to-white py-16 md:py-24 border-b border-indigo-50" id="bairros">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14 px-4">
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 uppercase tracking-tight text-center">
              PÁGINAS OPERACIONAIS DE BAIRROS E CIDADES
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold text-center text-justify md:text-center">
              Navegue pelos canais de SEO dedicados de cada região de Curitiba para ler aspectos hidráulicos do local, estimativas de tempos e depoimentos de moradores próximos de você!
            </p>
          </div>

          {/* Large dynamic grid containing shortcuts to All destinations */}
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-black uppercase text-blue-700 tracking-wider mb-4 font-mono flex items-center gap-1.5 justify-center lg:justify-start">
                <MapPin size={14} className="text-blue-600" />
                <span>Bairros Atendidos Oficialmente</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 text-xs">
                {displayedOfficial.map(o => (
                  <button 
                    key={o.slug} 
                    onClick={() => navigateTo(`/bairro/${o.slug}`)}
                    className="p-2.5 bg-white border border-slate-200 hover:border-blue-500 rounded text-left truncate text-slate-700 hover:text-blue-600 transition-all font-semibold shadow-sm"
                    title={`Desentupidora no bairro ${o.name}`}
                  >
                    • {o.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase text-red-700 tracking-wider mb-4 font-mono flex items-center gap-1.5 justify-center lg:justify-start">
                <Compass size={14} className="text-blue-600 animate-pulse" />
                <span>Regiões, Condomínios e Vilas Populares</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs">
                {displayedUnofficial.map(u => (
                  <button 
                    key={u.slug} 
                    onClick={() => navigateTo(`/bairro/${u.slug}`)}
                    className="p-2.5 bg-white border border-slate-200 hover:border-red-500 rounded text-left truncate text-slate-700 hover:text-red-600 transition-all font-semibold shadow-sm"
                    title={`Desentupidora na vila ${u.name}`}
                  >
                    • {u.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase text-green-700 tracking-wider mb-4 font-mono flex items-center gap-1.5 justify-center lg:justify-start">
                <Milestone size={14} className="text-blue-600" />
                <span>Cidades Próximas (Região Metropolitana)</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 text-xs">
                {displayedCities.map(c => (
                  <button 
                    key={c.slug} 
                    onClick={() => navigateTo(`/cidade/${c.slug}`)}
                    className="p-2.5 bg-white border border-slate-200 hover:border-green-500 rounded text-left truncate text-slate-700 hover:text-green-600 transition-all font-semibold shadow-sm"
                    title={`Desentupidora em ${c.name}`}
                  >
                    • {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Expand Toggle Trigger button */}
          <div className="text-center pt-10 flex justify-center">
            <button 
              onClick={() => setShowAllLocations(!showAllLocations)}
              className="w-full max-w-xs px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-1.5 cursor-pointer duration-200"
            >
              <span>{showAllLocations ? "Ocultar bairros e cidades" : "Ver mais bairros e cidades"}</span>
              <ChevronRight className={`transition-transform duration-300 shrink-0 ${showAllLocations ? 'rotate-90' : ''}`} size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* 8. REVIEWS SECTION (LIGHT THEME) */}
      <section className="bg-gradient-to-br from-white via-indigo-50/15 to-blue-50/40 py-16 md:py-24 border-b border-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 px-4">
            <span className="px-3 py-1 rounded bg-blue-100 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-widest inline-block">
              Opinião dos Clientes
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight text-center">
              DEPOIMENTOS DE QUEM CONTRATOU E COMPROVOU
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl relative space-y-4">
              <div className="flex items-center gap-0.5 text-yellow-500">
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
                "Excelente atendimento! Liguei no domingo de madrugada pois a fossa da chácara começou a retornar. O caminhão da Água Fácil chegou em menos de 40 minutos aqui em São José dos Pinhais. Fizeram a limpeza rápida, limparam tudo e deram nota fiscal. Recomendo muito!"
              </p>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Roberto S. Alencar</h4>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">Proprietário de Chácara - SJP</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl relative space-y-4">
              <div className="flex items-center gap-0.5 text-yellow-500">
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
                "Nós temos um restaurante no Batel e a caixa de gordura entupiu bem na hora do almoço. Estávamos desesperados. O técnico da Água Fácil veio com maquinário de hidrojateamento rotativo, desobstruiu em 15 minutos e nos emitiu o certificado exigido pela prefeitura. Nota dez."
              </p>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Patricia Montenegro</h4>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">Gerente de Restaurante - Batel</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl relative space-y-4">
              <div className="flex items-center gap-0.5 text-yellow-500">
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
                <Star size={14} className="fill-yellow-500" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
                "Empresa séria! Fiquei com receio de cobrarem por metro e dar absurdo, mas o técnico explicou perfeitamente os valores antes de ligar a máquina eletrorrotativa. Foram gastos apenas 3 metros no meu ralo do quintal. Achei super honesto, limpo e atencioso."
              </p>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Marcos Aurélio</h4>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">Morador - Água Verde</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. BLOG HIGHLIGHTS SECTION FOR RANKING VALUE (LIGHT THEME) */}
      <section className="bg-slate-50 py-16 md:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-14">
            <div>
              <span className="px-3 py-1 rounded bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest block w-fit mb-2">
                Conhecimento Relevante
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                BLOG SEO E DICAS DE ENCANAMENTO
              </h2>
            </div>
            <button 
              onClick={() => navigateTo('/blog')}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1 hover:border-slate-400 transition-all cursor-pointer shadow-sm"
            >
              <span>Ver mais artigos</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <div 
                key={post.slug}
                onClick={() => navigateTo(`/blog/${post.slug}`)}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 mb-3">
                    <span className="text-blue-600 font-black">{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase leading-snug tracking-tight mb-3">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {post.shortDesc}
                  </p>
                </div>
                
                <span className="text-xs text-slate-500 group-hover:text-blue-600 font-bold flex items-center gap-1.5 pt-2 border-t border-slate-100 mt-auto">
                  <span>Ler artigo completo</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

// ----------------------------------------------------
// VIEW: INDIVIDUAL SERVICE PAGE
// ----------------------------------------------------
function ServiceView({ service, content, navigateTo }: { service: any; content: any; navigateTo: (p: string) => void }) {
  return (
    <article className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb navigator */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 font-bold font-mono">
          <button onClick={() => navigateTo('/')} className="hover:text-white transition-colors">Início</button>
          <ChevronRight size={12} />
          <span className="text-slate-500">Serviços</span>
          <ChevronRight size={12} />
          <span className="text-blue-400 truncate">{service.name}</span>
        </nav>

        {/* Head Block headings */}
        <div className="space-y-4 text-center sm:text-left flex flex-col items-center sm:items-start">
          <div className="inline-block px-3 py-1 rounded bg-blue-650/10 border border-blue-500/25 text-blue-400 text-xs font-black uppercase tracking-widest text-center">
            Serviço Profissional 24h
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-snug text-center sm:text-left">
            {content.h1}
          </h1>
          <p className="text-slate-350 text-xs sm:text-sm md:text-base leading-relaxed text-justify sm:text-left">
            {content.intro}
          </p>
          <div className="bg-slate-950 p-4 rounded-lg inline-block border border-blue-900/40 w-full sm:w-auto text-center sm:text-left">
            <span className="text-xs text-slate-400 uppercase font-mono block">Estimativa de Preço Operacional:</span>
            <span className="text-md sm:text-lg font-black text-green-400 font-mono">{content.priceEst}</span>
          </div>
        </div>

        {/* Leadform fast connection */}
        <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-900/40 via-blue-900/10 to-slate-900">
          <LeadForm initialService={service.name} />
        </div>

        {/* Video Block */}
        <InnerYouTubeVideo dark={true} />

        {/* Core Article text (1200+ words target layout) */}
        <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed prose prose-invert font-sans max-w-none text-justify">
          {content.paragraphs.map((p: string, idx: number) => (
            <p key={idx} className="bg-slate-950/40 p-4 rounded-xl border border-slate-900/60 font-medium">
              {p}
            </p>
          ))}
        </div>

        {/* FAQ Block */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2 justify-center sm:justify-start">
            <HelpCircle size={20} className="text-blue-400 shrink-0" />
            <span className="text-center sm:text-left">Dúvidas Frequentes sobre {service.name}</span>
          </h3>
          <div className="space-y-4">
            {content.faqs.map((faq: any, idx: number) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-2">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-start gap-2 leading-relaxed font-black">
                  <span className="text-slate-450 font-mono shrink-0">Q.</span>
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-5 font-semibold text-justify">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA triggers */}
        <div className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl bg-slate-950 border border-slate-900/60 items-center justify-between">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-black text-white">Precisa de nossa ajuda urgente?</h4>
            <p className="text-xs text-slate-455">Atendimento imediato em domicílio com garantia.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a href="tel:4133451194" className="w-full sm:w-auto px-5 py-2.5 rounded bg-slate-900 text-white font-mono text-xs font-bold border border-slate-800 hover:border-blue-500 transition-all text-center">
              (41) 3345-1194
            </a>
            <a 
              href={`https://wa.me/5541995694912?text=Olá,%20gostaria%20de%20um%20atendimento%20de%20${encodeURIComponent(service.name)}%20com%20orçamento%20grátis.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded bg-green-600 hover:bg-green-500 font-bold text-white text-xs transition-colors text-center shrink-0"
            >
              Chamar WhatsApp
            </a>
          </div>
        </div>

        {/* Coverage Map highlight */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wider text-center sm:text-left">Verifique o mapa local de nossa unidade Curitibana</h3>
          <CoverageMap />
        </div>

      </div>
    </article>
  );
}

// ----------------------------------------------------
// VIEW: INDIVIDUAL NEIGHBORHOOD PAGE (LocationPage Pattern)
// ----------------------------------------------------
function LocationView({ location, content, navigateTo }: { location: LocationInfo; content: any; navigateTo: (p: string) => void }) {
  const isCity = location.type === 'city';

  return (
    <article className="bg-gradient-to-b from-blue-50/20 via-white to-sky-50/30 pt-10 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-bold font-mono justify-center sm:justify-start">
          <button onClick={() => navigateTo('/')} className="hover:text-slate-900 transition-colors">Início</button>
          <ChevronRight size={12} />
          <span className="text-slate-400">{isCity ? 'Cidades' : 'Bairros'}</span>
          <ChevronRight size={12} />
          <span className="text-blue-700 truncate">{location.name}</span>
        </nav>

        {/* Location-specific SEO Cover Block */}
        <div className="space-y-4 text-center sm:text-left flex flex-col items-center sm:items-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-widest animate-pulse">
            <Clock size={12} className="text-blue-600 animate-spin" />
            <span>Unidade Móvel {location.name} de Plantão</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-tight leading-snug">
            {content.h1}
          </h1>
          <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-semibold text-center text-justify sm:text-left">
            Sua pia, banheiro ou esgoto está entupido {isCity ? `em ${location.name}` : `no bairro ${location.name}`}? Não quebre pisos ou encanamentos! A Desentupidora Água Fácil conta com técnicos de prontidão permanente posicionados estrategicamente {isCity ? `em ${location.name}` : `na Região ${location.region} de Curitiba`} para lhe atender em no máximo 30 minutos com visita e orçamento completamente GRÁTIS!
          </p>
        </div>

        {/* LeadForm specifically targeted for active location */}
        <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-500/10 via-blue-200/10 to-blue-500/15 border border-slate-200">
          <LeadForm initialLocation={location.name} />
        </div>

        {/* Video Block */}
        <InnerYouTubeVideo />

        {/* Long text content block (1500+ words target) */}
        <div className="space-y-6 text-slate-705 text-xs sm:text-sm leading-relaxed font-sans max-w-none text-justify">
          {content.paragraphs.map((p: string, idx: number) => (
            <p key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/70 leading-relaxed shadow-sm font-medium">
              {p}
            </p>
          ))}
        </div>

        {/* Dynamic Reviews from same location */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <ThumbsUp size={16} className="text-yellow-500" />
            <span>Depoimento com nota 5★ de morador de {location.name}</span>
          </h3>
          <p className="text-xs text-slate-700 italic leading-relaxed text-justify">
            "Fiquei muito satisfeito com o atendimento feito aqui {isCity ? `em ${location.name}` : `no bairro ${location.name}`}. O técnico chegou incrivelmente rápido, limpou a caixa de gordura em tempo recorde e as estimativas de preços foram passadas de forma corretíssima. Super recomendo a todos o serviço da Desentupidora Água Fácil!"
          </p>
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>— Gustavo Henrique, Cliente Satisfeito</span>
            <span>📍 {location.name}, Paraná</span>
          </div>
        </div>

        {/* Targeted Map focusing location coordinates */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider text-center sm:text-left">Visualize a área de cobertura aproximada de nossa viatura</h3>
          <CoverageMap selectedLoc={location} />
        </div>

        {/* FAQ list */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 justify-center sm:justify-start">
            <HelpCircle size={20} className="text-blue-600 shrink-0" />
            <span>Perguntas Frequentes - Desentupidora {location.name}</span>
          </h3>
          <div className="space-y-4">
            {content.faqs.map((faq: any, idx: number) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-5 rounded-xl space-y-2">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-start gap-2 leading-relaxed text-left">
                  <span className="text-blue-600 font-mono shrink-0">Q.</span>
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-slate-650 leading-relaxed pl-5 text-justify">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom shortcut back pointer */}
        <div className="text-center">
          <button 
            onClick={() => navigateTo('/')}
            className="text-xs font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1 mx-auto hover:underline cursor-pointer"
          >
            <span>← Voltar à página principal</span>
          </button>
        </div>

      </div>
    </article>
  );
}

// ----------------------------------------------------
// VIEW: ALL ARTICLES LIST
// ----------------------------------------------------
function BlogIndexView({ navigateTo }: { navigateTo: (p: string) => void }) {
  return (
    <section className="bg-gradient-to-b from-blue-50/20 via-white to-sky-50/30 pt-10 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="space-y-3 text-center sm:text-left flex flex-col items-center sm:items-start">
          <span className="px-3 py-1 rounded bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest inline-block text-center">
            Seção Informativa Estendida
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-tight leading-snug">
            BLOG DE SEO: ENCANAMENTOS E MANUTENÇÕES
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl text-center sm:text-left text-justify sm:text-left font-semibold">
            Descubra as causas invisíveis por trás de esgotos obstruídos, legislações vigentes e aprenda técnicas seguras de desentupimento caseiro recomendadas por profissionais.
          </p>
        </div>

        {/* Video Block */}
        <InnerYouTubeVideo />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.slug}
              onClick={() => navigateTo(`/blog/${post.slug}`)}
              className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500 transition-all cursor-pointer group shadow-sm hover:shadow-md duration-300"
            >
              <div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 mb-3 uppercase tracking-wider">
                  <span className="text-blue-650 font-black">{post.category}</span>
                  <span>•</span>
                  <span>{post.publishDate}</span>
                </div>
                <h3 className="text-md sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-all tracking-tight leading-snug mb-3">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 font-medium text-justify">
                  {post.shortDesc}
                </p>
              </div>

              <span className="text-xs text-blue-600 group-hover:text-blue-700 font-extrabold flex items-center gap-1.5 pt-4 border-t border-slate-100 mt-6 md:mt-8">
                <span>Leitura completa</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// VIEW: SINGLE BLOG POST DEEP VIEW
// ----------------------------------------------------
function BlogPostView({ post, navigateTo }: { post: any; navigateTo: (p: string) => void }) {
  return (
    <article className="bg-gradient-to-b from-blue-50/20 via-white to-sky-50/30 pt-10 pb-20 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb indexer */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-bold font-mono justify-center sm:justify-start">
          <button onClick={() => navigateTo('/')} className="hover:text-blue-700 transition-colors">Início</button>
          <ChevronRight size={12} />
          <button onClick={() => navigateTo('/blog')} className="hover:text-blue-700 transition-colors">Blog</button>
          <ChevronRight size={12} />
          <span className="text-blue-600 truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Headers metadata block */}
        <div className="space-y-4 text-center sm:text-left flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono text-slate-500">
            <span className="text-blue-650 font-black uppercase">{post.category}</span>
            <span>•</span>
            <span>Data: {post.publishDate}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-3.5xl font-black text-slate-900 leading-tight uppercase tracking-tight text-center sm:text-left">
            {post.title}
          </h1>
          <p className="text-slate-700 text-xs sm:text-sm italic font-medium border-l-4 border-blue-600 pl-4 leading-relaxed bg-blue-50/40 py-2.5 rounded-r text-justify">
            "{post.shortDesc}"
          </p>
        </div>

        {/* Large inline visual leadform to convert blog readers */}
        <div className="p-1 rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-500/15 border border-slate-200">
          <LeadForm />
        </div>

        {/* Video Block */}
        <InnerYouTubeVideo />

        {/* Written content, formatted beautifully */}
        <div className="text-slate-750 text-xs sm:text-sm leading-relaxed font-sans space-y-6 text-justify">
          {post.content.split('\n\n').map((para: string, idx: number) => {
            if (para.startsWith('###')) {
              return <h3 key={idx} className="text-lg font-black text-slate-900 uppercase tracking-tight pt-4 pb-2 text-center sm:text-left">{para.replace('###', '')}</h3>;
            }
            if (para.startsWith('-')) {
              return (
                <ul key={idx} className="space-y-3 pl-4 bg-white p-4 rounded-xl border border-slate-200">
                  {para.split('\n').map((item, id) => (
                    <li key={id} className="flex items-start gap-2 text-xs text-slate-700 font-semibold leading-relaxed text-justify">
                      <span className="text-green-500 mt-0.5 shrink-0">•</span>
                      <span>{item.replace('-', '').trim()}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="leading-relaxed select-text p-1.5 font-medium">
                {para}
              </p>
            );
          })}
        </div>

        <div className="pt-6 border-t border-slate-250 flex items-center justify-between flex-wrap gap-4">
          <button 
            onClick={() => navigateTo('/blog')}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>← Voltar ao Blog</span>
          </button>
          
          <a 
            href="https://wa.me/5541995694912"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 bg-green-600 hover:bg-green-500 font-extrabold text-xs text-white uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageSquare size={14} className="fill-white/10 shrink-0" />
            <span>Chamar WhatsApp do Técnico</span>
          </a>
        </div>

      </div>
    </article>
  );
}

// ----------------------------------------------------
// VIEW: FALLBACK 404
// ----------------------------------------------------
function NotFoundView({ navigateTo }: { navigateTo: (p: string) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6 flex flex-col justify-center items-center">
      <div className="p-3 bg-red-600/10 text-red-500 rounded-full animate-bounce">
        <AlertTriangle size={32} />
      </div>
      <h1 className="text-3xl font-black text-slate-900">CONTEÚDO NÃO LOCALIZADO</h1>
      <p className="text-slate-600 text-sm max-w-md font-semibold">O blog ou bairro solicitado não existe ou está temporariamente em manutenção.</p>
      <button 
        onClick={() => navigateTo('/')}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
      >
        Retornar à Home Principal
      </button>

      <div className="max-w-xl w-full pt-8">
        <InnerYouTubeVideo />
      </div>
    </div>
  );
}


// ----------------------------------------------------
// VIEW: SITEMAP (MAPA DO SITE)
// ----------------------------------------------------
function SitemapView({ navigateTo }: { navigateTo: (p: string) => void }) {
  return (
    <section className="bg-white pt-10 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-bold font-mono">
          <button onClick={() => navigateTo('/')} className="hover:text-slate-900 transition-colors">Início</button>
          <ChevronRight size={12} />
          <span className="text-blue-600">Mapa do Site</span>
        </nav>

        <div className="space-y-3">
          <span className="px-3 py-1 rounded bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest inline-block font-mono">
            Navegação Sistêmica
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            MAPA DO SITE COMPLETO (SITEMAP)
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed font-semibold">
            Navegue de forma fácil por toda a estrutura e canais de atendimento da Desentupidora Água Fácil. Oferecemos as melhores soluções hidráulicas de Curitiba.
          </p>
        </div>

        {/* Video Block */}
        <InnerYouTubeVideo />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-200">
          
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5 pb-2 border-b border-slate-200 font-mono">
                <Check size={16} className="text-blue-600 stroke-[3]" />
                <span>Páginas Institucionais</span>
              </h2>
              <ul className="space-y-2 text-xs font-bold text-slate-600">
                <li><button onClick={() => navigateTo('/')} className="hover:text-blue-600 hover:underline text-left">• Página Inicial (Home Principal)</button></li>
                <li><button onClick={() => navigateTo('/quem-somos')} className="hover:text-blue-600 hover:underline text-left">• Quem Somos (História e Equipamentos)</button></li>
                <li><button onClick={() => navigateTo('/contato')} className="hover:text-blue-600 hover:underline text-left">• Fale Conosco (Atendimento 24h)</button></li>
                <li><button onClick={() => navigateTo('/blog')} className="hover:text-blue-600 hover:underline text-left">• Blog Informativo &amp; Dicas Técnicas</button></li>
                <li><a href="/sitemap.xml" target="_blank" className="hover:text-blue-600 hover:underline text-left">• Sitemap XML Técnico para Crawlers</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5 pb-2 border-b border-slate-200 font-mono">
                <Check size={16} className="text-blue-600 stroke-[3]" />
                <span>Nossos Serviços Profissionais</span>
              </h2>
              <ul className="space-y-2 text-xs font-bold text-slate-600 text-left">
                {SERVICES_LIST.map(s => (
                  <li key={s.slug}>
                    <button onClick={() => navigateTo(`/servico/${s.slug}`)} className="hover:text-blue-600 hover:underline text-left">
                      • {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5 pb-2 border-b border-slate-200 font-mono">
                <Check size={16} className="text-blue-600 stroke-[3]" />
                <span>Cidades da Região Metropolitana</span>
              </h2>
              <ul className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-600">
                {NEARBY_CITIES.map(c => (
                  <li key={c.slug}>
                    <button onClick={() => navigateTo(`/cidade/${c.slug}`)} className="hover:text-blue-600 hover:underline text-left truncate">
                      • {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5 pb-2 border-b border-slate-200 font-mono">
                <Check size={16} className="text-blue-600 stroke-[3]" />
                <span>Bairros Principais de Curitiba</span>
              </h2>
              <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-bold text-slate-600 text-left">
                {OFFICIAL_NEIGHBORHOODS.slice(0, 18).map(n => (
                  <li key={n.slug}>
                    <button onClick={() => navigateTo(`/bairro/${n.slug}`)} className="hover:text-blue-600 hover:underline text-left truncate">
                      • {n.name}
                    </button>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigateTo('/')} 
                className="text-xs font-bold text-blue-600 hover:underline pt-2 block text-left"
              >
                Ver todos os bairros na Home principal →
              </button>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100">
          <LeadForm />
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// VIEW: ABOUT (QUEM SOMOS)
// ----------------------------------------------------
function AboutView({ navigateTo }: { navigateTo: (p: string) => void }) {
  return (
    <section className="bg-white pt-10 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-bold font-mono">
          <button onClick={() => navigateTo('/')} className="hover:text-slate-900 transition-colors">Início</button>
          <ChevronRight size={12} />
          <span className="text-blue-600 font-bold">Quem Somos</span>
        </nav>

        <div className="space-y-3">
          <span className="px-3 py-1 rounded bg-red-50 border border-red-200 text-red-600 text-xs font-black uppercase tracking-widest inline-block font-mono">
            História &amp; Valores
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            DESENTUPIDORA ÁGUA FÁCIL: NOSSO PROPÓSITO
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">
            Fundada com a premissa de revolucionar o mercado hidráulico paranaense, a Água Fácil construiu uma história sólida de respeito ao morador de Curitiba.
          </p>
        </div>

        {/* Video Block */}
        <InnerYouTubeVideo />

        <div className="space-y-6 text-slate-600 text-sm leading-relaxed border-t border-slate-200 pt-6 font-medium">
          <p>
            Há mais de 15 anos no mercado de saneamento, a <strong>Desentupidora Água Fácil</strong> nasceu com o objetivo claro de combater as más práticas comuns do mercado hidráulico — como a cobrança abusiva e injustificada de valores e a falta de garantias pós-atendimento. Criamos uma metodologia de trabalho fundamentada no absoluto respeito, idoneidade, transparência de custos e agilidade operacional técnica.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight font-mono text-blue-700">Nossa Missão</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Restabelecer com velocidade de resposta imediata a salubridade, conforto e fluxo hidráulico de lares e comércios de Curitiba, com total clareza em orçamentos prévios.
              </p>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight font-mono text-red-600">Nossa Visão</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Ser reconhecida como a desentupidora mais idônea, confiável e bem avaliada de Curitiba e Região Metropolitana, liderando o mercado de forma transparente.
              </p>
            </div>
          </div>

          <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight pt-4">Equipe Técnica de Engenheiros e Encanadores</h2>
          <p>
            Contamos com um corpo operacional técnico multidisciplinar. Todos os nossos técnicos passam por treinamentos rigorosos de conformidade técnica da Sanepar, uso adequado de equipamentos de proteção individual (EPIs), e boas práticas sanitárias. Trabalhamos em total conformidade com as diretrizes do IAT (Instituto Água e Terra) e descartamos todos os resíduos coletados apenas em estações receptoras oficiais credenciadas.
          </p>

          <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight pt-4">Nossa Frota e Maquinários Disponíveis</h2>
          <p>
            A Água Fácil investe pesado em tecnologia de ponta. Dispomos de caminhões de hidrojateamento térmico equipados com bombas de alta sucção auto-vácuo, sondas eletrorrotativas importadas K-50 da Roto-Rooter, e microcâmeras de vídeo-inspeção que gravam e documentam os encanamentos sem exigir a quebra desnecessária de azulejos ou furações residenciais estruturais.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <LeadForm />
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// VIEW: CONTACT (CONTATO)
// ----------------------------------------------------
function ContactView({ navigateTo }: { navigateTo: (p: string) => void }) {
  return (
    <section className="bg-white pt-10 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-bold font-mono">
          <button onClick={() => navigateTo('/')} className="hover:text-slate-900 transition-colors">Início</button>
          <ChevronRight size={12} />
          <span className="text-blue-600 font-bold">Contato</span>
        </nav>

        <div className="space-y-3">
          <span className="px-3 py-1 rounded bg-green-50 border border-green-100 text-green-600 text-xs font-black uppercase tracking-widest inline-block font-mono">
            Atendimento Central 24h
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
            FALE AGORA CONOSCO E COBRE SEU ORÇAMENTO GRÁTIS
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">
            Estamos de plantão 24h, inclusive de madrugada e aos domingos, para resolver seu entupimento em até 30 minutos em Curitiba e Região Metropolitana.
          </p>
        </div>

        {/* Video Block */}
        <InnerYouTubeVideo />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-200">
          
          <div className="space-y-6">
            <h2 className="text-md font-black text-slate-900 pb-2 border-b border-slate-200 uppercase tracking-tight font-mono">Canais de Ajuda</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all shadow-sm">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                  <Phone size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase font-mono">Central Fone Fixo Curitiba:</h4>
                  <a href="tel:4133451194" className="text-lg font-mono font-black text-slate-900 hover:text-blue-600 block transition-colors mt-0.5">
                    (41) 3345-1194
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all shadow-sm">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                  <MessageSquare size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase font-mono">WhatsApp Plantão Urgência:</h4>
                  <a 
                    href="https://wa.me/5541995694912" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-lg font-mono font-black text-slate-900 hover:text-green-600 block transition-colors mt-0.5"
                  >
                    (41) 99569-4912
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl space-y-3 shadow-sm">
              <span className="text-[10px] uppercase font-mono tracking-wider text-blue-700 font-extrabold flex items-center gap-1">
                <span>✓ CERTIFICAÇÕES CONFIRMADAS</span>
              </span>
              <p className="text-xs text-blue-800 leading-relaxed font-semibold">
                Nossos chamados são gerados com conformidade legal total, nota fiscal eletrônica, e certificado de garantia assinado por técnicos de plantão.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-4 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Ou Mande uma Mensagem Direta</h3>
            <p className="text-xs text-slate-500 font-medium">Insira seus dados abaixo para um encanador local te orientar de imediato.</p>
            <LeadForm />
          </div>

        </div>

      </div>
    </section>
  );
}

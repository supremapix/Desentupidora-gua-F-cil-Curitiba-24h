import { useState, useEffect } from 'react';
import { Phone, MessageSquare, ShieldCheck, Clock, Menu, X, Droplet, ChevronRight, Home, Wrench, Star, MapPin, BookOpen } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Upper Status Bar - Infinite Interactive Scrolling Marquee */}
      <div className="bg-slate-950 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-200 text-xs py-3 border-b border-blue-900/40 relative overflow-hidden select-none w-full shadow-inner z-10">
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap min-w-max hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {/* Block 1 */}
            <div className="flex items-center gap-8 pr-8">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black px-2 py-0.5 rounded text-[10px] tracking-widest uppercase font-mono shrink-0">
                ⚡ PROMOÇÃO IMPERDÍVEL
              </span>
              <span className="font-extrabold text-white text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Desentupimentos gerais a partir de apenas <span className="text-green-400 font-black underline decoration-green-400/50">R$ 50,00 reais</span> o Serviço! Aproveite Já!
              </span>
              
              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>
              
              <a href="tel:4133451194" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold transition-colors shrink-0 select-text">
                <Phone size={12} className="text-blue-500 fill-blue-500/10 shrink-0" />
                <span>CENTRAL FIXO 24H:</span>
                <span className="font-mono text-white underline decoration-blue-500/30">(41) 3345-1194</span>
              </a>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <a href="https://wa.me/5541995694912?text=Olá,%20gostaria%20de%20um%20orçamento%20de%20desentupimento." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 font-bold transition-colors shrink-0 select-text">
                <MessageSquare size={12} className="text-green-500 fill-green-500/10 shrink-0" />
                <span>CHAME NO WHATSAPP:</span>
                <span className="font-mono text-white underline decoration-green-500/30">(41) 99569-4912</span>
              </a>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium text-[12px] sm:text-[13px] shrink-0">
                <Clock size={12} className="text-blue-400 shrink-0" />
                <span>ATENDIMENTO IMEDIATO EM 30 MINUTOS: Equipes de plantão imediato espalhadas estrategicamente!</span>
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium text-[12px] sm:text-[13px] shrink-0">
                <ShieldCheck size={12} className="text-blue-400 shrink-0" />
                <span>VISITA E ORÇAMENTO COMPLETAMENTE GRÁTIS: Sem taxa de deslocamento ou cobranças surpresas!</span>
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium text-[12px] sm:text-[13px] shrink-0">
                <Wrench size={12} className="text-blue-400 shrink-0" />
                <span>TECNOLOGIA DE PONTA SEM QUEBRA-QUEBRA: Equipamento de vídeo inspeção que localiza o ponto exato da obstrução!</span>
              </span>
            </div>

            {/* Block 2 (Duplicate for Seamless Infinite Loop) */}
            <div className="flex items-center gap-8 pr-8">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black px-2 py-0.5 rounded text-[10px] tracking-widest uppercase font-mono shrink-0">
                ⚡ PROMOÇÃO IMPERDÍVEL
              </span>
              <span className="font-extrabold text-white text-[12px] sm:text-[13px] tracking-wide shrink-0">
                Desentupimentos gerais a partir de apenas <span className="text-green-400 font-black underline decoration-green-400/50">R$ 50,00 reais</span> o Serviço! Aproveite Já!
              </span>
              
              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>
              
              <a href="tel:4133451194" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold transition-colors shrink-0 select-text">
                <Phone size={12} className="text-blue-500 fill-blue-500/10 shrink-0" />
                <span>CENTRAL FIXO 24H:</span>
                <span className="font-mono text-white underline decoration-blue-500/30">(41) 3345-1194</span>
              </a>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <a href="https://wa.me/5541995694912?text=Olá,%20gostaria%20de%20um%20orçamento%20de%20desentupimento." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 font-bold transition-colors shrink-0 select-text">
                <MessageSquare size={12} className="text-green-500 fill-green-500/10 shrink-0" />
                <span>CHAME NO WHATSAPP:</span>
                <span className="font-mono text-white underline decoration-green-500/30">(41) 99569-4912</span>
              </a>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium text-[12px] sm:text-[13px] shrink-0">
                <Clock size={12} className="text-blue-400 shrink-0" />
                <span>ATENDIMENTO IMEDIATO EM 30 MINUTOS: Equipes de plantão imediato espalhadas estrategicamente!</span>
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium text-[12px] sm:text-[13px] shrink-0">
                <ShieldCheck size={12} className="text-blue-400 shrink-0" />
                <span>VISITA E ORÇAMENTO COMPLETAMENTE GRÁTIS: Sem taxa de deslocamento ou cobranças surpresas!</span>
              </span>

              <span className="text-blue-500 font-extrabold px-1 shrink-0">•</span>

              <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium text-[12px] sm:text-[13px] shrink-0">
                <Wrench size={12} className="text-blue-400 shrink-0" />
                <span>TECNOLOGIA DE PONTA SEM QUEBRA-QUEBRA: Equipamento de vídeo inspeção que localiza o ponto exato da obstrução!</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-3 block' 
          : 'hidden md:block bg-transparent md:bg-white md:border-b md:border-slate-150 py-5 md:py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Brand Logo with Premium Animated Wave Effect */}
          <div onClick={() => navigateTo('/')} className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/30 overflow-hidden">
              <Droplet className="text-blue-600 fill-blue-600 w-6 h-6 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1" />
              <span className="absolute bottom-0 w-full h-1/2 bg-blue-500/30 rounded-full blur-sm animate-[pulse_2s_infinite]"></span>
            </div>
            <div>
              <span className={`text-lg md:text-xl font-black tracking-tighter flex items-center gap-1 transition-all ${scrolled ? 'text-slate-900' : 'text-slate-900 md:text-slate-900'}`}>
                ÁGUA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">FÁCIL</span>
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-slate-500 font-mono -mt-1 font-bold">DESENTUPIDORA 24h</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 font-sans text-[13px] font-semibold text-slate-700">
            <button onClick={() => navigateTo('/')} className="hover:text-blue-600 transition-colors">Início</button>
            <button onClick={() => navigateTo('/#servicos')} className="hover:text-blue-600 transition-colors">Serviços</button>
            <button onClick={() => navigateTo('/#diferenciais')} className="hover:text-blue-600 transition-colors">Diferenciais</button>
            <button onClick={() => navigateTo('/#cobertura')} className="hover:text-blue-600 transition-colors">Área de Cobertura</button>
            <button onClick={() => navigateTo('/blog')} className="hover:text-blue-600 transition-colors">Blog SEO</button>
          </nav>

          {/* Quick Contacts Block */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:4133451194" className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-50 border border-slate-200 hover:border-blue-500/30 text-slate-800 font-mono text-xs font-bold transition-all shadow-sm">
              <Phone size={13} className="text-blue-600 animate-bounce" />
              <span>(41) 3345-1194</span>
            </a>
            <a 
              href="https://wa.me/5541995694912?text=Olá,%20gostaria%20de%20um%20orçamento%20urgente%20de%20desentupimento%20para%20minha%2520residência." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-4 py-1.5 rounded bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
            >
              <MessageSquare size={13} />
              <span>Orçamento WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Icon with touch and zoom micro-interactions */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-slate-900 hover:scale-115 active:scale-85 hover:rotate-6 sm:hover:rotate-12 active:rotate-0 transition-all duration-300 ease-in-out cursor-pointer select-none focus:outline-none flex items-center justify-center"
            aria-label={mobileMenuOpen ? "Fechar Menu" : "Abrir Menu"}
          >
            {mobileMenuOpen ? <X size={28} className="stroke-[2.5]" /> : <Menu size={28} className="stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Tray */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b-4 border-blue-600 p-6 shadow-2xl flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-700 font-bold leading-relaxed">
              <span className="text-blue-700 font-black uppercase text-[11px] flex items-center gap-1">
                <ShieldCheck size={14} className="text-blue-600 shrink-0" /> ESPAÇO DE APOIO FACILITADO:
              </span> 
              Toque em qualquer um dos botões abaixo para falar diretamente com nosso encanador de plantão ou navegar pelo site com facilidade!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button 
              onClick={() => navigateTo('/')} 
              className="text-left text-slate-800 hover:text-blue-600 font-black py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-base transition-colors"
            >
              <span className="flex items-center gap-2">
                <Home size={18} className="text-blue-600 shrink-0" />
                Página Inicial (Início)
              </span>
              <ChevronRight size={18} className="text-slate-400 stroke-[3]" />
            </button>
            <button 
              onClick={() => navigateTo('/#servicos')} 
              className="text-left text-slate-800 hover:text-blue-600 font-black py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-base transition-colors"
            >
              <span className="flex items-center gap-2">
                <Wrench size={18} className="text-blue-600 shrink-0" />
                Nossos Serviços de Desentupimento
              </span>
              <ChevronRight size={18} className="text-slate-400 stroke-[3]" />
            </button>
            <button 
              onClick={() => navigateTo('/#diferenciais')} 
              className="text-left text-slate-800 hover:text-blue-600 font-black py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-base transition-colors"
            >
              <span className="flex items-center gap-2">
                <Star size={18} className="text-blue-600 shrink-0" />
                Diferenciais Água Fácil
              </span>
              <ChevronRight size={18} className="text-slate-400 stroke-[3]" />
            </button>
            <button 
              onClick={() => navigateTo('/#cobertura')} 
              className="text-left text-slate-800 hover:text-blue-600 font-black py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-base transition-colors"
            >
              <span className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-600 shrink-0" />
                Cidades e Bairros que Atendemos
              </span>
              <ChevronRight size={18} className="text-slate-400 stroke-[3]" />
            </button>
            <button 
              onClick={() => navigateTo('/blog')} 
              className="text-left text-slate-800 hover:text-blue-600 font-black py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-base transition-colors"
            >
              <span className="flex items-center gap-2">
                <BookOpen size={18} className="text-blue-600 shrink-0" />
                Blog e Informativos Técnicos
              </span>
              <ChevronRight size={18} className="text-slate-400 stroke-[3]" />
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-3 border-t-2 border-slate-100">
            {/* BIG CALL BUTTON 1 - PHONE */}
            <a 
              href="tel:4133451194" 
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-sans text-base font-black shadow-lg border-2 border-blue-700 active:scale-95 transition-all text-center mx-auto max-w-sm"
              style={{ minHeight: '52px' }}
            >
              <Phone size={18} className="text-white fill-white shrink-0 animate-bounce" />
              <span>TOQUE PARA LIGAR AGORA</span>
            </a>
            <div className="text-center">
              <span className="text-xs font-mono font-black text-slate-800 bg-slate-100 py-1 px-3 rounded-lg border border-slate-200 inline-block">
                Fixo Curitiba: (41) 3345-1194
              </span>
            </div>

            {/* BIG CALL BUTTON 2 - WHATSAPP */}
            <a 
              href="https://wa.me/5541995694912?text=Olá,%20gostaria%20de%20um%20orçamento%20urgente%20de%20desentupimento%20para%20minha%20residência." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-base font-black shadow-lg border-2 border-emerald-700 active:scale-95 transition-all mt-1 text-center mx-auto max-w-sm"
              style={{ minHeight: '52px' }}
            >
              <MessageSquare size={18} className="text-white fill-white shrink-0" />
              <span>CHAT DE WHATSAPP IMEDIATO</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

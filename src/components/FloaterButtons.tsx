import { useState, useEffect } from 'react';
import { Phone, MessageSquare, ShieldAlert, ArrowUp, Zap } from 'lucide-react';

export default function FloaterButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Buttons on Desktop & Mobile */}
      <div className="fixed bottom-20 right-6 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-3">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            aria-label="Voltar ao Topo"
            className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-md cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <ArrowUp size={16} />
          </button>
        )}

        {/* Floating Urgency Tag */}
        <div className="hidden sm:flex items-center gap-1 bg-blue-950/90 border border-blue-900/60 backdrop-blur-md px-3 py-1 rounded-full shadow-md text-[10px] font-black text-blue-400 tracking-wider uppercase animate-pulse">
          <Zap size={10} className="fill-blue-400" />
          <span>Plantão Ativo</span>
        </div>

        {/* Real Bouncing WhatsApp Floater with text notification bubble */}
        <div className="relative group">
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-950/95 border border-slate-800 text-slate-100 text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-xl shrink-0 whitespace-nowrap opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-ping"></span>
              Orçamento Grátis 24h
            </span>
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-950 border-r border-t border-slate-800 rotate-45"></div>
          </div>

          <a 
            href="https://wa.me/5541995694912?text=Olá,%20gostaria%20de%20um%20orçamento%20urgente%20de%20desentupimento%20para%20minha%20residência." 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Falar com Técnico no WhatsApp"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 animate-[bounce_3s_infinite]"
          >
            <MessageSquare size={26} className="fill-white/10" />
          </a>
        </div>
      </div>

      {/* FIXED FOOTER BAR - MOBILE ONLY (highly conversion optimized) */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full z-50 bg-slate-950 border-t border-slate-800 shadow-2xl grid grid-cols-2">
        <a 
          href="tel:4133451194"
          className="bg-slate-950 border-r border-slate-800 py-3.5 flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-wider"
        >
          <Phone size={14} className="text-blue-400 animate-[ping_2s_infinite]" />
          <span>Ligar Fixo</span>
        </a>
        <a 
          href="https://wa.me/5541995694912?text=Olá,%20gostaria%20de%20um%20orçamento%20urgente%20de%20desentupimento%20para%20minha%20residência."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-500 py-3.5 flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-wider"
        >
          <MessageSquare size={14} className="fill-white/10 text-white animate-pulse" />
          <span>Chamar Whats</span>
        </a>
      </div>
    </>
  );
}

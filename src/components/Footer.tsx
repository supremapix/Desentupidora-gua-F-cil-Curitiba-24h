import { OFFICIAL_NEIGHBORHOODS, NEARBY_CITIES } from '../data/locations';
import { SERVICES_LIST } from '../data/services';
import { SupremaCredit } from './SupremaCredit';
import { Phone, MessageSquare, MapPin, CheckCircle, Droplet } from 'lucide-react';

export default function Footer() {
  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cCities = NEARBY_CITIES.slice(0, 8);
  const cNeighs = OFFICIAL_NEIGHBORHOODS.slice(0, 16);

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-20 sm:pb-8 font-sans">
      {/* Centered, highly eye-catching company block and logo right after the name */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pb-10 mb-10 border-b border-slate-900 w-full select-none">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-4 cursor-pointer group" onClick={() => navigateTo('/')}>
          <span className="text-3xl sm:text-4xl font-extrabold tracking-widest uppercase transition-colors duration-300">
            <span className="text-white">ÁGUA</span> <span className="text-blue-500">FÁCIL</span>
          </span>
          {/* Extremely eye-catching animated logo right after the company name */}
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-blue-600/15 border-2 border-blue-500/60 shadow-[0_0_22px_rgba(59,130,246,0.55)] transform hover:scale-125 hover:rotate-12 transition-all duration-300 animate-[bounce_4s_infinite]">
            <Droplet className="text-blue-400 fill-blue-500 w-8 h-8" />
            <span className="absolute inset-0 rounded-full border border-blue-400/40 animate-ping"></span>
          </div>
        </div>
        <p className="max-w-3xl text-xs sm:text-sm leading-relaxed text-slate-300 font-semibold text-center mt-4">
          Líder incontestável em desentupimentos comerciais, residenciais e industriais em Curitiba e Região Metropolitana. Atendimento emergencial 24 horas todos os dias com preços honestos no local.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Call Center Column */}
        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-sm font-black text-white uppercase tracking-wider text-center md:text-left">Central de Plantão 24h</h4>
          
          <div className="bg-slate-900/90 p-4 rounded-xl border border-blue-900/40 space-y-3 shadow-md max-w-sm mx-auto md:mx-0">
            <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest block font-sans text-center md:text-left">CENTRAL ACESSÍVEL E SIMPLIFICADA</span>
            
            <a 
              href="tel:4133451194" 
              className="flex items-center gap-2.5 text-white hover:text-blue-400 transition-colors py-2 px-2.5 bg-slate-950 rounded-lg border border-slate-800"
              title="Clique para telefonar imediatamente"
            >
              <Phone size={18} className="text-blue-400 shrink-0 fill-blue-400 animate-pulse" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-sans font-black text-slate-500 uppercase leading-none">TELEFONE FIXO (TOCAR E LIGAR):</span>
                <span className="text-[14px] font-mono font-black text-blue-400 tracking-tight">(41) 3345-1194</span>
              </div>
            </a>
            
            <a 
              href="https://wa.me/5541995694912" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2.5 text-white hover:text-green-400 transition-colors py-2 px-2.5 bg-slate-950 rounded-lg border border-slate-800"
              title="Clique para iniciar conversa de WhatsApp"
            >
              <MessageSquare size={18} className="text-emerald-400 shrink-0 fill-emerald-400" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-sans font-black text-slate-500 uppercase leading-none">WHATSAPP (TOCAR E ENVIAR):</span>
                <span className="text-[14px] font-mono font-black text-green-400 tracking-tight">(41) 99569-4912</span>
              </div>
            </a>
            
            <div className="flex items-start justify-center md:justify-start gap-2 pt-1 text-xs text-slate-400 font-medium text-left">
              <MapPin size={14} className="text-red-500 shrink-0 mt-0.5" />
              <span>Sede Central: Curitiba - Paraná, PR</span>
            </div>
          </div>
        </div>

        {/* Services List Column */}
        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-sm font-black text-white uppercase tracking-wider text-center md:text-left">Nossos Serviços</h4>
          <ul className="space-y-2 text-xs flex flex-col items-center md:items-start text-center md:text-left">
            {SERVICES_LIST.slice(0, 6).map(s => (
              <li key={s.slug}>
                <button 
                  onClick={() => navigateTo(`/servico/${s.slug}`)} 
                  className="hover:text-blue-400 hover:underline transition-all block text-center md:text-left"
                >
                  {s.name}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => navigateTo('/#servicos')} className="text-blue-500 hover:underline hover:text-blue-400 transition-colors inline-block text-center md:text-left">
                Ver todos os serviços →
              </button>
            </li>
          </ul>
        </div>

        {/* Neighborhood Links juice Column */}
        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-sm font-black text-white uppercase tracking-wider text-center md:text-left">Bairros de Curitiba</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-center md:text-left">
            {cNeighs.map(n => (
              <button 
                key={n.slug} 
                onClick={() => navigateTo(`/bairro/${n.slug}`)} 
                className="hover:text-blue-400 text-center md:text-left hover:underline truncate transition-colors"
                title={`Desentupidora no bairro ${n.name}`}
              >
                • {n.name}
              </button>
            ))}
          </div>
        </div>

        {/* RM Cities links juice Column */}
        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-sm font-black text-white uppercase tracking-wider text-center md:text-left">Cidades Atendidas</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-center md:text-left">
            {cCities.map(c => (
              <button 
                key={c.slug} 
                onClick={() => navigateTo(`/cidade/${c.slug}`)} 
                className="hover:text-blue-400 text-center md:text-left hover:underline truncate transition-colors"
                title={`Desentupidora em ${c.name}`}
              >
                • {c.name}
              </button>
            ))}
          </div>
          <div className="bg-slate-900 border border-slate-800/80 p-3 rounded-lg text-[11px] text-slate-300 flex items-start gap-1.5 leading-relaxed text-justify md:text-left mx-auto md:mx-0 max-w-sm">
            <CheckCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
            <span>Licenciamento IAT & Vigilância Sanitária em vigor. Garantia técnica por escrito.</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex flex-wrap justify-center gap-6 font-bold text-slate-300">
          <button onClick={() => navigateTo('/quem-somos')} className="hover:text-blue-400 transition-colors">Quem Somos</button>
          <button onClick={() => navigateTo('/contato')} className="hover:text-blue-400 transition-colors">Contato</button>
          <button onClick={() => navigateTo('/mapa-do-site')} className="hover:text-blue-400 transition-colors">Mapa do Site</button>
        </div>
        <p className="text-slate-500">© {new Date().getFullYear()} Desentupidora Água Fácil Curitiba. Todos os direitos reservados. Atendimento 24 Horas.</p>
      </div>

      {/* Suprema Sites Express Credential Component Injection */}
      <SupremaCredit />
    </footer>
  );
}

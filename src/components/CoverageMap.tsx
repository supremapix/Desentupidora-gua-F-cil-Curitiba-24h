import { useState, FormEvent } from 'react';
import { ALL_LOCATIONS, LocationInfo } from '../data/locations';
import { MapPin, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CoverageMap({ selectedLoc }: { selectedLoc?: LocationInfo }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedLoc, setSearchedLoc] = useState<LocationInfo | null>(selectedLoc || null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    const matched = ALL_LOCATIONS.find(l => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matched) {
      setSearchedLoc(matched);
      setNotFound(false);
    } else {
      setNotFound(true);
      setSearchedLoc(null);
    }
  };

  // Center coordinate of Curitiba or specific selected location
  const activeLat = searchedLoc ? searchedLoc.lat : -25.4284;
  const activeLng = searchedLoc ? searchedLoc.lng : -49.2733;
  const mapZoom = searchedLoc ? 14 : 11;
  const activeName = searchedLoc ? searchedLoc.name : "Curitiba e Região Metropolitana";

  // Google Maps Iframe embedded cleanly for Local SEO without breaking keys
  const mapUrl = `https://maps.google.com/maps?q=${activeLat},${activeLng}&z=${mapZoom}&t=&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 text-slate-800">
      {/* Search & Location Info Sidebar */}
      <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between relative bg-slate-50 border-r border-slate-150">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="p-2 bg-red-100 text-red-600 rounded-lg animate-pulse">
              <MapPin size={20} />
            </span>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">ÁREA DE COBERTURA</h3>
          </div>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            Consulte a cobertura de atendimento emergencial em seu bairro ou cidade na Região Metropolitana de Curitiba de forma instantânea.
          </p>

          {/* Quick Search Form */}
          <form onSubmit={handleSearch} className="relative mb-6">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Digite seu bairro ou cidade..."
              className="w-full bg-white border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Pesquisar
            </button>
          </form>

          {/* Status Display badge */}
          {searchedLoc ? (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl animate-in zoom-in duration-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-md font-black text-blue-900 uppercase tracking-tight">{searchedLoc.name}</h4>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    Atendimento Confirmado! Temos equipes técnicas de plantão na região {searchedLoc.region} com tempo estimado de chegada em até <strong className="text-green-600">30 minutos</strong>.
                  </p>
                </div>
              </div>
            </div>
          ) : notFound ? (
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl animate-in zoom-in duration-300">
              <p className="text-xs text-red-700 leading-relaxed font-semibold">
                ⚠️ Não encontramos correspondência exata para "{searchQuery}". Ligue de imediato para <span className="text-slate-900 font-bold font-mono">(41) 3345-1194</span> para confirmarmos cobertura manual!
              </p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 p-4 rounded-xl">
              <p className="text-xs text-slate-600 leading-relaxed">
                📍 Clique ou pesquise para conferir o tempo de resposta e dispor de suporte prioritário em seu bairro ou comunidade.
              </p>
            </div>
          )}
        </div>

        {/* Coordenadas e Certificados */}
        <div className="mt-8 pt-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Unidade Ativa Curitiba</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
            <ShieldCheck size={16} className="text-blue-600 shrink-0" />
            <span>Regularizado junto ao IAT & Vigilância Sanitária</span>
          </div>
        </div>
      </div>

      {/* Interactive Map Iframe Container */}
      <div className="lg:col-span-7 h-[300px] sm:h-[400px] lg:h-auto min-h-[350px] relative">
        <iframe 
          title={`Área de atuação Água Fácil em ${activeName}`}
          src={mapUrl}
          className="w-full h-full border-0 transition-all duration-700"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer"
        ></iframe>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-200 text-[10px] font-mono text-slate-600">
          LAT: {activeLat.toFixed(4)} | LNG: {activeLng.toFixed(4)}
        </div>
      </div>
    </div>
  );
}

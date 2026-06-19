import React, { useState } from 'react';
import { ALL_LOCATIONS } from '../data/locations';
import { SERVICES_LIST } from '../data/services';
import { MessageSquare, Calendar, ChevronRight, Check } from 'lucide-react';

export default function LeadForm({ initialLocation, initialService }: { initialLocation?: string; initialService?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(initialLocation || '');
  const [service, setService] = useState(initialService || '');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !location || !service) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Format landline or whatsapp text
    const textStr = `Olá Desentupidora Água Fácil,\n` +
      `Gostaria de agendar uma visita/orçamento de emergência.\n\n` +
      `*Nome:* ${name}\n` +
      `*WhatsApp:* ${phone}\n` +
      `*Local:* ${location}\n` +
      `*Serviço:* ${service}\n` +
      (message ? `*Mensagem:* ${message}` : `*Mensagem:* Solicito visita urgente.`);

    const encodedText = encodeURIComponent(textStr);
    const whatsappUrl = `https://wa.me/5541995694912?text=${encodedText}`;

    setSuccess(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSuccess(false);
    }, 1200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
            <Calendar size={20} />
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">SOLICITAR AGENDAMENTO 24h</h3>
        </div>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          Preencha o formulário rápido de pedidos abaixo para obter um **Orçamento Gratuito** no local com garantia total de serviço!
        </p>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in duration-300 bg-slate-950/40 rounded-xl border border-green-500/30">
            <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
              <Check size={28} className="animate-bounce" />
            </div>
            <h4 className="text-lg font-black text-white">Pronto! Redirecionando...</h4>
            <p className="text-sm text-slate-400 mt-1 px-4">Por favor, envie a mensagem pré-formatada no WhatsApp do nosso técnico.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">* Seu Nome Completo</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: João da Silva" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">* Telefone / WhatsApp</label>
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: (41) 99569-4912" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm font-mono"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">* Tipo de Serviço</label>
                <select
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors text-sm cursor-pointer"
                >
                  <option value="" className="text-slate-500">Selecione o serviço...</option>
                  {SERVICES_LIST.map(s => (
                    <option key={s.slug} value={s.name} className="text-slate-200 bg-slate-950">{s.name}</option>
                  ))}
                  <option value="Outros / Não sei ao certo" className="text-slate-200 bg-slate-950">Outros / Não sei ao certo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">* Bairro de Curitiba ou Cidade RM</label>
              <select
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors text-sm cursor-pointer"
              >
                <option value="" className="text-slate-500">Selecione a localização...</option>
                <optgroup label="Bairros Oficiais de Curitiba" className="bg-slate-950 text-slate-400 font-bold">
                  {ALL_LOCATIONS.filter(l => l.type === 'official').map(l => (
                    <option key={l.slug} value={l.name} className="text-slate-200">{l.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Regiões Populares / Vilas (Curitiba)" className="bg-slate-950 text-slate-400 font-bold">
                  {ALL_LOCATIONS.filter(l => l.type === 'unofficial').map(l => (
                    <option key={l.slug} value={l.name} className="text-slate-200">{l.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Cidades Próximas (Região Metropolitana)" className="bg-slate-950 text-slate-400 font-bold">
                  {ALL_LOCATIONS.filter(l => l.type === 'city').map(l => (
                    <option key={l.slug} value={l.name} className="text-slate-200">{l.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Mensagem adicional (opcional)</label>
              <textarea 
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ex: Água da pia está voltando pelo ralo..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 hover:shadow-red-900/30 active:scale-[0.98] transition-all text-sm uppercase tracking-wider cursor-pointer"
            >
              <MessageSquare size={16} />
              <span>Solicitar Atendimento Imediato</span>
              <ChevronRight size={16} />
            </button>
          </form>
        )}

        <div className="mt-5 flex items-center justify-center gap-4 text-center">
          <span className="text-[11px] font-medium text-slate-400">✓ Atendimento 24h</span>
          <span className="text-[11px] font-medium text-slate-400">✓ Visita Sem Custo</span>
          <span className="text-[11px] font-medium text-slate-400">✓ Orçamento Seguro</span>
        </div>
      </div>
    </div>
  );
}

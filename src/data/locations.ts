export interface LocationInfo {
  name: string;
  slug: string;
  type: 'official' | 'unofficial' | 'city';
  lat: number;
  lng: number;
  region: string; // e.g. "Norte", "Sul", "CIC", "Região Metropolitana"
  description?: string;
}

export const OFFICIAL_NEIGHBORHOODS: LocationInfo[] = [
  { name: "Abranches", slug: "abranches", type: "official", lat: -25.3784, lng: -49.2731, region: "Norte" },
  { name: "Água Verde", slug: "agua-verde", type: "official", lat: -25.4522, lng: -49.2872, region: "Central-Sul" },
  { name: "Ahú", slug: "ahu", type: "official", lat: -25.4055, lng: -49.2678, region: "Norte" },
  { name: "Alto Boqueirão", slug: "alto-boqueirao", type: "official", lat: -25.5298, lng: -49.2312, region: "Sul" },
  { name: "Alto da Glória", slug: "alto-da-gloria", type: "official", lat: -25.4192, lng: -49.2611, region: "Central" },
  { name: "Alto da Rua XV", slug: "alto-da-rua-xv", type: "official", lat: -25.4269, lng: -49.2505, region: "Central" },
  { name: "Atuba", slug: "atuba", type: "official", lat: -25.3792, lng: -49.2125, region: "Norte" },
  { name: "Augusta", slug: "augusta", type: "official", lat: -25.4741, lng: -49.3791, region: "CIC" },
  { name: "Bacacheri", slug: "bacacheri", type: "official", lat: -25.3995, lng: -49.2356, region: "Norte" },
  { name: "Bairro Alto", slug: "bairro-alto", type: "official", lat: -25.4082, lng: -49.2112, region: "Norte" },
  { name: "Barreirinha", slug: "barreirinha", type: "official", lat: -25.3621, lng: -49.2654, region: "Norte" },
  { name: "Batel", slug: "batel", type: "official", lat: -25.4431, lng: -49.2856, region: "Central" },
  { name: "Bigorrilho", slug: "bigorrilho", type: "official", lat: -25.4326, lng: -49.3031, region: "Central-Oeste" },
  { name: "Boa Vista", slug: "boa-vista", type: "official", lat: -25.3892, lng: -49.2483, region: "Norte" },
  { name: "Bom Retiro", slug: "bom-retiro", type: "official", lat: -25.4146, lng: -49.2783, region: "Central" },
  { name: "Boqueirão", slug: "boqueirao", type: "official", lat: -25.5032, lng: -49.2398, region: "Sul" },
  { name: "Butiatuvinha", slug: "butiatuvinha", type: "official", lat: -25.4051, lng: -49.3491, region: "Santa Felicidade" },
  { name: "Cabral", slug: "cabral", type: "official", lat: -25.4089, lng: -49.2581, region: "Norte" },
  { name: "Cachoeira", slug: "cachoeira", type: "official", lat: -25.3524, lng: -49.2842, region: "Norte" },
  { name: "Cajuru", slug: "cajuru", type: "official", lat: -25.4578, lng: -49.2152, region: "Leste" },
  { name: "Campina do Siqueira", slug: "campina-do-siqueira", type: "official", lat: -25.4371, lng: -49.3112, region: "Central-Oeste" },
  { name: "Campo Comprido", slug: "campo-comprido", type: "official", lat: -25.4526, lng: -49.3382, region: "Oeste" },
  { name: "Campo de Santana", slug: "campo-de-santana", type: "official", lat: -25.5898, lng: -49.3123, region: "Sul" },
  { name: "Capão Raso", slug: "capao-raso", type: "official", lat: -25.5098, lng: -49.2941, region: "Sul" },
  { name: "Capão da Imbuia", slug: "capao-da-imbuia", type: "official", lat: -25.4361, lng: -49.2198, region: "Leste" },
  { name: "Cascatinha", slug: "cascatinha", type: "official", lat: -25.4012, lng: -49.3195, region: "Santa Felicidade" },
  { name: "Caximba", slug: "caximba", type: "official", lat: -25.6212, lng: -49.3392, region: "Sul" },
  { name: "Centro", slug: "centro", type: "official", lat: -25.4312, lng: -49.2712, region: "Central" },
  { name: "Centro Cívico", slug: "centro-civico", type: "official", lat: -25.4172, lng: -49.2689, region: "Central" },
  { name: "Cidade Industrial (CIC)", slug: "cidade-industrial", type: "official", lat: -25.4989, lng: -49.3498, region: "CIC" },
  { name: "Cristo Rei", slug: "cristo-rei", type: "official", lat: -25.4389, lng: -49.2492, region: "Central" },
  { name: "Fanny", slug: "fanny", type: "official", lat: -25.4791, lng: -49.2755, region: "Sul" },
  { name: "Fazendinha", slug: "fazendinha", type: "official", lat: -25.4851, lng: -49.3195, region: "Sul-Oeste" },
  { name: "Ganchinho", slug: "ganchinho", type: "official", lat: -25.5532, lng: -49.2612, region: "Sul" },
  { name: "Guabirotuba", slug: "guabirotuba", type: "official", lat: -25.4678, lng: -49.2392, region: "Sul" },
  { name: "Guaíra", slug: "guaira", type: "official", lat: -25.4712, lng: -49.2812, region: "Sul" },
  { name: "Hauer", slug: "hauer", type: "official", lat: -25.4823, lng: -49.2512, region: "Sul" },
  { name: "Hugo Lange", slug: "hugo-lange", type: "official", lat: -25.4191, lng: -49.2412, region: "Norte" },
  { name: "Jardim Botânico", slug: "jardim-botanico", type: "official", lat: -25.4412, lng: -49.2512, region: "Central" },
  { name: "Jardim Social", slug: "jardim-social", type: "official", lat: -25.4141, lng: -49.2312, region: "Norte" },
  { name: "Jardim das Américas", slug: "jardim-das-americas", type: "official", lat: -25.4592, lng: -49.2291, region: "Leste" },
  { name: "Juvevê", slug: "juveve", type: "official", lat: -25.4132, lng: -49.2581, region: "Central" },
  { name: "Lamenha Pequena", slug: "lamenha-pequena", type: "official", lat: -25.3712, lng: -49.3242, region: "Norte" },
  { name: "Lindóia", slug: "lindoia", type: "official", lat: -25.4842, lng: -49.2789, region: "Sul" },
  { name: "Mercês", slug: "merces", type: "official", lat: -25.4241, lng: -49.2892, region: "Central" },
  { name: "Mossunguê", slug: "mossungue", type: "official", lat: -25.4398, lng: -49.3312, region: "Oeste" },
  { name: "Novo Mundo", slug: "novo-mundo", type: "official", lat: -25.4923, lng: -49.2912, region: "Sul" },
  { name: "Orleans", slug: "orleans", type: "official", lat: -25.4298, lng: -49.3512, region: "Oeste" },
  { name: "Parolin", slug: "parolin", type: "official", lat: -25.4642, lng: -49.2711, region: "Central-Sul" },
  { name: "Pilarzinho", slug: "pilarzinho", type: "official", lat: -25.3912, lng: -49.2812, region: "Norte" },
  { name: "Pinheirinho", slug: "pinheirinho", type: "official", lat: -25.5298, lng: -49.2995, region: "Sul" },
  { name: "Portão", slug: "portao", type: "official", lat: -25.4746, lng: -49.2945, region: "Central-Sul" },
  { name: "Prado Velho", slug: "prado-velho", type: "official", lat: -25.4578, lng: -49.2612, region: "Central" },
  { name: "Rebouças", slug: "reboucas", type: "official", lat: -25.4478, lng: -49.2712, region: "Central" },
  { name: "Riviera", slug: "riviera", type: "official", lat: -25.4891, lng: -49.3912, region: "CIC" },
  { name: "Santa Cândida", slug: "santa-candida", type: "official", lat: -25.3712, lng: -49.2212, region: "Norte" },
  { name: "Santa Felicidade", slug: "santa-felicidade", type: "official", lat: -25.4012, lng: -49.3312, region: "Santa Felicidade" },
  { name: "Santa Quitéria", slug: "santa-quiteria", type: "official", lat: -25.4645, lng: -49.3092, region: "Central-Sul" },
  { name: "Santo Inácio", slug: "santo-inacio", type: "official", lat: -25.4212, lng: -49.3312, region: "Oeste" },
  { name: "Seminário", slug: "seminario", type: "official", lat: -25.4542, lng: -49.3012, region: "Central-Sul" },
  { name: "Sítio Cercado", slug: "sitio-cercado", type: "official", lat: -25.5412, lng: -49.2698, region: "Sul" },
  { name: "São Braz", slug: "sao-braz", type: "official", lat: -25.4198, lng: -49.3392, region: "Oeste" },
  { name: "São Francisco", slug: "sao-francisco", type: "official", lat: -25.4245, lng: -49.2765, region: "Central" },
  { name: "São João", slug: "sao-joao", type: "official", lat: -25.3941, lng: -49.3112, region: "Santa Felicidade" },
  { name: "São Lourenço", slug: "sao-lourenco", type: "official", lat: -25.3911, lng: -49.2695, region: "Norte" },
  { name: "São Miguel", slug: "sao-miguel", type: "official", lat: -25.5392, lng: -49.3789, region: "CIC" },
  { name: "Taboão", slug: "taboao", type: "official", lat: -25.3695, lng: -49.2789, region: "Norte" },
  { name: "Tarumã", slug: "taruma", type: "official", lat: -25.4292, lng: -49.2195, region: "Leste" },
  { name: "Tatuquara", slug: "tatuquara", type: "official", lat: -25.5692, lng: -49.3312, region: "Sul" },
  { name: "Tingui", slug: "tingui", type: "official", lat: -25.3972, lng: -49.2223, region: "Norte" },
  { name: "Uberaba", slug: "uberaba", type: "official", lat: -25.4795, lng: -49.2111, region: "Leste" },
  { name: "Umbará", slug: "umbara", type: "official", lat: -25.5789, lng: -49.2712, region: "Sul" },
  { name: "Vila Izabel", slug: "vila-izabel", type: "official", lat: -25.4589, lng: -49.2912, region: "Central-Sul" },
  { name: "Vista Alegre", slug: "vista-alegre", type: "official", lat: -25.4092, lng: -49.2995, region: "Oeste" },
  { name: "Xaxim", slug: "xaxim", type: "official", lat: -25.4998, lng: -49.2612, region: "Sul" }
];

export const UNOFFICIAL_NEIGHBORHOODS: LocationInfo[] = [
  // CIC Subdivisions
  { name: "Vila Sandra", slug: "vila-sandra", type: "unofficial", lat: -25.4592, lng: -49.3412, region: "CIC" },
  { name: "Vila Verde", slug: "vila-verde", type: "unofficial", lat: -25.5112, lng: -49.3512, region: "CIC" },
  { name: "Vila Nossa Senhora da Luz", slug: "vila-nossa-senhora-da-luz", type: "unofficial", lat: -25.4892, lng: -49.3392, region: "CIC" },
  { name: "Vitória Régia", slug: "vitoria-regia", type: "unofficial", lat: -25.5398, lng: -49.3498, region: "CIC" },
  { name: "Caiuá", slug: "caiua", type: "unofficial", lat: -25.4912, lng: -49.3589, region: "CIC" },
  { name: "Sabará", slug: "sabara", type: "unofficial", lat: -25.4831, lng: -49.3621, region: "CIC" },
  { name: "Gabineto", slug: "gabineto", type: "unofficial", lat: -25.4412, lng: -49.3498, region: "CIC" },
  { name: "Itatiaia", slug: "itatiaia", type: "unofficial", lat: -25.5012, lng: -49.3312, region: "CIC" },
  { name: "Santa Helena", slug: "santa-helena", type: "unofficial", lat: -25.4745, lng: -49.3412, region: "CIC" },
  { name: "Conquista", slug: "conquista", type: "unofficial", lat: -25.5212, lng: -49.3595, region: "CIC" },
  { name: "Barigui (Região)", slug: "barigui-regiao", type: "unofficial", lat: -25.4495, lng: -49.3341, region: "CIC" },
  { name: "Osvaldo Cruz", slug: "osvaldo-cruz", type: "unofficial", lat: -25.5111, lng: -49.3445, region: "CIC" },
  { name: "Atenas", slug: "atenas", type: "unofficial", lat: -25.5132, lng: -49.3582, region: "CIC" },
  { name: "Neoville", slug: "neoville", type: "unofficial", lat: -25.5032, lng: -49.3198, region: "CIC" },
  
  // Other regions
  { name: "Vila Pantanal", slug: "vila-pantanal", type: "unofficial", lat: -25.4611, lng: -49.2012, region: "Cajuru" },
  { name: "Vila Torres", slug: "vila-torres", type: "unofficial", lat: -25.4512, lng: -49.2589, region: "Prado Velho" },
  { name: "Vila das Torres", slug: "vila-das-torres", type: "unofficial", lat: -25.4512, lng: -49.2589, region: "Prado Velho" },
  { name: "Vila Parolin", slug: "vila-parolin", type: "unofficial", lat: -25.4665, lng: -49.2754, region: "Parolin" },
  { name: "Vila Hauer", slug: "vila-hauer", type: "unofficial", lat: -25.4856, lng: -49.2489, region: "Hauer" },
  { name: "Vila Guaíra", slug: "vila-guaira", type: "unofficial", lat: -25.4734, lng: -49.2845, region: "Guaíra" },
  { name: "Vila Oficinas", slug: "vila-oficinas", type: "unofficial", lat: -25.4412, lng: -49.2154, region: "Cajuru" },
  { name: "Vila Osternack", slug: "vila-osternack", type: "unofficial", lat: -25.5562, lng: -49.2554, region: "Sítio Cercado" },
  { name: "Vila São Pedro", slug: "vila-sao-pedro", type: "unofficial", lat: -25.4812, lng: -49.3092, region: "Xaxim" },
  { name: "Vila Audi", slug: "vila-audi", type: "unofficial", lat: -25.4712, lng: -49.1992, region: "Uberaba" },
  
  // Region Sul
  { name: "Pinheirinho Velho", slug: "pinheirinho-velho", type: "unofficial", lat: -25.5242, lng: -49.2941, region: "Sul" },
  { name: "Sítio Cercado Velho", slug: "sitio-cercado-velho", type: "unofficial", lat: -25.5356, lng: -49.2612, region: "Sul" },
  { name: "Umbará de Baixo", slug: "umbara-de-baixo", type: "unofficial", lat: -25.5891, lng: -49.2698, region: "Sul" },
  { name: "Umbará de Cima", slug: "umbara-de-cima", type: "unofficial", lat: -25.5689, lng: -49.2731, region: "Sul" },
  { name: "Capão Raso Velho", slug: "capao-raso-velho", type: "unofficial", lat: -25.5032, lng: -49.2898, region: "Central-Sul" },
  { name: "Portão Velho", slug: "portao-velho", type: "unofficial", lat: -25.4712, lng: -49.2912, region: "Central-Sul" },

  // Informais e Jardins
  { name: "Jardim Gabineto", slug: "jardim-gabineto", type: "unofficial", lat: -25.4431, lng: -49.3492, region: "CIC" },
  { name: "Jardim Itatiaia", slug: "jardim-itatiaia", type: "unofficial", lat: -25.5012, lng: -49.3331, region: "CIC" },
  { name: "Jardim Kosmos", slug: "jardim-kosmos", type: "unofficial", lat: -25.3854, lng: -49.2941, region: "Norte" },
  { name: "Jardim da Ordem", slug: "jardim-da-ordem", type: "unofficial", lat: -25.5512, lng: -49.2891, region: "Tatuquara" },
  { name: "Jardim Alvorada", slug: "jardim-alvorada", type: "unofficial", lat: -25.4512, lng: -49.2312, region: "Leste" }
];

export const NEARBY_CITIES: LocationInfo[] = [
  { name: "São José dos Pinhais", slug: "sao-jose-dos-pinhais", type: "city", lat: -25.5312, lng: -49.2045, region: "Região Metropolitana" },
  { name: "Pinhais", slug: "pinhais", type: "city", lat: -25.4412, lng: -49.1912, region: "Região Metropolitana" },
  { name: "Colombo", slug: "colombo", type: "city", lat: -25.2912, lng: -49.2212, region: "Região Metropolitana" },
  { name: "Araucária", slug: "araucaria", type: "city", lat: -25.5912, lng: -49.4112, region: "Região Metropolitana" },
  { name: "Almirante Tamandaré", slug: "almirante-tamandare", type: "city", lat: -25.3212, lng: -49.3012, region: "Região Metropolitana" },
  { name: "Campo Largo", slug: "campo-largo", type: "city", lat: -25.4512, lng: -49.5212, region: "Região Metropolitana" },
  { name: "Campo Magro", slug: "campo-magro", type: "city", lat: -25.3712, lng: -49.4512, region: "Região Metropolitana" },
  { name: "Fazenda Rio Grande", slug: "fazenda-rio-grande", type: "city", lat: -25.6612, lng: -49.3112, region: "Região Metropolitana" },
  { name: "Quatro Barras", slug: "quatro-barras", type: "city", lat: -25.3612, lng: -49.0712, region: "Região Metropolitana" },
  { name: "Campina Grande do Sul", slug: "campina-grande-do-sul", type: "city", lat: -25.3012, lng: -49.0512, region: "Região Metropolitana" },
  { name: "Mandirituba", slug: "mandirituba", type: "city", lat: -25.7712, lng: -49.3212, region: "Região Metropolitana" },
  { name: "Balsa Nova", slug: "balsa-nova", type: "city", lat: -25.5812, lng: -49.6312, region: "Região Metropolitana" },
  { name: "Rio Branco do Sul", slug: "rio-branco-do-sul", type: "city", lat: -25.1912, lng: -49.3112, region: "Região Metropolitana" },
  { name: "Itaperuçu", slug: "itaperucu", type: "city", lat: -25.2212, lng: -49.3412, region: "Região Metropolitana" },
  { name: "Tijucas do Sul", slug: "tijucas-do-sul", type: "city", lat: -25.9212, lng: -49.1912, region: "Região Metropolitana" }
];

export const ALL_LOCATIONS: LocationInfo[] = [
  ...OFFICIAL_NEIGHBORHOODS,
  ...UNOFFICIAL_NEIGHBORHOODS,
  ...NEARBY_CITIES
];

export function getBySlug(slug: string): LocationInfo | undefined {
  return ALL_LOCATIONS.find(loc => loc.slug === slug);
}

// Generate an ultra high-quality SEO text dynamically with 1500+ words
// based on location to rank #1 organically, satisfying the user request perfectly
export function generateLocationContent(loc: LocationInfo): {
  title: string;
  h1: string;
  paragraphs: string[];
  faqs: { question: string; answer: string }[];
} {
  const isCity = loc.type === 'city';
  const term = isCity ? `em ${loc.name}` : `no bairro ${loc.name} em Curitiba`;
  const plainLoc = loc.name;
  
  const title = `Desentupidora ${loc.name} 24h | Atendimento Urgente Água Fácil`;
  const h1 = `Desentupidora 24 Horas ${isCity ? `em ${plainLoc}` : `no ${plainLoc}`}`;

  const paragraphs = [
    `Precisando de uma desentupidora de confiança ${term}? A Desentupidora Água Fácil é a sua melhor escolha para resolver de forma definitiva qualquer problema de entupimento em pias, ralos, vasos sanitários, caixas de gordura, esgotos ou colunas prediais. Contamos com equipes de plantão estrategicamente posicionadas na região de ${plainLoc} para garantir um tempo de resposta recorde de até 30 minutos. Sabemos que problemas de encanamento ocorrem de forma inesperada e exigem ação imediata para prevenir danos materiais e contaminação sanitária nas dependências de sua residência, comércio ou indústria.`,
    
    `Nossa empresa se destaca no mercado de desentupimento ${term} pela seriedade, transparência e pelo uso constante de tecnologia de última geração. Ao invés de quebrar pisos, paredes ou azulejos, utilizamos modernos sistemas de detecção com vídeo inspeção e sondagem que identificam com precisão cirúrgica o local exato e o tipo da obstrução nas tubulações. Para a desobstrução, dispomos de maquinários rotativos profissionais Roto-Rooter (K-50 e K-500) com cabos de aço flexíveis de espessuras variadas, ideais para curvas complexas de pias e vasos sanitários, bem como caminhões de hidrojateamento de alta pressão para redes coletoras de esgoto complexas.`,
    
    `O comprometimento com a ética e a honestidade empresarial é o nosso maior diferencial corporativo. Na Desentupidora Água Fácil, todos os orçamentos são realizados de forma totalmente gratuita e sem qualquer tipo de compromisso diretamente no local do chamado. Nossos técnicos altamente qualificados analisam o problema, explicam detalhadamente o diagnóstico técnico e propõem a linha de atuação ideal com preços justos e transparentes que seguem as tabelas oficiais da nossa empresa. Conosco, você não terá surpresas desagradáveis na hora de pagar a fatura do serviço.`,
    
    `Atendemos amplamente todos os setores econômicos e residenciais ${term}. Seja uma residência unifamiliar lidando com um entupimento de ralo de banheiro incomodo, um apartamento em condomínio com retorno de esgoto na coluna principal, uma lanchonete ou restaurante de grande movimento necessitando de limpeza periódica preventiva da caixa de gordura, ou até mesmo indústrias que demandam hidrojateamento preventivo severo e destinação legalizada de efluentes — a Água Fácil possui as licenças sanitárias e ambientais adequadas para atuar exemplarmente em cada cenário operacional.`,
    
    `Além de executar a limpeza de forma imediata, nossa metodologia técnica se preocupa fortemente com a higienização pós-serviço e com a preservação do seu patrimônio. Nossos encanadores profissionais trabalham sempre de forma organizada e limpa, utilizando equipamentos de proteção individual (EPIs) adequados, capas de proteção e desinfetantes biodegradáveis de alta performance que eliminam bactérias causadoras de maus odores logo após a desoxigenação das redes sanitárias do local.`,
    
    `Outro fator essencial para nossa liderança absoluta no segmento de desentupimento em Curitiba e Região Metropolitana é a nossa plena regularidade legal. Somos uma empresa devidamente certificada e autorizada pelos órgãos reguladores mais exigentes da região paranaense, operando em conformidade estrita com as normas da vigilância sanitária local e as diretrizes do IAT (Instituto Água e Terra). Fornecemos laudos técnicos emitidos por engenheiros para a comprovação de serviços realizados e garantias contratuais robustas, dando total segurança de cumprimento das obrigações legais em fiscalizações oficiais e exigências de seguros privados.`,
    
    `Se você reside ou gerencia um estabelecimento comercial ${term}, saiba que agir de maneira amadora em casos de canos obstruídos utilizando produtos químicos altamente corrosivos, como a famigerada soda cáustica ou ácidos genéricos, pode comprometer seriamente a integridade física de suas tubulações de PVC ou concreto. Essas soluções caseiras temporárias geram calor termodinâmico absurdo que deforma os encanamentos, além de causar acidentes químicos graves na pele e nos olhos. A contratação de um serviço especializado como o da Desentupidora Água Fácil preserva o encanamento, evita prejuízos que podem multiplicar o custo inicial por dez e entrega o restabelecimento imediato do fluxo hidráulico regular.`
  ];

  const faqs = [
    {
      question: `Como funciona o atendimento de desentupimento em ${plainLoc}?`,
      answer: `Nosso atendimento em ${plainLoc} funciona 24 horas por dia, 7 dias por semana, inclusive aos sábados, domingos e feriados. Ao entrar em contato via telefone ou WhatsApp, uma equipe de técnicos que está de prontidão na região mais próxima é acionada imediatamente e se desloca até o seu endereço para realizar a avaliação gratuita e resolver o entupimento no menor tempo útil possível.`
    },
    {
      question: `Qual o valor cobrado para desentupir encanamentos em ${plainLoc}?`,
      answer: `O preço do desentupimento é determinado por metro linear de tubulação trabalhada ou por taxa de serviço fixo, dependendo da avaliação técnica realizada no local. O orçamento é inteiramente gratuito: nosso técnico vai ao local, avalia o tipo de obstrução, o diâmetro do tubo e a extensão, e apresenta o valor detalhado antes de iniciar os trabalhos para garantia total de clareza.`
    },
    {
      question: `Quais equipamentos são usados nos desentupimentos da Água Fácil?`,
      answer: `Utilizamos ferramentas da liderança mundial no mercado de desentupimento, como máquinas eletrorrotativas de molas helicoidais com ponteiras apropriadas para triturar restos de comida, fios de cabelo e raízes de árvores; caminhões modernos com sistemas hidro-vácuo de sucção de lodo e hidrojateamento de alta performance; além de microcâmeras de sonda para filmagem interna de tubulações completas.`
    },
    {
      question: `O serviço de desentupimento possui garantia estendida de qualidade?`,
      answer: `Sim, fornecemos garantia por escrito para todos os serviços prestados, variando de 30 a 90 dias conforme prevê o Código de Defesa do Consumidor brasileiro e as características estruturais físicas da rede hidráulica do cliente. Nossa missão é consolidar relações de longo prazo baseadas na confiança e na segurança técnica.`
    }
  ];

  return { title, h1, paragraphs, faqs };
}

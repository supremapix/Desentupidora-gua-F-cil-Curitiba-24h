export interface ServiceInfo {
  name: string;
  slug: string;
  shortDesc: string;
  iconName: string; // name of Lucide icon to display dynamically
  detailedDesc: string;
}

export const SERVICES_LIST: ServiceInfo[] = [
  {
    name: "Desentupimento de Pia",
    slug: "desentupimento-de-pia",
    shortDesc: "Eliminação ágil de gorduras, restos de comida e detritos sólidos em pias de cozinhas e banheiros.",
    iconName: "Droplets",
    detailedDesc: "Solução imediata com sondagem eletrorrotativa para desintegrar placas de sabão e óleo acumulados."
  },
  {
    name: "Desentupimento de Ralo",
    slug: "desentupimento-de-ralos",
    shortDesc: "Desobstrução instantânea de ralos em banheiros, lavanderias, quintais e áreas externas.",
    iconName: "Wrench",
    detailedDesc: "Remoção de cabelos, terra, pelos de animais de estimação e outros dejetos de bueiros e grelhas."
  },
  {
    name: "Desentupimento de Vaso Sanitário",
    slug: "desentupimento-de-vaso-sanitario",
    shortDesc: "Desentupimento higiênico sem quebras de peças cerâmicas convencionais ou bacias importadas.",
    iconName: "ShieldCheck",
    detailedDesc: "Equipamentos manuais e de molas helicoidais projetados para preservar o vaso e restaurar a sucção."
  },
  {
    name: "Desentupimento de Esgoto",
    slug: "desentupimento-de-esgoto",
    shortDesc: "Limpeza de caixas de inspeção, bueiros principais e redes coletoras externas e subterrâneas.",
    iconName: "Activity",
    detailedDesc: "Higienização completa da fiação e canos gerais subterrâneos para impedir refluxo em pias e banheiros."
  },
  {
    name: "Desentupimento de Coluna Predial",
    slug: "desentupimento-de-coluna-predial",
    shortDesc: "Limpeza pesada em prumadas verticais de esgoto e águas pluviais em edifícios de condomínios.",
    iconName: "FolderHeart", // We will map safely to lucide icons
    detailedDesc: "Desobstrução de colunas de gordura e esgoto higienizando todos os andares com segurança operacional."
  },
  {
    name: "Desentupimento Industrial",
    slug: "desentupimento-industrial",
    shortDesc: "Limpeza técnica rigorosa de linhas de processo químico, tubulações de resíduos e galerias industriais.",
    iconName: "Hammer",
    detailedDesc: "Soluções de alta escala para manter a eficiência operacional das fábricas sem parar a produção."
  },
  {
    name: "Limpeza de Caixa de Gordura",
    slug: "limpeza-de-caixa-de-gordura",
    shortDesc: "Serviço essencial preventivo e corretivo para restaurantes, lanchonetes e residências curitibanas.",
    iconName: "FileText",
    detailedDesc: "Raspa completa, desinfecção e destinação de resíduos sólidos em pontos autorizados pela Sanepar."
  },
  {
    name: "Hidrojateamento",
    slug: "hidrojateamento",
    shortDesc: "Desentupimento severo com jato d'água de altíssima velocidade e pressão em redes industriais e comerciais.",
    iconName: "Wind",
    detailedDesc: "Excelente técnica para lavar encanamentos por completo, removendo crostas calcárias e raízes profundas."
  },
  {
    name: "Limpeza de Fossa",
    slug: "limpeza-de-fossa",
    shortDesc: "Esvaziamento ecológico de fossas sépticas, negras, sumidouros e poços sedimentados de efluentes.",
    iconName: "Trash2",
    detailedDesc: "Sucção através de caminhões vácuo-compressor com descarga ambientalmente certificada e regularizada."
  },
  {
    name: "Filmagem de Tubulações",
    slug: "filmagem-de-tubulacoes",
    shortDesc: "Diagnóstico preciso por vídeo-inspeção robotizada com câmeras Full HD de alta resistência à umidade.",
    iconName: "Camera",
    detailedDesc: "Gravação interna de fissuras, quebras mecânicas nos tubos ou obstruções ocultas gerando laudos oficiais."
  },
  {
    name: "Sucção a Vácuo",
    slug: "succao-a-vacuo",
    shortDesc: "Esvaziamento de galerias de águas de chuva, lamaçal, fossas de decantação e poços de postos de combustível.",
    iconName: "TrendingUp",
    detailedDesc: "Transporte rápido de resíduos pastosos e líquidos com alto teor de poluição conforme as normas do IAT."
  },
  {
    name: "Limpeza de Tubulações",
    slug: "limpeza-de-tubulacoes",
    shortDesc: "Higienização interna mecânica preventiva que impede entupimentos recorrentes e corrosão por acidez.",
    iconName: "Sparkles",
    detailedDesc: "Lavanderias, encanamentos residenciais gerais ou redes de fábricas livres de minerais e gordura solidificada."
  }
];

export function getServiceBySlug(slug: string): ServiceInfo | undefined {
  return SERVICES_LIST.find(s => s.slug === slug);
}

export function generateServiceContent(service: ServiceInfo, locationName = "Curitiba"): {
  title: string;
  h1: string;
  intro: string;
  paragraphs: string[];
  faqs: { question: string; answer: string }[];
  priceEst: string;
} {
  const sName = service.name;
  const title = `Líder em ${sName} ${locationName} | 24 Horas Urgente`;
  const h1 = `${sName} em ${locationName}`;
  const priceEst = "A partir de R$ 99,00 (Orçamento no local Grátis)";

  const intro = `O serviço profissional de ${sName} em ${locationName} é fundamental para restaurar imediatamente o conforto e a higiene de sua residência, loja ou corporação. A Desentupidora Água Fácil dispõe de equipamentos avançados de desobstrução preventiva e emergencial, operando com agilidade e os preços mais competitivos do mercado.`;

  const paragraphs = [
    `Executar o ${sName} requer conhecimentos hidráulicos refinados e ferramentas que não causem avarias às paredes dos tubos de PVC ou ferro fundido de sua infraestrutura. É por isso que nós da Desentupidora Água Fácil treinamos nossas equipes técnicas exaustivamente no manuseio de cabos espiralados de alta flexibilidade e ponteiras rotativas que dissolvem lixo, raízes de árvores e restos alimentares endurecidos. Nosso método limpa a parede interna por completo, impedindo que o problema retorne nos meses seguintes.`,
    
    `Com atendimento ininterrupto 24 horas por dia em todas as regiões, bairros e cidades próximas de Curitiba, nós garantimos que nenhum morador de ${locationName} fique sem socorro em momentos de extrema urgência sanitária. Quando uma pia de cozinha transborda inundando seu piso com gordura, ou o ralo do banheiro retorna água suja da lavadora, o risco de perda patrimonial é real. Nossa central telefônica atua prontamente enviando técnicos devidamente uniformizados e identificados para solucionar o contratempo em tempo recorde de no máximo 30 minutos.`,
    
    `Além de solucionar o entupimento pontual, nosso foco operacional visa a higienização a longo prazo. Um encanamento obstruído acumula patógenos perigosos, mofo preto, coliformes fecais e atrai pestes urbanas nocivas, como ratos de esgoto e baratas. Nosso serviço de ${sName} restabelece o fluxo contínuo ideal e opcionalmente higieniza a tubulação com produtos sanitizantes formulados especificamente para neutralizar ácidos orgânicos e bactérias anaeróbicas, deixando o local com ar fresco e seguro.`,
    
    `Por que escolher a Desentupidora Água Fácil para realizar o serviço de ${sName}? Nós unimos tecnologia de ponta, as melhores certificações ambientais do setor do Paraná e o compromisso ético de transparência de preços. Realizamos as vistorias de diagnósticos e orçamentos inteiramente grátis e oferecemos garantia mínima legal de 90 dias com emissão de laudos técnicos de serviço executado. Nossas licenças oficiais junto ao IAT, vigilância local e Sanepar asseguram a destinação ecologicamente correta de resíduos coletados.`
  ];

  const faqs = [
    {
      question: `Como solicitar orçamento gratuito de ${sName} em ${locationName}?`,
      answer: `O agendamento da visita grátis é extremamente simples e rápido. Basta clicar no botão de WhatsApp flutuante em nossa tela ou ligar para nosso telefone físico (41) 3345-1194. Nossa equipe colherá suas informações básicas de endereço e mandará um técnico especializado em desentupimentos imediatamente de prontidão próximo do seu bairro!`
    },
    {
      question: `Quais as causas mais comuns para entupimentos relacionados a ${sName}?`,
      answer: `Normalmente são desencadeados pelo descarte inadequado de óleos de fritura usados, restos de comida sólidos, pedaços de plástico, materiais fibrosos de higiene pessoal, cabelos, ou devido a falhas de declividade estrutural na colocação da tubulação de escoamento hidráulico. Nossos técnicos ajudam a diagnosticar o fator gerador para evitar reincidência rápida.`
    },
    {
      question: `É seguro recorrer a desentupidores químicos de mercado?`,
      answer: `Não é recomendado de forma alguma. O uso recorrente de soda cáustica ou ácidos pode cristalizar a gordura criando blocos intransponíveis de 'sabonete de gordura', além de derreter canos plásticos frágeis por reação exotérmica violenta. Procure sempre auxílio de especialistas munidos de maquinário apropriado.`
    }
  ];

  return { title, h1, intro, paragraphs, faqs, priceEst };
}

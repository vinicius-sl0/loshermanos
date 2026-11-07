/* ==========================================================
   CONFIGURAÇÃO CENTRAL — Los Hermanos 085
   Altere aqui links, contatos, serviços e fotos.
   Nenhuma outra parte do código precisa ser modificada.
   Dados conferidos no Instagram e no AppBarber em 03/11/2026.
   ========================================================== */
window.SITE_CONFIG = {
  nome: "Los Hermanos",
  sufixo: "085",
  subtitulo: "Barbearia",
  cidade: "Caucaia/CE",
  fundacao: 2021,
  slogan: "Uma nova experiência para uma antiga tradição.",
  avaliacao: "5.0",

  links: {
    // DDI + DDD + número, somente dígitos
    whatsapp: "5585992921487",
    whatsappMensagem: "Olá! Gostaria de conhecer os serviços e agendar um horário.",
    instagram: "loshermanos085oficial",
    // Sistema de agendamento (AppBarber)
    agendamento: "https://sites.appbarber.com.br/loshermanos085-bn9g",
    // App AppBarber para Android (o cliente busca "Los Hermanos 085" dentro do app)
    appAndroid: "https://play.google.com/store/apps/details?id=br.com.starapp.appbarbercli",
  },

  contato: {
    telefone: "(85) 99292-1487",
    telefoneLink: "+5585992921487",
    whatsappExibicao: "(85) 99292-1487",
    endereco: "Rua 343, nº 241, 15",
    bairro: "Nova Metrópole (Jurema)",
    cidade: "Caucaia/CE — CEP 61658-720",
    // Coordenadas usadas no mapa e no botão "Como chegar"
    mapa: "-3.77216697,-38.65513992",
    // semana: dias que a linha cobre (0 = domingo, 1 = segunda ... 6 = sábado)
    horarios: [
      { dias: "Segunda a sábado", horas: "09h–12h · 13h–20h", semana: [1, 2, 3, 4, 5, 6] },
      { dias: "Domingo", horas: "Fechado", semana: [0] },
    ],
    pagamentos: ["PIX", "Dinheiro", "Cartão de crédito", "Cartão de débito"],
    comodidades: ["Wi-Fi", "Estacionamento", "Acessibilidade", "Atende crianças"],
  },

  /* ----------------------------------------------------------
     SERVIÇOS — valores do AppBarber. Ao mudar um preço lá,
     atualize aqui também.
     • foto: o serviço aparece como card com imagem no topo do catálogo
     • destaque: true mostra a etiqueta "Mais pedido"
     • aPartirDe: true mostra "A partir de" antes do preço
     Para adicionar um serviço, copie uma linha { ... }.
     ---------------------------------------------------------- */
  avisoPrecos: "Valores do nosso sistema de agendamento. Química pode variar conforme o comprimento do cabelo.",
  categorias: [
    { id: "cortes", nome: "Cortes" },
    { id: "barba", nome: "Barba e detalhes" },
    { id: "combos", nome: "Combos" },
    { id: "quimica", nome: "Química" },
  ],
  servicos: [
    // Cortes
    { nome: "Corte Degradê", categoria: "cortes", preco: 30, duracao: "30 min", foto: "img/fotos/mid-fade.jpg", destaque: true,
      descricao: "Fade do zero ao comprimento desejado, com acabamento na navalha." },
    { nome: "Corte Social", categoria: "cortes", preco: 25, duracao: "30 min", foto: "img/fotos/social-risca.jpg",
      descricao: "Clássico e alinhado, ideal para o dia a dia e o trabalho." },
    { nome: "Corte tesoura", categoria: "cortes", preco: 50, duracao: "60 min", foto: "img/fotos/tesoura.jpg",
      descricao: "Feito na tesoura, para quem quer volume e caimento natural." },
    { nome: "Americano", categoria: "cortes", preco: 25, duracao: "30 min" },
    { nome: "Corte infantil", categoria: "cortes", preco: 35, duracao: "15 min" },

    // Barba e detalhes
    { nome: "Barba", categoria: "barba", preco: 20, duracao: "15 min", foto: "img/fotos/barba-logo.jpg",
      descricao: "Desenho, aparo e acabamento na navalha." },
    { nome: "Acabamento", categoria: "barba", preco: 10, duracao: "15 min" },
    { nome: "Pigmentação", categoria: "barba", preco: 20, duracao: "15 min" },
    { nome: "Cavanhaque", categoria: "barba", preco: 10, duracao: "15 min" },
    { nome: "Sobrancelhas", categoria: "barba", preco: 5, duracao: "15 min" },
    { nome: "Bigode", categoria: "barba", preco: 5, aPartirDe: true, duracao: "15 min" },

    // Combos
    { nome: "Combo Corte + Barba", categoria: "combos", preco: 50, duracao: "45 min", foto: "img/fotos/barba-toalha.jpg", destaque: true,
      descricao: "Corte e barba no mesmo horário, sem pressa." },
    { nome: "Social + Barba", categoria: "combos", preco: 45, duracao: "30 min" },
    { nome: "Corte + Sobrancelhas", categoria: "combos", preco: 35, duracao: "30 min" },
    { nome: "Corte + Sobrancelhas + Bigode", categoria: "combos", preco: 40, duracao: "30 min" },
    { nome: "Corte + Barba + Sobrancelhas", categoria: "combos", preco: 55, duracao: "45 min" },
    { nome: "Corte + Sobrancelhas + Pigmentação", categoria: "combos", preco: 55, duracao: "60 min" },

    // Química
    { nome: "Platinado", categoria: "quimica", preco: 110, aPartirDe: true, duracao: "75 min", foto: "img/fotos/platinado.jpg",
      descricao: "Descoloração completa para o loiro platinado ou branco." },
    { nome: "Reflexo alinhado", categoria: "quimica", preco: 100, aPartirDe: true, duracao: "90 min", foto: "img/fotos/reflexo.jpg",
      descricao: "Padrões com descoloração, como o xadrez e o freestyle." },
    { nome: "Pintura", categoria: "quimica", preco: 70, duracao: "45 min", foto: "img/fotos/pintura-azul.jpg",
      descricao: "Coloração do cabelo para quem quer ousar na cor." },
    { nome: "Luzes", categoria: "quimica", preco: 80, aPartirDe: true, duracao: "90 min" },
    { nome: "Alisamento", categoria: "quimica", preco: 60, duracao: "60 min" },
  ],

  /* ----------------------------------------------------------
     GALERIA — fotos da pasta img/fotos (vindas do Instagram).
     Para trocar, salve a foto nessa pasta e altere o nome aqui.
     ---------------------------------------------------------- */
  galeria: [
    { foto: "img/fotos/luzes-freestyle.jpg", legenda: "Luzes freestyle" },
    { foto: "img/fotos/degrade.jpg", legenda: "Degradê" },
    { foto: "img/fotos/desenho-cartas.jpg", legenda: "Pintura com desenho" },
    { foto: "img/fotos/reflexo-2.jpg", legenda: "Reflexo xadrez" },
    { foto: "img/fotos/platinado-rua.jpg", legenda: "Platinado" },
    { foto: "img/fotos/low-fade.jpg", legenda: "Low fade" },
    { foto: "img/fotos/luzes-xadrez.jpg", legenda: "Reflexo alinhado" },
    { foto: "img/fotos/social-capa.jpg", legenda: "Corte social" },
    { foto: "img/fotos/mullet.jpg", legenda: "Mullet com degradê" },
    { foto: "img/fotos/barbeiro-noite.jpg", legenda: "Na cadeira" },
    { foto: "img/fotos/platinado.jpg", legenda: "Platinado branco" },
    { foto: "img/fotos/mid-fade.jpg", legenda: "Mid fade" },
  ],
};

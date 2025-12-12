const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const demoMerchant = [
  {
    id: "1",
    name: "Demo Merchant",
    description: "This is demo merchant description",
    phone: "1234567890",
    address: "123 Demo St, Demo City, DM 12345",
    status: "active",
    createdAt : new Date(),
    updatedAt : new Date(),
  }
]

const demoProducts = [
  {
    id: "1",
    title: "BCAA Recovery Stack",
    price: 22,
    rating: 5,
    description: "Blend de aminoácidos essenciais para reduzir fadiga e acelerar a recuperação muscular.",
    mainImage: "bcaa 1.png",
    slug: "bcaa-recovery-stack",
    manufacturer: "FitFuel Labs",
    categoryId: "3117a1b0-6369-491e-8b8b-9fdd5ad9912e",
    inStock: 0,
    merchantId: "1",
  },
  {
    id: "2",
    title: "CarbUp Energy Gel",
    price: 24,
    rating: 0,
    description: "Carboidrato de rápida absorção com eletrólitos para treinos e provas longas.",
    mainImage: "carbup 1.png",
    slug: "carbup-energy-gel",
    manufacturer: "EnduroLab",
    categoryId: "659a91b9-3ff6-47d5-9830-5e7ac905b961",
    inStock: 0,
    merchantId: "1",
  },
  {
    id: "3",
    title: "Kit de Equipamentos Essentials",
    price: 25,
    rating: 4,
    description: "Corda, bandagem e acessórios para montar seu treino funcional em casa ou na academia.",
    mainImage: "equipamento 1.png",
    slug: "kit-equipamentos-essentials",
    manufacturer: "TrainPro",
    categoryId: "6c3b8591-b01e-4842-bce1-2f5585bf3a28",
    inStock: 1,
    merchantId: "1",
  },
  {
    id: "4",
    title: "Mass Gainer Shake",
    price: 21,
    rating: 5,
    description: "Hipercalórico com proteínas e carboidratos complexos para ganho de massa.",
    mainImage: "mass 1.png",
    slug: "mass-gainer-shake",
    manufacturer: "PowerLabs",
    categoryId: "d30b85e2-e544-4f48-8434-33fe0b591579",
    inStock: 1,
    merchantId: "1",
  },
  {
    id: "5",
    title: "Cinto de Levantamento Premium",
    price: 52,
    rating: 4,
    description: "Estabilidade e suporte lombar para agachamento e levantamento terra.",
    mainImage: "belt 1 1.png",
    slug: "cinto-levantamento-premium",
    manufacturer: "IronCore",
    categoryId: "ada699e5-e764-4da0-8d3e-18a8c8c5ed24",
    inStock: 1,
    merchantId: "1",
  },
  {
    id: "6",
    title: "Vitamin Complex Daily",
    price: 74,
    rating: 3,
    description: "Vitaminas e minerais essenciais para imunidade e energia diária.",
    mainImage: "vitamin 1.png",
    slug: "vitamin-complex-daily",
    manufacturer: "Vitality",
    categoryId: "1cb9439a-ea47-4a33-913b-e9bf935bcc0b",
    inStock: 1,
    merchantId: "1",
  },
  {
    id: "7",
    title: "Kimono Performance Gi",
    price: 35,
    rating: 5,
    description: "Kimono leve e resistente para treinos intensos de Jiu-Jitsu.",
    mainImage: "kimono image 1.png",
    slug: "kimono-performance-gi",
    manufacturer: "BJJ Works",
    categoryId: "7a241318-624f-48f7-9921-1818f6c20d85",
    inStock: 1,
    merchantId: "1",
  },
  {
    id: "8",
    title: "Vegan Protein Blend",
    price: 69,
    rating: 5,
    description: "Proteína vegetal com perfil completo de aminoácidos e sabor cremoso.",
    mainImage: "veganptn 1.png",
    slug: "vegan-protein-blend",
    manufacturer: "GreenFuel",
    categoryId: "782e7829-806b-489f-8c3a-2689548d7153",
    inStock: 1,
    merchantId: "1",
  },
  {
    id: "9",
    title: "Creatina Monohidratada",
    price: 89,
    rating: 3,
    description: "Creatina 100% pura para força, potência e ganho muscular comprovados.",
    mainImage: "creatina 1.png",
    slug: "creatina-monohidratada",
    manufacturer: "PureLift",
    categoryId: "4c2cc9ec-7504-4b7c-8ecd-2379a854a423",
    inStock: 1,
    merchantId: "1",
  },
  {
    id: "10",
    title: "Whey Protein Isolado",
    price: 64,
    rating: 3,
    description: "Isolado de soro com alta biodisponibilidade e baixo teor de lactose.",
    mainImage: "whey 1.png",
    slug: "whey-protein-isolado",
    manufacturer: "FitFuel Labs",
    categoryId: "a6896b67-197c-4b2a-b5e2-93954474d8b4",
    inStock: 1,
    merchantId: "1",
  },
  {
    id: "11",
    title: "Barrinha de Proteína Mix",
    price: 52,
    rating: 5,
    description: "Combo de barras proteicas com fibras para lanches rápidos e nutritivos.",
    mainImage: "protein bar 1.png",
    slug: "protein-bar-mix",
    manufacturer: "SnackLabs",
    categoryId: "ss6412b4-22fd-4fbb-9741-d77580dfdcd2",
    inStock: 1,
    merchantId: "1",
  },
  {
    id: "12",
    title: "ZMA Night Recovery",
    price: 54,
    rating: 5,
    description: "Zinco, magnésio e vitamina B6 para sono reparador e síntese muscular.",
    mainImage: "zma.png",
    slug: "zma-night-recovery",
    manufacturer: "PowerNight",
    categoryId: "313eee86-bc11-4dc1-8cb0-6b2c2a2a1ccb",
    inStock: 0,
    merchantId: "1",
  }
];


const demoCategories = [
  {
    id: "7a241318-624f-48f7-9921-1818f6c20d85",
    name: "kimono",
  },
  {
    id: "313eee86-bc11-4dc1-8cb0-6b2c2a2a1ccb",
    name: "zma",
  },
  {
    id: "782e7829-806b-489f-8c3a-2689548d7153",
    name: "veganptn",
  },
  {
    id: "a6896b67-197c-4b2a-b5e2-93954474d8b4",
    name: "whey",
  },
  {
    id: "4c2cc9ec-7504-4b7c-8ecd-2379a854a423",
    name: "creatina",
  },
  {
    id: "8d2a091c-4b90-4d60-b191-114b895f3e54",
    name: "vitaminas",
  },
  {
    id: "1cb9439a-ea47-4a33-913b-e9bf935bcc0b",
    name: "vitaminas",
  },
  {
    id: "ada699e5-e764-4da0-8d3e-18a8c8c5ed24",
    name: "belt",
  },
  {
    id: "d30b85e2-e544-4f48-8434-33fe0b591579",
    name: "mass",
  },
  {
    id: "6c3b8591-b01e-4842-bce1-2f5585bf3a28",
    name: "equipamentos",
  },
  {
    id: "659a91b9-3ff6-47d5-9830-5e7ac905b961",
    name: "carbup",
  },
  {
    id: "3117a1b0-6369-491e-8b8b-9fdd5ad9912e",
    name: "bcaa",
  },
  {
    id: "da6413b4-22fd-4fbb-9741-d77580dfdcd5",
    name: "equipamentos"
  },
  {
    id: "ss6412b4-22fd-4fbb-9741-d77580dfdcd2",
    name: "protein-bar"
  },
  {
    id: "fs6412b4-22fd-4fbb-9741-d77512dfdfa3",
    name: "mass"
  }
];

async function insertDemoData() {

  for (const merchant of demoMerchant) {
    await prisma.merchant.create({
      data: merchant,
    });
  }
  console.log("Demo merchant inserted successfully!");

  for (const category of demoCategories) {
    await prisma.category.create({
      data: category,
    });
  }
  console.log("Demo categories inserted successfully!");

  for (const product of demoProducts) {
    await prisma.product.create({
      data: product,
    });
  }
  console.log("Demo products inserted successfully!");
}

insertDemoData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

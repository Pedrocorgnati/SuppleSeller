const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
    category: "bcaa",
    inStock: 0,
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
    category: "carbup",
    inStock: 0,
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
    category: "equipamentos",
    inStock: 1,
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
    category: "mass",
    inStock: 1,
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
    category: "belt",
    inStock: 1,
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
    category: "vitaminas",
    inStock: 1,
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
    category: "kimono",
    inStock: 1,
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
    category: "veganptn",
    inStock: 1,
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
    category: "creatina",
    inStock: 1,
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
    category: "whey",
    inStock: 1,
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
    category: "protein-bar",
    inStock: 1,
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
    category: "zma",
    inStock: 0,
  },
  {
    id: "13",
    title: "Kimono Pro Series",
    price: 100,
    rating: 5,
    description: "Kimono resistente com tecido pearl weave e reforço nas áreas de maior atrito.",
    mainImage: "kimono image 2.png",
    slug: "kimono-pro-series",
    manufacturer: "BJJ Works",
    category: "kimono",
    inStock: 1,
  },
];

const demoProductImages = [
  {
    imageID: "1",
    productID: "13",
    image: "kimono image 1.png",
  },
  {
    imageID: "2",
    productID: "13",
    image: "kimono image 2.png",
  },
  {
    imageID: "3",
    productID: "13",
    image: "kimono image 3.png",
  },
  {
    imageID: "4",
    productID: "13",
    image: "kimono image 4.png",
  },
];


const demoCategories = [
  {
    name: "kimono",
  },
  {
    name: "zma",
  },
  {
    name: "veganptn",
  },
  {
    name: "whey",
  },
  {
    name: "creatina",
  },
  {
    name: "vitaminas",
  },
  {
    name: "mass",
  },
  {
    name: "equipamentos",
  },
  {
    name: "belt",
  },
  {
    name: "carbup",
  },
  {
    name: "bcaa",
  },
  {
    name: "protein-bar",
  },
];

async function insertDemoData() {
  for (const product of demoProducts) {
    await prisma.product.create({
      data: product,
    });
  }
  console.log("Demo products inserted successfully!");

  for (const image of demoProductImages) {
    await prisma.image.create({
      data: image,
    });
  }
  console.log("Demo images inserted successfully!");

  for (const category of demoCategories) {
    await prisma.category.create({
      data: category,
    });
  }
  console.log("Demo categories inserted successfully!");
}

insertDemoData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

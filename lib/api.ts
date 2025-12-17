/**
 * Mocked API client to avoid external/network calls during UI usage.
 * Returns in-memory fitness data for products, images and categories.
 */
type Product = {
  id: string;
  title: string;
  price: number;
  rating: number;
  description: string;
  mainImage: string;
  slug: string;
  manufacturer: string;
  category: string;
  inStock: number;
};

type ProductImage = {
  imageID: string;
  productID: string;
  image: string;
};

type Category = {
  id: string;
  name: string;
};

const products: Product[] = [
  {
    id: "10",
    title: "100% Whey 900g",
    price: 90.00,
    rating: 3,
    description: "Isolado de soro com alta biodisponibilidade e baixo teor de lactose.",
    mainImage: "whey 1.png",
    slug: "whey-protein-isolado",
    manufacturer: "SuppleSeller Labs",
    category: "whey",
    inStock: 1,
  },
  {
    id: "9",
    title: "Creatina 300g",
    price: 110,
    rating: 3,
    description: "Creatina 100% pura para força, potência e ganho muscular comprovados.",
    mainImage: "creatina 1.png",
    slug: "creatina-monohidratada",
    manufacturer: "PureLift",
    category: "creatina",
    inStock: 1,
  },
  {
    id: "1",
    title: "BCAA Powder Optimum 200g",
    price: 220,
    rating: 5,
    description: "Blend de aminoácidos essenciais para reduzir fadiga e acelerar a recuperação muscular.",
    mainImage: "bcaa 1.png",
    slug: "bcaa-recovery-stack",
    manufacturer: "SuppleSeller Labs",
    category: "bcaa",
    inStock: 1,
  },
  {
    id: "4",
    title: "Monsterone 3kg",
    price: 210,
    rating: 5,
    description: "Hipercalórico com proteínas e carboidratos complexos para ganho de massa.",
    mainImage: "mass 1.png",
    slug: "mass-gainer-shake",
    manufacturer: "PowerLabs",
    category: "mass",
    inStock: 1,
  },
  {
    id: "6",
    title: "Vitapure 60cp",
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
    id: "11",
    title: "Protein Crisp",
    price: 5.00,
    rating: 5,
    description: "Combo de barras proteicas com fibras para lanches rápidos e nutritivos.",
    mainImage: "protein bar 1.png",
    slug: "protein-bar-mix",
    manufacturer: "SnackLabs",
    category: "protein-bar",
    inStock: 1,
  },
  {
    id: "8",
    title: "True Vegan Whey 450g",
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
    id: "7",
    title: "Kimono Performance ",
    price: 350,
    rating: 5,
    description: "Kimono leve e resistente para treinos intensos de Jiu-Jitsu.",
    mainImage: "kimono image 1.png",
    slug: "kimono-performance-gi",
    manufacturer: "BJJ Works",
    category: "kimono",
    inStock: 1,
  },
  {
    id: "5",
    title: "Faixa de Jiu-Jitsu",
    price: 80,
    rating: 4,
    description: "Estabilidade e suporte lombar para agachamento e levantamento terra.",
    mainImage: "belt 1 1.png",
    slug: "cinto-levantamento-premium",
    manufacturer: "IronCore",
    category: "belt",
    inStock: 1,
  },
  {
    id: "2",
    title: "VO2 Carbo gel",
    price: 4.50,
    rating: 0,
    description: "Carboidrato de rápida absorção com eletrólitos para treinos e provas longas.",
    mainImage: "carbup 1.png",
    slug: "carbup-energy-gel",
    manufacturer: "EnduroLab",
    category: "carbup",
    inStock: 1,
  },
  {
    id: "12",
    title: "ZMA Max Titanium 90cp",
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
    id: "3",
    title: "Halter de 10kg",
    price: 180,
    rating: 4,
    description: "Corda, bandagem e acessórios para montar seu treino funcional em casa ou na academia.",
    mainImage: "equipamento 1.png",
    slug: "kit-equipamentos-essentials",
    manufacturer: "TrainPro",
    category: "equipamentos",
    inStock: 1,
  },
];

const productImages: ProductImage[] = [
  { imageID: "1", productID: "10", image: "whey 1.png" },
  { imageID: "2", productID: "9", image: "creatina 1.png" },
  { imageID: "3", productID: "1", image: "bcaa 1.png" },
  { imageID: "4", productID: "7", image: "kimono image 2.png" },
  { imageID: "5", productID: "7", image: "kimono image 3.png" },
  { imageID: "6", productID: "7", image: "kimono image 4.png" },
];

const categories: Category[] = [
  { id: "a6896b67-197c-4b2a-b5e2-93954474d8b4", name: "whey" },
  { id: "4c2cc9ec-7504-4b7c-8ecd-2379a854a423", name: "creatina" },
  { id: "3117a1b0-6369-491e-8b8b-9fdd5ad9912e", name: "bcaa" },
  { id: "d30b85e2-e544-4f48-8434-33fe0b591579", name: "mass" },
  { id: "8d2a091c-4b90-4d60-b191-114b895f3e54", name: "vitaminas" },
  { id: "ss6412b4-22fd-4fbb-9741-d77580dfdcd2", name: "protein-bar" },
  { id: "782e7829-806b-489f-8c3a-2689548d7153", name: "veganptn" },
  { id: "7a241318-624f-48f7-9921-1818f6c20d85", name: "kimono" },
  { id: "ada699e5-e764-4da0-8d3e-18a8c8c5ed24", name: "belt" },
  { id: "659a91b9-3ff6-47d5-9830-5e7ac905b961", name: "carbup" },
  { id: "313eee86-bc11-4dc1-8cb0-6b2c2a2a1ccb", name: "zma" },
  { id: "6c3b8591-b01e-4842-bce1-2f5585bf3a28", name: "equipamentos" },
];

const jsonResponse = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

async function handleGet(endpoint: string) {
  if (endpoint.startsWith("/api/products")) {
    // slug by id (/api/products/:id) or list
    const parts = endpoint.split("/");
    const last = parts[parts.length - 1];
    const product = products.find((p) => p.id === last);
    return jsonResponse(product || products);
  }

  if (endpoint.startsWith("/api/slugs/")) {
    const slug = endpoint.replace("/api/slugs/", "");
    const product = products.find((p) => p.slug === slug);
    return product ? jsonResponse(product) : jsonResponse({ error: "Not found" }, 404);
  }

  if (endpoint.startsWith("/api/images/")) {
    const id = endpoint.replace("/api/images/", "");
    const images = productImages.filter((img) => img.productID === id);
    return jsonResponse(images);
  }

  if (endpoint.startsWith("/api/categories")) {
    return jsonResponse(categories);
  }

  if (endpoint.startsWith("/api/orders")) {
    return jsonResponse([]);
  }

  // default empty ok
  return jsonResponse([]);
}

async function handleWrite() {
  // return generic success without persisting
  return jsonResponse({ ok: true });
}

export const apiClient = {
  baseUrl: "mock://suppleseller",
  async request(endpoint: string, options: RequestInit = {}) {
    const method = (options.method || "GET").toUpperCase();
    if (method === "GET") {
      return handleGet(endpoint);
    }
    return handleWrite();
  },
  get: (endpoint: string, options?: RequestInit) =>
    apiClient.request(endpoint, { ...options, method: "GET" }),
  post: (endpoint: string, data?: any, options?: RequestInit) =>
    apiClient.request(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),
  put: (endpoint: string, data?: any, options?: RequestInit) =>
    apiClient.request(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),
  delete: (endpoint: string, options?: RequestInit) =>
    apiClient.request(endpoint, { ...options, method: "DELETE" }),
};

export default apiClient;

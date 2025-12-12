const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function generateProductTemplate() {
  try {
    console.log("📋 Generating product template CSV...\n");

    // Fetch categories from database
    const categories = await prisma.category.findMany({
      take: 5,
      orderBy: { name: "asc" },
    });

    if (categories.length === 0) {
      console.log("⚠️  No categories found in database!");
      console.log("Please create some categories first.");
      return;
    }

    console.log("✅ Found categories:");
    categories.forEach((cat, index) => {
      console.log(`   ${index + 1}. ${cat.name} (ID: ${cat.id})`);
    });
    console.log("");

    // Use first category as default, or distribute across categories
    const categoryIds = categories.map((c) => c.id);

    // Sample products with real category IDs
    const products = [
      {
        title: "Whey Protein Isolado",
        price: 199.9,
        manufacturer: "FitFuel",
        inStock: 120,
        mainImage: "/whey 2.png",
        description:
          "Whey isolado com alta pureza proteica, baixo carbo e digestão rápida para recuperação muscular.",
        slug: "whey-protein-isolado",
        categoryId: categoryIds[0] || "REPLACE_WITH_CATEGORY_ID",
      },
      {
        title: "Creatina Monohidratada",
        price: 99.9,
        manufacturer: "PureLift",
        inStock: 200,
        mainImage: "/creatina 2.png",
        description:
          "Creatina 100% monohidratada para força, potência e volume muscular.",
        slug: "creatina-monohidratada",
        categoryId:
          categoryIds[1] || categoryIds[0] || "REPLACE_WITH_CATEGORY_ID",
      },
      {
        title: "BCAA Recovery Stack",
        price: 79.9,
        manufacturer: "FitFuel",
        inStock: 150,
        mainImage: "/bcaa 2.png",
        description:
          "Relação 2:1:1 de leucina, isoleucina e valina para reduzir fadiga e acelerar a recuperação.",
        slug: "bcaa-recovery-stack",
        categoryId:
          categoryIds[2] || categoryIds[0] || "REPLACE_WITH_CATEGORY_ID",
      },
      {
        title: "Vitamin Complex Daily",
        price: 59.9,
        manufacturer: "Vitality",
        inStock: 180,
        mainImage: "/vitamin 2.png",
        description:
          "Mix diário de vitaminas e minerais para imunidade, energia e bem-estar.",
        slug: "vitamin-complex-daily",
        categoryId:
          categoryIds[3] || categoryIds[0] || "REPLACE_WITH_CATEGORY_ID",
      },
      {
        title: "Mass Gainer Shake",
        price: 149.9,
        manufacturer: "PowerLabs",
        inStock: 90,
        mainImage: "/mass 2.png",
        description:
          "Hipercalórico balanceado com proteínas, carboidratos complexos e MCTs para ganho de massa.",
        slug: "mass-gainer-shake",
        categoryId:
          categoryIds[4] || categoryIds[0] || "REPLACE_WITH_CATEGORY_ID",
      },
    ];

    // Generate CSV content
    const headers = [
      "title",
      "price",
      "manufacturer",
      "inStock",
      "mainImage",
      "description",
      "slug",
      "categoryId",
    ];
    let csvContent = headers.join(",") + "\n";

    products.forEach((product) => {
      const row = headers.map((header) => {
        const value = product[header];
        // Escape values that contain commas or quotes
        if (
          typeof value === "string" &&
          (value.includes(",") || value.includes('"') || value.includes("\n"))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvContent += row.join(",") + "\n";
    });

    // Save to file
    const outputPath = path.join(
      __dirname,
      "..",
      "..",
      "product-template-ready.csv"
    );
    fs.writeFileSync(outputPath, csvContent, "utf8");

    console.log("✅ Template CSV generated successfully!");
    console.log(`📁 File saved to: ${outputPath}\n`);

    console.log("📊 Template contains:");
    console.log(`   - ${products.length} sample products`);
    console.log(`   - Real category IDs from your database`);
    console.log(`   - Ready to upload via bulk upload feature\n`);

    console.log("🚀 Next steps:");
    console.log("   1. Open the generated CSV file");
    console.log("   2. Modify the products as needed");
    console.log("   3. Upload via Admin Dashboard > Bulk Upload");
    console.log(
      "   4. Or use the API: POST http://localhost:3001/api/products/bulk-upload\n"
    );

    // Also create a blank template
    const blankTemplate = headers.join(",") + "\n";
    const blankPath = path.join(
      __dirname,
      "..",
      "..",
      "product-template-blank.csv"
    );
    fs.writeFileSync(blankPath, blankTemplate, "utf8");
    console.log(`📝 Blank template also created: ${blankPath}`);
  } catch (error) {
    console.error("❌ Error generating template:", error);
  } finally {
    await prisma.$disconnect();
  }
}

generateProductTemplate();

// *********************
// Role of the component: products section intended to be on the home page
// Name of the component: ProductsSection.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductsSection slug={slug} />
// Input parameters: no input parameters
// Output: products grid
// *********************

import apiClient from "@/lib/api";
import Heading from "./Heading";
import ProductItem from "./ProductItem";

const ProductsSection = async () => {
  let products = [];

  try {
    // sending API request for getting all products
    const data = await apiClient.get("/api/products");

    if (!data.ok) {
      console.error('Failed to fetch products:', data.statusText);
      products = [];
    } else {
      const result = await data.json();
      // Ensure products is an array
      products = Array.isArray(result) ? result : [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return (
    <div className="bg-gr-500 border-t-4 border-white">
      <div className="max-w-screen-2xl mx-auto pt-20">
        <Heading title="PRODUTOS EM DESTAQUE" />
        <div className="grid grid-cols-4 bg-white justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-2 px-10 gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductItem key={product.id} product={product} color="white" />
            ))
          ) : (
            <div className="col-span-full text-center text-black py-10">
              <p>Nenhum produto disponível no momento.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;

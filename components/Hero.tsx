// *********************
// Role of the component: Classical hero component on home page
// Name of the component: Hero.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Hero />
// Input parameters: no input parameters
// Output: Classical hero component with two columns on desktop and one column on smaller devices
// *********************

import Image from "next/image";

const Hero = () => {
  return (
    <div className="h-[700px] w-full bg-orange-500 max-lg:h-[900px] max-md:h-[750px]">
      <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-16 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10">
        <div className="flex flex-col gap-y-5 max-lg:order-last col-span-2">
          <h1 className="text-6xl max-w-[810px] text-white font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
            Whey Gold Standard da Optimum Nutrition, o whey protein eleito 12x como o melhor do mundo!
          </h1>
          <p className="text-white max-sm:text-sm max-w-[810px]">
            Fórmula com alto teor de proteína, baixo teor de carboidratos e mix de enzimas
            digestivas para garantir absorção rápida e suporte ao ganho de massa magra.
          </p>
          <div className="flex gap-x-1 max-lg:flex-col max-lg:gap-y-1">
            <button className="bg-white text-orange-600 font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100">
              COMPRAR WHEY
            </button>
            <button className="bg-white text-orange-600 font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100">
              LINHA DE SUPLEMENTOS
            </button>
          </div>
        </div>
        <Image
          src="/whey for banner.png"
          width={400}
          height={500}
          alt="whey protein destaque"
        />
      </div>
    </div>
  );
};

export default Hero;

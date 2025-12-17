// *********************
// Role of the component: IntroducingSection with the text "Introducing SuppleSeller"
// Name of the component: IntroducingSection.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <IntroducingSection />
// Input parameters: no input parameters
// Output: Section with the text "Introducing SuppleSeller" and button
// *********************

import Link from "next/link";

const IntroducingSection = () => {
  return (
    <div className="py-20 pt-24 bg-white">
      <div className="text-center flex flex-col gap-y-5 items-center">
        <h2 className="text-orange-600 text-8xl font-extrabold text-center mb-2 max-md:text-6xl max-[480px]:text-4xl">
          APRESENTANDO <span className="text-black">SUPPLE</span><span className="text-orange-600">SELLER</span>
        </h2>
        <div>
          <p className="text-orange-600 text-center text-2xl font-semibold max-md:text-xl max-[480px]:text-base">
            Nutrição esportiva e equipamentos para elevar sua performance.
          </p>
          <p className="text-orange-600 text-center text-2xl font-semibold max-md:text-xl max-[480px]:text-base">
            Suplementos premium, acessórios de treino e recovery em um só lugar.
          </p>
          <Link href="/shop" className="block text-white bg-orange-600 font-bold px-12 py-3 text-xl hover:bg-orange-700 w-96 mt-2  max-md:text-lg max-md:w-72 max-[480px]:w-60 mx-auto">
            COMPRE AGORA
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroducingSection;

// *********************
// Role of the component: Simple slider component built with the help of slick-carousel
// Name of the component: SimpleSlider.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <SimpleSlider />
// Input parameters: no input parameters
// Output: Slider component built with the help of slick-carousel
// *********************

"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container max-w-screen-2xl mx-auto px-16 max-md:px-7">
      <Slider {...settings}>
        <div className="h-[500px] max-lg:h-[400px] max-md:h-[250px] max-[500px]:h-[200px] max-[400px]:h-[150px] relative">
          <div className="absolute left-[50%] translate-x-[-50%] translate-y-[30%] h-full text-center max-lg:translate-y-[25%] max-md:translate-y-[20%] max-sm:hidden">
            <p className="text-xl font-light underline underline-offset-4 mb-5 max-[1162px]:text-lg max-lg:mb-2 max-md:text-base max-md:mb-1">
              Creatina micronizada
            </p>
            <h2 className="text-5xl font-light mb-5 max-[1162px]:text-4xl max-lg:mb-2 max-lg:text-3xl max-md:text-2xl max-md:mb-1">
              Energia constante para seus treinos
            </h2>
            <p className="mb-5 text-black text-lg font-medium max-[1162px]:text-base max-lg:mb-2 max-lg:text-sm max-md:mb-1">
              A creatina auxilia na força, volume muscular e recuperação entre séries de alta intensidade.
            </p>
            <Link href="/shop" className="bg-custom-yellow btn w-52 h-14 text-black uppercase border border-black text-xl hover:bg-black hover:text-custom-yellow max-[1162px]:w-44 max-[1162px]:h-10 max-[1162px]:text-lg max-lg:text-base max-lg:w-36 max-md:text-sm max-md:w-32">
              Comprar agora
            </Link>
          </div>
          <Image src="/supplement store.jpg" alt="prateleira de suplementos" fill className="object-cover" priority />
        </div>
        <div className="h-[500px] max-lg:h-[400px] max-md:h-[250px] max-[500px]:h-[200px] max-[400px]:h-[150px] relative">
          <div className="absolute left-[50%] translate-x-[-50%] translate-y-[30%] h-full text-center max-lg:translate-y-[25%] max-md:translate-y-[20%] max-sm:hidden">
            <p className="text-xl font-light underline underline-offset-4 mb-5 max-[1162px]:text-lg max-lg:mb-2 max-md:text-base max-md:mb-1">
              Vitaminas e imunidade
            </p>
            <h2 className="text-5xl font-light mb-5 max-[1162px]:text-4xl max-lg:mb-2 max-lg:text-3xl max-md:text-2xl max-md:mb-1">
              Energia limpa no dia a dia
            </h2>
            <p className="mb-5 text-black text-lg font-medium max-[1162px]:text-base max-lg:mb-2 max-lg:text-sm max-md:mb-1">
            Complexos vitamínicos completos para suporte imunológico, disposição e recuperação.
            </p>
            <Link href="/shop" className="bg-custom-yellow btn w-52 h-14 text-black uppercase border border-black text-xl hover:bg-black hover:text-custom-yellow max-[1162px]:w-44 max-[1162px]:h-10 max-[1162px]:text-lg max-lg:text-base max-lg:w-36 max-md:text-sm max-md:w-32">
              Comprar agora
            </Link>
          </div>
          <Image src="/gym.jpg" alt="academia e treino funcional" fill className="object-cover" />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;

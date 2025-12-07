import React from "react";

const HeroSection = ({ image, title, subtitle }) => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1
  className="
    text-3xl md:text-5xl lg:text-6xl 
    font-extrabold 
    bg-gradient-to-r 
    from-[#FCA61B] via-white to-[#FCA61B] 
    bg-clip-text 
    text-transparent 
    drop-shadow-lg
  "
>
  {title}
</h1>

        <p className="mt-4 text-lg md:text-xl text-white max-w-2xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

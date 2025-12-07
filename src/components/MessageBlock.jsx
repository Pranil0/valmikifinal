import React from "react";

const MessageBlock = ({ img, name, designation, institute, message }) => {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 pb-16 md:pb-20 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        
        {/* LEFT COLUMN – PHOTO + NAME CARD */}
        <div className="lg:col-span-4 flex justify-center lg:justify-start">
          <div className="w-[260px] md:w-[280px] relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
              <img
                src={img}
                className="w-full h-[340px] md:h-[360px] object-cover"
                alt={name}
              />
            </div>

            {/* Name Card */}
            <div
              className="absolute left-1/2 -translate-x-1/2 px-4 py-3 text-center rounded-xl w-[210px]"
              style={{
                bottom: "-32px",
                background: "rgba(255,255,255,0.97)",
                boxShadow: "0 10px 25px rgba(15,117,189,0.15)",
              }}
            >
              <p className="font-semibold text-sm md:text-base text-gray-900">{name}</p>
              <p className="text-[#CC0033] text-xs md:text-[13px] font-semibold uppercase mt-1 tracking-wide">
                {designation}
              </p>
              <p className="text-[#0F75BD] text-[10px] md:text-[11px] tracking-[0.24em] uppercase mt-1">
                {institute}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN – MESSAGE TEXT */}
        <div className="lg:col-span-8 text-[#555555] text-sm md:text-[15px] leading-relaxed mt-10 lg:mt-0">
          {message}
        </div>
      </div>
    </section>
  );
};

export default MessageBlock;

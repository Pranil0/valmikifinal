import React from "react";

const MailIcon = () => (
  <svg
    className="h-4 w-4 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.893 3.947L21 8"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8"
    ></path>
  </svg>
);

const CTA = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#1C7FBC] text-white py-10 px-6 sm:px-10 lg:px-16 rounded-2xl shadow-2xl 
                        flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">

          {/* LEFT SIDE */}
          <div className="text-center lg:text-left w-full lg:w-1/2">
            <h3 className="text-2xl sm:text-3xl font-bold leading-snug">
              TAKE THE FIRST STEP TOWARDS YOUR <br className="hidden sm:block" /> BRIGHT FUTURE
            </h3>

            <p className="mt-3 text-white text-sm font-light max-w-md mx-auto lg:mx-0">
              Be the first to know about admissions, academic programs, events, and achievements.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-sm">

              {/* Input with icon and button */}
              <div className="relative flex items-center bg-white rounded-full overflow-hidden h-10 sm:h-11">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                  <MailIcon />
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 pr-24 py-2 text-black w-full focus:outline-none placeholder-gray-400 text-sm"
                />

                <button className="absolute right-1 h-8 sm:h-9 px-4 bg-[#007BFF] 
                                   text-white hover:bg-blue-600 font-semibold text-sm 
                                   rounded-full flex items-center justify-center whitespace-nowrap">
                  Subscribe
                </button>
              </div>

              <p className="mt-3 text-[11px] text-white text-center leading-relaxed">
                Join our mailing list today and receive updates that help you stay informed about your child's future.
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;

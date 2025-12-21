import React from "react";
import { NavLink } from "react-router-dom";
import MessageBlock from "../components/MessageBlock";
import principalImg from "../assets/principal.png";
import banner from "../assets/banner.png";
import CTA from "../components/CTA";
import blogHeroImg from "../assets/valmikibuilding.png";
import HeroSection from "../components/HeroSection";
const Principal = () => {
  return (
    <>
      {/* HERO SECTION — Introduction Page */}
     
        <HeroSection
        image={blogHeroImg}
 title="Welcome to the Principal’s Message "
  subtitle="  Insights, guidance, and vision from the Principal of Valmiki Shiksha Sadan —
  dedicated to shaping disciplined, confident, and value-driven learners."
  breadcrumb={[
    { label: "Home", link: "/" },
    { label: "Introduction" }
  ]}
/>



      {/* ============= TITLE STRIP ============= */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 mt-12 md:mt-16 mb-8">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
          <span className="text-[#0F75BD]">Message from the</span>{" "}
          <span className="text-[#CC0033]">Principal</span>
        </h2>
        <p className="mt-3 text-center text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Guiding students with purpose, discipline, and care towards a brighter
          academic and personal future.
        </p>
      </section>

      {/* ============= MAIN CONTENT ============= */}
      <MessageBlock
        img={principalImg}
        name="Pradip Poudel"
        designation="Principal"
        institute="Valmiki Shiksha Sadan"
        message={
          <>
            <p className="mb-4 text-justify">
              <strong className="text-[#0F75BD]">Valmiki Shiksha Sadan</strong> is a
              flourishing academic institution established in <strong>2053 B.S.</strong> by a committed group of experienced educators. From the very beginning, our vision has been to deliver quality education that brings meaningful transformation in the lives of students and contributes to the academic development of Nepal.
            </p>

            <p className="mb-4 text-justify">
              Over the years, Valmiki has played a distinguished role in shaping the academic structure of our community. We have remained focused on <strong>discipline, hard work, and consistent performance</strong>. As a result, our students have continuously excelled in their studies and built a strong reputation in various fields after graduation.
            </p>

            <p className="mb-4 text-justify">
              The school was upgraded to the <strong>higher secondary level (+2)</strong> in <strong>2069 B.S.</strong>, offering Science and Management streams supported by a competent and highly qualified academic team. Our students have gone on to achieve outstanding results, securing some of the best scores at both district and national levels. This achievement is a reflection of the collaborative efforts of our teachers, students, parents, and the entire Valmiki family.
            </p>

            <p className="mb-4 text-justify">
              At Valmiki Shiksha Sadan, we strongly believe that education is not only about examinations and certificates. It is about awakening curiosity, building character, and nurturing values such as <strong>integrity, respect, and responsibility</strong>. We encourage our students to be humble yet confident, disciplined yet creative, and hardworking yet compassionate human beings.
            </p>

            <p className="mb-4 text-justify">
              I warmly welcome all prospective students, parents, and well-wishers to visit our campus and experience our learning environment. We deeply value the trust you place in us and look forward to your continued support and cooperation in the coming years, just as you have supported us in the past.
            </p>

            <p className="mt-6 text-[#777777] text-sm md:text-[15px]">
              Thank you for being a part of the <span className="text-[#0F75BD] font-semibold">Valmiki Shiksha Sadan</span> community.
            </p>

            <div className="mt-4">
              <p className="font-semibold text-gray-900 text-sm md:text-base">Pradip Poudel</p>
              <p className="text-xs md:text-sm text-gray-500">Principal, Valmiki Shiksha Sadan</p>
            </div>
          </>
        }
      />

      {/* ============= CTA ============= */}
      <CTA />
    </>
  );
};

export default Principal;

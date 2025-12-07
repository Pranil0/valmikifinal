import React from "react";
import ornamen from "../assets/ornamen.png"; 
import spring from "../assets/spring.png"; // Import the new ornament image
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
import icon6 from "../assets/icon6.png";
import icon7 from "../assets/icon7.png";
import icon8 from "../assets/icon8.png";

// --- Data Definitions ---

const visionPoints = [
  {
    icon: icon1,
    title: "Academic Excellence",
    description: "Setting high standards for results and university readiness."
  },
  {
    icon: icon2,
    title: "Innovation in Learning",
    description: "Integrating modern technology and critical thinking into the curriculum."
  },
  {
    icon: icon3,
    title: "Holistic Development",
    description: "Nurturing intellectual, physical, and emotional growth in all students."
  },
  {
    icon: icon4,
    title: "Ethical Foundation",
    description: "Instilling strong values, responsibility, and community spirit."
  }
];

const missionPoints = [
  {
    icon: icon5,
    title: "Qualified Faculty",
    description: "Recruit, train, and retain highly professional and dedicated educators."
  },
  {
    icon: icon6,
    title: "Safe & Supportive Environment",
    description: "Maintain a nurturing and secure campus where all students can thrive."
  },
  {
    icon: icon7,
    title: "Community Engagement",
    description: "Actively involve parents and the community in the student's education journey."
  },
  {
    icon: icon8,
    title: "Lifelong Learning",
    description: "Instill curiosity and critical skills necessary for continuous growth beyond school."
  }
];

// --- Component ---

const VisionMissionSection = () => {
  return (
    <section className="relative w-full text-white py-20 overflow-hidden" style={{ backgroundColor: "#172983" }}>
      {/* Original Background Pattern */}
      <div className="absolute inset-0 z-0">
        <img src={ornamen} alt="Background pattern" className="w-full h-full object-cover opacity-80" />
      </div>

      {/* New Spring Ornament in Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 z-0 w-1/4 h-1/4 md:w-1/5 md:h-1/5 lg:w-1/6 lg:h-1/6"> {/* Adjust w/h as needed */}
        <img src={spring} alt="Spring ornament" className="w-full h-full object-contain opacity-70" /> {/* Adjust opacity/object-fit */}
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 z-10">
        
        {/* Vision */}
        <div>
          <h2 className="text-[#FF375E] text-sm font-semibold mb-2">Our Vision</h2>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Empowering Minds to <br /> Lead the Future
          </h1>
          <p className="text-gray-300 mb-10 leading-relaxed">
            At <strong>Valmiki Shiksha Sadan</strong>, we aim to create an environment of <strong>academic rigor, character development, and holistic excellence</strong>. 
            We nurture students to become responsible, innovative, and globally aware individuals ready to excel in every endeavor.
          </p>

          <div className="space-y-6">
            {visionPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-4 group hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <img src={point.icon} alt={point.title} className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{point.title}</h3>
                  <p className="text-gray-300 text-sm">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div>
          <h2 className="text-[#FF375E] text-sm font-semibold mb-2">Our Mission</h2>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Guiding Every Student, <br /> Achieving Potential
          </h1>
          <p className="text-gray-300 mb-10 leading-relaxed">
            Our mission is to provide a comprehensive, supportive, and engaging educational environment. 
            We ensure that every student is equipped with the skills, values, and confidence needed for academic and personal success.
          </p>

          <div className="space-y-6">
            {missionPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-4 group hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <img src={point.icon} alt={point.title} className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{point.title}</h3>
                  <p className="text-gray-300 text-sm">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisionMissionSection;
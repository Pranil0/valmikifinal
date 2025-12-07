import React from "react";
import { useParams, Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";

// Your NEW hero image
import valmikiHero from "../assets/valmikibuilding.png";
import valmikibuilding from "../assets/valmikibuilding.png";
import foodfestival from "../assets/foodfestival.webp";
import dancingstar from "../assets/dancingstar.webp";
import dipawalirangoli from "../assets/dipawalirangoli.webp";
import orientationclass11 from "../assets/orientationclass11.webp";
import itfest from "../assets/itfest.webp";
import sciencefair from "../assets/sciencefair.webp";
import sportsmeet from "../assets/sportsmeet.webp";
// News item image example

import {
  FaUtensils,
  FaMusic,
  FaPaintBrush,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaTrophy,
  FaRunning,
  FaFlask,
  FaUsers,
  FaGraduationCap,
} from "react-icons/fa";


import photo4 from "../assets/photo4.webp";

const NewsDetails = () => {
  const { id } = useParams();

;


 const newsList = [
  {
    id: 1,
    title: "Valmiki Food Festival 2082",
    desc: "Students showcased culinary talents, presenting local and international dishes with creativity and teamwork.",
    date: "10 Nov 2025",
    author: "Admin",
    image: foodfestival,
    content: (
      <>
        <p className="mb-4">
          Valmiki Shiksha Sadan hosted the annual <strong>Food Festival 2082</strong>, a grand event celebrating the culinary skills of students across all grades. The festival aimed to promote creativity, teamwork, and a deep appreciation of culinary arts from both Nepali and international cuisines.
        </p>

        <h3 className="text-xl font-semibold mb-2">Event Highlights</h3>
        <p className="mb-2">Students worked in inter-class teams to conceptualize, prepare, and present dishes with diverse flavors. Each team selected a theme, sourced ingredients responsibly, and focused on hygiene and presentation.</p>
        <p className="mb-2">Live cooking stations allowed visitors to observe students in action, demonstrating skill, patience, and creativity in real-time. Students experimented with fusion dishes, blending local and international flavors.</p>
        <p className="mb-2">The festival emphasized artistic food presentation, encouraging students to develop aesthetic sense and attention to detail. Visitors were impressed by the color coordination, plating designs, and overall visual appeal of each dish.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Learning Outcomes</h3>
        <p className="mb-2">- Teamwork: Students learned coordination, planning, and collaboration under time constraints.</p>
        <p className="mb-2">- Creativity: Participants explored new flavors, presentation styles, and innovative combinations.</p>
        <p className="mb-2">- Practical Skills: Enhanced cooking techniques, hygiene awareness, and real-world culinary experience.</p>
        <p className="mb-2">- Cultural Exposure: Understanding and appreciating international cuisines broadened student perspectives.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Impact & Feedback</h3>
        <p className="mb-2">Faculty noted increased confidence and professionalism among students. Many participants reported feeling proud of their accomplishments and motivated to explore culinary arts further. Parents and visitors appreciated the innovative presentations and the effort put into the event.</p>

        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
          "The Food Festival 2082 was not only a celebration of culinary talent but also an inspiring lesson in teamwork, creativity, and cultural appreciation."
        </blockquote>
      </>
    ),
  },

  {
    id: 2,
    title: "Valmiki Dancing Star 2082",
    desc: "An inter-class dance competition celebrating talent, rhythm, and creativity.",
    date: "05 Nov 2025",
    author: "Admin",
    image: dancingstar,
    content: (
      <>
        <p className="mb-4">
          <strong>Valmiki Dancing Star 2082</strong> was an exhilarating inter-class dance competition aimed at encouraging students to express themselves through movement, rhythm, and creativity. The competition showcased a diverse range of dance styles, from traditional Nepali folk dances to contemporary, hip-hop, and fusion performances.
        </p>

        <h3 className="text-xl font-semibold mb-2">Event Highlights</h3>
        <p className="mb-2">Teams designed original choreography, integrating thematic storytelling, formations, and props. Each performance was unique, reflecting the creativity and personality of the group.</p>
        <p className="mb-2">Students focused on synchronization, coordination, and expression, learning how to work together and support one another on stage. The event promoted healthy competition while maintaining a fun and encouraging atmosphere.</p>
        <p className="mb-2">Performances were judged on technical skills, creativity, stage presence, and audience engagement. Expert judges provided constructive feedback, guiding students to enhance their artistic abilities.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Learning Outcomes</h3>
        <p className="mb-2">- Confidence: Students gained poise and self-assurance performing in front of a large audience.</p>
        <p className="mb-2">- Collaboration: Emphasis on teamwork and synchronization strengthened peer connections.</p>
        <p className="mb-2">- Creativity & Innovation: Choreography encouraged imaginative storytelling through dance.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Audience & Feedback</h3>
        <p className="mb-2">The event drew enthusiastic applause from students, faculty, and parents. Many students discovered a passion for performing arts, and the event highlighted hidden talents that may otherwise have remained unnoticed.</p>

        <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-700">
          "Dancing Star 2082 was a spectacular showcase of energy, creativity, and teamwork, leaving a lasting impression on the audience and participants alike."
        </blockquote>
      </>
    ),
  },

  {
    id: 3,
    title: "Happy Dipawali: Rangoli Celebration",
    desc: "Students celebrated Dipawali by creating vibrant rangolis and art installations.",
    date: "25 Oct 2025",
    author: "Admin",
    image: dipawalirangoli,
    content: (
      <>
        <p className="mb-4">
          Valmiki Shiksha Sadan celebrated <strong>Dipawali</strong> through vibrant rangoli and artistic installations. The festival activity aimed to encourage creativity, collaboration, and appreciation of cultural traditions among students.
        </p>

        <h3 className="text-xl font-semibold mb-2">Highlights & Activities</h3>
        <p className="mb-2">- Students created intricate rangoli designs, combining traditional motifs with contemporary styles.</p>
        <p className="mb-2">- Groups collaborated to produce large-scale designs, improving planning, coordination, and artistic execution skills.</p>
        <p className="mb-2">- Students learned the cultural significance of Dipawali, understanding its symbolism and traditional practices.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Impact & Feedback</h3>
        <p className="mb-2">The celebration fostered creativity, teamwork, and cultural knowledge. Visitors admired the campus’ colorful displays, and students expressed pride in their collaborative achievements.</p>
      </>
    ),
  },

  {
    id: 4,
    title: "Orientation Program for Class 11",
    desc: "Welcoming +2 students with an introduction to curriculum, teachers, and campus culture.",
    date: "15 Sep 2025",
    author: "Admin",
    image: orientationclass11,
    content: (
      <>
        <p className="mb-4">
          The <strong>Orientation Program for Class 11</strong> welcomed new +2 students to Valmiki Shiksha Sadan. The program introduced students to academic expectations, campus culture, faculty, and peer networks.
        </p>

        <h3 className="text-xl font-semibold mb-2">Program Highlights</h3>
        <p className="mb-2">- Faculty introduced themselves and explained teaching approaches, assessment methods, and support systems.</p>
        <p className="mb-2">- Ice-breaking activities encouraged students to connect with peers and build collaborative skills.</p>
        <p className="mb-2">- Detailed curriculum overview provided clarity on subjects, projects, and evaluation standards.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Impact & Feedback</h3>
        <p>Students reported increased confidence and clarity regarding academic expectations. The program helped create a sense of belonging and excitement for the upcoming school year.</p>
      </>
    ),
  },

  {
    id: 5,
    title: "IT Fest 2082",
    desc: "Showcasing coding, robotics, and digital innovation projects by students.",
    date: "20 Aug 2025",
    author: "Admin",
    image: itfest,
    content: (
      <>
        <p className="mb-4">
          The <strong>IT Fest 2082</strong> provided students with a platform to present innovative technological projects. It included coding competitions, robotics demonstrations, AI solutions, and web development projects.
        </p>

        <h3 className="text-xl font-semibold mb-2">Event Highlights</h3>
        <p className="mb-2">- Students showcased functional web apps, AI tools, and robotics prototypes to peers and faculty.</p>
        <p className="mb-2">- Collaborative teamwork encouraged problem-solving, project planning, and software testing.</p>
        <p className="mb-2">- Faculty mentorship ensured real-world application, providing guidance in debugging, documentation, and innovation.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Impact & Feedback</h3>
        <p>The IT Fest fostered creativity, critical thinking, and technological confidence. Students learned how to present ideas effectively, handle technical challenges, and work collaboratively.</p>
      </>
    ),
  },

  {
    id: 6,
    title: "Scholarship Opportunities for Meritorious Students",
    desc: "Meritorious students rewarded with scholarships to support academic excellence.",
    date: "30 Jul 2025",
    author: "Admin",
    image: photo4,
    content: (
      <>
        <p className="mb-4">
          Valmiki Shiksha Sadan recognized meritorious students through scholarships designed to encourage academic, artistic, and athletic excellence.
        </p>

        <h3 className="text-xl font-semibold mb-2">Scholarship Categories</h3>
        <p className="mb-2">- Merit-based: For students with outstanding academic performance and top board scores.</p>
        <p className="mb-2">- Need-based: Financial support for deserving students with strong academic potential.</p>
        <p className="mb-2">- Special Talents: Recognizing achievements in arts, sports, innovation, and cultural activities.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Impact & Feedback</h3>
        <p>Scholarships motivated students to strive for excellence, supporting them to achieve their full potential in both academics and extracurricular pursuits.</p>
      </>
    ),
  },

  {
    id: 7,
    title: "Valmiki Sports Meet 2082: Spirit of Teamwork",
    desc: "Annual sports meet promoting fitness, teamwork, and competitive spirit among students.",
    date: "18 Jun 2025",
    author: "Admin",
    image: sportsmeet,
    content: (
      <>
        <p className="mb-4">
          The <strong>Sports Meet 2082</strong> celebrated physical fitness, teamwork, and competitive spirit. Students participated in track and field events, team games, and fun challenges.
        </p>

        <h3 className="text-xl font-semibold mb-2">Event Highlights</h3>
        <p className="mb-2">- Athletics events including sprints, relays, long jump, and obstacle courses tested endurance and skill.</p>
        <p className="mb-2">- Team sports such as football, volleyball, and basketball encouraged strategy and cooperation.</p>
        <p className="mb-2">- Houses competed for points, promoting friendly competition and school spirit.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Impact & Feedback</h3>
        <p>The Sports Meet inspired students to maintain fitness, develop teamwork, and embrace leadership. Faculty praised sportsmanship and discipline among participants.</p>
      </>
    ),
  },

  {
    id: 8,
    title: "Science & Innovation Fair 2025",
    desc: "Students presented creative projects demonstrating scientific thinking and problem-solving.",
    date: "10 May 2025",
    author: "Admin",
    image: sciencefair,
    content: (
      <>
        <p className="mb-4">
          The <strong>Science & Innovation Fair 2025</strong> highlighted students’ creativity, scientific reasoning, and innovative problem-solving skills. Projects spanned physics, chemistry, biology, and technology applications.
        </p>

        <h3 className="text-xl font-semibold mb-2">Highlights</h3>
        <p className="mb-2">- Hands-on experiments and prototypes demonstrating key scientific principles.</p>
        <p className="mb-2">- Innovative use of technology, including robotics, AI, and coding projects.</p>
        <p className="mb-2">- Mentorship and evaluation by faculty and experts ensured constructive feedback.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Impact & Feedback</h3>
        <p>The fair fostered curiosity, experimentation, critical thinking, and collaboration. Students gained confidence in presenting ideas and applying knowledge in practical scenarios.</p>
      </>
    ),
  },
];


  const news = newsList.find((item) => item.id === parseInt(id));

  // ========== ERROR IF NEWS NOT FOUND ==========
  if (!news) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-gray-500">
        News not found 😢
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      {/* HERO SECTION */}
      <HeroSection
        image={valmikiHero}   // <-- now using your college building image
        title="News Details"
        subtitle="Explore full details about this news update from Valmiki College."
      />

      {/* NEWS CONTENT */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">

        {/* IMAGE */}
        <img
          src={news.image}
          alt={news.title}
          className="w-full rounded-2xl shadow-md mb-8"
        />

        {/* META INFO */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>📅 {news.date}</span>
          <span>📰 {news.author}</span>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-[#0F75BD] mb-4">{news.title}</h2>

 
    {/* CONTENT */}
<div className="text-gray-800 leading-relaxed space-y-4">
  {news.content}  {/* Render JSX content */}
</div>

        {/* BACK BUTTON */}
        <div className="mt-10">
          <Link
            to="/news-events"
            className="inline-block bg-[#0F75BD] text-white px-6 py-2 rounded-md hover:bg-[#0d63a5] transition"
          >
            ← Back to News
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NewsDetails;

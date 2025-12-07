import React from "react";
import { useParams, Link } from "react-router-dom";
import { Home } from "lucide-react";
import valmiki from "../assets/valmikicollegebuilding.jpg";
import blogHeroImg from "../assets/valmikibuilding.png";
import HeroSection from "../components/HeroSection";
import blog1 from "../assets/blog1.jpeg";
import blog2 from "../assets/blog2.jpeg";
import blog3 from "../assets/blog3.jpeg";
import blog4 from "../assets/blog4.jpeg";
import blog5 from "../assets/blog5.webp";
import blog6 from "../assets//blog6.jpeg";
const BlogDetails = () => {
  const { id } = useParams();

  // ========== EDUCATIONAL BLOG CONTENT ==========
const blogs = [
  {
    id: 1,
    title: "Why Choosing the Right College Matters for Your Future",
    desc: "Choosing the right college shapes your academic growth, mindset, network, and career opportunities.",
    category: "Education",
    author: "Saraswati Karki",
    date: "10 Dec 2023",
    image: blog1,
    content: `
      <p>
        Choosing the right college is one of the most important decisions in a student's life.
        The institution you select determines not only your academic growth but also your mindset,
        confidence, network, and long-term opportunities.
      </p>

      <h3>The Role of a Good College</h3>
      <ul>
        <li>Helps build a strong academic foundation</li>
        <li>Provides exposure to real-world skills</li>
        <li>Shapes discipline, leadership, and teamwork</li>
        <li>Guides you toward the right career path</li>
      </ul>

      <p>
        A supportive environment, well-trained faculty, and modern learning methods make a college
        the stepping stone to success. At Valmiki College, we ensure every student receives
        guidance, mentorship, and a platform to excel.
      </p>

      <h3>Extracurricular Activities and Personal Growth</h3>
      <p>
        A college is not just about classrooms and exams. Participation in clubs, sports, and cultural events
        helps students discover hidden talents, develop leadership skills, and build lasting friendships.
        These experiences also enhance creativity, time management, and adaptability.
      </p>

      <h3>Networking and Career Opportunities</h3>
      <p>
        The right college connects students with mentors, alumni, and industry professionals.
        Internships, workshops, and seminars provide practical exposure and open doors to scholarships
        and career placements. Building relationships early can have a long-lasting impact on your career.
      </p>

      <h3>Final Thoughts</h3>
      <p>
        Take time to research. Consider your strengths, interests, and goals. The right college is not just
        a building — it's the foundation of your future. Choose wisely, and invest in a place that nurtures
        both knowledge and character.
      </p>
    `,
  },

  {
    id: 2,
    title: "Top Study Techniques Every Student Should Know",
    desc: "Mastering the right study techniques improves learning efficiency, memory retention, and academic performance.",
    category: "Study Tips",
    author: "Anisha Shrestha",
    date: "8 Dec 2023",
    image: blog2,
    content: `
      <p>
        Studying smart is more effective than studying long hours. With the right techniques,
        students can improve memorization, understanding, and performance.
      </p>

      <h3>Most Effective Study Methods</h3>
      <ul>
        <li><strong>Pomodoro Technique:</strong> Study 25 minutes, break 5 minutes to maintain focus and prevent burnout.</li>
        <li><strong>Active Recall:</strong> Test yourself instead of rereading notes; it strengthens memory retention.</li>
        <li><strong>Spaced Repetition:</strong> Review concepts at increasing intervals to move knowledge from short-term to long-term memory.</li>
        <li><strong>Note Mapping:</strong> Use diagrams, charts, and mind maps to visualize relationships between ideas.</li>
      </ul>

      <h3>Additional Tips for Better Learning</h3>
      <p>
        Create a quiet, organized study space and remove distractions like social media. Prioritize subjects
        that need more attention and alternate between challenging and easier topics to maintain momentum.
      </p>

      <h3>Time Management and Planning</h3>
      <p>
        A well-structured timetable ensures that every subject gets enough focus. Allocate extra time for revision
        before exams and track progress weekly. Consistent practice builds strong study habits and confidence.
      </p>

      <h3>Mindset and Motivation</h3>
      <p>
        Stay positive and reward yourself for completing tasks. Set achievable goals and break complex topics
        into smaller sections. Motivation combined with proven techniques can drastically improve academic results.
      </p>
    `,
  },

  {
    id: 3,
    title: "How Technology Is Transforming Modern Education",
    desc: "Digital tools, AI, and virtual labs are reshaping classrooms and making education more accessible and innovative.",
    category: "Technology",
    author: "Krish Rana",
    date: "5 Dec 2023",
    image: blog3,
    content: `
      <p>
        Technology has changed the way students learn, teachers teach, and colleges operate.
        Digital tools have brought innovation, accessibility, and creativity to the classroom.
      </p>

      <h3>Key Transformations</h3>
      <ul>
        <li>Smart classrooms and interactive digital boards</li>
        <li>Online learning platforms and e-books for anytime, anywhere access</li>
        <li>AI-based learning tools that analyze student performance and personalize lessons</li>
        <li>Virtual labs and simulations to practice real-world applications</li>
      </ul>

      <h3>Benefits for Students</h3>
      <p>
        Technology enhances engagement, helps visualize complex concepts, and provides instant feedback.
        Students can learn at their own pace, revisit topics multiple times, and collaborate virtually
        with peers worldwide.
      </p>

      <h3>Bridging Gaps and Improving Accessibility</h3>
      <p>
        E-learning tools help students in remote areas access quality education. Digital libraries,
        online courses, and mobile learning apps ensure that no student is left behind due to location
        or resources.
      </p>

      <h3>Preparing for the Future</h3>
      <p>
        Embracing technology in education equips students with digital literacy, critical thinking,
        and problem-solving skills necessary for the modern workforce. At Valmiki College, we integrate
        these tools to create a stimulating and future-ready learning environment.
      </p>
    `,
  },

  {
    id: 4,
    title: "Soft Skills Every Student Should Master",
    desc: "Soft skills like communication, teamwork, and emotional intelligence are essential for career and personal success.",
    category: "Career",
    author: "Manisha Paudel",
    date: "2 Dec 2023",
    image: blog4,
    content: `
      <p>
        Soft skills are as important as academic knowledge. They determine how well you communicate,
        collaborate, and grow in real-life situations.
      </p>

      <h3>Essential Soft Skills</h3>
      <ul>
        <li>Communication and presentation skills to express ideas clearly</li>
        <li>Critical thinking and decision-making for problem-solving</li>
        <li>Teamwork and leadership for collaboration and guidance</li>
        <li>Emotional intelligence to manage relationships and stress effectively</li>
      </ul>

      <h3>Why Soft Skills Matter</h3>
      <p>
        Employers look for candidates who can adapt, lead, and work in teams. Strong soft skills
        improve employability, interpersonal relationships, and personal confidence.
      </p>

      <h3>How to Develop Them</h3>
      <p>
        Participate in group activities, volunteer, attend workshops, and practice active listening.
        Reflection on personal behavior, receiving feedback, and learning from experiences
        can strengthen these skills over time.
      </p>

      <h3>Long-Term Benefits</h3>
      <p>
        Mastering soft skills helps in career growth, leadership roles, and effective communication
        in both professional and personal life. Colleges play a major role in nurturing these abilities.
      </p>
    `,
  },

  {
    id: 5,
    title: "How to Improve Academic Performance in 30 Days",
    desc: "A structured 30-day plan can help students improve focus, retention, and overall performance.",
    category: "Study Tips",
    author: "Rohan Adhikari",
    date: "28 Nov 2023",
    image: blog5,
    content: `
      <p>
        Improving academic performance doesn't require magic—just discipline, strategy, and consistency.
        With the right habits, students can see noticeable progress in just 30 days.
      </p>

      <h3>30-Day Improvement Plan</h3>
      <ul>
        <li>Create a realistic study routine with dedicated slots for each subject</li>
        <li>Use active recall and practice tests for better retention</li>
        <li>Minimize distractions and focus on one task at a time</li>
        <li>Revise weekly and track your progress for continuous improvement</li>
      </ul>

      <h3>Effective Study Environment</h3>
      <p>
        Study in a quiet, organized space. Keep materials handy and maintain good lighting.
        A comfortable environment helps concentration and reduces fatigue.
      </p>

      <h3>Motivation and Tracking Progress</h3>
      <p>
        Set small daily goals and reward yourself upon completion. Track progress to stay motivated,
        and adjust strategies based on what works best for your learning style.
      </p>

      <h3>Consistency Over Intensity</h3>
      <p>
        Short, focused, and consistent study sessions are more effective than long, irregular ones.
        By following this plan, students can make tangible improvements within a month.
      </p>
    `,
  },

  {
    id: 6,
    title: "Why Continuous Learning Is Important in Today’s World",
    desc: "Lifelong learning keeps skills updated, improves career opportunities, and fosters personal growth.",
    category: "Education",
    author: "Deepak Subedi",
    date: "22 Nov 2023",
    image: blog6,
    content: `
      <p>
        The world is evolving rapidly — and so should we. Continuous learning helps individuals
        stay competitive, knowledgeable, and adaptable.
      </p>

      <h3>Benefits of Lifelong Learning</h3>
      <ul>
        <li>Keeps your skills updated and relevant in a changing world</li>
        <li>Opens new career opportunities and growth paths</li>
        <li>Boosts creativity, confidence, and problem-solving skills</li>
        <li>Encourages personal development, awareness, and adaptability</li>
      </ul>

      <h3>Methods to Keep Learning</h3>
      <p>
        Attend workshops, online courses, seminars, and conferences. Read books, articles, and research papers
        regularly. Practice skills through projects or volunteer work to solidify knowledge.
      </p>

      <h3>Mindset for Continuous Learning</h3>
      <p>
        Adopt a growth mindset, embrace challenges, and be open to feedback. Recognize learning
        as a lifelong journey rather than a destination.
      </p>

      <h3>Conclusion</h3>
      <p>
        At Valmiki College, we promote curiosity, innovation, and continuous improvement. Lifelong learning
        not only improves professional success but also enriches personal life and societal contribution.
      </p>
    `,
  },
];


  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-gray-500">
        Blog not found 😢
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

     
    {/* HERO SECTION */}
      <HeroSection
        image={blogHeroImg}
        title="Our Blogs"
        subtitle="Explore articles, insights, and stories from Valmiki College."
      />


      {/* BLOG CONTENT */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        <img src={blog.image} alt={blog.title} className="w-full rounded-2xl shadow-md mb-8" />

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>👤 {blog.author}</span>
          <span>{blog.date}</span>
        </div>

        <h2 className="text-2xl font-bold text-[#0F75BD] mb-4">{blog.title}</h2>

        <div
          className="text-gray-800 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

        <div className="mt-10">
          <Link
            to="/blogs"
            className="inline-block bg-[#0F75BD] text-white px-6 py-2 rounded-md hover:bg-[#0d63a5] transition"
          >
            ← Back to Blogs
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;

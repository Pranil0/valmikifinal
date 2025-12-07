import { Link } from "react-router-dom";
import academicsImg from "../assets/gallery/categories/academics.jpg";
import toursImg from "../assets/gallery/categories/tours.jpg";
import communityImg from "../assets/gallery/categories/community.jpg";
import infraImg from "../assets/gallery/categories/infrastructure.jpg";
import eventsImg from "../assets/gallery/categories/events.webp";
import sports from "../assets/gallery/categories/sports.jpg";
export default function GalleryCategories() {
  const categories = [
    { id: "academics", name: "Academics", image: academicsImg },
    { id: "tours-trips", name: "Tours & Trips", image: toursImg },
    { id: "community", name: "Social & Community Programs", image: communityImg },
    { id: "infrastructure", name: "Infrastructure & Facilities", image: infraImg },
    { id: "events", name: "Events & Celebrations", image: eventsImg },
        { id: "sports", name: "Sports", image: sports }

  ];

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Gallery Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              to={`/gallery/${cat.id}`}
              key={cat.id}
              className="shadow-lg rounded-xl overflow-hidden bg-white cursor-pointer 
              hover:scale-[1.04] transition-all block"
            >
              <div className="h-56 w-full">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover hover:brightness-75 transition"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api"; // your axios instance

export default function GalleryCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await API.get("/admin/albums"); // fetch albums/categories
        setCategories(res.data); // each album now has {id, name, slug, coverImage}
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Gallery Categories
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                to={`/gallery/${cat.slug}`}
                key={cat.id}
                className="shadow-lg rounded-xl overflow-hidden bg-white cursor-pointer hover:scale-[1.04] transition-all block"
              >
                <div className="h-56 w-full">
                  {cat.coverImage ? (
                    <img
                      src={`http://localhost:5000/uploads/gallery/${cat.slug}/${cat.coverImage}`}
                      alt={cat.name}
                      className="h-full w-full object-cover hover:brightness-75 transition"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No Cover
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-700">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
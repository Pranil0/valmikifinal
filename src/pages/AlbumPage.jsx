import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { saveAs } from "file-saver";
import { FiDownload, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api"; // your axios instance

export default function AlbumPage() {
  const { albumSlug } = useParams(); // get slug from URL
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Fetch album and its photos
  const fetchAlbumPhotos = async () => {
    if (!albumSlug) return;
    try {
      const res = await API.get(`/admin/albums/${albumSlug}`);
      setAlbum(res.data);
      setPhotos(res.data.Photos || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAlbumPhotos();
  }, [albumSlug]);

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    500: 1,
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

  return (
    <section className="py-16 min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 capitalize text-gray-800">
          {album?.name || albumSlug} Gallery
        </h2>

        {photos.length === 0 ? (
          <p className="text-gray-500">No images available yet.</p>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="mb-8 cursor-pointer overflow-hidden rounded-xl shadow-lg"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              >
                <img
                  src={`http://localhost:5000/uploads/gallery/${album.slug}/${photo.filename}`}
                  alt={photo.filename}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </Masonry>
        )}

        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            index={photoIndex}
            onIndexChange={setPhotoIndex}
            slides={photos.map((photo) => ({
              src: `http://localhost:5000/uploads/gallery/${album.slug}/${photo.filename}`,
              render: ({ slide }) => (
                <AnimatePresence>
                  <motion.img
                    key={slide.src}
                    src={slide.src}
                    alt=""
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>
              ),
            }))}
            toolbar={{
              buttons: [
                <button
                  key="download"
                  onClick={() =>
                    saveAs(
                      `http://localhost:5000/uploads/gallery/${album.slug}/${photos[photoIndex].filename}`,
                      `${album.slug}-${photoIndex + 1}.jpg`
                    )
                  }
                  className="p-2 ml-2 bg-white/90 text-gray-800 rounded-full shadow hover:bg-white transition"
                  title="Download"
                >
                  <FiDownload size={22} />
                </button>,
                <button
                  key="close"
                  onClick={() => setIsOpen(false)}
                  className="p-2 ml-2 bg-white/90 text-gray-800 rounded-full shadow hover:bg-white transition"
                  title="Close"
                >
                  <FiX size={22} />
                </button>,
              ],
            }}
          />
        )}
      </div>
    </section>
  );
}
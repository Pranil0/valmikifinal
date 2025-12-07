import { useState } from "react";
import { useParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { saveAs } from "file-saver";
import { FiDownload, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
// Images
import academics1 from "../assets/gallery/academics/academics1.jpg";
import academics2 from "../assets/gallery/academics/academics2.jpg";
import academics3 from "../assets/gallery/academics/academics3.jpg";
import academics4 from "../assets/gallery/academics/academics4.jpg";
import academics5 from "../assets/gallery/academics/academics5.jpg";
import academics6 from "../assets/gallery/academics/academics6.jpg";

import tours1 from "../assets/gallery/tours-trips/tours1.jpg";
import tours2 from "../assets/gallery/tours-trips/tours2.jpg";
import tours3 from "../assets/gallery/tours-trips/tours3.jpg";
import tours4 from "../assets/gallery/tours-trips/tours4.jpg";
import tours5 from "../assets/gallery/tours-trips/tours5.jpg";
import tours6 from "../assets/gallery/tours-trips/tours6.jpg";
import tours7 from "../assets/gallery/tours-trips/tours7.jpg";
import tours8 from "../assets/gallery/tours-trips/tours8.jpg";

import community1 from "../assets/gallery/social-community/community1.jpg";
import community2 from "../assets/gallery/social-community/community2.jpg";
import community3 from "../assets/gallery/social-community/community3.jpg";
import community4 from "../assets/gallery/social-community/community4.jpg";
import community5 from "../assets/gallery/social-community/community5.jpg";
import community6 from "../assets/gallery/social-community/community6.jpg";
import community7 from "../assets/gallery/social-community/community7.jpg";
import community8 from "../assets/gallery/social-community/community8.jpg";
import community9 from "../assets/gallery/social-community/community9.jpg";


import infrastructure1 from "../assets/gallery/infrastructure/infrastructure1.jpg";

import events1 from "../assets/gallery/events/events1.jpg";
import events2 from "../assets/gallery/events/events2.jpg";
import events3 from "../assets/gallery/events/events3.jpg";
import events4 from "../assets/gallery/events/events4.jpg";
import events5 from "../assets/gallery/events/events5.jpg";
import events6 from "../assets/gallery/events/events6.jpg";
import events7 from "../assets/gallery/events/events7.jpg";

// Gallery map
const galleryImages = {
  academics: [academics1, academics2, academics3, academics4, academics5, academics6],
  "tours-trips": [tours1, tours2, tours3,tours4,tours5,tours6,tours7,tours8],
  community: [community1, community2,community3,community4,community5,community6,community7,community8,community9],
  infrastructure: [infrastructure1],
  events: [events1, events2, events3,events4,events5,events6,events7],
};

export default function AlbumPage() {
  const { categoryId } = useParams();
  const images = galleryImages[categoryId] || [];

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    500: 1,
  };

  // Framer Motion variants
  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

   return (
    <section className="py-16 min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 capitalize text-gray-800">
          {categoryId.replace("-", " ")} Gallery
        </h2>

        {images.length === 0 ? (
          <p className="text-gray-500">No images available yet.</p>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="mb-8 cursor-pointer overflow-hidden rounded-xl shadow-lg"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
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
    slides={images.map((img) => ({
      src: img,
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
          onClick={() => saveAs(images[photoIndex], `${categoryId}-${photoIndex + 1}.jpg`)}
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
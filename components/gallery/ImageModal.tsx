"use client";

import { motion } from "framer-motion";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
  date: string;
  description?: string;
}

interface ImageModalProps {
  selectedImage: GalleryItem | null;
  onClose: () => void;
  onPrev: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
}

export default function ImageModal({
  selectedImage,
  onClose,
  onPrev,
  onNext,
}: ImageModalProps) {
  if (!selectedImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-6xl w-full rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/4 bg-gray-900 relative">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-full object-contain max-h-[80vh]"
            />

            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full transition-colors duration-200"
              onClick={onPrev}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full transition-colors duration-200"
              onClick={onNext}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="md:w-1/4 p-6 flex flex-col justify-between text-gray-900 dark:text-gray-100">
            <div>
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                  <p className="text-base opacity-75">{selectedImage.date}</p>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={onClose}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <p className="mb-4">{selectedImage.description}</p>

              <div className="mt-4">
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-blue-600 text-white">
                  {selectedImage.category}
                </span>
              </div>
            </div>

            {/* <div className="text-xs opacity-75 mt-6">
              Image ID: ACM-{selectedImage.id.toString().padStart(3, '0')}
            </div> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

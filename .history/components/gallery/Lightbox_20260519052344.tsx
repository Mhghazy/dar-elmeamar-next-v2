import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'react-feather';
import Image from 'next/image';
import { assets } from '@/lib/assets/assetFacade';

interface LightboxProps {
  images: string[]; // for the lightbox, we pass an array of image URLs, allowing users to navigate through multiple images within the same project or folder. This enhances the user experience by providing a seamless way to view all related images without having to exit the lightbox.
  altTexts?: string[]; // we also pass an array of alt texts corresponding to each image, ensuring that the lightbox is accessible and provides meaningful descriptions for users relying on screen readers.
  currentIndex: number; // the currentIndex prop keeps track of which image is currently being displayed in the lightbox. This allows us to implement navigation functionality, enabling users to move to the next or previous image in the array using the onNext and onPrev handlers.
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}


const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) => {
  if (currentIndex === -1) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // the lightbox is designed to cover the entire viewport with a dark, semi-transparent background that blurs the content behind it. This design choice helps to focus the user's attention on the image being viewed while still providing a sense of context by allowing a glimpse of the underlying page. The use of backdrop-blur-sm adds a subtle blur effect to the background, enhancing the visual appeal and ensuring that the lightbox stands out as a distinct layer above the main content.
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        // we attach the onClose handler to the entire lightbox container, allowing users to click anywhere outside the image to close the lightbox. This provides an intuitive way to exit the lightbox without having to specifically target a close button, enhancing the overall user experience.
        onClick={onClose}
      >
        {/* Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-8 right-8 p-3 text-white/70 hover:text-white transition-colors z-[10000]"
        >
          <X size={32} />
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 md:left-8 p-3 text-white/70 hover:text-white transition-colors z-[10000]"
            >
              <ChevronLeft size={48} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 md:right-8 p-3 text-white/70 hover:text-white transition-colors z-[10000]"
            >
              <ChevronRight size={48} />
            </button>
          </>
        )}

        {/* Image Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-[90vw] h-[80vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking on the image itself
        >
          <Image
            src={assets.resolveUrl(currentImage)}
            alt="Full size view"
            fill
            className="object-contain"
            quality={100}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
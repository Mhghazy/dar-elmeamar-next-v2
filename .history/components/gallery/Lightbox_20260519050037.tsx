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
const Lightbox = ({ image, onClose, altText }: any) => (
  <AnimatePresence>
    {image && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
          <X size={40} strokeWidth={1} />
        </button>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={assets.resolveUrl(image)}
            alt={altText}
            fill
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Lightbox;
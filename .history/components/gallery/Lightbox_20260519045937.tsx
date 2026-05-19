import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'react-feather';
import Image from 'next/image';
import { assets } from '@/lib/assets/assetFacade';

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
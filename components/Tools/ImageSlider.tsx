"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { assets } from '@/lib/assets/assetFacade';


type ImageSliderProps = {
  images: string[];
  interval?: number; // ms (مدة العرض الكاملة للصورة)
  transitionDuration?: number; // seconds (مدة الانتقال)
  className?: string;
  ariaLabel?: string;
  pauseOnHover?: boolean;
};

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  interval = 4000, // مدة العرض الكاملة (مثلاً 3 ثواني عرض + 1 ثانية انتقال)
  transitionDuration = 1,
  className = '',
  ariaLabel = 'Background image slider',
  pauseOnHover = true,
}) => {
  const [index, setIndex] = useState(0);
  const hoverRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const scheduleNext = () => {
      timeoutRef.current = window.setTimeout(() => {
        if (pauseOnHover && hoverRef.current) {
          scheduleNext(); // لو واقف بالماوس، استنى وبعدين جرّب تاني
          return;
        }
        setIndex((i) => (i + 1) % images.length);
        scheduleNext(); // جدولة الصورة اللي بعدها
      }, interval);
    };

    scheduleNext();

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [images, interval, pauseOnHover]);

  if (!images || images.length === 0) return null;

  // Motion variants
  const variants = {
    enter: { opacity: 0, scale: 1.03, y: 8 },
    center: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: -6 },
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      aria-label={ariaLabel}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      onTouchStart={() => pauseOnHover && (hoverRef.current = true)}
      onTouchEnd={() => pauseOnHover && (hoverRef.current = false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: transitionDuration, ease: 'easeInOut' }}
          style={{ willChange: 'opacity, transform' }}
        >
          <Image
            src={assets.resolveFullUrl(images[index])}
            alt=""
            fill
            priority={index === 0}
            loading={index === 0 ? undefined : 'lazy'}
            sizes="100vw"
            className="object-cover pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
      </div>
    </div>
  );
};

export default ImageSlider;


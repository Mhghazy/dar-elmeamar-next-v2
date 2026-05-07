"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cardStyleFromDepth, deckDepth } from "./deckMath";
import { assets } from "@/lib/assets/assetFacade";

interface Card {
  image: string;
  backgroundSize?: "cover" | "contain";
}

interface DraggableCardDeckProps {
  cards: Card[];
  cardWidth?: number;
  cardHeight?: number;
}

const THRESHOLD = 80;

const DraggableCardDeck: React.FC<DraggableCardDeckProps> = ({
  cards,
  cardWidth = 629,
  cardHeight = 354,
}) => {
  const n = cards.length;
  // topIdx = index of the card currently on TOP (front of deck)
  const [topIdx, setTopIdx] = useState(n - 1);
  const [locked, setLocked] = useState(false);

  const dragX = useMotionValue(0);
  // 3D tilt: drag right → rotateY negative (card tilts left = correct 3D flip direction)
  const rotateY = useTransform(dragX, [-300, 0, 300], [60, 0, -60]);
  // Slight vertical lift on drag
  const y = useTransform(dragX, [-300, 0, 300], [10, 0, 10]);

  const depth = (i: number) => deckDepth(i, topIdx, n);

  /* ── advance deck ─────────────────────────────────────────── */
  const advance = (dir: "next" | "prev") => {
    if (locked) return;
    setLocked(true);
    const flyX = dir === "next" ? -900 : 900;
    animate(dragX, flyX, {
      duration: 0.42,
      ease: [0.4, 0, 0.2, 1],
      onComplete: () => {
        setTopIdx((prev) =>
          dir === "next" ? (prev - 1 + n) % n : (prev + 1) % n
        );
        dragX.set(0);
        setLocked(false);
      },
    });
  };

  /* ── drag end ─────────────────────────────────────────────── */
  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (locked) return;
    const dx = info.offset.x;
    const vx = info.velocity.x;

    // Trigger flip if dragged far enough OR flicked fast enough
    if (Math.abs(dx) >= THRESHOLD || Math.abs(vx) > 500) {
      // Dragging RIGHT = prev card; dragging LEFT = next card
      advance(dx > 0 ? "prev" : "next");
    } else {
      animate(dragX, 0, { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] });
    }
  };

  /* ── render ───────────────────────────────────────────────── */
  return (
    <div className="flex flex-col items-center justify-center mt-10 w-full gap-6">
      {/* Deck */}
      <div className="overflow-hidden w-full shadow-xl h-[70vh] md:h-[80vh] lg:h-[90vh] relative">
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          {cards.map((card, i) => {
            const d = depth(i);
            const { scale, rotateZ, zIndex, opacity } = cardStyleFromDepth(d, n);
            const isFront = d === 0;

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  zIndex,
                  opacity,
                  userSelect: "none",
                  touchAction: "none",
                  cursor: isFront ? (locked ? "grabbing" : "grab") : "default",
                  ...(isFront ? { x: dragX, rotateY, y } : {}),
                }}
                drag={isFront && !locked ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.06}
                dragMomentum={false}
                onDrag={
                  isFront
                    ? (_, info) => dragX.set(info.offset.x)
                    : undefined
                }
                onDragEnd={isFront ? handleDragEnd : undefined}
                whileDrag={isFront ? { scale: 1.04, transition: { duration: 0.15 } } : undefined}
              >
                {/* Shadow glow under front card while dragging */}
                {isFront && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      filter: "blur(24px)",
                      background: "radial-gradient(ellipse, rgba(20,184,166,0.35) 0%, transparent 70%)",
                      transform: "translateY(24px) scaleX(0.9)",
                      zIndex: -1,
                    }}
                    animate={{ opacity: locked ? 0 : 1 }}
                  />
                )}

                <motion.div
                  className="rounded-xl border-4 border-white shadow-2xl will-change-transform overflow-hidden"
                  animate={{ scale, rotate: rotateZ }}
                  transition={{
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1], // spring-like overshoot
                  }}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    backgroundImage: `url(${assets.resolveFullUrl(card.image)})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: card.backgroundSize ?? "cover",
                    backgroundColor: "rgb(243, 244, 246)",
                    transformOrigin: "center center",
                    boxShadow: isFront
                      ? "0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)"
                      : "0 8px 32px rgba(0,0,0,0.25)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center gap-6 pb-4">
        {/* Prev */}
        <motion.button
          onClick={() => advance("prev")}
          disabled={locked}
          className="flex items-center justify-center w-14 h-14 rounded-full
                     bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700
                     shadow-lg text-gray-700 dark:text-gray-200
                     hover:bg-teal-500 hover:text-white hover:border-teal-500
                     dark:hover:bg-teal-500 dark:hover:text-white
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors duration-200"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronLeft size={26} />
        </motion.button>

        {/* Dot indicator */}
        <div className="flex gap-2">
          {Array.from({ length: Math.min(n, 10) }).map((_, dotI) => {
            const activeDot = (n - 1 - topIdx) % Math.min(n, 10);
            return (
              <motion.div
                key={dotI}
                className="rounded-full bg-gray-300 dark:bg-gray-600"
                animate={{
                  width: dotI === activeDot ? 24 : 8,
                  backgroundColor:
                    dotI === activeDot ? "#14b8a6" : undefined,
                  opacity: dotI === activeDot ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                style={{ height: 8 }}
              />
            );
          })}
        </div>

        {/* Next */}
        <motion.button
          onClick={() => advance("next")}
          disabled={locked}
          className="flex items-center justify-center w-14 h-14 rounded-full
                     bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700
                     shadow-lg text-gray-700 dark:text-gray-200
                     hover:bg-teal-500 hover:text-white hover:border-teal-500
                     dark:hover:bg-teal-500 dark:hover:text-white
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors duration-200"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronRight size={26} />
        </motion.button>
      </div>
    </div>
  );
};

export default DraggableCardDeck;

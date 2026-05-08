"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

interface VantaProps {
  enabled?: boolean;
  className?: string;
  color?: number;
  backgroundColor?: number;
}

const VantaBackground = ({
  enabled = true,
  className = "",
  color = 0x14b8a6,
  backgroundColor = 0x0f172a,
}: VantaProps) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

useEffect(() => {
  let effect: any = null;
  let timeout: NodeJS.Timeout;

  if (enabled && vantaRef.current) {
    // Delay initialization to prioritize text and initial UI rendering
    timeout = setTimeout(() => {
      if (!vantaRef.current) return;
      
      try {
        effect = NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 2.0,
          scaleMobile: 2.0,
          maxDistance: 25.0,
          color,
          backgroundColor,
        });
        setVantaEffect(effect);
      } catch (err) {
        console.error("Vanta initialization failed:", err);
      }
    }, 1000); // 1s delay for "bolt" feel on first render

    return () => {
      if (timeout) clearTimeout(timeout);
      if (effect) effect.destroy();
    };
  }
}, [enabled, color, backgroundColor]);

  return <>
    <div ref={vantaRef} className={`absolute inset-0  w-full h-full  ${className}`} />;
    {/* Overlay */}
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br
                      from-teal-300 via-white to-teal-500
                      dark:from-gray-900 dark:via-gray-800 dark:to-gray-950
                      opacity-90 pointer-events-none " ></div>

  </>
};

export default VantaBackground;


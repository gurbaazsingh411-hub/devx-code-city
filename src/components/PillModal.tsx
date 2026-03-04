"use client";

import { useEffect, useRef, useMemo } from "react";

interface PillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PillModal({ isOpen, onClose }: PillModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Pre-compute matrix rain characters to avoid hydration mismatch
  const rainColumns = useMemo(() =>
    Array.from({ length: 20 }, (_, i) =>
      Array.from({ length: 30 }, (_, j) =>
        String.fromCharCode(0x30a0 + ((i * 31 + j * 17 + 7) % 96))
      )
    ), []);

  useEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => {
      if (overlayRef.current) overlayRef.current.style.opacity = "1";
    });
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Matrix rain effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-[10px] leading-[12px] font-mono"
            style={{
              left: `${(i / 20) * 100}%`,
              color: "#00ff41",
              animation: `matrixRain ${3 + (i % 4)}s linear infinite`,
              animationDelay: `${(i * 0.3) % 3}s`,
            }}
          >
            {rainColumns[i].map((char, j) => (
              <div key={j}>{char}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        className="relative flex flex-col items-center gap-8 px-4"
        style={{ animation: "pillFadeIn 0.5s ease-out both" }}
      >
        {/* Title */}
        <h2
          className="font-pixel text-[14px] sm:text-[18px] tracking-wider text-center"
          style={{ color: "#00ff41" }}
        >
          THE TRUTH
        </h2>

        {/* Single red pill — the truth */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={onClose}
            className="group flex flex-col items-center gap-3 cursor-pointer transition-transform duration-200 hover:scale-110"
          >
            <div
              className="relative w-20 h-12 sm:w-24 sm:h-14 rounded-full"
              style={{
                background: "#cc0000",
                border: "3px solid #ff3333",
                boxShadow:
                  "4px 4px 0px #550000, 0 0 24px rgba(255, 0, 0, 0.25), inset -3px -3px 0px #880000, inset 3px 3px 0px #ee2222",
              }}
            >
              {/* Pixel highlight blocks */}
              <div className="absolute top-[4px] left-[10px] w-[10px] h-[4px]" style={{ background: "#ff6666" }} />
              <div className="absolute top-[4px] left-[22px] w-[6px] h-[3px]" style={{ background: "#ff4444" }} />
            </div>
            <span className="font-pixel text-[10px] sm:text-[12px] uppercase tracking-wider text-red-400 group-hover:text-red-300 transition-colors">
              See the truth
            </span>
          </button>
        </div>

        {/* Close hint */}
        <p className="font-pixel text-[8px] text-gray-600 tracking-wider mt-4">
          ESC TO CLOSE
        </p>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes matrixRain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pillFadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

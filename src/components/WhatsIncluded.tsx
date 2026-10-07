import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { ShieldCheck } from 'lucide-react';

interface WhatsIncludedProps {
  onScrollToForm?: () => void;
}

interface GalleryTile {
  num: string;
  tint: string;
  img: string;
  alt: string;
  title: string;
  text: string;
}

const TILES: GalleryTile[] = [
  {
    num: "01",
    tint: "#6E3B2E",
    img: "https://stadochtradgard.se/wp-content/uploads/2026/09/man-on-ladder-fonterputsing-1-768x1024.jpeg",
    alt: "Fönsterputsare på stege vid fasad",
    title: "Skinande rent",
    text: "Klassisk teknik helt utan ränder."
  },
  {
    num: "02",
    tint: "#1F3B4D",
    img: "https://stadochtradgard.se/wp-content/uploads/2026/09/window-cleaning-machine-fonterputsing-764x1024.jpeg",
    alt: "Putsning av inglasat uterum och glaspartier",
    title: "Trygg personal",
    text: "Utbildad och fullt ansvarsförsäkrad."
  },
  {
    num: "03",
    tint: "#2C3E2F",
    img: "https://stadochtradgard.se/wp-content/uploads/2026/09/man-cleaning-window-fonterputsing-1024x1024.jpeg",
    alt: "Fönsterputsare drar av fönster med skrapa",
    title: "Sedan 1998",
    text: "Över 25 års erfarenhet och nöjda kunder."
  }
];

const DURATION = 5500; // ms per tile

export default function WhatsIncluded({ onScrollToForm }: WhatsIncludedProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number>(performance.now());
  const elapsedRef = useRef<number>(0);

  // Auto-advance loop with progress bar
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (!isHoveredRef.current) {
        elapsedRef.current += delta;
        const currentProgress = Math.min(1, elapsedRef.current / DURATION);
        setProgress(currentProgress);

        if (elapsedRef.current >= DURATION) {
          elapsedRef.current = 0;
          setActiveIdx((prev) => (prev + 1) % TILES.length);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSelectTile = (idx: number) => {
    setActiveIdx(idx);
    elapsedRef.current = 0;
    setProgress(0);
    lastTimeRef.current = performance.now();
  };

  const handleKeyDown = (e: KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectTile(idx);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleSelectTile((idx + 1) % TILES.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handleSelectTile((idx - 1 + TILES.length) % TILES.length);
    }
  };

  return (
    <section 
      className="py-6 md:py-8 bg-[#fafafa] border-b border-gray-200/80" 
      id="fg-gallery" 
      aria-label="Därför väljer kunder oss"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-5 reveal-on-scroll">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C2833] font-display">
            Därför väljer kunder oss
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-600">
            Klassisk fönsterputsteknik och skinande rent resultat sedan 1998
          </p>
        </div>

        {/* 3 Interactive Expandable Tiles */}
        <div 
          className="fg-row reveal-on-scroll" 
          role="tablist"
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { 
            isHoveredRef.current = false; 
            lastTimeRef.current = performance.now(); 
          }}
        >
          {TILES.map((tile, idx) => {
            const isActive = activeIdx === idx;

            return (
              <article
                key={tile.num}
                className={`fg-tile ${isActive ? 'is-active' : ''}`}
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                style={{ ['--tint' as any]: tile.tint }}
                onClick={() => handleSelectTile(idx)}
                onMouseEnter={() => handleSelectTile(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                <img
                  className="fg-img"
                  src={tile.img}
                  alt={tile.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="fg-tint"></div>
                <div className="fg-blur"></div>

                {/* Caption Content */}
                <div className="fg-cap">
                  <h3 className="fg-title">{tile.title}</h3>
                  <div className="fg-more">
                    <div>
                      <p className="fg-text">{tile.text}</p>
                    </div>
                  </div>
                </div>

                {/* Progress bar (Bottom) */}
                <span className="fg-progress">
                  <i style={{ width: isActive ? `${progress * 100}%` : '0%' }}></i>
                </span>
              </article>
            );
          })}
        </div>

        {/* Guarantee Banner (Right Below Tiles) */}
        <div className="mt-4 sm:mt-5 bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs reveal-on-scroll">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="p-2.5 sm:p-3 bg-red-50 text-brand rounded-2xl border border-red-100 flex-shrink-0">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-brand" />
            </div>
            <div className="space-y-1 text-left">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 font-display">
                100% Besiktningsgaranti ingår alltid
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
                Har hyresvärden eller köparen en anmärkning vid slutbesiktningen åtgärdar vi det kostnadsfritt.
              </p>
            </div>
          </div>

          <button
            onClick={onScrollToForm}
            className="w-full md:w-auto whitespace-nowrap bg-brand hover:bg-brand-hover text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex-shrink-0"
          >
            Beräkna ditt fasta pris →
          </button>
        </div>

      </div>
    </section>
  );
}

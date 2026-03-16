import React, { useState, useEffect, useCallback } from "react";
import { slidesData } from "./data";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle, Zap, ShieldAlert, Trophy } from "lucide-react";

const SlideContent = ({ slide }: { slide: typeof slidesData[0] }) => {
  const isTitle = slide.type === "title";

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden relative z-10 font-sans">
      <div className="min-h-full flex flex-col justify-center max-w-5xl mx-auto w-full px-6 md:px-16 pt-12 pb-32 md:pt-16 md:pb-24">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 md:mb-8 mt-auto md:mt-0 pt-8 md:pt-0"
        >
          {slide.subtitle && (
            <h2 className={`text-orange-500 font-bold uppercase tracking-wider mb-2 ${isTitle ? "text-lg md:text-2xl" : "text-sm md:text-lg"}`}>
              {slide.subtitle}
            </h2>
          )}
          <h1 className={`text-white font-['Russo_One'] leading-tight ${isTitle ? "text-4xl sm:text-5xl md:text-7xl" : "text-3xl sm:text-4xl md:text-6xl"}`}>
            {slide.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6 mb-auto md:mb-0"
        >
          {slide.text && (
            <p className={`text-gray-300 ${isTitle ? "text-lg md:text-2xl max-w-3xl" : "text-base md:text-xl max-w-4xl"} leading-relaxed`}>
              {slide.text}
            </p>
          )}

          {slide.type === "text" && slide.highlight && (
            <div className="bg-orange-500/10 border-l-4 border-orange-500 p-5 md:p-6 rounded-r-lg mt-6 md:mt-8 max-w-4xl">
              <p className="text-white text-base md:text-xl font-medium">{slide.highlight}</p>
            </div>
          )}

          {slide.type === "bullets" && slide.bullets && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
              {slide.bullets.map((bullet, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="bg-black/60 md:bg-black/40 border border-white/10 p-5 md:p-6 rounded-xl backdrop-blur-sm hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <Zap className="text-orange-500 w-5 h-5 flex-shrink-0" />
                    <h3 className="text-white font-bold text-lg md:text-xl">{bullet.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm md:text-lg leading-relaxed">{bullet.text}</p>
                </motion.div>
              ))}
            </div>
          )}

          {slide.type === "stats" && slide.stats && (
            <div className="flex flex-col gap-6 mt-4 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {slide.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className={`bg-black/60 md:bg-black/50 border backdrop-blur-sm p-5 md:p-6 rounded-2xl flex flex-col items-center text-center ${idx === 0 ? 'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'border-white/10'}`}
                  >
                    {idx === 0 && <Trophy className="text-yellow-500 w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4" />}
                    <h4 className="text-gray-400 text-sm md:text-lg uppercase tracking-wider mb-1 md:mb-2 font-bold">{stat.label}</h4>
                    <p className={`font-['Russo_One'] ${idx === 0 ? 'text-3xl md:text-4xl text-yellow-500' : 'text-2xl md:text-3xl text-white'}`}>
                      {stat.value}
                    </p>
                    {stat.sub && <p className="text-yellow-500/80 text-xs md:text-sm mt-2 font-medium">{stat.sub}</p>}
                  </motion.div>
                ))}
              </div>
              {slide.highlight && (
                 <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-xl mt-2 md:mt-4">
                    <p className="text-gray-300 text-base md:text-xl">{slide.highlight}</p>
                 </div>
              )}
            </div>
          )}

          {slide.type === "checklist" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4 max-w-5xl">
              <div>
                <h3 className="text-white font-['Russo_One'] text-xl md:text-2xl mb-4 md:mb-6 flex items-center gap-3">
                  <ShieldAlert className="text-orange-500 w-5 h-5 md:w-6 md:h-6" />
                  Что делать?
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {slide.checklist?.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="flex items-start gap-3 md:gap-4 bg-white/5 p-3 md:p-4 rounded-xl border border-white/10"
                    >
                      <CheckCircle className="text-green-500 w-5 h-5 md:w-6 md:h-6 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-200 text-sm md:text-lg">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-['Russo_One'] text-xl md:text-2xl mb-4 md:mb-6">Контакты и сроки</h3>
                <div className="space-y-4 md:space-y-6">
                  {slide.contacts?.map((contact, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                    >
                      <p className="text-orange-500/80 text-xs md:text-sm uppercase font-bold tracking-wider mb-1">{contact.label}</p>
                      <p className="text-white text-base md:text-xl font-medium break-all md:break-normal">{contact.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {slide.footer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`mt-10 md:mt-12 text-gray-400 ${isTitle ? 'text-lg md:text-xl' : 'text-xs md:text-sm'} border-t border-white/10 pt-4 md:pt-6 max-w-5xl w-full`}
          >
            {slide.footer}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    if (currentIndex < slidesData.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space" || e.key === "Enter") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = slidesData[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-white flex flex-col relative font-sans select-none">
      {/* Background Image Setup */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img 
            src={currentSlide.image} 
            alt="Presentation Background" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60 z-0"></div>
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      {/* Decorative Grids / Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSI+PC9jaXJjbGU+Cjwvc3ZnPg==')] z-0"></div>

      <div className="flex-1 flex overflow-hidden relative z-10">
        <AnimatePresence custom={direction} mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex"
          >
            <SlideContent slide={currentSlide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation & Progress */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-between items-center px-8 md:px-16">
        <div className="flex gap-2">
          {slidesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-orange-500" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors border border-white/10 backdrop-blur-md text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === slidesData.length - 1}
            className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-30 disabled:hover:bg-orange-500 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.4)] text-white"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

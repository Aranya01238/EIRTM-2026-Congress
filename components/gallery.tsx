"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper/types"; // Import SwiperInstance type
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import { useState, useEffect, useRef } from "react"; // Import useEffect and useRef
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Volume2, VolumeX } from "lucide-react"; // Import icons

interface GalleryImage {
  id: number;
  title: string;
  query: string;
  src: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isMuted, setIsMuted] = useState(false); // Changed initial state to false
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref to hold the Audio object
  const swiperRef = useRef<SwiperInstance | null>(null); // Ref to hold the Swiper instance
  const gallerySectionRef = useRef<HTMLElement>(null); // Ref for the gallery section

  const images = [
    // ... (Your images array remains the same)
    {
      id: 1,
      title: "Conference Hall",
      query: "modern conference hall with blue and gold decor",
      src: "/gallery/conference-hall.png",
    },
    {
      id: 2,
      title: "Networking Event",
      query: "professional networking event with people",
      src: "/gallery/networking-event.png",
    },
    {
      id: 3,
      title: "Panel Discussion",
      query: "panel discussion on stage with speakers",
      src: "/gallery/panel-discussion.png",
    },
    {
      id: 4,
      title: "Keynote Speaker",
      query: "keynote speaker presenting to audience",
      src: "/gallery/keynote-speakers.png",
    },
    {
      id: 5,
      title: "Workshop Session",
      query: "interactive workshop session",
      src: "/gallery/workshop-session.png",
    },
    {
      id: 6,
      title: "Closing Ceremony",
      query: "closing ceremony celebration",
      src: "/gallery/image.png",
    },
  ];

  // --- Effect 1: Initialize Audio object once on component mount ---
  useEffect(() => {
    const audio = new Audio("/music/gallery-theme.mp3");
    audio.loop = true;
    audioRef.current = audio;

    // Cleanup: Pause and clear audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = null;
    };
  }, []); // Empty dependency array ensures this runs only once

  // --- Effect 2: Handle mouse events for playing/pausing music ---
  useEffect(() => {
    const currentGallerySection = gallerySectionRef.current;
    const currentAudio = audioRef.current;

    const handleMouseEnter = () => {
      // Play music only if not muted and audio object exists
      if (!isMuted && currentAudio) {
        currentAudio.play().catch((e) => console.error("Audio play failed:", e));
      }
    };

    const handleMouseLeave = () => {
      // Always pause music on mouse leave
      if (currentAudio) {
        currentAudio.pause();
      }
    };

    if (currentGallerySection) {
      currentGallerySection.addEventListener("mouseenter", handleMouseEnter);
      currentGallerySection.addEventListener("mouseleave", handleMouseLeave);
    }

    // Cleanup: Remove event listeners when component unmounts or dependencies change
    return () => {
      if (currentGallerySection) {
        currentGallerySection.removeEventListener("mouseenter", handleMouseEnter);
        currentGallerySection.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMuted]); // Dependency on isMuted ensures handlers get the latest mute state

  // --- Mute/Unmute Logic ---
  const toggleMute = () => {
    if (!audioRef.current) return;

    const newMutedState = !isMuted;
    setIsMuted(newMutedState); // Update the mute state

    if (newMutedState) {
      // If muting, pause immediately
      audioRef.current.pause();
    } else {
      // If unmuting, check if the mouse is currently over the section to play immediately
      if (gallerySectionRef.current && gallerySectionRef.current.matches(":hover")) {
        audioRef.current.play().catch((e) => console.error("Audio play failed:", e));
      }
    }
  };

  // --- Swiper Event Handling ---
  const handleSwiperInit = (swiper: SwiperInstance) => {
    swiperRef.current = swiper; // Save swiper instance
    // Removed autoplayStart/Stop listeners for audio, as music is now tied to section hover.
  };

  return (
    <section
      id="gallery"
      ref={gallerySectionRef} // Assign the ref to the section
      className="py-16 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-card via-card/90 to-card/80 {/* Reduced py-28 to py-16 */}
                 overflow-hidden
                 before:absolute before:inset-0 before:bg-[url('/patterns/circuit.svg')] 
                 before:opacity-10 before:bg-repeat before:[filter:drop-shadow(0_0_5px_#00ffff)]
                 after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-card/20"
      onMouseMove={(e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;

        currentTarget.style.setProperty("--mouse-x", `${x * 100}%`);
        currentTarget.style.setProperty("--mouse-y", `${y * 100}%`);
      }}
    >
      {/* Dynamic Spotlight Effect */}
      <div
        className="absolute inset-0 opacity-60
                   [background:radial-gradient(1000px_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(0,255,255,0.2),transparent_80%)]
                   motion-safe:animate-spotlight-pulse"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 relative"> {/* Reduced mb-16 to mb-8 */}
          {/* Gallery Title */}
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-primary mb-4">
            Gallery
          </h2>
          {/* Accent Underline */}
          <div className="h-1 w-24 bg-accent mx-auto [box-shadow:0_0_8px_#00ffff]"></div>

          {/* --- Mute Button --- */}
          <button
            onClick={toggleMute}
            className="absolute top-0 right-0 p-3 rounded-full cursor-pointer
                       transition-all duration-300 bg-white/10 text-accent backdrop-blur-sm
                       [box-shadow:0_0_10px_rgba(0,255,255,0.2)] hover:bg-white/20 hover:scale-110"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>

        <div className="relative">
          <Swiper
            onSwiper={handleSwiperInit} // Get Swiper instance on init
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={3}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            autoplay={{
              // Carousel now autoplays by default
              delay: 1000, // Decreased delay for faster auto-rotation
              disableOnInteraction: false, // Autoplay will resume after user interaction
            }}
            coverflowEffect={{
              rotate: 80, // Increased rotation for a more dramatic effect
              stretch: 40, // Further reduced stretch for even closer/more overlapping slides
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="w-full"
            style={{
              height: "380px", // Further reduced Swiper height
              overflow: "visible",
            }}
          >
            {images.map((image) => (
              <SwiperSlide
                key={image.id}
                className="group h-[350px] rounded-2xl overflow-hidden
                           transition-all duration-300 ease-in-out
                           hover:scale-105 cursor-pointer
                           bg-card/70 border border-cyan-700/50
                           [box-shadow:0_0_10px_rgba(0,255,255,0.1)]
                           hover:[box-shadow:0_0_20px_rgba(0,255,255,0.4)]
                           "
                style={{
                  height: "350px",
                }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300
                               group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent
                               flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100
                               transition-opacity duration-300"
                  >
                    <h3 className="text-primary font-poppins font-bold text-lg">
                      {image.title}
                    </h3>
                    <p className="text-primary/70 text-sm mt-2">
                      Click to view full image
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ... (Your Navigation Buttons remain the same) ... */}
          <div
            className="swiper-button-prev absolute top-1/2 left-4 -translate-y-1/2 z-10 p-3 rounded-full cursor-pointer
                       transition-all duration-300 bg-white/10 text-accent backdrop-blur-sm
                       [box-shadow:0_0_10px_rgba(0,255,255,0.2)] hover:bg-white/20 hover:scale-110"
          >
            <ArrowLeft size={24} />
          </div>
          <div
            className="swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 z-10 p-3 rounded-full cursor-pointer
                       transition-all duration-300 bg-white/10 text-accent backdrop-blur-sm
                       [box-shadow:0_0_10px_rgba(0,255,255,0.2)] hover:bg-white/20 hover:scale-110"
          >
            <ArrowRight size={24} />
          </div>

          <div className="swiper-pagination relative mt-4"></div> {/* Reduced margin-top from mt-12 to mt-4 */}
        </div>
      </div>

      {/* ... (Your Modal code remains the same) ... */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center
                     animate-fade-in p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-7xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-accent hover:text-white
                         bg-card/70 backdrop-blur-sm rounded-full p-2
                         [box-shadow:0_0_15px_rgba(0,255,255,0.4)]
                         transition-all duration-200 z-10 hover:scale-110"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} />
            </button>

            <div
              className="bg-card/70 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl
                            border border-cyan-700/50 [box-shadow:0_0_20px_rgba(0,255,255,0.3)]"
            >
              <div className="relative w-full h-[70vh] sm:h-[75vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4 border-t border-cyan-700/5Note:">
                <h3 className="text-primary text-xl font-poppins font-bold">
                  {selectedImage.title}
                </h3>
                <p className="text-primary/70 mt-2">{selectedImage.query}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

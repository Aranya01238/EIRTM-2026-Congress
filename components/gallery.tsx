"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper/types";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Volume2, VolumeX } from "lucide-react";

interface GalleryImage {
  id: number;
  title: string;
  query: string;
  src: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const gallerySectionRef = useRef<HTMLElement>(null);

  const images = [
    {
      id: 1,
      title: "Conference Hall",
      query: "modern conference hall",
      src: "/gallery/conference-hall.png",
    },
    {
      id: 2,
      title: "Networking Event",
      query: "professional networking event",
      src: "/gallery/networking-event.png",
    },
    {
      id: 3,
      title: "Panel Discussion",
      query: "panel discussion on stage",
      src: "/gallery/panel-discussion.png",
    },
    {
      id: 4,
      title: "Keynote Speaker",
      query: "keynote speaker presenting",
      src: "/gallery/keynote-speakers.png",
    },
    {
      id: 5,
      title: "Workshop Session",
      query: "interactive workshop",
      src: "/gallery/workshop-session.png",
    },
    {
      id: 6,
      title: "Closing Ceremony",
      query: "celebration event",
      src: "/gallery/image.png",
    },
  ];

  useEffect(() => {
    const audio = new Audio("/music/gallery-theme.mp3");
    audio.loop = true;
    audioRef.current = audio;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const section = gallerySectionRef.current;
    const audio = audioRef.current;
    const play = () => !isMuted && audio?.play().catch(console.error);
    const pause = () => audio?.pause();

    section?.addEventListener("mouseenter", play);
    section?.addEventListener("mouseleave", pause);
    return () => {
      section?.removeEventListener("mouseenter", play);
      section?.removeEventListener("mouseleave", pause);
    };
  }, [isMuted]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const muted = !isMuted;
    setIsMuted(muted);
    if (muted) audioRef.current.pause();
    else if (gallerySectionRef.current?.matches(":hover")) {
      audioRef.current.play().catch(console.error);
    }
  };

  const handleSwiperInit = (swiper: SwiperInstance) =>
    (swiperRef.current = swiper);

  return (
    <section
      id="gallery"
      ref={gallerySectionRef}
      className="relative py-20 px-6 sm:px-8 lg:px-12 overflow-hidden bg-gradient-to-b from-[#E0F7FA] via-[#D1F2F8] to-[#EAFDFF]"
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-10 bg-repeat"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10"></div>
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(900px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(103,232,249,0.2), transparent 80%)`,
        }}
      ></div>

      {/* Header */}
      <div className="max-w-7xl mx-auto relative z-10 text-center mb-14">
        <h2 className="text-5xl sm:text-6xl font-poppins font-bold text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 bg-clip-text drop-shadow-[0_0_10px_rgba(103,232,249,0.4)]">
          Gallery
        </h2>
        <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_12px_#0ff] mb-10 animate-pulse"></div>

        {/* Mute button */}
        <button
          onClick={toggleMute}
          className="absolute right-6 sm:right-12 top-4 p-3 rounded-full bg-white/10 backdrop-blur-md text-cyan-400 border border-cyan-400/50 shadow-[0_0_12px_rgba(103,232,249,0.5)] hover:shadow-[0_0_20px_rgba(103,232,249,0.9)] hover:scale-110 transition-all"
        >
          {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </button>
      </div>

      {/* Swiper */}
      <div className="max-w-7xl mx-auto relative z-10">
        <Swiper
          onSwiper={handleSwiperInit}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          autoplay={{ delay: 1800, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 60,
            stretch: 20,
            depth: 120,
            modifier: 1.5,
            slideShadows: true,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="overflow-visible"
          style={{
            height: "min(60vh, 520px)", // ✅ responsive height
            overflow: "visible",
          }}
        >
          {images.map((img) => (
            <SwiperSlide
              key={img.id}
              className="group relative rounded-2xl overflow-hidden border border-cyan-200 bg-[#f8feff]/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(103,232,249,0.15)] hover:shadow-[0_0_35px_rgba(103,232,249,0.9)] hover:border-cyan-400"
              style={{
                height: "450px",
                aspectRatio: "3 / 4",
              }}
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-cyan-300 font-bold text-lg drop-shadow-[0_0_6px_rgba(103,232,249,0.8)]">
                  {img.title}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  Click to view full image
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <div className="swiper-button-prev absolute top-1/2 left-4 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 text-cyan-300 border border-cyan-300/40 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(103,232,249,0.8)] transition-all backdrop-blur-sm">
          <ArrowLeft size={24} />
        </div>
        <div className="swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 text-cyan-300 border border-cyan-300/40 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(103,232,249,0.8)] transition-all backdrop-blur-sm">
          <ArrowRight size={24} />
        </div>

        <div className="swiper-pagination relative mt-6"></div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-cyan-400 hover:text-white hover:drop-shadow-[0_0_15px_rgba(103,232,249,0.8)] transition-transform hover:scale-110"
              onClick={() => setSelectedImage(null)}
            >
              <X size={30} />
            </button>

            <div className="bg-white/10 border border-cyan-300/40 backdrop-blur-lg rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(103,232,249,0.6)] hover:shadow-[0_0_70px_rgba(103,232,249,1)] transition-all">
              <div className="relative w-full h-[70vh] sm:h-[75vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-5 border-t border-cyan-200/20">
                <h3 className="text-cyan-300 text-xl font-bold drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-200 text-sm mt-2">
                  {selectedImage.query}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

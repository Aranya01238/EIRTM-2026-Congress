"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper modules
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

// --- CSS Imports ---
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
// --- End CSS Imports ---

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Icons for navigation

export default function Gallery() {
  const images = [
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

  return (
    <section id="gallery" className="py-28 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-primary mb-4">
            Gallery
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto"></div>
        </div>

        <div className="relative">
          <Swiper
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
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
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
              // --- CRITICAL FIX: Increased height for more vertical space ---
              height: "600px", // Changed from 500px to 600px
              // --- Ensure no unnecessary overflow clipping on the Swiper container itself ---
              overflow: "visible", // This helps if the Swiper container was clipping its own 3D content
            }}
          >
            {images.map((image) => (
              <SwiperSlide
                key={image.id}
                className="group h-[400px] rounded-2xl overflow-hidden shadow-xl
                           transition-all duration-300 ease-in-out
                           hover:scale-105"
                style={{
                  height: "400px", // Individual slide height remains 400px
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300
                               group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h3 className="text-white font-poppins font-bold text-lg">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-button-prev absolute top-1/2 left-4 -translate-y-1/2 z-10 p-2 rounded-full cursor-pointer transition-all bg-white/10 text-primary backdrop-blur-sm hover:bg-white/20">
            <ArrowLeft size={24} />
          </div>
          <div className="swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 z-10 p-2 rounded-full cursor-pointer transition-all bg-white/10 text-primary backdrop-blur-sm hover:bg-white/20">
            <ArrowRight size={24} />
          </div>

          <div className="swiper-pagination relative mt-12"></div>
        </div>
      </div>
    </section>
  );
}

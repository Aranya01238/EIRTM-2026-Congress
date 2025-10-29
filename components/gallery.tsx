"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const images = [
    { id: 1, title: "Conference Hall", query: "modern conference hall with blue and gold decor" },
    { id: 2, title: "Networking Event", query: "professional networking event with people" },
    { id: 3, title: "Panel Discussion", query: "panel discussion on stage with speakers" },
    { id: 4, title: "Keynote Speaker", query: "keynote speaker presenting to audience" },
    { id: 5, title: "Workshop Session", query: "interactive workshop session" },
    { id: 6, title: "Closing Ceremony", query: "closing ceremony celebration" },
  ]

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-poppins font-bold text-primary mb-4">Gallery</h2>
          <div className="h-1 w-24 bg-accent mx-auto"></div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                index % 3 === 0 ? "md:col-span-1 lg:row-span-2" : ""
              }`}
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="relative w-full h-64 md:h-80 lg:h-96">
                <img
                  src={`/.jpg?height=400&width=400&query=${encodeURIComponent(image.query)}`}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-end p-4">
                <h3 className="text-white font-poppins font-bold text-lg">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-accent transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={`/.jpg?height=600&width=800&query=${encodeURIComponent(images[selectedImage - 1].query)}`}
              alt={images[selectedImage - 1].title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  )
}

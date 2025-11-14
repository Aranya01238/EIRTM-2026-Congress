"use client";

import React from "react";

type TimelineItem = {
  title: string;
  date: string;
  note?: string;
};

const items: TimelineItem[] = [
  {
    title: "Full Paper Submission",
    date: "10th December, 2026",
    note: "Submit manuscripts for review",
  },
  {
    title: "Acceptance Notification",
    date: "10th January, 2026",
    note: "Decision emails sent to authors",
  },
  {
    title: "Registration",
    date: "20th March, 2026",
    note: "Complete author/attendee registration",
  },
  {
    title: "Presentation Submission",
    date: "20th March, 2026",
    note: "Upload final slide deck",
  },
  {
    title: "Conference Days",
    date: "21st – 23rd April, 2026",
    note: "Paris, Europe",
  },
];

export default function TimeLine() {
  return (
    <section
      id="timeline"
      className="relative py-24 sm:py-32 bg-[#030616] overflow-hidden"
    >
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#012130] via-[#00101a] to-[#00040a] opacity-80" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-cyan-200 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">
            Important Dates Timeline
          </h2>
          <p className="text-cyan-300 mt-4 text-lg sm:text-xl">
            Track key milestones leading up to EIRTM 2026
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Center vertical glowing line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 
            bg-gradient-to-b from-cyan-300 via-blue-400 to-cyan-300 
            shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          />

          <div className="flex flex-col gap-20">
            {items.map((item, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={item.title}
                  className={`relative flex w-full ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Card */}
                  <div
                    className="w-full max-w-xl p-8 rounded-3xl bg-white/10 backdrop-blur-xl 
                    border border-cyan-300/20 shadow-[0_0_30px_rgba(0,255,255,0.15)]
                    hover:shadow-[0_0_50px_rgba(0,255,255,0.35)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse 
                        shadow-[0_0_12px_rgba(0,255,255,0.8)]"
                      />

                      <h3 className="text-xl sm:text-2xl font-semibold text-cyan-200">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-base sm:text-lg text-cyan-100 font-medium">
                      {item.date}
                    </p>

                    {item.note && (
                      <p className="text-sm sm:text-base text-cyan-300 mt-2">
                        {item.note}
                      </p>
                    )}
                  </div>

                  {/* Dot on center line */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="w-5 h-5 rounded-full bg-cyan-300 
                      shadow-[0_0_20px_rgba(0,255,255,0.8)] border border-cyan-400"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="relative py-16 sm:py-24 bg-[#030616]">
      {/* Background tint to match hero contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001933aa] via-[#001233aa] to-[#000622aa]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main content */}
          <div
            className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-cyan-400/30 
            shadow-[0_0_45px_5px_rgba(0,255,255,0.15)] hover:shadow-[0_0_70px_10px_rgba(0,255,255,0.35)] transition-all"
          >
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-cyan-200 drop-shadow-[0_0_12px_rgba(0,255,255,0.4)]">
                About EIRTM 2026
              </h2>
            </div>

            <p className="text-cyan-300 text-sm sm:text-base leading-relaxed mb-4">
              European Congress on Interdisciplinary Research in Technology and
              Management (EIRTM, 2026) is a distinguished annual academic event
              that brings together scholars, researchers, and professionals from
              around the world to share insights and advancements in the fields
              of technology, innovation, and management.
            </p>

            <p className="text-cyan-300 text-sm sm:text-base leading-relaxed mb-4">
              Under this collaborative banner, there are 2 major Conferences,
            </p>

            <p className="text-cyan-300 text-sm sm:text-base leading-relaxed mb-3">
              one being Engineering Conference, titled “International Conference
              on Emerging Computing &amp; Innovative Technologies” (ICECIT, 2026
              – Paris, Europe).
            </p>
            <div className="mt-2">
              <Link
                href="https://icecit2026.smartsociety.org/"
                className="w-full px-5 sm:px-6 py-3 bg-cyan-500/20 backdrop-blur-md border border-cyan-400 text-cyan-200 font-semibold rounded-xl transition-all duration-300 hover:bg-cyan-400 hover:text-black text-center text-sm sm:text-base"
              >
                🧠 ICECIT 2026 (Engineering)
              </Link>
            </div>

            <p className="text-cyan-300 text-sm sm:text-base leading-relaxed mt-6 mb-3">
              The 2nd one being Management Conference, titled “International
              Conference on Economics, Business and Management” (ICEBM, 2026 –
              Paris, Europe).
            </p>
            <div className="mt-2">
              <Link
                href="https://icebm2026.smartsociety.org/"
                className="w-full px-5 sm:px-6 py-3 bg-blue-500/20 backdrop-blur-md border border-blue-400 text-blue-200 font-semibold rounded-xl transition-all duration-300 hover:bg-blue-400 hover:text-black text-center text-sm sm:text-base"
              >
                💼 ICEBM 2026 (Management)
              </Link>
            </div>
          </div>

          {/* Important Deadlines */}
          <aside
            className="p-5 sm:p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-cyan-400/30 
            shadow-[0_0_45px_5px_rgba(0,255,255,0.15)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base sm:text-xl font-poppins font-semibold text-cyan-200">
                Important Deadlines
              </h4>
              <span className="h-1 w-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
            </div>

            <div className="space-y-4 sm:space-y-5 text-cyan-200">
              <div className="border-b border-cyan-400/20 pb-4">
                <p className="text-xs sm:text-sm text-cyan-300">
                  Full Paper Submission:
                </p>
                <p className="text-sm sm:text-base font-semibold">
                  10th December, 2026
                </p>
              </div>
              <div className="border-b border-cyan-400/20 pb-4">
                <p className="text-xs sm:text-sm text-cyan-300">
                  Acceptance Notification:
                </p>
                <p className="text-sm sm:text-base font-semibold">
                  10th January, 2026
                </p>
              </div>
              <div className="border-b border-cyan-400/20 pb-4">
                <p className="text-xs sm:text-sm text-cyan-300">
                  Registration:
                </p>
                <p className="text-sm sm:text-base font-semibold">
                  20th March, 2026
                </p>
              </div>
              <div className="border-b border-cyan-400/20 pb-4">
                <p className="text-xs sm:text-sm text-cyan-300">
                  Presentation Submission:
                </p>
                <p className="text-sm sm:text-base font-semibold">
                  20th March, 2026
                </p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-cyan-300">
                  Conference ON:
                </p>
                <p className="text-sm sm:text-base font-semibold">
                  21st – 23rd April, 2026
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

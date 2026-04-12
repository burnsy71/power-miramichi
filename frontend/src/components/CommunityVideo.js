import { useLang } from "@/LanguageContext";
import { Play } from "lucide-react";

const VIDEO_ID = "1rj0Kaqx6ae2HBwZKENxIuClT8SY6kKAT";
const EMBED_URL = `https://drive.google.com/file/d/${VIDEO_ID}/preview`;

export default function CommunityVideo() {
  const { lang, t } = useLang();

  return (
    <section
      id="video"
      data-testid="video-section"
      className="py-24 lg:py-32 bg-[#FDFCF8]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="lg:col-span-4">
            <span className="inline-block text-xs tracking-[0.25em] uppercase font-sans font-medium text-[#CC5A37] mb-4">
              {t.video.label}
            </span>
            <h2
              data-testid="video-heading"
              className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E392A] mb-6"
            >
              {t.video.heading}
            </h2>
            <p className="font-sans text-base text-[#1E392A]/60 leading-relaxed">
              {t.video.subtitle}
            </p>
            <div className="mt-6 flex items-center gap-3 text-[#CC5A37]">
              <div className="p-2 rounded-full bg-[#CC5A37]/10">
                <Play size={16} />
              </div>
              <span className="font-sans text-sm font-medium">
                {lang === "fr" ? "Regardez la vid\u00E9o" : "Watch the video"}
              </span>
            </div>
          </div>

          {/* Video Embed */}
          <div className="lg:col-span-8">
            <div
              data-testid="video-embed"
              className="relative rounded-2xl overflow-hidden border border-[#E5DFD3] shadow-lg"
              style={{ paddingBottom: "56.25%", height: 0 }}
            >
              <iframe
                src={EMBED_URL}
                title="Shawn Power - Community"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

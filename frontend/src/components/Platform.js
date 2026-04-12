import { Building2, Receipt, Medal, Route, BusFront } from "lucide-react";

const BRIDGE_IMG = "https://images.unsplash.com/photo-1683669446962-94846d059003?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxicmlkZ2UlMjBzdW5zZXR8ZW58MHx8fHwxNzc1OTkwNzQ3fDA&ixlib=rb-4.1.0&q=85";

const platformItems = [
  {
    icon: Building2,
    title: "The Planning Commission",
    summary: "Creating an in-house planning commission that works for you, not against you.",
    detail:
      "The city needs its own in-house planning commission with a liaison who works directly with people requiring their services. Anyone wanting to spend money growing this city should only have positive experiences. We cannot afford to have new businesses turn away because of bad experiences or a bad reputation.",
    size: "large",
  },
  {
    icon: Receipt,
    title: "Taxes",
    summary: "Long-term tax freeze to foster residential growth.",
    detail:
      "Once the new planning commission is installed, we will implement a long-term tax freeze on tax bill increases and look at every opportunity to lower tax bills. The tax freeze should remain on your property even for improvements such as additions or garages for as long as you live in and own your home. New growth in home builds will attract new businesses.",
    size: "medium",
  },
  {
    icon: Medal,
    title: "Veterans",
    summary: "Protecting our veterans' memorials — forever.",
    detail:
      "We will create a bylaw that directly states how we, the citizens, feel about our veterans. Under no future circumstances can our veterans' memorials be removed, covered or defaced due to changing ideals or beliefs. It is important that our pride in our veterans is forever evident for all future generations to know, not just on Remembrance Day.",
    size: "medium",
  },
  {
    icon: Route,
    title: "Northern Bypass",
    summary: "A new northern street now — not years from now.",
    detail:
      "We can connect the asphalt between Beaverbrook Road and McKinnon Road for immediate temporary relief. There is 2.5 km between these roads. The cost is approximately $2.5 to $3 million and can be done in one season. This will be a new street for local traffic so that favorite shopping destinations can be accessed while we continue to lobby the province.",
    size: "medium",
  },
  {
    icon: BusFront,
    title: "Centennial Bridge Sidewalk",
    summary: "Practical local solutions over $50M provincial projects.",
    detail:
      "The city could easily install bus stops at each end of the bridge and transport those waiting from one side to the other, free of charge, as the bus travels over on its regular route. This would save provincial taxpayers $50 million and provide a real solution for Miramichiers. We don't always have to rely on the province.",
    size: "large",
  },
];

export default function Platform() {
  return (
    <section
      id="platform"
      data-testid="platform-section"
      className="py-24 lg:py-32 bg-[#F3EFE7]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <span className="inline-block text-xs tracking-[0.25em] uppercase font-sans font-medium text-[#CC5A37] mb-4">
            The Platform
          </span>
          <h2
            data-testid="platform-heading"
            className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E392A] mb-4"
          >
            Real Plans for Miramichi
          </h2>
          <p className="font-sans text-lg text-[#1E392A]/60 max-w-2xl">
            Concrete actions — not empty promises. Here's what Shawn will fight for as your mayor.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Planning Commission - Large card */}
          <div
            data-testid="platform-card-planning"
            className="col-span-12 md:col-span-8 platform-card rounded-2xl bg-[#FDFCF8] border border-[#E5DFD3] p-8 lg:p-10"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="p-3 rounded-xl bg-[#1E392A] text-white shrink-0">
                <Building2 size={22} />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1E392A]">
                  {platformItems[0].title}
                </h3>
                <p className="font-sans text-sm text-[#CC5A37] font-medium mt-1">
                  {platformItems[0].summary}
                </p>
              </div>
            </div>
            <p className="font-sans text-base text-[#1E392A]/70 leading-relaxed">
              {platformItems[0].detail}
            </p>
          </div>

          {/* Taxes - Medium card */}
          <div
            data-testid="platform-card-taxes"
            className="col-span-12 md:col-span-4 platform-card rounded-2xl bg-[#1E392A] p-8 lg:p-10 text-white"
          >
            <div className="p-3 rounded-xl bg-white/10 w-fit mb-5">
              <Receipt size={22} />
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-2">
              {platformItems[1].title}
            </h3>
            <p className="font-sans text-sm text-[#E2AA54] font-medium mb-4">
              {platformItems[1].summary}
            </p>
            <p className="font-sans text-sm text-white/70 leading-relaxed">
              {platformItems[1].detail}
            </p>
          </div>

          {/* Veterans */}
          <div
            data-testid="platform-card-veterans"
            className="col-span-12 md:col-span-4 platform-card rounded-2xl bg-[#FDFCF8] border border-[#E5DFD3] p-8 lg:p-10"
          >
            <div className="p-3 rounded-xl bg-[#CC5A37] text-white w-fit mb-5">
              <Medal size={22} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1E392A] mb-2">
              {platformItems[2].title}
            </h3>
            <p className="font-sans text-sm text-[#CC5A37] font-medium mb-4">
              {platformItems[2].summary}
            </p>
            <p className="font-sans text-sm text-[#1E392A]/70 leading-relaxed">
              {platformItems[2].detail}
            </p>
          </div>

          {/* Bypass */}
          <div
            data-testid="platform-card-bypass"
            className="col-span-12 md:col-span-4 platform-card rounded-2xl bg-[#FDFCF8] border border-[#E5DFD3] p-8 lg:p-10"
          >
            <div className="p-3 rounded-xl bg-[#E2AA54] text-[#1E392A] w-fit mb-5">
              <Route size={22} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1E392A] mb-2">
              {platformItems[3].title}
            </h3>
            <p className="font-sans text-sm text-[#CC5A37] font-medium mb-4">
              {platformItems[3].summary}
            </p>
            <p className="font-sans text-sm text-[#1E392A]/70 leading-relaxed">
              {platformItems[3].detail}
            </p>
          </div>

          {/* Centennial Bridge - accented */}
          <div
            data-testid="platform-card-bridge"
            className="col-span-12 md:col-span-4 platform-card rounded-2xl overflow-hidden relative"
          >
            <img
              src={BRIDGE_IMG}
              alt="Bridge at sunset"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E392A] via-[#1E392A]/70 to-transparent" />
            <div className="relative p-8 lg:p-10 flex flex-col justify-end min-h-[320px] text-white">
              <div className="p-3 rounded-xl bg-white/15 w-fit mb-4">
                <BusFront size={22} />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">
                {platformItems[4].title}
              </h3>
              <p className="font-sans text-sm text-[#E2AA54] font-medium mb-3">
                {platformItems[4].summary}
              </p>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                {platformItems[4].detail}
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-[#FDFCF8] border border-[#E5DFD3]">
            <p className="font-serif text-lg text-[#1E392A] italic leading-relaxed max-w-xl">
              "This platform is only as good as the 8 candidates that you elect as councilors.
              Please vote for those candidates supporting this platform so that accomplishing the goals can be swift."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

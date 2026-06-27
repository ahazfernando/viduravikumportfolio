import Image from "next/image";

type MarqueeLogo = {
  src: string;
  alt: string;
  circleBg?: boolean;
};

const MARQUEE_LOGOS: MarqueeLogo[] = [
  { src: "/marqueelogos/HTML5Logo.png", alt: "HTML5" },
  { src: "/marqueelogos/CSSLogo.png", alt: "CSS" },
  { src: "/marqueelogos/JavaScriptLogo.png", alt: "JavaScript" },
  { src: "/marqueelogos/React.JsLogo.png", alt: "React" },
  { src: "/marqueelogos/NextJsLogoD1.png", alt: "Next.js" },
  { src: "/marqueelogos/Node.JsLogo.png", alt: "Node.js" },
  { src: "/marqueelogos/AngularLogo.png", alt: "Angular" },
  { src: "/marqueelogos/PythonLogo.png", alt: "Python" },
  {
    src: "/marqueelogos/Amazon-Web-Services-AWS-Emblem%201.png",
    alt: "AWS",
  },
  { src: "/marqueelogos/GitLogo.png", alt: "Git" },
  { src: "/marqueelogos/Githublogo.png", alt: "GitHub", circleBg: true },
];

const MARQUEE_ITEMS = [...MARQUEE_LOGOS, ...MARQUEE_LOGOS];

export function HeroLogoMarquee() {
  return (
    <section
      aria-label="Technologies"
      className="relative z-10 w-full max-w-[100vw] border-t border-border/50 bg-background py-6 md:py-8"
    >
      <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max max-w-none animate-marquee items-center gap-4 md:gap-5">
          {MARQUEE_ITEMS.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="flex h-16 w-16 shrink-0 items-center justify-center md:h-20 md:w-20"
            >
              {logo.circleBg ? (
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white md:h-[4.5rem] md:w-[4.5rem]">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={80}
                    height={80}
                    className="h-[78%] w-[78%] object-contain"
                  />
                </span>
              ) : (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={80}
                  className="h-14 w-14 object-contain md:h-[4.5rem] md:w-[4.5rem]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

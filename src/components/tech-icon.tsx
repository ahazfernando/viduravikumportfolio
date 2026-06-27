import { FileText, Globe, GraduationCap, Palette, type LucideIcon } from "lucide-react";

import { TECH_CUSTOM_ICONS, TECH_ICON_SLUGS, TECH_LUCIDE_FALLBACKS } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

const LUCIDE_BY_NAME: Record<string, LucideIcon> = {
  "CONTENT STRATEGY": FileText,
  "BRAND DESIGN": Palette,
  "WEB FUNDAMENTALS": Globe,
  "CAREER COACHING": GraduationCap,
};

type TechIconProps = {
  name: string;
  className?: string;
  bright?: boolean;
};

export function TechIcon({ name, className, bright = false }: TechIconProps) {
  const customSrc = TECH_CUSTOM_ICONS[name];
  const slug = TECH_ICON_SLUGS[name];
  const Lucide = LUCIDE_BY_NAME[name];

  if (customSrc) {
    return (
      <img
        src={customSrc}
        alt=""
        width={18}
        height={18}
        loading="lazy"
        className={cn("h-[18px] w-[18px] shrink-0 object-contain", className)}
      />
    );
  }

  if (slug) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${slug}${bright ? "/0a0a0a" : ""}`}
        alt=""
        width={18}
        height={18}
        loading="lazy"
        className={cn("h-[18px] w-[18px] shrink-0 object-contain", className)}
      />
    );
  }

  if (Lucide || TECH_LUCIDE_FALLBACKS.has(name)) {
    const Icon = Lucide ?? FileText;
    return (
      <Icon
        className={cn(
          "h-[18px] w-[18px] shrink-0",
          bright ? "text-[#0a0a0a]/80" : "text-foreground/80",
          className,
        )}
        strokeWidth={1.75}
        aria-hidden
      />
    );
  }

  return (
    <span
      className={cn(
        "h-[18px] w-[18px] shrink-0 rounded-full border",
        bright ? "border-[#0a0a0a]/25" : "border-foreground/25",
        className,
      )}
      aria-hidden
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Services } from "@/components/site/Services";
import { ProjectsGrid } from "@/components/site/ProjectsGrid";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { TechMarquee } from "@/components/site/TechMarquee";
import { Testimonials } from "@/components/site/Testimonials";
import { ContactCream as Contact } from "@/components/site/ContactCream";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { MagneticCursor as CustomCursor } from "@/components/site/MagneticCursor";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "typingCodeAI — Custom Websites, Apps & AI Tools, Shipped in Weeks",
      },
      {
        name: "description",
        content:
          "typingCodeAI ships custom websites, mobile apps and AI tools in under 3 weeks. Free mockup in 48 hours, no upfront payment. Built by Shubham Yeljale, Pune, India.",
      },
      {
        property: "og:title",
        content:
          "typingCodeAI — Websites & Apps That Grow Your Business · Free Mockup in 48hrs",
      },
      {
        property: "og:description",
        content:
          "Custom websites, mobile apps & AI tools — idea to launch in weeks. Free mockup, no upfront payment. React, Next.js, React Native, OpenAI / Claude / Gemini.",
      },
      { property: "og:site_name", content: "typingCodeAI" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative z-10 text-foreground">
      <SmoothScroll />
      <CustomCursor />

      <Hero />
      <TechMarquee />
      <Services />
      <Experience />
      <About />
      <ProjectsGrid />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />

      <Toaster position="bottom-center" theme="dark" />
    </main>
  );
}

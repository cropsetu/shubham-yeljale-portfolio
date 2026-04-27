import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Services } from "@/components/site/Services";
import { ProjectsGrid } from "@/components/site/ProjectsGrid";
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
          "Shubham Yeljale — Custom Websites & Apps Built in 3 Weeks · Pune, India",
      },
      {
        name: "description",
        content:
          "Get a custom website, mobile app or AI tool built and launched in under 3 weeks. Free mockup in 48 hours, no upfront payment. Built by Shubham Yeljale, full-stack developer in Pune.",
      },
      {
        property: "og:title",
        content:
          "Shubham Yeljale — Websites & Apps That Grow Your Business · Free Mockup in 48hrs",
      },
      {
        property: "og:description",
        content:
          "Custom websites, mobile apps & AI tools — idea to launch in under 3 weeks. Free mockup, no upfront payment. React + Next.js + React Native.",
      },
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
      <Services />
      <Experience />
      <About />
      <ProjectsGrid />
      <Testimonials />
      <Contact />

      <Toaster position="bottom-center" theme="dark" />
    </main>
  );
}

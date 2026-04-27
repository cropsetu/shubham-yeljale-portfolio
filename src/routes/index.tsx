import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Skills } from "@/components/site/Skills";
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
      { title: "Shubham Yeljale — Full-Stack · Web · Mobile · AI Developer" },
      {
        name: "description",
        content:
          "Shubham Yeljale, full-stack developer based in Pune, India. Building production websites, mobile apps and AI-powered tools end-to-end.",
      },
      { property: "og:title", content: "Shubham Yeljale — Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Cosmic portfolio of a full-stack web, mobile and AI developer based in Pune, India.",
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
      <About />
      <Skills />
      <Experience />
      <Services />
      <ProjectsGrid />
      <Testimonials />
      <Contact />

      <Toaster position="bottom-center" theme="dark" />
    </main>
  );
}

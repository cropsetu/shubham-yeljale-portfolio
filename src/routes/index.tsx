import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Work } from "@/components/site/Work";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { MagneticCursor } from "@/components/site/MagneticCursor";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shubham Yeljale — Software Developer · JahiratBazi" },
      {
        name: "description",
        content:
          "Software developer based in Pune, India. Crafting beautiful, performant web experiences for studios and founders.",
      },
      { property: "og:title", content: "Shubham Yeljale — Software Developer" },
      {
        property: "og:description",
        content:
          "Cinematic, fast, conversion-ready websites and web apps. Available for select projects in 2025–2026.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <SmoothScroll />
      <MagneticCursor />
      <div className="grain" aria-hidden />

      <Hero />
      <About />
      <Work />
      <Services />
      <Process />
      <Testimonials />
      <Contact />

      <Toaster position="bottom-center" theme="dark" />
    </main>
  );
}

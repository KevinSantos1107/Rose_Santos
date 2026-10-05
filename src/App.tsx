import {
  Header,
  Hero,
  About,
  Services,
  Methodology,
  Differentials,
  Education,
  Testimonials,
  CtaFinal,
  Footer,
  WhatsAppFloat,
} from "@/components/site/Sections";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Methodology />
        <Differentials />
        <Education />
        <Testimonials />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

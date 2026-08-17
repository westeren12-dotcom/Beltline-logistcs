import Hero from '../sections/Hero.jsx';
import TrackingWidget from '../sections/TrackingWidget.jsx';
import Services from '../sections/Services.jsx';
import WhyChooseUs from '../sections/WhyChooseUs.jsx';
import RoutesSection from '../sections/RoutesSection.jsx';
import Fleet from '../sections/Fleet.jsx';
import Process from '../sections/Process.jsx';
import Testimonials from '../sections/Testimonials.jsx';
import Faq from '../sections/Faq.jsx';
import QuoteForm from '../sections/QuoteForm.jsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrackingWidget />
      <Services />
      <WhyChooseUs />
      <RoutesSection />
      <Fleet />
      <Process />
      <Testimonials />
      <Faq />
      <QuoteForm />
    </>
  );
}
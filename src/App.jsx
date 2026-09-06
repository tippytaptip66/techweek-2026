import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import EventCalendar from './components/EventCalendar.jsx'
import Countdown from './components/Countdown.jsx'
import FocusSection from './components/FocusSection.jsx'
import RingsMarquee from './components/RingsMarquee.jsx'
import StayOnTop from './components/StayOnTop.jsx'
import SyncSection from './components/SyncSection.jsx'
import CTASection from './components/CTASection.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <main>
      <Header />
      <Hero />
      <EventCalendar />
      <Countdown />
      <FocusSection />
      <RingsMarquee />
      <StayOnTop />
      <SyncSection />
      <CTASection />
      <Footer />
    </main>
  )
}

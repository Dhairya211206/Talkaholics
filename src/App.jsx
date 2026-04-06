import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Globe, Phone, X, Accessibility, HandHeart } from 'lucide-react';
import HomePage from './pages/Home';
import TalkCircles from './pages/TalkCircles';
import AnonymousChat from './pages/AnonymousChat';
import ExpertContent from './pages/ExpertContent';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Academy from './pages/Academy';
import { useApp } from './AppContext';

export default function App() {
  const location = useLocation();
  const { toastMessage, showToast, user, toggleSOS } = useApp();
  const [showImpactModal, setShowImpactModal] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  React.useEffect(() => {
     if (highContrast) document.body.style.filter = 'contrast(120%)';
     else document.body.style.filter = 'none';
  }, [highContrast]);

  return (
    <div className="app-container">
      {/* Social Mission Banner */}
      <div className="bg-success text-center py-3 text-sm text-main border-bottom flex-align-center justify-center gap-2 fw-bold" style={{color: '#22543D'}}>
         <Globe size={18} />
         <span>Talkaholics Global Mission: Breaking stigma and providing free, accessible mental health support globally.</span>
      </div>

      <div className="glass-overlay"></div>

      <AnimatePresence>
        {toastMessage && (
           <motion.div initial={{y:-50, opacity:0}} animate={{y:0, opacity:1}} exit={{opacity:0}} className="toast-container" style={{position:'fixed', top:'7rem', left:'50%', transform:'translateX(-50%)', zIndex:9999, background:'white', border:'2px solid var(--accent-primary)', padding:'1rem 2rem', borderRadius:'30px', boxShadow:'0 10px 30px rgba(0,0,0,0.1)', fontWeight:'bold', display:'flex', alignItems:'center', gap:'10px'}}>
              <Heart className="text-heart" size={18} fill="currentColor"/> {toastMessage}
           </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {user.isSOSActive && (
           <div className="modal-overlay" style={{background: 'rgba(255, 255, 255, 0.9)', zIndex: 9999}}>
             <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="card-glass w-full" style={{maxWidth: '600px', border: '2px solid var(--danger-color)'}}>
                <div className="text-center mb-6">
                   <div className="circle-btn mx-auto mb-4 bg-danger text-danger" style={{width:'80px', height:'80px'}}><Heart size={40} fill="currentColor"/></div>
                   <h2 className="text-danger mb-2" style={{fontSize:'2rem'}}>You matter. We are here.</h2>
                   <p className="text-muted">You requested immediate intervention. Please reach out to those trained to help you right now.</p>
                </div>
                <div className="flex-col gap-3">
                  <a href="tel:988" className="btn w-full py-4 text-danger border border-danger justify-center fw-bold text-lg bg-danger">
                     <Phone size={24} className="mr-2"/> Call 988 Crisis Lifeline Globally
                  </a>
                  <button className="btn btn-outline w-full py-4 justify-center" onClick={() => {showToast("Simulating connection to global volunteer network..."); toggleSOS(false);}}>
                     Text with a Trained Volunteer Now
                  </button>
                  <button className="btn-link mt-4 text-sm text-muted mx-auto" onClick={() => toggleSOS(false)}>Return to platform</button>
                </div>
             </motion.div>
           </div>
        )}
      </AnimatePresence>

      <nav className="navbar border-bottom">
        <Link to="/" className="logo">
          <HandHeart size={28} className="text-heart" />
          <span>Talkaholics</span>
        </Link>
        <div className="nav-links flex-align-center" style={{gap: '1.5rem'}}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/circles" className={location.pathname === '/circles' ? 'active' : ''}>Safe Spaces</Link>
          <Link to="/chat" className={location.pathname === '/chat' ? 'active' : ''}>Triage Center</Link>
          <Link to="/journal" className={location.pathname === '/journal' ? 'active' : ''}>AI Journal</Link>
          <Link to="/academy" className={location.pathname === '/academy' ? 'active' : ''}>Academy</Link>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Hub</Link>
        </div>
        <div className="flex-align-center gap-3">
          <button className="btn-icon circle-btn bg-dark" title="High Contrast Mode" onClick={() => setHighContrast(!highContrast)}><Accessibility size={20}/></button>
          <button className="btn btn-danger" onClick={() => toggleSOS(true)}>Get Help</button>
        </div>
      </nav>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/circles" element={<TalkCircles />} />
            <Route path="/chat" element={<AnonymousChat />} />
            <Route path="/content" element={<ExpertContent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/academy" element={<Academy />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="footer">
        <div className="flex-align-center gap-2"><Globe size={24} className="text-accent"/> <h3 className="text-main">Health as a Human Right</h3></div>
        <p className="max-w-2xl text-center mb-4">Talkaholics is a non-diagnostic social infrastructure project. It exists to bridge the gap between struggling individuals and professional care.</p>
      </footer>
    </div>
  );
}

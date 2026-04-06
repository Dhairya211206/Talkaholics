import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, AlertTriangle, Phone, ShieldAlert, X } from 'lucide-react';
import HomePage from './pages/Home';
import TalkCircles from './pages/TalkCircles';
import AnonymousChat from './pages/AnonymousChat';
import ExpertContent from './pages/ExpertContent';
import Dashboard from './pages/Dashboard';
import { useApp } from './AppContext';

export default function App() {
  const location = useLocation();
  const { toastMessage, showToast, user, toggleSOS } = useApp();

  return (
    <div className="app-container">
      {/* Medical Disclaimer Sticky Header */}
      <div className="bg-dark text-center py-2 text-xs text-muted border-bottom flex-align-center justify-center gap-2">
         <AlertTriangle size={14} className="text-accent" />
         <span>Talkaholics is an AI-assisted peer-support platform. It is <b>not</b> a substitute for professional medical or psychological treatment.</span>
      </div>

      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="glass-overlay"></div>

      <AnimatePresence>
        {toastMessage && <div className="toast-container">{toastMessage}</div>}
      </AnimatePresence>

      {/* Global SOS Modal */}
      <AnimatePresence>
        {user.isSOSActive && (
           <div className="modal-overlay" style={{zIndex: 99999, background: 'rgba(255, 10, 10, 0.15)', backdropFilter: 'blur(10px)'}}>
             <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="card-glass p-0 overflow-hidden w-full" style={{maxWidth: '600px', border: '1px solid #ff4757'}}>
                <div className="p-4 flex-between" style={{background: '#ff4757'}}>
                   <div className="flex-align-center gap-2"><ShieldAlert size={20} color="white"/> <h2 className="fw-bold" style={{color:'white'}}>Urgent Crisis Assitance</h2></div>
                   <button className="btn-icon circle-btn" style={{background:'rgba(255,255,255,0.2)', color:'white'}} onClick={() => toggleSOS(false)}><X/></button>
                </div>
                <div className="p-6 text-center">
                   <h3 className="mb-3" style={{fontSize: '1.5rem'}}>You are not alone. Please let us help.</h3>
                   <p className="text-muted mb-5">Our AI has detected distress, or you have requested immediate intervention. Peer support is halting, and professional resources are standing by.</p>
                   
                   <div className="flex-col gap-3">
                     <a href="tel:988" className="btn w-full justify-center py-4" style={{background: 'rgba(255, 71, 87, 0.1)', border: '1px solid #ff4757', color: '#ff4757', fontSize: '1.2rem', fontWeight: 'bold'}}>
                        <Phone size={24}/> Call 988 Suicide & Crisis Lifeline
                     </a>
                     <button className="btn btn-primary w-full justify-center py-3" onClick={() => {showToast("Routing to emergency live counselor protocol..."); toggleSOS(false);}}>
                        Connect to Live Licensed Counselor
                     </button>
                   </div>
                </div>
             </motion.div>
           </div>
        )}
      </AnimatePresence>

      <nav className="navbar" style={{position: 'relative'}}>
        <Link to="/" className="logo">
          <Heart size={28} fill="currentColor" color="#FF9A9E" />
          <span>Talkaholics</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/circles" className={location.pathname === '/circles' ? 'active' : ''}>Safe Spaces</Link>
          <Link to="/chat" className={location.pathname === '/chat' ? 'active' : ''}>Chat Triage</Link>
          <Link to="/content" className={location.pathname === '/content' ? 'active' : ''}>AI Hub</Link>
        </div>
        <div className="flex-align-center gap-3">
          <Link to="/dashboard" className="btn btn-glass">Dashboard</Link>
          <button className="btn" style={{background: 'rgba(255, 71, 87, 0.1)', color: '#ff4757', border: '1px solid rgba(255, 71, 87, 0.4)'}} onClick={() => toggleSOS(true)}>SOS Protocol</button>
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
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="footer">
        <div className="logo"><Heart size={20} fill="currentColor" color="#FF9A9E" /><span>Talkaholics</span></div>
        <p className="mt-2 text-sm">© 2026 Talkaholics. An AI-moderated, structured peer platform.</p>
        <button onClick={() => showToast("Medical limitations, liability waiver, and privacy policy loaded.")} className="btn-link text-xs mt-2">Legal & Medical Disclaimers</button>
      </footer>
    </div>
  );
}

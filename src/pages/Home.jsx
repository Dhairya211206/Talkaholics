import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Compass, ArrowRight, Frown, Meh, Smile, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { toggleSOS } = useApp();
  const [pulseValue, setPulseValue] = useState(50);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const getMoodConfig = () => {
     if (pulseValue < 20) return { icon: <AlertCircle size={40} className="text-danger"/>, text: "I feel completely overwhelmed", color: "var(--danger-color)", bg: "var(--bg-danger)", route: "SOS", btn: "Trigger Crisis Protocol" };
     if (pulseValue < 45) return { icon: <Frown size={40} style={{color: '#DD6B20'}}/>, text: "I am struggling right now", color: "#DD6B20", bg: "rgba(221, 107, 32, 0.1)", route: "/chat", btn: "Enter a Safe Space" };
     if (pulseValue < 75) return { icon: <Meh size={40} className="text-muted"/>, text: "I'm surviving, just exhausted", color: "var(--text-muted)", bg: "var(--bg-dark)", route: "/journal", btn: "Log inside the AI Journal" };
     return { icon: <Smile size={40} className="text-success"/>, text: "I am ready to help others", color: "var(--success-color)", bg: "var(--bg-success)", route: "/academy", btn: "Open Listener Academy" };
  };

  const handleRoute = (config) => {
     if (config.route === 'SOS') {
        toggleSOS(true);
     } else {
        navigate(config.route);
     }
  };

  const config = getMoodConfig();

  return (
    <div className="page-container flex-col justify-center" style={{minHeight: '85vh', display: 'flex'}}>
      
      <div className="text-center mb-6">
         <div className="badge badge-heart mb-4 mx-auto w-max px-4 py-2" style={{width: 'fit-content'}}><Heart size={14} fill="currentColor" className="mr-2"/> Non-Profit Peer Infrastructure</div>
         <h1 className="title" style={{fontSize: '4.5rem', lineHeight: '1.1'}}>Care is a <span className="text-accent">Human Right.</span></h1>
         <p className="text-muted mt-4 text-lg" style={{maxWidth: '700px', margin: '0 auto'}}>A community-led, AI-structured mental health platform. No paywalls. No judgment. Just people protecting people.</p>
      </div>

      <div className="mx-auto w-full mt-6" style={{maxWidth: '800px'}}>
        <div className="card-glass p-0 overflow-hidden relative shadow-lg">
           {/* Interactive Daily Pulse Tracker */}
           <div className="p-6 text-center" style={{background: showRecommendation ? config.bg : 'var(--bg-secondary)', transition: 'background 0.5s ease'}}>
              <h2 className="mb-2">How are we feeling today?</h2>
              <p className="text-sm text-muted mb-6">Drag the slider to perform your daily semantic check-in.</p>

              <div className="flex-align-center gap-4 mb-6">
                 <Frown size={24} className="text-danger"/>
                 <input 
                   type="range" 
                   min="0" max="100" 
                   value={pulseValue} 
                   onChange={(e) => {setPulseValue(parseInt(e.target.value)); setShowRecommendation(false);}} 
                   className="w-full"
                   style={{
                     appearance: 'none', height: '8px', 
                     background: `linear-gradient(to right, var(--danger-color), #DD6B20, var(--text-muted), var(--success-color))`, 
                     borderRadius: '4px', outline: 'none'
                   }}
                 />
                 <Smile size={24} className="text-success"/>
              </div>

              {!showRecommendation ? (
                 <button className="btn btn-primary px-6 py-3" onClick={() => setShowRecommendation(true)}>Analyze My Pulse <Compass size={18} className="ml-2"/></button>
              ) : (
                 <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-secondary p-5 rounded mt-4 border shadow-sm">
                    {config.icon}
                    <h3 className="my-3" style={{color: config.color, fontSize:'1.5rem'}}>{config.text}</h3>
                    <p className="text-sm text-muted mb-5">Our AI routing system believes this is the most beneficial next step for you today.</p>
                    <button className="btn w-full justify-center py-4 text-lg border" style={{background: config.color, color: 'white'}} onClick={() => handleRoute(config)}>
                       {config.btn} <ArrowRight size={20} className="ml-2"/>
                    </button>
                 </motion.div>
              )}
           </div>
        </div>

        {/* Global Impact Quick-Stats */}
        <div className="dashboard-grid mt-6" style={{gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem'}}>
           <div className="card-glass p-4 text-center rounded border"><p className="text-2xl fw-bold text-success">14,204</p><span className="text-xs text-muted">Peers Anchored</span></div>
           <div className="card-glass p-4 text-center rounded border"><p className="text-2xl fw-bold text-accent">9.8/10</p><span className="text-xs text-muted">Empathy Score</span></div>
           <div className="card-glass p-4 text-center rounded border"><p className="text-2xl fw-bold text-heart">Zero</p><span className="text-xs text-muted">Cost to User</span></div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, AlertCircle, Flag, HandHeart, CheckCircle, X, Volume2, Shield, BatteryCharging, Wind } from 'lucide-react';
import { useApp } from '../AppContext';

export default function AnonymousChat() {
  const { user, showToast } = useApp();
  
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the Stress Relief peer space. Please remember to respect others' boundaries.", sender: "system", time: "10:00 AM", reactions: 0 }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Deep Modals
  const [activeModal, setActiveModal] = useState(null); // 'empathy_guard', 'accessibility', 'breathe'
  const [breathingPhase, setBreathingPhase] = useState('Inhale');

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  useEffect(() => {
     let interval;
     if (activeModal === 'breathe') {
        const phases = ['Inhale', 'Hold', 'Exhale', 'Hold'];
        let idx = 0;
        interval = setInterval(() => {
           idx = (idx + 1) % 4;
           setBreathingPhase(phases[idx]);
        }, 4000);
     }
     return () => clearInterval(interval);
  }, [activeModal]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: "me", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), reactions: 0 }]);
    setInput("");

    setTimeout(() => setIsTyping(true), 500);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "It takes a lot of courage to talk about this. I completely hear you.", sender: "peer2", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), reactions: 0, isModerator: true }]);
    }, 2500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="chat-layout">
      
      {/* End User Sidebar Actions */}
      <div className="flex-col gap-3 mr-4">
         <button className="btn btn-glass flex-col py-4 px-3" onClick={() => setActiveModal('breathe')} style={{width: '90px'}}>
            <Wind size={24} className="mb-2"/> <span className="text-xs">Box Breathe</span>
         </button>
         <button className="btn btn-outline flex-col py-4 px-3" onClick={() => setActiveModal('accessibility')} style={{width: '90px', background: 'var(--bg-secondary)'}}>
            <Volume2 size={24} className="mb-2"/> <span className="text-xs">Audio Read</span>
         </button>
      </div>

      <div className="chat-window card-glass rounded border shadow-lg flex-1">
        {/* Header */}
        <div className="chat-header border-bottom bg-dark p-4 flex-between">
          <div className="flex-align-center gap-3">
            <div className="circle-btn bg-success text-success"><HandHeart size={20} /></div>
            <div>
              <h2 style={{ fontSize: '1.4rem' }}>Stress Relief Space</h2>
              <span className="badge badge-success mt-1">12 Peers Listening</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages p-5">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`message-wrapper ${msg.sender}`}>
                {msg.sender === 'system' ? (
                  <div className="card-glass message-bubble p-3 flex-align-center gap-3" style={{ background: '#FFF5F7', border: '1px solid #FED7E2', maxWidth: '80%' }}>
                    <AlertCircle size={20} className="text-muted"/>
                    <p className="text-sm font-italic" style={{ color: 'var(--text-muted)' }}>{msg.text}</p>
                  </div>
                ) : (
                  <div className="card-glass message-bubble p-0 shadow-sm">
                    {msg.isModerator && (
                      <div className="flex-align-center gap-1 mb-2 border-bottom pb-2">
                        <span className="badge badge-success"><CheckCircle size={10} /> TRAINED LISTENER</span>
                      </div>
                    )}
                    <p style={{ lineHeight: '1.6' }}>{msg.text}</p>
                    {msg.sender !== 'system' && (
                      <div className="flex-between mt-3 pt-2 border-top">
                        <span className="text-xs text-muted">{msg.time}</span>
                        <div className="flex-align-center gap-2">
                          {msg.reactions > 0 && <span className="text-xs text-heart fw-bold"><Heart size={12} fill="currentColor" className="inline" /> {msg.reactions}</span>}
                          {msg.sender !== 'me' && (
                            <>
                              <button className="btn-icon sm" onClick={() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, reactions: m.reactions + 1 } : m))}><Heart size={16} /></button>
                              <button className="btn-icon sm text-muted" onClick={() => setActiveModal('empathy_guard')}><Flag size={14} /></button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="message-wrapper peer">
                 <div className="card-glass message-bubble p-3 font-italic text-sm text-muted">A peer is typing<span className="typing-dot">.</span><span className="typing-dot">.</span><span className="typing-dot">.</span></div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="chat-input-area border-top bg-dark p-4 flex-align-center gap-3" onSubmit={handleSend}>
           <input type="text" placeholder="Share your story..." value={input} onChange={(e) => setInput(e.target.value)} />
           <button type="submit" className="btn btn-primary p-3" style={{borderRadius: '50%'}}><Send size={20} /></button>
        </form>
      </div>

      {/* Box Breathing UI Overlay for End-User Grounding */}
      <AnimatePresence>
        {activeModal === 'breathe' && (
          <div className="modal-overlay" style={{background: 'rgba(0,0,0,0.85)'}} onClick={() => setActiveModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="text-center" onClick={e => e.stopPropagation()}>
               <h2 className="mb-6 text-white" style={{fontSize: '2.5rem', color: 'white'}}>{breathingPhase}</h2>
               <div className="relative mx-auto" style={{width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                 <motion.div 
                    animate={{ 
                       scale: breathingPhase === 'Inhale' ? 1.5 : breathingPhase === 'Exhale' ? 1 : undefined,
                       opacity: breathingPhase.includes('Hold') ? 0.7 : 1
                    }} 
                    transition={{ duration: 4, ease: "linear" }}
                    style={{width: '150px', height: '150px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 50px var(--accent-primary)'}}
                 />
               </div>
               <p className="mt-6 text-muted text-lg">Click anywhere to return to chat safely.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal === 'empathy_guard' && (
          <div className="modal-overlay" onClick={() => setActiveModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="card-glass modal-content" onClick={e => e.stopPropagation()}>
               <div className="flex-between border-bottom pb-4 mb-4">
                  <h2 className="text-accent text-lg"><Shield className="inline mr-2"/> Peer Reporting</h2>
                  <button className="btn-icon" onClick={() => setActiveModal(null)}><X/></button>
               </div>
               <p className="text-sm text-muted mb-4">We maintain safe spaces through communal care. Why are you flagging this message?</p>
               <div className="flex-col gap-2 mb-4">
                  <button className="btn btn-outline justify-center w-full" onClick={() => {setActiveModal(null); showToast("Message flagged for admin review.");}}>The user is using harmful language</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

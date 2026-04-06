import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Send, MoreVertical, Heart, AlertCircle, Flag, Paperclip, Smile, Cpu, CheckCircle } from 'lucide-react';
import { useApp } from '../AppContext';

export default function AnonymousChat() {
  const { user, showToast } = useApp();
  
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the Anxiety Support Room. This is an AI-monitored, structured peer space.", sender: "system", time: "10:00 AM", reactions: 0 },
    { id: 2, text: "Hi everyone. I've been feeling really overwhelmed with assignments lately.", sender: "peer", time: "10:02 AM", reactions: 3, isModerator: false },
    { id: 3, text: "I totally get that. Just remember to break it into small, manageable tasks.", sender: "peer2", time: "10:05 AM", reactions: 5, isModerator: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Simulate AI Moderation Interception if they type something harmful
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("just sleep it off") || lowerInput.includes("who cares") || lowerInput.includes("give up")) {
       setMessages(prev => [...prev, {
         id: Date.now(),
         text: input,
         sender: "me",
         time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
         reactions: 0,
         aiRedacted: true
       }]);
       setInput("");
       setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: "AI Safety Monitor: Your message was suppressed for violating peer-support guidelines. Please rely on trained active listening.",
            sender: "ai",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }]);
       }, 500);
       return;
    }

    setMessages(prev => [...prev, { 
      id: Date.now(), text: input, sender: "me", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), reactions: 0
    }]);
    setInput("");
    
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: "Thank you for sharing that. Validating your feelings is the first step.",
          sender: "peer2",
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          reactions: 0,
          isModerator: true
        }]);
      }, 2500);
    }, 1000);
  };

  const handleReact = (id) => {
    setMessages(prev => prev.map(msg => msg.id === id && msg.sender !== 'system' && msg.sender !== 'ai' ? { ...msg, reactions: msg.reactions + 1 } : msg));
    showToast("Reaction registered.");
  };

  const handleDeadButton = (btnDesc) => showToast(`The '${btnDesc}' feature is locked.`);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="chat-layout">
      <div className="chat-window card-glass rounded">
        {/* Header */}
        <div className="chat-header">
          <div className="flex-align-center gap-3">
            <div className="circle-btn" style={{background: 'var(--bg-danger)'}}><Shield size={20} className="text-danger" color="#ff4757" /></div>
            <div>
              <h2 style={{fontSize: '1.4rem'}}>Anxiety Support Triage</h2>
              <span className="text-xs text-ai fw-bold tracking-widest"><Cpu size={12} className="inline mr-1"/> AI OVERSEEN SPACE</span>
            </div>
          </div>
          <div className="flex-align-center gap-3">
             <span className="text-sm text-muted">You are: <b>{user.username}</b></span>
             <button className="btn-icon" onClick={() => handleDeadButton("Room Settings")}><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages p-4">
          <div className="text-center w-full mb-4"><span className="text-xs text-muted bg-dark p-2 rounded border border-danger"><AlertCircle size={12} className="inline mr-1 text-danger" /> Crisis keywords are actively monitored by our auto-moderator.</span></div>
          
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`message-wrapper ${msg.sender}`}>
                {msg.sender === 'ai' ? (
                   <div className="card-glass message-bubble p-3 flex-align-center gap-3" style={{background: 'rgba(56, 173, 169, 0.1)', border: '1px solid var(--ai-color)', maxWidth: '80%'}}>
                      <div className="circle-btn" style={{background:'var(--ai-color)', color:'white', minWidth:'35px', height:'35px'}}><Cpu size={16}/></div>
                      <p className="text-sm" style={{color: 'var(--ai-color)'}}>{msg.text}</p>
                   </div>
                ) : (
                  <div className={`card-glass message-bubble p-0 ${msg.aiRedacted ? 'ai-redaction' : ''}`}>
                    {msg.isModerator && (
                       <div className="flex-align-center gap-1 mb-2 border-bottom pb-2">
                          <span className="moderator-badge"><CheckCircle size={10}/> TRAINED LISTENER</span>
                       </div>
                    )}
                    <p style={{lineHeight: '1.5'}}>{msg.text}</p>
                    {msg.sender !== 'system' && (
                      <div className="flex-between mt-3 pt-2 border-top">
                        <span className="text-xs text-muted">{msg.time}</span>
                        <div className="flex-align-center gap-2">
                          {msg.reactions > 0 && <span className="text-xs text-accent fw-bold"><Heart size={12} className="inline" /> {msg.reactions}</span>}
                          {msg.sender !== 'me' && (
                            <>
                              <button className="btn-icon sm" onClick={() => handleReact(msg.id)}><Heart size={14} /></button>
                              <button className="btn-icon sm" onClick={() => showToast("Message flagged for human moderator override.")}><Flag size={14} /></button>
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
                <div className="card-glass message-bubble p-3 flex-align-center gap-2 font-italic text-sm text-muted">
                  Trained Listener typing <span className="typing-dot">.</span><span className="typing-dot">.</span><span className="typing-dot">.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form className="chat-input-area flex-col gap-2" onSubmit={handleSend}>
          <div className="flex-align-center gap-3">
             <button type="button" className="btn-icon" onClick={() => handleDeadButton("File Attachment")}><Paperclip size={20}/></button>
             <input type="text" placeholder="Type a message... (Try typing 'Just sleep it off' to see AI intercept)" value={input} onChange={(e) => setInput(e.target.value)} />
             <button type="submit" className="btn btn-primary btn-round"><Send size={18} /></button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

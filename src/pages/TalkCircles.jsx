import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, UserPlus, Info, Plus, X, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';

const DEFAULT_CIRCLES = [
  { id: 1, name: "University Stress Relief", icon: "🎓", capacity: 50, members: 48, active: true, category: "Academic Triage", rules: ["No diagnostic language", "Respect moderator halting"] },
  { id: 2, name: "Anxiety Support Space", icon: "🌊", capacity: 100, members: 89, active: true, category: "General Therapy", rules: ["Trigger warnings strictly enforced"] },
  { id: 3, name: "New to Therapy", icon: "🌿", capacity: 50, members: 45, active: false, category: "Clinical Education", rules: ["Beginner friendly, guided by Dr. Smith"] },
  { id: 4, name: "Career Transition Anxiety", icon: "💼", capacity: 300, members: 210, active: true, category: "Career Transition", rules: ["Stay on topic"] },
];

export default function TalkCircles() {
  const { customCircles, addTalkCircle, joinCircle, showToast } = useApp();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [previewCircle, setPreviewCircle] = useState(null);
  const [newSpace, setNewSpace] = useState({ name: "", icon: "💬", category: "General Support" });
  
  const allCircles = [...DEFAULT_CIRCLES, ...customCircles];
  const filteredCircles = allCircles.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCreateSpace = (e) => {
    e.preventDefault();
    addTalkCircle(newSpace);
    setPreviewCircle(null);
    setNewSpace({ name: "", icon: "💬", category: "General Support" });
  };

  const handleJoin = (id) => {
    joinCircle(id);
    navigate('/chat');
    showToast("Successfully routed to monitored space.");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="page-container">
      <div className="page-header text-center mb-6">
        <h1 className="title">Structured <span className="text-gradient">Safe Spaces</span></h1>
        <p className="subtitle text-lg">Every active circle is overseen by verified, trained peer listeners and AI monitoring.</p>
      </div>

      <div className="flex-between mb-5 gap-4">
        <div className="card-glass search-bar flex-1 p-2 flex-align-center gap-2">
          <Search size={20} className="text-muted ml-3" />
          <input type="text" placeholder="Search clinical or societal topics (e.g., anxiety)..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{border:'none', background:'none', padding:'0.5rem'}} />
        </div>
        <button className="btn btn-primary" style={{padding: '1.2rem 2rem'}} onClick={() => setPreviewCircle('NEW')}><Plus size={20}/> Submit Custom Space</button>
      </div>

      <div className="circles-grid">
        {filteredCircles.map((circle, idx) => {
          const fullness = (circle.members / (circle.capacity || 100)) * 100;
          let capColor = fullness > 90 ? '#ff6b6b' : 'var(--accent-purple)';
          
          return (
            <motion.div key={circle.id} whileHover={{y:-5}} className="card-glass flex-col-between p-5 rounded">
              <div>
                <div className="flex-between mb-4">
                  <span className="circle-btn" style={{fontSize: '2rem', width:'60px', height:'60px'}}>{circle.icon}</span>
                  {circle.active ? <span className="text-xs fw-bold px-3 py-1 rounded" style={{background:'rgba(132, 250, 176, 0.1)', color:'#84fab0'}}>MONITORED LIVE</span> : <span className="text-xs fw-bold px-3 py-1 rounded bg-dark text-muted">AWAITING LISTENER</span>}
                </div>
                
                <h3 className="fw-bold mb-1" style={{fontSize: '1.4rem'}}>{circle.name}</h3>
                <span className="text-sm text-accent mb-4 display-block font-bold"><ShieldCheck size={14} className="inline mr-1"/> Oversight: {circle.category}</span>
                
                <div className="mt-4 mb-5 p-3 bg-dark rounded">
                  <div className="flex-between text-sm text-muted mb-2">
                    <span>Clinical Capacity Load</span>
                    <span>{circle.members} / {circle.capacity || 100}</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{width: `${fullness}%`, background: capColor}}></div></div>
                </div>
              </div>
              
              <div className="flex-between gap-3 mt-2">
                <button className="btn btn-glass" style={{padding:'0.8rem'}} onClick={() => setPreviewCircle(circle)}><Info size={20} className="text-muted"/></button>
                <button onClick={() => circle.active ? handleJoin(circle.id) : showToast("No trained listeners currently available for this room.")} className={`btn ${circle.active ? 'btn-primary' : 'btn-outline'} flex-1 justify-center`}>
                  {circle.active ? "Enter Safe Space" : "Pending Oversight"} <UserPlus size={18}/>
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {previewCircle && (
          <div className="modal-overlay" onClick={() => setPreviewCircle(null)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="card-glass modal-content" onClick={e => e.stopPropagation()}>
              <button className="btn-icon modal-close" onClick={() => setPreviewCircle(null)}><X size={24} /></button>
              
              {previewCircle === 'NEW' ? (
                <>
                  <div className="text-center mb-5">
                    <h2 style={{fontSize:'2rem'}}>Propose a Safety Domain</h2>
                    <p className="text-danger mt-2 fw-bold text-sm bg-danger p-2 rounded">Notice: All domains require manual review by our clinical advisory board.</p>
                  </div>
                  <form onSubmit={handleCreateSpace} className="flex-col gap-4">
                    <div>
                      <label className="text-sm text-muted mb-2 display-block">Topic Sphere</label>
                      <input required type="text" value={newSpace.name} onChange={e => setNewSpace({...newSpace, name: e.target.value})} placeholder="e.g. Navigating Chronic Isolation" />
                    </div>
                    <div>
                      <label className="text-sm text-muted mb-2 display-block">Representative Emoji</label>
                      <input required type="text" value={newSpace.icon} onChange={e => setNewSpace({...newSpace, icon: e.target.value})} maxLength="2" placeholder="🛡️" />
                    </div>
                    <button type="submit" className="btn btn-primary w-full justify-center py-3 mt-2">Submit for Moderation Protocol</button>
                  </form>
                </>
              ) : (
                <>
                  <div className="text-center mb-5">
                    <span className="circle-btn mb-4 mx-auto" style={{fontSize: '2.5rem', width:'80px', height:'80px'}}>{previewCircle.icon}</span>
                    <h2 style={{fontSize:'2rem'}}>{previewCircle.name}</h2>
                    <p className="text-accent mt-2">Mandatory Community Guidelines</p>
                  </div>
                  <ul className="text-muted mb-6 bg-dark p-4 rounded" style={{paddingLeft: '2.5rem', lineHeight:'2'}}>
                    {(previewCircle.rules || ["Strictly follow automated safety constraints.", "Do NOT offer medical diagnostics.", "Comply with Trained Listeners instantly."]).map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                  <button onClick={() => handleJoin(previewCircle.id)} className="btn btn-primary w-full justify-center py-3">I Accept Legal Constraints</button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

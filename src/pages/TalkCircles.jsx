import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, Plus, X, HandHeart, Users, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';

const DEFAULT_CIRCLES = [
  { id: 1, name: "First-Gen Student Pressure", icon: "📚", issue: "Generational & Academic Trauma", members: 48 },
  { id: 2, name: "Career Burnout & Exhaustion", icon: "💼", issue: "Professional Anxiety", members: 112 },
  { id: 3, name: "Financial Crisis Survival", icon: "📉", issue: "Economic Anxiety", members: 89 },
  { id: 4, name: "Grief & Loss Support", icon: "🕯️", issue: "Bereavement", members: 34 }
];

export default function TalkCircles() {
  const { showToast } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [previewCircle, setPreviewCircle] = useState(null);

  const filteredCircles = DEFAULT_CIRCLES.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="page-container">
      <div className="page-header text-center mb-6">
        <div className="badge badge-success mb-4"><Users size={14}/> Inclusive Support Networks</div>
        <h1 className="title" style={{fontSize: '3rem'}}>Find Your <span className="text-accent">People</span></h1>
        <p className="text-muted text-lg mt-3" style={{maxWidth: '600px', margin: '0 auto'}}>Our social mandate is to create highly specific, moderated enclaves for marginalized pain points. No one is left behind.</p>
      </div>

      <div className="flex-between mb-6 gap-4">
        <div className="card-glass search-bar flex-1 p-2 flex-align-center gap-2" style={{padding: '0.5rem 1rem'}}>
          <Search size={22} className="text-muted" />
          <input type="text" placeholder="Search by social issue, demographic, or condition..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{border:'none', background:'none', boxShadow:'none', padding:'0.5rem'}} />
        </div>
        <button className="btn btn-glass border" style={{padding: '1.2rem 2rem'}} onClick={() => showToast("Request routed to community governance board for review.")}><Plus size={20}/> Petition New Community Space</button>
      </div>

      <div className="circles-grid">
        {filteredCircles.map((circle) => (
          <motion.div key={circle.id} whileHover={{y:-5}} className="card-glass flex-col-between p-6">
             <div className="flex-between mb-4">
                <span style={{fontSize: '2.5rem'}}>{circle.icon}</span>
                <span className="badge badge-heart"><HandHeart size={12}/> Monitored</span>
             </div>
             
             <h3 className="mb-2" style={{fontSize: '1.4rem'}}>{circle.name}</h3>
             <p className="text-sm text-accent fw-bold mb-4">{circle.issue}</p>
             
             <div className="flex-between text-sm text-muted mt-5 mb-4 p-3 bg-dark rounded border">
               <span>Community Solidarity:</span>
               <span className="fw-bold">{circle.members} Peers Online</span>
             </div>
             
             <button onClick={() => setPreviewCircle(circle)} className="btn btn-primary w-full justify-center py-3">Enter Safe Space <ArrowRight size={18}/></button>
          </motion.div>
        ))}
      </div>

      {/* Community Guidelines Acceptance Modal */}
      <AnimatePresence>
        {previewCircle && (
          <div className="modal-overlay" onClick={() => setPreviewCircle(null)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="card-glass modal-content" onClick={e => e.stopPropagation()}>
              <button className="btn-icon modal-close" onClick={() => setPreviewCircle(null)}><X size={24} /></button>
              
              <div className="text-center mb-5">
                <span style={{fontSize: '3.5rem', display: 'block', margin: '0 auto 1rem'}}>{previewCircle.icon}</span>
                <h2 style={{fontSize:'2rem'}}>{previewCircle.name}</h2>
              </div>
              
              <div className="bg-success p-4 rounded border border-success mb-6 text-sm" style={{color: '#22543D', lineHeight: '1.6'}}>
                 <h4 className="mb-2">Social Mandate & Guidelines</h4>
                 <p className="mb-2">By entering this community-governed space, you pledge to:</p>
                 <ul style={{paddingLeft: '1.5rem'}}>
                    <li className="mb-1">Approach all lived experiences with radical empathy.</li>
                    <li className="mb-1">Never deliver medical diagnostics (we are peers, not doctors).</li>
                    <li className="mb-1">Utilize the "Empathy Guard" if a peer becomes harmful.</li>
                 </ul>
              </div>

              <div className="flex-col gap-3">
                 <button onClick={() => {navigate('/chat'); showToast(`You have joined ${previewCircle.name}`);}} className="btn btn-primary w-full justify-center py-4 text-lg">I swear to uphold this space</button>
                 <button onClick={() => setPreviewCircle(null)} className="btn btn-outline w-full py-3 justify-center">Return to Directory</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

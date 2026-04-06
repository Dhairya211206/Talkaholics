import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, BookmarkPlus, Cpu, Search, Star, Headphones, Video, FileText } from 'lucide-react';
import { useApp } from '../AppContext';

const KNOWLEDGE_BASE = [
  { id: 1, title: "Cognitive Defusion: Unhooking from Thoughts", category: "Interactive Module", format: "Video", author: "Dr. Sarah Jenkins, PhD", time: "18m", img: "abstract-1" },
  { id: 2, title: "DBT Skills: Radical Acceptance during Panic", category: "Crisis Toolkit", format: "Podcast", author: "Licensed Social AI", time: "12m", img: "abstract-2" },
  { id: 3, title: "Somatic Grounding Techniques", category: "Physical Relief", format: "Audio", author: "Global Peer Network", time: "5m", img: "abstract-3" },
  { id: 4, title: "Navigating Traumatic Grief Anniversaries", category: "Literature", format: "PDF Guide", author: "Clinical Board", time: "Read", img: "abstract-1" }
];

export default function ExpertContent() {
  const { showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMedia, setActiveMedia] = useState(null);

  const filterMedia = KNOWLEDGE_BASE.filter(k => k.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="page-container" style={{maxWidth: '1400px'}}>
      
      <div className="flex-between mb-6 border-bottom pb-4">
         <div>
            <div className="badge badge-success mb-3"><Cpu size={14}/> Algorithmically Curated</div>
            <h1 className="title" style={{fontSize: '3rem'}}>The AI <span className="text-accent">Knowledge Hub</span></h1>
            <p className="text-muted mt-1 text-lg max-w-2xl">Access hundreds of hours of free clinical literature, standardized CBT courses, and grounding therapies.</p>
         </div>
      </div>

      <div className="flex-between mb-6 gap-4">
        <div className="card-glass search-bar flex-1 p-2 flex-align-center gap-2" style={{padding: '0.5rem 1rem'}}>
          <Search size={22} className="text-muted" />
          <input type="text" placeholder="Search therapies, symptoms, or interventions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{border:'none', background:'none', boxShadow:'none'}} />
        </div>
      </div>

      {/* Hero Featured Video */}
      {!searchTerm && (
         <div className="card-glass p-0 rounded overflow-hidden relative mb-8 border" style={{minHeight: '400px', display: 'flex', alignItems: 'flex-end', background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="p-8 w-full position-relative" style={{zIndex: 10}}>
               <div className="badge badge-heart mb-3"><Star size={14} fill="currentColor"/> Highest Rated Empathy Course</div>
               <h2 className="text-main mb-2" style={{fontSize: '2.5rem', color: 'white'}}>Mastering the Inner Critic</h2>
               <p className="text-sm mb-5" style={{color: '#E2E8F0', maxWidth:'600px'}}>A massive 6-part video course on silencing imposter syndrome, specifically tailored for First-Generation College Students.</p>
               <div className="flex-align-center gap-4">
                  <button className="btn btn-primary px-6 py-3" onClick={() => setActiveMedia(KNOWLEDGE_BASE[0])}><Play size={20} className="mr-2"/> Play Module 1</button>
                  <button className="btn btn-glass px-5 py-3" onClick={() => showToast("Added to Dashboard Toolkits!")} style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)'}}><BookmarkPlus size={20} className="mr-2"/> Save to Vault</button>
               </div>
            </div>
         </div>
      )}

      {/* Netflix-Style Media Rows */}
      <div className="mb-4">
         <h3 className="mb-4 text-xl">Top Clinical Toolkits for You</h3>
         <div className="dashboard-grid" style={{gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem'}}>
            {filterMedia.map((media) => (
               <motion.div key={media.id} whileHover={{y:-5}} className="card-glass p-0 rounded overflow-hidden flex-col">
                  {/* Mock Thumbnail */}
                  <div className="w-full relative" style={{height:'160px', background: `linear-gradient(135deg, ${media.id%2===0?'#38B2AC':'#4299E1'}, ${media.id%3===0?'#ED64A6':'#9AE6B4'})`}}>
                     <div className="absolute" style={{top:'50%', left:'50%', transform:'translate(-50%,-50%)', color:'rgba(255,255,255,0.8)'}}>
                        {media.format === 'Video' ? <Video size={48}/> : media.format === 'Podcast' ? <Headphones size={48}/> : <FileText size={48}/>}
                     </div>
                     <span className="absolute text-xs fw-bold px-2 py-1 bg-dark text-main" style={{bottom:'10px', right:'10px', borderRadius:'4px', background:'rgba(0,0,0,0.6)', color:'white'}}>{media.time}</span>
                  </div>
                  
                  <div className="p-4 flex-1 flex-col-between">
                     <div>
                        <span className="text-xs text-accent fw-bold mb-1 display-block">{media.category}</span>
                        <h4 className="mb-2" style={{lineHeight: '1.3', fontSize: '1.1rem'}}>{media.title}</h4>
                        <p className="text-xs text-muted mb-4">{media.author}</p>
                     </div>
                     <div className="flex-between">
                        <button className="btn btn-primary btn-sm py-2 px-3" onClick={() => setActiveMedia(media)}><Play size={14}/></button>
                        <button className="btn-icon circle-btn border bg-dark" onClick={() => showToast(`Successfully saved '${media.title}' to your Dashboard Toolkits.`)}><BookmarkPlus size={16}/></button>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>

      {/* Video Overlay Player */}
      <AnimatePresence>
         {activeMedia && (
            <div className="modal-overlay" onClick={() => setActiveMedia(null)}>
               <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}} className="card-glass p-0 overflow-hidden w-full" style={{maxWidth: '900px'}} onClick={e=>e.stopPropagation()}>
                  {/* Fake Video Player Screen */}
                  <div className="w-full bg-main relative flex-align-center justify-center" style={{height: '500px', background: '#1A202C'}}>
                     <button className="absolute circle-btn" style={{top:'1rem', right:'1rem', background:'rgba(255,255,255,0.2)', color:'white'}} onClick={()=>setActiveMedia(null)}><X/></button>
                     <motion.div initial={{scale:0.8}} animate={{scale:1}} className="text-center text-muted">
                        <Play size={80} className="mx-auto mb-4 opacity-50"/>
                        <p className="text-lg">Streaming: {activeMedia.title}</p>
                        <p className="text-sm">Running Secure Media Protocol</p>
                     </motion.div>
                     
                     {/* Fake Timeline */}
                     <div className="absolute w-full px-4" style={{bottom:'1rem'}}>
                        <div className="progress-bar" style={{height: '4px', background: 'rgba(255,255,255,0.2)'}}>
                           <motion.div className="progress-fill" style={{background: 'var(--accent-primary)'}} initial={{width:0}} animate={{width:'30%'}} transition={{duration: 5}}/>
                        </div>
                     </div>
                  </div>

                  <div className="p-5 flex-between bg-dark border-top">
                     <div>
                        <h3 className="mb-1">{activeMedia.title}</h3>
                        <p className="text-sm text-muted">{activeMedia.author} • {activeMedia.category}</p>
                     </div>
                     <button className="btn btn-outline bg-secondary" onClick={() => {setActiveMedia(null); showToast("Module added to your clinical queue.");}}><BookmarkPlus size={18} className="mr-2"/> Save Progress</button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

    </motion.div>
  );
}

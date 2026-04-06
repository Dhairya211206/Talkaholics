import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, BookmarkPlus, Cpu, Search, Star, Headphones, Video, FileText, CheckCircle, X, Download } from 'lucide-react';
import { useApp } from '../AppContext';

const KNOWLEDGE_BASE = [
  { id: 1, title: "Cognitive Defusion: Unhooking from Thoughts", category: "Interactive Module", format: "Video", author: "Dr. Sarah Jenkins, PhD", time: "18m", youtubeId: "8Su5VtKeXU8" },
  { id: 2, title: "Mastering the Inner Critic", category: "Crisis Toolkit", format: "Video", author: "Licensed Social AI", time: "12m", youtubeId: "vD0w_gOEzXI" },
  { id: 3, title: "How to manage your mental health", category: "TED Talk", format: "Video", author: "Global Peer Network", time: "5m", youtubeId: "inpok4MKVLM" },
  { id: 4, title: "DBT Skills: Radical Acceptance", category: "Literature", format: "Video", author: "Clinical Board", time: "Read", youtubeId: "WPPPFqsECz0" }
];

export default function ExpertContent() {
  const { showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMedia, setActiveMedia] = useState(null);
  
  const [showSavedVault, setShowSavedVault] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const filterMedia = KNOWLEDGE_BASE.filter(k => k.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSaveToVault = (media, e) => {
     if(e) e.stopPropagation();
     if(savedItems.find(i => i.id === media.id)) {
        showToast("Already in your Toolkit.");
        return;
     }
     setSavedItems(prev => [media, ...prev]);
     setShowSavedVault(true);
  };

  const executeSync = () => {
     setIsSyncing(true);
     setTimeout(() => {
        setIsSyncing(false);
        showToast("Files encrypted and cached locally on network edge.");
     }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="page-container" style={{maxWidth: '1400px'}}>
      
      <div className="flex-between mb-6 border-bottom pb-4">
         <div>
            <div className="badge badge-success mb-3"><Cpu size={14}/> Algorithmically Curated</div>
            <h1 className="title" style={{fontSize: '3rem'}}>The AI <span className="text-accent">Knowledge Hub</span></h1>
            <p className="text-muted mt-1 text-lg max-w-2xl">Access hundreds of hours of free clinical literature, standardized CBT courses, and grounding therapies.</p>
         </div>
         <button className="btn btn-outline border py-3 px-5 relative" onClick={() => setShowSavedVault(true)}>
            <BookmarkPlus size={20} className="mr-2"/> Virtual Briefcase
            {savedItems.length > 0 && <div className="absolute rounded-full bg-accent text-main flex-align-center justify-center" style={{width:'24px', height:'24px', top:'-10px', right:'-10px', fontSize:'0.75rem', fontWeight:'bold', background:'var(--accent-primary)', color:'white', border:'2px solid var(--bg-deep)'}}>{savedItems.length}</div>}
         </button>
      </div>

      <div className="flex-between mb-6 gap-4">
        <div className="card-glass search-bar flex-1 p-2 flex-align-center gap-2" style={{padding: '0.5rem 1rem'}}>
          <Search size={22} className="text-muted" />
          <input type="text" placeholder="Search therapies, symptoms, or interventions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{border:'none', background:'none', boxShadow:'none'}} />
        </div>
      </div>

      {!searchTerm && (
         <div className="card-glass p-0 rounded overflow-hidden relative mb-8 border" style={{minHeight: '400px', display: 'flex', alignItems: 'flex-end', background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="p-8 w-full position-relative" style={{zIndex: 10}}>
               <div className="badge badge-heart mb-3"><Star size={14} fill="currentColor"/> Highest Rated Empathy Course</div>
               <h2 className="text-main mb-2" style={{fontSize: '2.5rem', color: 'white'}}>Mastering the Inner Critic</h2>
               <p className="text-sm mb-5" style={{color: '#E2E8F0', maxWidth:'600px'}}>A massive 6-part video course on silencing imposter syndrome, specifically tailored for First-Generation College Students.</p>
               <div className="flex-align-center gap-4">
                  <button className="btn btn-primary px-6 py-3" onClick={() => setActiveMedia(KNOWLEDGE_BASE[1])}><Play size={20} className="mr-2"/> Play Module 1</button>
                  <button className="btn btn-glass px-5 py-3" onClick={() => handleSaveToVault(KNOWLEDGE_BASE[1])} style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.4)'}}><BookmarkPlus size={20} className="mr-2"/> Save to Briefcase</button>
               </div>
            </div>
         </div>
      )}

      <div className="mb-4">
         <h3 className="mb-4 text-xl">Top Clinical Toolkits for You</h3>
         <div className="dashboard-grid" style={{gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem'}}>
            {filterMedia.map((media) => (
               <motion.div key={media.id} whileHover={{y:-5}} className="card-glass p-0 rounded overflow-hidden flex-col">
                  <div className="w-full relative cursor-pointer" onClick={() => setActiveMedia(media)} style={{height:'160px', background: `linear-gradient(135deg, ${media.id%2===0?'#38B2AC':'#4299E1'}, ${media.id%3===0?'#ED64A6':'#9AE6B4'})`}}>
                     <div className="absolute" style={{top:'50%', left:'50%', transform:'translate(-50%,-50%)', color:'rgba(255,255,255,0.8)'}}>
                        <Play size={48}/>
                     </div>
                     <span className="absolute text-xs fw-bold px-2 py-1 bg-dark text-main" style={{bottom:'10px', right:'10px', borderRadius:'4px', background:'rgba(0,0,0,0.6)', color:'white'}}>{media.time}</span>
                  </div>
                  
                  <div className="p-4 flex-1 flex-col-between bg-secondary">
                     <div>
                        <span className="text-xs text-accent fw-bold mb-1 display-block">{media.category}</span>
                        <h4 className="mb-2" style={{lineHeight: '1.3', fontSize: '1.1rem'}}>{media.title}</h4>
                        <p className="text-xs text-muted mb-4">{media.author}</p>
                     </div>
                     <div className="flex-between">
                        <button className="btn btn-primary btn-sm py-2 px-3" onClick={() => setActiveMedia(media)}><Play size={14}/></button>
                        <button className="btn-icon circle-btn border bg-dark" onClick={(e) => handleSaveToVault(media, e)}><BookmarkPlus size={16}/></button>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>

      <AnimatePresence>
         {showSavedVault && (
           <div className="modal-overlay" style={{background: 'rgba(0,0,0,0.5)', zIndex: 1000}} onClick={() => setShowSavedVault(false)}>
             <motion.div initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{type:'spring', damping:25, stiffness:200}} className="card-glass modal-content p-0" onClick={e => e.stopPropagation()} style={{maxWidth: '450px', height: '100vh', position: 'absolute', right: '0', top: '0', borderRadius: '0', display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--accent-primary)'}}>
                
                <div className="p-6 bg-dark border-bottom flex-between">
                   <div>
                      <h2 className="flex-align-center gap-2 text-xl mb-1"><BookmarkPlus className="text-accent"/> My Briefcase</h2>
                      <p className="text-sm text-muted">Offline-ready clinical toolkits.</p>
                   </div>
                   <button className="btn-icon circle-btn border" onClick={() => setShowSavedVault(false)}><X/></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 flex-col gap-4">
                   {savedItems.length === 0 ? (
                      <div className="text-center text-muted mt-10">
                         <BookmarkPlus size={60} className="mx-auto mb-4 opacity-30"/>
                         <p>Your briefcase is empty.</p>
                         <p className="text-sm mt-2">Save articles and videos here to access them during times of panic or offline situations.</p>
                      </div>
                   ) : (
                      savedItems.map((item, idx) => (
                         <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} key={idx} className="p-4 rounded border bg-dark flex-align-center gap-4">
                           <div className="circle-btn bg-secondary border text-accent" style={{width:'40px', height:'40px'}}>
                              <Play size={18}/>
                           </div>
                           <div className="flex-1">
                              <h4 className="text-sm mb-1">{item.title}</h4>
                              <p className="text-xs text-muted flex-align-center gap-2"><CheckCircle size={10} className="text-success"/> Downloaded ({item.time})</p>
                           </div>
                         </motion.div>
                      ))
                   )}
                </div>

                {savedItems.length > 0 && (
                   <div className="p-6 border-top bg-dark">
                      <button className="btn btn-primary w-full justify-center py-4" disabled={isSyncing} onClick={executeSync}>
                         {isSyncing ? <><Cpu className="animate-spin mr-2" size={18}/> Tunneling Local Filesystem...</> : <><Download size={18} className="mr-2"/> Sync Offline to Device</>}
                      </button>
                   </div>
                )}
             </motion.div>
           </div>
         )}
      </AnimatePresence>

      <AnimatePresence>
         {activeMedia && (
            <div className="modal-overlay" style={{zIndex: 1001}} onClick={() => setActiveMedia(null)}>
               <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}} className="card-glass p-0 overflow-hidden w-full" style={{maxWidth: '900px'}} onClick={e=>e.stopPropagation()}>
                  <div className="w-full relative" style={{background: '#000'}}>
                     <button className="absolute circle-btn" style={{top:'1rem', right:'1rem', background:'rgba(0,0,0,0.6)', color:'white', zIndex: 20, border: '1px solid rgba(255,255,255,0.2)'}} onClick={()=>setActiveMedia(null)}><X/></button>
                     
                     <iframe 
                        width="100%" 
                        height="500" 
                        src={`https://www.youtube.com/embed/${activeMedia.youtubeId}?autoplay=1`} 
                        title="Mental Health Module Video Player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                     ></iframe>

                  </div>

                  <div className="p-6 flex-between bg-dark border-top">
                     <div>
                        <h3 className="mb-1">{activeMedia.title}</h3>
                        <p className="text-sm text-muted">{activeMedia.author} • {activeMedia.category}</p>
                     </div>
                     <button className="btn btn-outline bg-secondary py-3 px-6" onClick={() => {setActiveMedia(null); handleSaveToVault(activeMedia);}}><BookmarkPlus size={18} className="mr-2"/> Save Course to Briefcase</button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

    </motion.div>
  );
}

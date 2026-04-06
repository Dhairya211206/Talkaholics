import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, PlayCircle, Star, BookmarkCheck, LayoutGrid, List, X, Bookmark } from 'lucide-react';
import { useApp } from '../AppContext';

const ARTICLES = [
  { id: 1, type: 'article', title: "Understanding Burnout vs. Stress", author: "Dr. Sarah Jenkins", time: "5 min read", imgBg: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)", rating: 4.8 },
  { id: 2, type: 'video', title: "Guided Meditation for Sleep", author: "Mindful Masters", time: "10 mins", imgBg: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", rating: 4.9 },
  { id: 3, type: 'article', title: "How to Build a Support System", author: "Wellness Clinic", time: "8 min read", imgBg: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)", rating: 4.5 },
];

export default function ExpertContent() {
  const { savedArticles, toggleSaveArticle, showToast } = useApp();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="page-container">
      
      <div className="page-header text-center mb-6">
        <h1 className="title">Expert <span className="text-gradient">Content</span></h1>
        <p className="subtitle">Curated resources from certified professionals to guide your journey.</p>
        <div className="flex-align-center justify-center gap-3 mt-4">
           <button className="btn btn-glass" onClick={() => showToast("Filtering by Articles.")}>Articles</button>
           <button className="btn btn-glass" onClick={() => showToast("Filtering by Videos.")}>Videos</button>
        </div>
      </div>

      <div className="card-glass rounded p-0 overflow-hidden relative mb-6" style={{height: '400px'}}>
         <div className="absolute top-0 left-0 w-full h-full" style={{background: 'url(https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80) center/cover'}}></div>
         <div className="absolute top-0 left-0 w-full h-full" style={{background: 'linear-gradient(to right, rgba(10,10,26,0.95), rgba(10,10,26,0))'}}></div>
         <div className="relative z-10 p-6 w-1/2 flex-col-between h-full">
            <div>
              <span className="p-1 px-3 text-xs rounded bg-dark border text-accent mb-4 inline-block">FEATURED MASTERCLASS</span>
              <h2 style={{fontSize: '3rem', lineHeight:'1.1'}} className="mb-4">The Psychology Behind Chronic Loneliness</h2>
              <p className="text-muted text-lg">Discover the neurological reasons isolation impacts us deeply.</p>
            </div>
            <button className="btn btn-primary" style={{width: 'fit-content'}} onClick={() => setIsVideoModalOpen(true)}>
               <PlayCircle size={20}/> Watch Course Series
            </button>
         </div>
      </div>

      <h3 className="section-title text-center mt-5 mb-4">Recommended Resources</h3>
      <div className="grid-container" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem'}}>
         {ARTICLES.map(a => {
           const isSaved = savedArticles.includes(a.title);
           return (
             <motion.div whileHover={{ y: -5 }} key={a.id} className="card-glass rounded p-0 overflow-hidden cursor-pointer">
               <div className="h-40 flex-align-center justify-center relative cursor-pointer" style={{background: a.imgBg}} onClick={() => setIsVideoModalOpen(true)}>
                 <span className="absolute top-3 right-3 p-2 bg-dark rounded cursor-pointer z-20" onClick={(e) => { e.stopPropagation(); toggleSaveArticle(a.title); }}>
                   {isSaved ? <BookmarkCheck size={20} color="var(--accent-pink)"/> : <Bookmark size={20} color="white"/>}
                 </span>
                 {a.type==='video'?<PlayCircle size={48} color="white"/> : <BookOpen size={48} color="white"/>}
               </div>
               <div className="p-4" onClick={() => setIsVideoModalOpen(true)}>
                 <div className="flex-between mb-2">
                   <span className="text-xs text-accent fw-bold uppercase px-2 py-1 bg-dark rounded">{a.type}</span>
                   <span className="text-xs text-muted flex-align-center gap-1"><Star size={14} fill="var(--text-muted)"/> {a.rating}</span>
                 </div>
                 <h4 className="mb-2" style={{fontSize: '1.25rem', lineHeight:'1.4'}}>{a.title}</h4>
                 <p className="text-sm text-muted">{a.author}</p>
               </div>
             </motion.div>
           )
         })}
      </div>

      {/* Interactive Video Modal Popup */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="card-glass modal-content p-0 overflow-hidden w-full" style={{maxWidth:'800px'}} onClick={e => e.stopPropagation()}>
              <div style={{aspectRatio: '16/9', background: 'var(--bg-deep)', display:'flex', alignItems:'center', justifyContent:'center'}} className="relative border-bottom">
                 <PlayCircle size={64} className="text-accent" style={{opacity: 0.5}} />
                 <p className="absolute bottom-4 text-muted text-sm italic">Simulated Embedded Video Player</p>
              </div>
              <div className="p-5 flex-between">
                 <div>
                   <h2>Course Content Player</h2>
                   <p className="text-muted text-sm mt-1">Video streaming is mocked for this prototype build.</p>
                 </div>
                 <button className="btn btn-outline" onClick={() => setIsVideoModalOpen(false)}>Close Player</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

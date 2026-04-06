import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle, BookOpen, ArrowRight, PlayCircle } from 'lucide-react';
import { useApp } from '../AppContext';

export default function Academy() {
  const { showToast } = useApp();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(-1);

  const modules = [
    { id: 1, title: "Active Listening 101", duration: "15 min", type: "Video", locked: false },
    { id: 2, title: "De-escalation & Triage", duration: "25 min", type: "Simulation", locked: true },
    { id: 3, title: "Crisis Resource Routing", duration: "10 min", type: "Reading", locked: true }
  ];

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    setQuizScore(100);
    showToast("Passed! Certificate generated on the blockchain.");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="page-container">
      
      <div className="flex-between mb-6 border-bottom pb-4">
         <div>
            <div className="badge badge-success mb-3"><ShieldCheck size={14}/> Peer Certification Pathway</div>
            <h1 className="title" style={{fontSize: '2.5rem'}}>The Listener Academy</h1>
            <p className="text-muted mt-1 text-sm max-w-2xl">Before you can oversee chat rooms or earn the 'Trained Listener' badge, you must pass our clinical oversight modules.</p>
         </div>
      </div>

      <div className="grid-container" style={{gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem'}}>
         
         {/* Syllabus Sidebar */}
         <div className="flex-col gap-4">
            <h3 className="text-lg">Curriculum</h3>
            {modules.map(mod => (
               <div key={mod.id} className={`card-glass p-4 rounded border ${mod.locked ? 'opacity-50' : 'border-accent'}`} style={{padding:'1.5rem'}}>
                  <div className="flex-between mb-2">
                     <span className={`text-xs fw-bold ${mod.locked ? 'text-muted' : 'text-accent'}`}>{mod.type}</span>
                     <span className="text-xs text-muted">{mod.duration}</span>
                  </div>
                  <h4 className="mb-2">{mod.title}</h4>
                  <button className={`btn w-full btn-sm py-2 ${mod.locked ? 'btn-outline' : 'btn-primary'}`} disabled={mod.locked}>
                     {mod.locked ? 'Locked' : <><PlayCircle size={16} className="mr-2"/> Begin Module</>}
                  </button>
               </div>
            ))}
         </div>

         {/* Interactive Area */}
         <div className="card-glass p-6 rounded" style={{background: 'var(--bg-deep)'}}>
            {!quizStarted && quizScore === -1 && (
               <div className="text-center py-6">
                  <BookOpen size={60} className="text-muted mx-auto mb-4"/>
                  <h2>Module 1 Readiness Check</h2>
                  <p className="text-muted my-4 max-w-md mx-auto">This interactive exam tests your ability to respond to a peer experiencing acute stress without invalidating their lived experience.</p>
                  <button className="btn btn-primary px-6 py-3" onClick={() => setQuizStarted(true)}>Start interactive Exam <ArrowRight size={18} className="ml-2"/></button>
               </div>
            )}

            {quizStarted && quizScore === -1 && (
               <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                  <div className="bg-dark p-4 rounded mb-5 border">
                     <span className="badge badge-heart mb-2">SIMULATION SCENARIO A</span>
                     <p className="italic text-lg" style={{lineHeight: '1.6'}}>"I just got fired from my job. I literally have no money for rent next week. Everything is over."</p>
                  </div>

                  <h4 className="mb-4">Select the most clinically appropriate active-listening response:</h4>
                  
                  <form onSubmit={handleQuizSubmit} className="flex-col gap-3">
                     <label className="p-4 border rounded cursor-pointer hover:bg-dark flex-align-center gap-3">
                        <input type="radio" name="quiz" required/>
                        <span>"You'll find another job easily, don't worry about it!" <b className="text-danger text-xs">(Toxic Positivity)</b></span>
                     </label>
                     <label className="p-4 border rounded cursor-pointer hover:bg-dark flex-align-center gap-3" style={{borderColor: 'var(--accent-primary)', background: 'rgba(14, 165, 233, 0.05)'}}>
                        <input type="radio" name="quiz" required/>
                        <span>"That sounds incredibly stressful, especially with rent coming up. I am so sorry you are dealing with this." <b className="text-success text-xs">(Validating)</b></span>
                     </label>
                     <label className="p-4 border rounded cursor-pointer hover:bg-dark flex-align-center gap-3">
                        <input type="radio" name="quiz" required/>
                        <span>"You should just borrow money from your parents." <b className="text-warning text-xs">(Unsolicited Advice)</b></span>
                     </label>
                     <button type="submit" className="btn btn-primary w-full py-3 mt-4">Submit Evaluation</button>
                  </form>
               </motion.div>
            )}

            {quizScore === 100 && (
               <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="text-center py-6">
                  <div className="circle-btn bg-success text-success mx-auto mb-4" style={{width:'80px', height:'80px'}}><CheckCircle size={40}/></div>
                  <h2 className="text-success mb-2" style={{fontSize: '2rem'}}>Module Passed (100%)</h2>
                  <p className="text-muted mb-6">You have demonstrated core active listening capabilities. This adds +10 to your community Trust Score.</p>
                  
                  <div className="bg-dark p-5 rounded border text-left">
                     <div className="flex-align-center gap-3 mb-3"><Award size={24} className="text-accent"/><h3 className="text-accent">Achievement Unlocked</h3></div>
                     <p className="text-sm">You are now permitted to moderate Level 1 Safe Spaces. Your profile badge has been permanently updated.</p>
                  </div>
               </motion.div>
            )}
         </div>

      </div>
    </motion.div>
  );
}

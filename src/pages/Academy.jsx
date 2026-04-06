import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle, BookOpen, ArrowRight, PlayCircle, Lock } from 'lucide-react';
import { useApp } from '../AppContext';

export default function Academy() {
  const { showToast } = useApp();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(-1);
  const [modules, setModules] = useState([
    { id: 1, title: "Active Listening 101", duration: "15 min", type: "Video", locked: false },
    { id: 2, title: "De-escalation & Triage", duration: "25 min", type: "Simulation", locked: true },
    { id: 3, title: "Crisis Resource Routing", duration: "10 min", type: "Reading", locked: true }
  ]);

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    setQuizScore(100);
    
    // Unlock the next module upon passing
    setModules(prev => prev.map(m => m.id === 2 ? { ...m, locked: false } : m));
    showToast("Module 2 Unlocked! Certificate generated on the blockchain.");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="page-container" style={{maxWidth: '1200px'}}>
      
      <div className="flex-between mb-6 border-bottom pb-4">
         <div>
            <div className="badge badge-success mb-3"><ShieldCheck size={14}/> Peer Certification Pathway</div>
            <h1 className="title" style={{fontSize: '3rem'}}>The Listener Academy</h1>
            <p className="text-muted mt-1 text-lg max-w-2xl">Before you can oversee chat rooms or earn the 'Trained Listener' badge, you must pass our clinical oversight modules.</p>
         </div>
      </div>

      <div className="grid-container" style={{display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem'}}>
         
         {/* Syllabus Sidebar */}
         <div className="flex-col gap-4">
            <h3 className="text-lg">Curriculum Progress</h3>
            {modules.map(mod => (
               <div key={mod.id} className={`card-glass p-0 rounded overflow-hidden border ${mod.locked ? 'opacity-50' : 'border-accent'}`}>
                  <div className="p-4" style={{background: mod.locked ? 'var(--bg-secondary)' : 'var(--bg-deep)'}}>
                     <div className="flex-between mb-2">
                        <span className={`text-xs fw-bold ${mod.locked ? 'text-muted' : 'text-accent'}`}>{mod.type}</span>
                        <span className="text-xs text-muted">{mod.duration}</span>
                     </div>
                     <h4 className="mb-3">{mod.title}</h4>
                     <button 
                        className={`btn w-full btn-sm py-2 ${mod.locked ? 'btn-outline' : mod.id===1 && quizScore===100 ? 'btn-success' : 'btn-primary'}`} 
                        style={mod.id===1 && quizScore===100 ? {background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', border: '1px solid var(--success-color)'} : {}}
                        disabled={mod.locked}
                        onClick={() => { if(!mod.locked && mod.id===2) setQuizStarted(false); }}
                     >
                        {mod.locked ? <><Lock size={16} className="mr-2"/> Locked</> : mod.id===1 && quizScore===100 ? <><CheckCircle size={16} className="mr-2"/> Completed</> : <><PlayCircle size={16} className="mr-2"/> Begin Module</>}
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {/* Interactive Area */}
         <div className="card-glass p-8 rounded" style={{background: 'var(--bg-deep)', alignSelf: 'start'}}>
            {!quizStarted && quizScore === -1 && (
               <div className="text-center py-6">
                  <BookOpen size={60} className="text-muted mx-auto mb-5"/>
                  <h2 className="mb-2">Module 1 Readiness Check</h2>
                  <p className="text-muted my-4 max-w-md mx-auto text-lg">This interactive exam tests your ability to respond to a peer experiencing acute stress without invalidating their lived experience.</p>
                  <button className="btn btn-primary px-8 py-4 text-lg" onClick={() => setQuizStarted(true)}>Start Interactive Exam <ArrowRight size={20} className="ml-2"/></button>
               </div>
            )}

            {quizStarted && quizScore === -1 && (
               <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                  <div className="bg-dark p-6 rounded mb-6 border">
                     <span className="badge" style={{background: 'var(--danger-color)', color: 'white', marginBottom: '1rem'}}>SIMULATION SCENARIO A</span>
                     <p className="italic text-xl" style={{lineHeight: '1.6'}}>"I just got fired from my job. I literally have no money for rent next week. Everything is over."</p>
                  </div>

                  <h4 className="mb-5 text-lg">Select the most clinically appropriate active-listening response:</h4>
                  
                  <form onSubmit={handleQuizSubmit} className="flex-col gap-4">
                     <label className="p-5 border rounded cursor-pointer hover:bg-dark flex-align-center gap-4 transition-all">
                        <input type="radio" name="quiz" required style={{width: '20px', height: '20px'}}/>
                        <span className="text-lg">"You'll find another job easily, don't worry about it!" <b className="text-danger text-sm display-block mt-1">(Toxic Positivity)</b></span>
                     </label>
                     <label className="p-5 border rounded cursor-pointer flex-align-center gap-4 transition-all" style={{borderColor: 'var(--accent-primary)', background: 'rgba(14, 165, 233, 0.05)'}}>
                        <input type="radio" name="quiz" required style={{width: '20px', height: '20px'}}/>
                        <span className="text-lg">"That sounds incredibly stressful, especially with rent coming up. I am so sorry you are dealing with this." <b className="text-success text-sm display-block mt-1">(Validating)</b></span>
                     </label>
                     <label className="p-5 border rounded cursor-pointer hover:bg-dark flex-align-center gap-4 transition-all">
                        <input type="radio" name="quiz" required style={{width: '20px', height: '20px'}}/>
                        <span className="text-lg">"You should just borrow money from your parents." <b className="text-warning text-sm display-block mt-1">(Unsolicited Advice)</b></span>
                     </label>
                     <button type="submit" className="btn btn-primary w-full py-4 mt-4 text-lg">Submit Final Evaluation</button>
                  </form>
               </motion.div>
            )}

            {quizScore === 100 && (
               <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="text-center py-6">
                  <div className="circle-btn bg-success text-success mx-auto mb-4" style={{width:'80px', height:'80px'}}><CheckCircle size={40}/></div>
                  <h2 className="text-success mb-3" style={{fontSize: '2.5rem'}}>Module Passed (100%)</h2>
                  <p className="text-muted mb-8 text-lg">You have demonstrated core active listening capabilities. This adds +10 to your community Trust Score.</p>
                  
                  <div className="bg-dark p-6 rounded border text-left flex-align-center gap-6">
                     <div className="circle-btn border bg-secondary"><Award size={40} className="text-accent"/></div>
                     <div>
                        <h3 className="text-accent mb-1 text-xl">Module 2 Unlocked</h3>
                        <p className="text-muted text-sm">You are now permitted to access De-escalation & Triage. Check the sidebar to proceed.</p>
                     </div>
                  </div>
               </motion.div>
            )}
         </div>

      </div>
    </motion.div>
  );
}

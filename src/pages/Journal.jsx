import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles, CheckCircle, PenTool, Mic, Lock, History, Flame, LockKeyhole, X, Search } from 'lucide-react';
import { useApp } from '../AppContext';

export default function Journal() {
  const { showToast } = useApp();
  const [entry, setEntry] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [secureVault, setSecureVault] = useState(true);
  const [showVault, setShowVault] = useState(false);
  
  // Make Past Entries dynamic state instead of purely hardcoded
  const [pastEntries, setPastEntries] = useState([
    { date: "Yesterday, 8:00 PM", text: "I tried to speak up in the group but felt like an idiot. Everyone else is so put together.", distortion: "Mind Reading", reframe: "I cannot know others are judging me unless they say so." },
    { date: "Oct 12, 10:15 AM", text: "If I don't get this promotion my whole career is basically a failure.", distortion: "Catastrophizing", reframe: "A promotion is a single event, my career is a marathon." },
    { date: "Oct 8, 11:00 PM", text: "I literally ruin every relationship I'm in.", distortion: "All-or-Nothing", reframe: "Relationships are highly complex two-way streets." }
  ]);

  const simulateDictation = () => {
     if (isListening) return;
     setIsListening(true);
     showToast("Voice Biometrics active. Start speaking...");
     setTimeout(() => {
        setEntry(prev => prev + " Honestly, I just feel like I'm falling behind everyone else in my cohort.");
        setIsListening(false);
     }, 3000);
  };

  const handleAnalyze = () => {
    if (entry.length < 10) {
      showToast("Please write a bit more context for the AI to analyze.");
      return;
    }
    setIsAnalyzing(true);
    setAnalysis(null);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysis({
        cognitiveDistortion: "Social Comparison & Catastrophizing",
        reframing: "Instead of comparing your timeline to others, let's try: 'I am on my own distinct path. My worth is not defined by how quickly I achieve certain milestones compared to my peers.'",
        actionStep: "Write down two unique skills or traits you possess that you are proud of."
      });
    }, 3000);
  };

  const handleSaveToVault = () => {
     // Push the currently analyzed state deeply into our vault array!
     setPastEntries([{
         date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " Today",
         text: entry,
         distortion: analysis.cognitiveDistortion,
         reframe: analysis.reframing
     }, ...pastEntries]);
     
     showToast("Successfully injected into Zero-Knowledge Semantic Vault.");
     setAnalysis(null);
     setEntry("");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="page-container" style={{maxWidth: '1200px'}}>
      
      <div className="flex-between mb-6 border-bottom pb-4">
         <div>
            <h1 className="title" style={{fontSize: '2.5rem'}}>AI <span className="text-accent">CBT Journal</span></h1>
            <p className="text-muted mt-1 text-sm">Log your thoughts natively, or use voice transcription to securely process cognitive distortions.</p>
         </div>
      </div>

      <div className="grid-container" style={{display: 'grid', gridTemplateColumns: 'minmax(350px, 2fr) minmax(300px, 1fr)', gap: '2rem'}}>
         
         {/* Main Processing Hub */}
         <div className="flex-col gap-6">
            <div className="card-glass p-0 rounded overflow-hidden">
               <div className="p-4 bg-dark border-bottom flex-between glass-overlay-bg">
                  <div className="flex-align-center gap-2 text-accent fw-bold"><PenTool size={18}/> <span>Live Semantic Input</span></div>
                  <button className={`btn-icon py-1 px-3 border rounded ${isListening ? 'text-danger' : 'text-muted'}`} onClick={simulateDictation} style={{borderColor: isListening ? 'var(--danger-color)' : 'rgba(255,255,255,0.1)', background: isListening ? 'rgba(239, 68, 68, 0.1)' : 'transparent'}}>
                     {isListening ? <><Mic className="animate-pulse mr-2" size={16}/> Listening...</> : <><Mic size={16} className="mr-2"/> Dictate</>}
                  </button>
               </div>
               
               <div className="p-5">
                  <textarea 
                     rows="6" 
                     placeholder="What's heavily on your mind right now? (e.g. 'I feel like I ruin everything I touch.')"
                     className="w-full text-main mb-4"
                     value={entry}
                     onChange={(e) => setEntry(e.target.value)}
                  ></textarea>
                  
                  <div className="flex-between mt-2 pt-4 border-top">
                     <div className="text-xs text-muted flex-align-center gap-2">
                        {secureVault ? <LockKeyhole size={14} className="text-success"/> : <Lock size={14}/>} 
                        {secureVault ? <span className="text-success">Zero-Knowledge Encryption Active</span> : 'Standard Cloud Save'}
                     </div>
                     <button className="btn btn-primary" onClick={handleAnalyze} disabled={isAnalyzing}>
                       {isAnalyzing ? <><Cpu className="animate-spin mr-2"/> Compiling Therapy Logic...</> : <><Sparkles size={18} className="mr-2"/> Run AI Reframing</>}
                     </button>
                  </div>
               </div>
            </div>

            <AnimatePresence>
               {analysis && (
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card-glass p-5 rounded" style={{border: '1px solid var(--ai-color)', background: 'rgba(139, 92, 246, 0.05)'}}>
                     <h3 className="flex-align-center gap-2 mb-4" style={{color: 'var(--ai-color)'}}><Cpu size={24}/> Clinical Breakdown</h3>
                     
                     <div className="flex-col gap-4">
                       <div className="bg-dark p-4 rounded border">
                          <h4 className="text-xs text-ai mb-2 fw-bold">DETECTED COGNITIVE DISTORTION</h4>
                          <p className="text-lg">{analysis.cognitiveDistortion}</p>
                       </div>
                       
                       <div className="bg-success p-4 rounded border border-success" style={{background: 'rgba(16, 185, 129, 0.1)'}}>
                          <h4 className="text-xs text-success mb-2 fw-bold">CBT REFRAMING EXERCISE</h4>
                          <p style={{lineHeight: '1.6'}}>{analysis.reframing}</p>
                       </div>
                       
                       <div className="flex-align-center gap-3 mt-2 p-4 border rounded bg-dark">
                          <CheckCircle className="text-accent" size={24}/>
                          <div>
                            <h4 className="text-xs text-muted fw-bold mb-1">PROPOSED ACTION STEP</h4>
                            <p className="text-sm">{analysis.actionStep}</p>
                          </div>
                       </div>
                     </div>

                     <button className="btn btn-glass w-full justify-center mt-5 py-3" onClick={handleSaveToVault}>Vault Insight & Close</button>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* Side Advantages Column */}
         <div className="flex-col gap-4">
            
            <div className="card-glass p-5 rounded">
               <div className="flex-between mb-4">
                  <h3 className="text-lg">Reflection Streak</h3>
                  <Flame size={24} className="text-warning"/>
               </div>
               <div className="text-center py-4 bg-dark rounded border mb-4">
                  <div className="text-3xl fw-bold text-accent mb-1">4 Days</div>
                  <span className="text-xs text-muted">Current Neural Sync Streak</span>
               </div>
               <p className="text-xs text-muted">Daily processing decreases emotional volatility by 31%. Keep going to unlock your next Hub Toolkit.</p>
            </div>

            <div className="card-glass p-5 rounded">
               <h3 className="text-lg flex-align-center gap-2 mb-4"><Lock size={18} className="text-success"/> Privacy Options</h3>
               
               <div className="flex-col gap-3">
                  <label className="flex-between p-3 border rounded bg-dark cursor-pointer">
                     <span className="text-sm fw-bold">Zero-Knowledge Encrypt</span>
                     <input type="checkbox" checked={secureVault} onChange={()=>setSecureVault(!secureVault)} style={{width: '20px', height: '20px'}}/>
                  </label>
                  <label className="flex-between p-3 border rounded bg-dark cursor-pointer opacity-50">
                     <span className="text-sm fw-bold">Shared to Live Cohort</span>
                     <input type="checkbox" disabled style={{width: '20px', height: '20px'}}/>
                  </label>
               </div>
            </div>

            <div className="card-glass p-5 rounded">
               <h3 className="text-lg flex-align-center gap-2 mb-4"><History size={18}/> Semantic Memory</h3>
               <p className="text-xs text-muted mb-4">Our AI remembers your past emotional markers to provide context-aware therapy moving forward.</p>
               <button className="btn btn-outline w-full justify-center text-sm" onClick={() => setShowVault(true)}>View Past Insights Vault</button>
            </div>

         </div>
      </div>

      {/* Semantic Vault Past Entries Modal */}
      <AnimatePresence>
         {showVault && (
           <div className="modal-overlay" onClick={() => setShowVault(false)} style={{zIndex: 1000}}>
             <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="card-glass modal-content p-0" onClick={e => e.stopPropagation()} style={{maxWidth: '600px', height: '100vh', position: 'absolute', right: '0', top: '0', borderRadius: '0', display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--panel-border)'}}>
                
                <div className="p-6 bg-dark border-bottom flex-between">
                   <div>
                      <h2 className="flex-align-center gap-2 text-xl mb-1"><LockKeyhole className="text-success"/> Encrypted Vault</h2>
                      <p className="text-sm text-muted">A timeline of your cognitive reframing.</p>
                   </div>
                   <button className="btn-icon circle-btn border" onClick={() => setShowVault(false)}><X/></button>
                </div>

                <div className="p-4" style={{background: 'rgba(255,255,255,0.02)'}}>
                   <div className="search-bar border rounded p-2 flex-align-center gap-2 bg-dark">
                      <Search size={18} className="text-muted"/>
                      <input type="text" placeholder="Search past thoughts..." style={{padding:'0.5rem', border:'none', background:'transparent', boxShadow:'none'}}/>
                   </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 flex-col gap-5">
                   {pastEntries.map((entry, idx) => (
                      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} key={idx} className="p-5 rounded border bg-dark">
                         <div className="text-xs text-muted mb-3 flex-between fw-bold"><span>{entry.date}</span> <span className="badge badge-success text-success" style={{background:'rgba(16,185,129,0.1)'}}>AI Reframed</span></div>
                         <p className="italic text-sm mb-4" style={{color: 'var(--text-muted)'}}>"{entry.text}"</p>
                         <div className="p-3 border rounded" style={{background: 'rgba(14, 165, 233, 0.05)', borderColor: 'rgba(14, 165, 233, 0.2)'}}>
                            <div className="text-xs fw-bold text-accent mb-2">{entry.distortion.toUpperCase()}</div>
                            <p className="text-sm">"{entry.reframe}"</p>
                         </div>
                      </motion.div>
                   ))}
                </div>
             </motion.div>
           </div>
         )}
      </AnimatePresence>

    </motion.div>
  );
}

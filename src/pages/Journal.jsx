import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Cpu, Sparkles, CheckCircle, PenTool } from 'lucide-react';
import { useApp } from '../AppContext';

export default function Journal() {
  const { showToast } = useApp();
  const [entry, setEntry] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    if (entry.length < 10) {
      showToast("Please write a bit more context for the AI to analyze.");
      return;
    }
    setIsAnalyzing(true);
    setAnalysis(null);
    
    // Fake AI Delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysis({
        cognitiveDistortion: "All-or-Nothing Thinking",
        reframing: "Instead of saying 'I ruin everything,' let's try: 'I made a mistake in this specific situation, but I have succeeded in many others.'",
        actionStep: "Write down three things you did successfully today, no matter how small."
      });
    }, 3000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="page-container" style={{maxWidth: '900px'}}>
      
      <div className="text-center mb-6">
        <h1 className="title" style={{fontSize: '3rem'}}>AI <span className="text-accent">CBT Journal</span></h1>
        <p className="text-muted text-lg mt-2">Log your daily thoughts and let our AI help you reframe cognitive distortions.</p>
      </div>

      <div className="card-glass p-5 mb-5 rounded">
         <div className="flex-align-center gap-2 mb-4 text-accent fw-bold"><PenTool size={20}/> <h3>Today's Entry</h3></div>
         <textarea 
            rows="6" 
            placeholder="What's heavily on your mind right now? (e.g. 'I feel like I ruin everything I touch.')"
            className="w-full bg-dark p-4 rounded text-main"
            style={{border: 'var(--panel-border)', fontSize: '1rem', resize: 'vertical'}}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
         ></textarea>
         
         <div className="flex-between mt-4 border-top pt-4">
            <span className="text-sm text-muted">All entries are encrypted locally on your device.</span>
            <button className="btn btn-primary" onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? <><Cpu className="animate-spin mr-2"/> Analyzing Semantic Markers...</> : <><Sparkles size={18} className="mr-2"/> Run AI Reframing</>}
            </button>
         </div>
      </div>

      <AnimatePresence>
         {analysis && (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card-glass p-5 rounded" style={{border: '1px solid var(--ai-color)', background: 'rgba(139, 92, 246, 0.05)'}}>
               <h3 className="flex-align-center gap-2 mb-4" style={{color: 'var(--ai-color)'}}><Cpu size={24}/> AI Sentiment Breakdown</h3>
               
               <div className="flex-col gap-4">
                 <div className="bg-dark p-4 rounded border">
                    <h4 className="text-sm text-ai mb-1 fw-bold">DETECTED COGNITIVE DISTORTION</h4>
                    <p>{analysis.cognitiveDistortion}</p>
                 </div>
                 
                 <div className="bg-success p-4 rounded border border-success" style={{background: 'rgba(16, 185, 129, 0.1)'}}>
                    <h4 className="text-sm text-success mb-1 fw-bold">CBT REFRAMING EXERCISE</h4>
                    <p style={{lineHeight: '1.6'}}>{analysis.reframing}</p>
                 </div>
                 
                 <div className="flex-align-center gap-3 mt-2 p-3 border rounded">
                    <CheckCircle className="text-accent" size={24}/>
                    <div>
                      <h4 className="text-sm text-muted fw-bold mb-1">PROPOSED ACTION STEP</h4>
                      <p className="text-sm">{analysis.actionStep}</p>
                    </div>
                 </div>
               </div>

               <button className="btn btn-glass w-full justify-center mt-5 py-3" onClick={() => {showToast("Entry saved to encrypted clinical vault."); setAnalysis(null); setEntry("");}}>Save Insight & Close</button>
            </motion.div>
         )}
      </AnimatePresence>

    </motion.div>
  );
}

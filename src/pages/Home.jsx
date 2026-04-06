import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, ArrowRight, AlertTriangle, Activity, Lock, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  
  const [triageStage, setTriageStage] = useState(0); 
  // 0: Intake, 1: Scanning, 2: Risk Flag, 3: Clearance

  const runTriageSequence = () => {
    setTriageStage(1);
    setTimeout(() => setTriageStage(2), 2500); // Simulate Risk Check
    setTimeout(() => setTriageStage(3), 5000); // Route to Clearance
  };

  const routeToProtocol = () => {
    showToast("System diagnostic clear. Routing to Triage Command.");
    navigate('/dashboard');
  };

  return (
    <div className="page-container flex-col justify-center" style={{minHeight: '85vh', display: 'flex'}}>
      
      <div className="text-center mb-6">
         <div className="ai-badge mb-4 mx-auto w-max" style={{width: 'fit-content', padding: '0.5rem 1rem'}}><Cpu size={16}/> Talkaholics Core System v4.1</div>
         <h1 className="title text-gradient" style={{fontSize: '4.5rem'}}>AI Assessment Gateway</h1>
         <p className="text-muted mt-3 text-lg" style={{maxWidth: '600px', margin: '0 auto'}}>A structured, B2B clinical funnel utilizing active sentiment oversight to secure peer-to-peer mental health delivery.</p>
      </div>

      <div className="mx-auto w-full" style={{maxWidth: '900px'}}>
        <div className="triage-terminal">
           <div className="triage-scanline"></div>
           
           <div className="flex-between border-bottom pb-4 mb-4">
              <div className="flex-align-center gap-3">
                 <ShieldCheck size={28} className="text-accent" />
                 <div>
                    <h2 style={{fontSize: '1.2rem', letterSpacing:'1px', textTransform:'uppercase'}}>Intake Protocol</h2>
                    <p className="text-xs text-muted">System ID: 899-AX</p>
                 </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-ai font-bold border p-2 rounded" style={{borderColor: 'var(--ai-color)'}}><Activity className="inline mr-2" size={14}/> SYSTEM ACTIVE</span>
              </div>
           </div>

           <AnimatePresence mode="wait">
             {triageStage === 0 && (
               <motion.div key="stage0" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  <p className="mb-5 text-sm" style={{lineHeight:'1.8'}}>Before granting network clearance to structured community modules, all incoming vectors must undergo automated risk assessment. By proceeding, you consent to real-time algorithmic oversight.</p>
                  
                  <div className="scan-grid mb-6">
                     <div className="scan-node"><Lock size={24} className="text-muted mx-auto mb-2"/> <p className="text-xs">End-to-End Secure</p></div>
                     <div className="scan-node"><Database size={24} className="text-muted mx-auto mb-2"/> <p className="text-xs">HIPAA Compliant Structure</p></div>
                     <div className="scan-node"><Cpu size={24} className="text-muted mx-auto mb-2"/> <p className="text-xs">Zero-Threat AI Monitor</p></div>
                  </div>

                  <button className="btn btn-primary w-full py-4 text-lg" onClick={runTriageSequence}>Initiate Diagnostics <ArrowRight size={20}/></button>
               </motion.div>
             )}

             {triageStage === 1 && (
               <motion.div key="stage1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center py-6">
                  <Activity size={48} className="text-ai mx-auto mb-4" style={{animation: 'pulse 1.5s infinite'}}/>
                  <h3 className="mb-2">Algorithmic Base Scanning</h3>
                  <p className="text-sm text-ai font-monospace">Parsing historic vectors... Mapping behavioral markers...</p>
                  <div className="progress-bar mt-4 mx-auto" style={{maxWidth:'400px'}}><motion.div className="progress-fill" style={{background: 'var(--ai-color)'}} initial={{width:0}} animate={{width:'100%'}} transition={{duration: 2.5}}/></div>
               </motion.div>
             )}

             {triageStage === 2 && (
               <motion.div key="stage2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center py-6">
                  <AlertTriangle size={48} className="text-warning mx-auto mb-4" />
                  <h3 className="text-warning mb-2">Analyzing Distress Metrics</h3>
                  <p className="text-sm text-muted font-monospace">Running pattern match against predefined crisis markers...</p>
                  <div className="progress-bar mt-4 mx-auto" style={{maxWidth:'400px'}}><motion.div className="progress-fill" style={{background: 'var(--warning-color)'}} initial={{width:0}} animate={{width:'100%'}} transition={{duration: 2.5}}/></div>
               </motion.div>
             )}

             {triageStage === 3 && (
               <motion.div key="stage3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center py-5">
                  <ShieldCheck size={56} className="text-success mx-auto mb-4" />
                  <h2 className="text-success mb-2">Clearance Granted</h2>
                  <p className="text-sm text-muted mb-6">No emergency markers detected. Authorized for structured peer and clinical modules.</p>
                  <button className="btn btn-glass w-full py-4 text-lg border" onClick={routeToProtocol} style={{borderColor: 'var(--success-color)', color: 'var(--success-color)'}}>Enter Command Center <ArrowRight size={20}/></button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

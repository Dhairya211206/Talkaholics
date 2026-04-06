import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Users, GraduationCap, BrainCircuit, ShieldCheck, Activity, Globe, HeartPulse, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext';

export default function Home() {
  const { toggleSOS } = useApp();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page-container" style={{maxWidth: '1400px', padding: '0 2rem'}}>
      
      {/* Massive Airy Hero Section */}
      <div style={{minHeight: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative'}}>
        
        {/* Glow behind hero */}
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none'}}></div>

        <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.1}} className="relative z-10">
           <div className="badge mb-6 mx-auto flex-align-center gap-2" style={{background:'rgba(255,255,255,0.05)', color:'var(--text-muted)', border:'1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1.5rem', borderRadius: '50px', display: 'inline-flex'}}>
              <Globe size={16} className="text-accent"/> Establishing new protocols for global peer support.
           </div>
           
           <h1 className="title mb-6" style={{fontSize: '5.5rem', lineHeight: '1.05', letterSpacing: '-0.04em', maxWidth: '1000px', margin: '0 auto'}}>
             A new standard for <span className="text-gradient">mental resilience.</span>
           </h1>
           
           <p className="text-muted mx-auto mb-10" style={{maxWidth: '650px', fontSize: '1.25rem', lineHeight: '1.6'}}>
             Talkaholics is an AI-moderated infrastructure providing barrier-free, clinically guided support enclaves for individuals navigating profound distress.
           </p>

           <div className="flex-align-center justify-center gap-5">
              <Link to="/circles" className="btn btn-primary" style={{padding: '1.2rem 3rem', fontSize: '1.1rem', borderRadius: '50px', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.3)'}}>Enter Safe Spaces</Link>
              <button onClick={() => toggleSOS(true)} className="btn btn-glass bg-dark" style={{padding: '1.2rem 3rem', fontSize: '1.1rem', borderRadius: '50px', color: 'var(--text-main)', border: '1px solid rgba(255,255,255,0.2)'}}><ShieldAlert size={18} className="mr-2 text-danger"/> I am in crisis</button>
           </div>
        </motion.div>
      </div>

      {/* Spacious 3-Column Features Section */}
      <div style={{padding: '4rem 0 8rem 0'}}>
         <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem'}}>
            
            <motion.div whileHover={{y:-10}} className="card-glass p-8 flex-col justify-between" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(15,23,42,0.6) 100%)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)'}}>
               <div>
                  <div className="circle-btn mb-6" style={{width: '60px', height: '60px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--ai-color)', border: '1px solid rgba(139, 92, 246, 0.3)'}}>
                     <BrainCircuit size={28}/>
                  </div>
                  <h3 className="text-2xl mb-3">AI CBT Journal</h3>
                  <p className="text-muted text-lg leading-relaxed mb-8">Securely log your thoughts. Our local semantic engine intercepts cognitive distortions and recommends immediate reframing exercises.</p>
               </div>
               <Link to="/journal" className="btn-link text-ai fw-bold flex-align-center gap-2" style={{fontSize: '1.1rem'}}>Open Journal <ArrowRight size={18}/></Link>
            </motion.div>

            <motion.div whileHover={{y:-10}} className="card-glass p-8 flex-col justify-between" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(15,23,42,0.6) 100%)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden'}}>
               {/* Subtle background glow for middle card */}
               <div style={{position:'absolute', top:'-20%', left:'50%', transform:'translateX(-50%)', width:'200px', height:'200px', background:'var(--accent-primary)', filter:'blur(100px)', opacity:0.15}}></div>
               
               <div className="relative z-10">
                  <div className="circle-btn mb-6" style={{width: '60px', height: '60px', background: 'rgba(14, 165, 233, 0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(14, 165, 233, 0.3)'}}>
                     <Users size={28}/>
                  </div>
                  <h3 className="text-2xl mb-3">Moderated Enclaves</h3>
                  <p className="text-muted text-lg leading-relaxed mb-8">Petition for specialized community support circles. Every room is protected by our Empathy Guard to instantly redact triggering language.</p>
               </div>
               <Link to="/chat" className="btn-link text-accent fw-bold flex-align-center gap-2 relative z-10" style={{fontSize: '1.1rem'}}>Connect to Peers <ArrowRight size={18}/></Link>
            </motion.div>

            <motion.div whileHover={{y:-10}} className="card-glass p-8 flex-col justify-between" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(15,23,42,0.6) 100%)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)'}}>
               <div>
                  <div className="circle-btn mb-6" style={{width: '60px', height: '60px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', border: '1px solid rgba(16, 185, 129, 0.3)'}}>
                     <GraduationCap size={28}/>
                  </div>
                  <h3 className="text-2xl mb-3">Listener Academy</h3>
                  <p className="text-muted text-lg leading-relaxed mb-8">Pass interactive clinical scenario exams to earn your Peer Certification. Help us monitor the infrastructure safely.</p>
               </div>
               <Link to="/academy" className="btn-link text-success fw-bold flex-align-center gap-2" style={{fontSize: '1.1rem'}}>Get Certified <ArrowRight size={18}/></Link>
            </motion.div>

         </div>
      </div>

      {/* Clean Bottom Metric Bar */}
      <div className="flex-between py-6 border-top" style={{borderColor: 'rgba(255,255,255,0.05)'}}>
         <div className="flex-align-center gap-3 text-muted">
            <ShieldCheck size={20} className="text-success"/> <span className="text-sm fw-bold tracking-widest uppercase">HIPAA Compliant Data Pipeline</span>
         </div>
         <div className="flex-align-center gap-6">
            <div className="text-right">
               <div className="text-xl fw-bold text-main mb-1">14,204</div>
               <div className="text-xs text-muted">Peers Online</div>
            </div>
            <div className="text-right border-left pl-6" style={{borderColor: 'rgba(255,255,255,0.1)'}}>
               <div className="text-xl fw-bold text-main mb-1">99.9%</div>
               <div className="text-xs text-muted">Crisis De-escalation</div>
            </div>
         </div>
      </div>

    </motion.div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Calendar, Activity, BookOpen, HeartPulse, Video, Plus, CheckCircle, PenTool, LayoutDashboard } from 'lucide-react';
import { useApp } from '../AppContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('progress');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="page-container" style={{maxWidth: '1200px'}}>
      
      <div className="flex-between mb-6 border-bottom pb-4">
         <div>
            <h1 className="title" style={{fontSize: '2.5rem'}}><LayoutDashboard className="inline mr-2 text-accent"/> End-User Hub</h1>
            <p className="text-muted mt-1 text-sm">Welcome back. Track your journey, manage your cohorts, and access your toolkits.</p>
         </div>
      </div>

      <div className="flex gap-4 mb-6">
         <button onClick={()=>setActiveTab('progress')} className={`btn ${activeTab==='progress'?'btn-primary':'btn-outline'} flex-1 py-3`}><Activity size={18}/> My Journey</button>
         <button onClick={()=>setActiveTab('calendar')} className={`btn ${activeTab==='calendar'?'btn-primary':'btn-outline'} flex-1 py-3`}><Calendar size={18}/> Live Therapy Calendar</button>
         <button onClick={()=>setActiveTab('toolkits')} className={`btn ${activeTab==='toolkits'?'btn-primary':'btn-outline'} flex-1 py-3`}><HeartPulse size={18}/> Saved Toolkits</button>
      </div>

      <AnimatePresence mode="wait">
        
        {activeTab === 'progress' && (
           <motion.div key="progress" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="flex-col gap-6">
              <div className="grid-container" style={{gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'}}>
                 <div className="card-glass p-5 rounded border">
                    <div className="flex-between text-muted mb-3"><ShieldCheck size={20}/> <span className="text-xs fw-bold">LISTEN HOURS</span></div>
                    <h2 style={{fontSize: '2.5rem', color: 'var(--accent-primary)'}}>14<span className="text-lg">hrs</span></h2>
                 </div>
                 <div className="card-glass p-5 rounded border">
                    <div className="flex-between text-muted mb-3"><PenTool size={20}/> <span className="text-xs fw-bold">JOURNAL ENTRIES</span></div>
                    <h2 style={{fontSize: '2.5rem'}}>24</h2>
                 </div>
                 <div className="card-glass p-5 rounded border bg-success">
                    <div className="flex-between text-success mb-3"><CheckCircle size={20}/> <span className="text-xs fw-bold">ACADEMY RANK</span></div>
                    <h2 style={{fontSize: '2rem', color: '#22543D', marginTop:'0.5rem'}}>Level 2</h2>
                    <p className="text-sm mt-1" style={{color: '#22543D'}}>Cert. Crisis Listener</p>
                 </div>
              </div>

              <div className="card-glass p-6 rounded relative overflow-hidden">
                 <div className="flex-between mb-5">
                   <h3 className="text-lg">Mood Logging Distribution</h3>
                   <span className="badge">Trailing 7 Days</span>
                 </div>
                 <div className="flex-col gap-3">
                   <div className="flex-align-center gap-4">
                      <span className="w-16">Great</span>
                      <div className="progress-bar flex-1"><div className="progress-fill" style={{width: '60%', background: 'var(--success-color)'}}></div></div>
                   </div>
                   <div className="flex-align-center gap-4">
                      <span className="w-16">Okay</span>
                      <div className="progress-bar flex-1"><div className="progress-fill" style={{width: '30%', background: 'var(--warning-color)'}}></div></div>
                   </div>
                   <div className="flex-align-center gap-4">
                      <span className="w-16">Down</span>
                      <div className="progress-bar flex-1"><div className="progress-fill" style={{width: '10%', background: 'var(--danger-color)'}}></div></div>
                   </div>
                 </div>
              </div>
           </motion.div>
        )}

        {activeTab === 'calendar' && (
           <motion.div key="calendar" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="card-glass p-6 rounded">
              <h3 className="mb-5 flex-align-center gap-2"><Video className="text-accent"/> Upcoming Live Cohorts</h3>
              <div className="flex-col gap-4">
                 
                 <div className="bg-dark p-4 rounded border flex-between">
                    <div>
                       <div className="flex-align-center gap-2 mb-1"><span className="badge badge-success">Tomorrow, 7:00 PM</span><span className="text-xs text-muted">Webinar</span></div>
                       <h4 className="text-lg">Managing Burnout with Dr. Aris</h4>
                       <p className="text-sm text-muted mt-1">A supervised 1-hour workshop on recognizing clinical burnout.</p>
                    </div>
                    <button className="btn btn-outline py-2 px-4" onClick={() => showToast("RSVP Confirmed. Link will be emailed.")}>RSVP</button>
                 </div>

                 <div className="bg-dark p-4 rounded border flex-between">
                    <div>
                       <div className="flex-align-center gap-2 mb-1"><span className="badge badge-heart" style={{background: 'var(--danger-color)', color: 'white'}}>Saturday, 10:00 AM</span><span className="text-xs text-muted">Group Therapy</span></div>
                       <h4 className="text-lg">Trauma Healing (Limit: 10 Users)</h4>
                       <p className="text-sm text-muted mt-1">Closed-circuit safe space mediated by two Licensed Clinical Social Workers.</p>
                    </div>
                    <button className="btn btn-primary py-2 px-4" onClick={() => showToast("Added to waiting list. You are #3 in queue.")}>Join Waitlist</button>
                 </div>

              </div>
           </motion.div>
        )}

        {activeTab === 'toolkits' && (
           <motion.div key="toolkits" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="grid-container" style={{gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem'}}>
             <div className="card-glass p-5 rounded border">
                <h3 className="mb-4">My Coping Catalog</h3>
                <ul className="flex-col gap-2">
                   <li className="p-3 bg-dark rounded border text-sm fw-bold border-accent bg-ai text-accent">5-4-3-2-1 Grounding</li>
                   <li className="p-3 bg-dark rounded border text-sm text-muted">Box Breathing Exercise</li>
                   <li className="p-3 bg-dark rounded border text-sm text-muted">Cognitive Defusion Audio</li>
                </ul>
                <button className="btn w-full btn-outline mt-4 btn-sm py-2"><Plus size={16}/> Find more in AI Hub</button>
             </div>
             
             <div className="card-glass p-6 rounded" style={{background: 'var(--bg-deep)'}}>
                <div className="text-center py-6">
                   <HeartPulse size={60} className="text-accent mx-auto mb-4"/>
                   <h2>5-4-3-2-1 Grounding Technique</h2>
                   <p className="text-muted my-4 max-w-md mx-auto">This cognitive exercise forces your brain to process sensory data, physically interrupting panic attacks and severe disassociation.</p>
                   
                   <div className="text-left bg-dark p-5 rounded border mx-auto max-w-md">
                      <ul className="flex-col gap-3 text-sm">
                         <li><b>5:</b> Acknowledge FIVE things you see.</li>
                         <li><b>4:</b> Acknowledge FOUR things you can touch.</li>
                         <li><b>3:</b> Acknowledge THREE things you hear.</li>
                         <li><b>2:</b> Acknowledge TWO things you can smell.</li>
                         <li><b>1:</b> Acknowledge ONE thing you can taste.</li>
                      </ul>
                   </div>
                </div>
             </div>
           </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}

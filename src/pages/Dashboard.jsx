import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, ShieldCheck, Cpu, ArrowRight, TrendingDown, Users, FileWarning } from 'lucide-react';
import { useApp } from '../AppContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, joinedCircles } = useApp();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="page-container" style={{maxWidth: '1400px'}}>
      
      <div className="flex-between mb-6 border-bottom pb-4">
         <div>
            <h1 className="title" style={{fontSize: '2.5rem', letterSpacing: '-0.05em'}}>Oversight Command Center</h1>
            <p className="text-muted mt-1 text-sm font-monospace"><Cpu size={14} className="inline mb-1 mr-1 text-ai"/> ACTIVE SESSION: AUTHENTICATED MEDICAL ADMIN ROUTING</p>
         </div>
         <div className="text-right flex-col gap-1">
            <span className="text-xs text-muted">SYSTEM STATUS</span>
            <span className="text-sm font-bold text-success"><ShieldCheck size={16} className="inline mr-1"/> ALL PROTOCOLS ENFORCED</span>
         </div>
      </div>

      <div className="grid-container mb-6" style={{gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem'}}>
        <div className="card-glass p-4 rounded">
          <div className="flex-between text-muted mb-3"><Users size={18}/> <span className="text-xs">ACTIVE USERS</span></div>
          <h2 style={{fontSize: '2rem'}}>1,402</h2>
          <div className="flex-align-center gap-2 mt-2 text-xs text-success"><TrendingDown size={14}/> Stable volume</div>
        </div>
        <div className="card-glass p-4 rounded" style={{borderColor: 'var(--ai-color)'}}>
          <div className="flex-between text-ai mb-3"><Cpu size={18}/> <span className="text-xs">AI INTERCEPTIONS</span></div>
          <h2 style={{fontSize: '2rem'}}>47</h2>
          <div className="progress-bar mt-2"><div className="progress-fill" style={{width: '20%', background: 'var(--ai-color)'}}></div></div>
          <p className="text-xs text-muted mt-2">Messages suppressed today</p>
        </div>
        <div className="card-glass p-4 rounded" style={{borderColor: 'var(--danger-color)'}}>
          <div className="flex-between text-danger mb-3"><FileWarning size={18}/> <span className="text-xs">EMERGENCY ESCALATIONS</span></div>
          <h2 style={{fontSize: '2rem'}}>2</h2>
          <p className="text-xs text-danger mt-2 fw-bold">Active 988 Routing In Progress</p>
        </div>
        <div className="card-glass p-4 rounded">
          <div className="flex-between text-muted mb-3"><Clock size={18}/> <span className="text-xs">AVG RESPONSE TIME</span></div>
          <h2 style={{fontSize: '2rem'}}>1.2s</h2>
          <p className="text-xs text-muted mt-2">Moderator Assignment TTO</p>
        </div>
      </div>

      <div className="grid-container" style={{gridTemplateColumns: '2fr 1fr', gap: '2rem'}}>
        
        {/* Risk Escalation Visualizer */}
        <div className="card-glass p-5 rounded">
          <div className="flex-between mb-5">
            <h3 className="text-sm text-muted">NETWORK RISK ESCALATION HEATMAP</h3>
            <span className="text-xs border px-2 py-1 rounded">Trailing 30 Days</span>
          </div>
          
          <div className="heatmap-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '6px', marginBottom: '2rem'}}>
            {Array.from({length: 48}).map((_, i) => {
              const riskFactor = Math.random();
              let bg = 'rgba(255,255,255,0.05)';
              if (riskFactor > 0.9) bg = 'var(--danger-color)';
              else if (riskFactor > 0.7) bg = 'var(--warning-color)';
              else if (riskFactor > 0.4) bg = 'var(--accent-primary)';
              
              return <div key={i} style={{ aspectRatio: '1/1', background: bg, borderRadius: '2px', border: '1px solid rgba(255,255,255,0.1)' }}></div>;
            })}
          </div>
          
          <div className="border-top pt-4 mt-4 flex-between text-sm">
             <span className="text-muted">Algorithm detects normal seasonal distress patterns.</span>
             <Link to="/content" className="btn btn-outline py-2">Deploy Clinical Content Interventions <ArrowRight size={14}/></Link>
          </div>
        </div>

        {/* Live System Log */}
        <div className="card-glass p-5 rounded" style={{background: 'var(--bg-deep)'}}>
           <h3 className="text-sm text-muted mb-4 border-bottom pb-2">LIVE SYSTEM LOG</h3>
           <div className="flex-col gap-3 font-monospace text-xs" style={{opacity: 0.8}}>
             <div className="flex-between">
                <span className="text-muted">14:02:11</span>
                <span className="text-success">[LOG] User 899-AX cleared triage.</span>
             </div>
             <div className="flex-between">
                <span className="text-muted">14:04:19</span>
                <span className="text-ai">[AI] Intercepted phrase in Room #Vent.</span>
             </div>
             <div className="flex-between">
                <span className="text-muted">14:04:20</span>
                <span className="text-warning">[MOD] Listener assigned to Room #Vent.</span>
             </div>
             <div className="flex-between">
                <span className="text-muted">14:15:01</span>
                <span className="text-danger fw-bold">[SYS] SOS Protocol triggered manually!</span>
             </div>
             <div className="flex-between">
                <span className="text-muted">14:15:02</span>
                <span className="text-danger">[ESC] Handing off to 988 Service.</span>
             </div>
             <div className="flex-between mt-4">
                <span className="text-muted">14:26:55</span>
                <span className="text-success">[LOG] Connection stable.</span>
             </div>
           </div>
        </div>

      </div>
    </motion.div>
  );
}

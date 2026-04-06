import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Calendar, Activity, HeartPulse, Video, Plus, CheckCircle, PenTool, LayoutDashboard, Ticket, X, MapPin, Clock, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext';

export default function Dashboard() {
  const { user, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('calendar');
  const [ticketModal, setTicketModal] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const handleRSVP = (title, time, waitlist = false) => {
     setTicketModal({ title, time, waitlist });
  };

  const handleExportCal = () => {
     setDownloading(true);
     setTimeout(() => {
        setDownloading(false);
        showToast("Ticket successfully downloaded as standard .ics calendar file!");
     }, 2000);
  };

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
              <div className="grid-container" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'}}>
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
                    <h2 style={{fontSize: '2rem', color: '#10B981', marginTop:'0.5rem'}}>Level 2</h2>
                    <p className="text-sm mt-1" style={{color: '#10B981'}}>Cert. Crisis Listener</p>
                 </div>
              </div>
           </motion.div>
        )}

        {activeTab === 'calendar' && (
           <motion.div key="calendar" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="card-glass p-6 rounded">
              <h3 className="mb-5 flex-align-center gap-2"><Video className="text-accent"/> Upcoming Live Cohorts</h3>
              <div className="flex-col gap-4">
                 
                 <div className="bg-dark p-5 rounded border flex-between" style={{borderColor: 'rgba(14, 165, 233, 0.4)'}}>
                    <div>
                       <div className="flex-align-center gap-2 mb-2"><span className="badge badge-success">Tomorrow, 7:00 PM</span><span className="badge" style={{background:'rgba(255,255,255,0.1)', color:'white'}}>Webinar</span></div>
                       <h4 className="text-xl mb-1">Managing Burnout with Dr. Aris</h4>
                       <p className="text-sm text-muted">A supervised 1-hour workshop on recognizing clinical burnout.</p>
                    </div>
                    <button className="btn btn-primary py-3 px-6" onClick={() => handleRSVP("Managing Burnout with Dr. Aris", "Tomorrow, 7:00 PM EST")}>RSVP to Event</button>
                 </div>

                 <div className="bg-dark p-5 rounded border flex-between">
                    <div>
                       <div className="flex-align-center gap-2 mb-2"><span className="badge" style={{background: 'var(--danger-color)', color: 'white'}}>Saturday, 10:00 AM</span><span className="badge" style={{background:'rgba(255,255,255,0.1)', color:'white'}}>Limited Group</span></div>
                       <h4 className="text-xl mb-1">Trauma Healing Circle</h4>
                       <p className="text-sm text-muted">Closed-circuit safe space mediated by two Licensed Clinical Social Workers.</p>
                    </div>
                    <button className="btn btn-outline py-3 px-6 text-danger border-danger" onClick={() => handleRSVP("Trauma Healing Circle", "Saturday, 10:00 AM EST", true)}>Join Waitlist (Full)</button>
                 </div>

              </div>
           </motion.div>
        )}

        {activeTab === 'toolkits' && (
           <motion.div key="toolkits" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="grid-container" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
              <div className="card-glass p-6 rounded border bg-dark">
                 <div className="flex-between mb-4"><Wind size={24} className="text-accent"/><Lock size={16} className="text-success"/></div>
                 <h3 className="mb-2 text-xl">Panic Grounding Kit</h3>
                 <p className="text-sm text-muted mb-5">Box breathing overlays saved directly from your Anonymous Chat sessions.</p>
                 <Link to="/chat" className="btn btn-primary w-full justify-center py-3">Launch Offline Tool</Link>
              </div>
              <div className="card-glass p-6 rounded border bg-dark">
                 <div className="flex-between mb-4"><PenTool size={24} className="text-accent"/><Lock size={16} className="text-success"/></div>
                 <h3 className="mb-2 text-xl">Semantic Vault</h3>
                 <p className="text-sm text-muted mb-5">Direct access to your 24 encrypted cognitive behavioral insights.</p>
                 <Link to="/journal" className="btn btn-outline w-full justify-center py-3 border-accent">Open Locked Vault</Link>
              </div>
              <div className="card-glass p-6 rounded border bg-dark">
                 <div className="flex-between mb-4"><Video size={24} className="text-accent"/><Lock size={16} className="text-success"/></div>
                 <h3 className="mb-2 text-xl">Media Briefcase</h3>
                 <p className="text-sm text-muted mb-5">Your offline library of curated TED talks and clinical masterclasses.</p>
                 <Link to="/content" className="btn btn-outline w-full justify-center py-3">Open Briefcase Drawer</Link>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* Deep Ticketing Modal for RSVPs */}
      <AnimatePresence>
         {ticketModal && (
           <div className="modal-overlay" onClick={() => setTicketModal(null)}>
             <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '500px'}}>
                <div className="bg-main border rounded overflow-hidden shadow-lg relative" style={{background: 'var(--bg-secondary)', borderColor: ticketModal.waitlist ? 'var(--danger-color)' : 'var(--accent-primary)'}}>
                   
                   {/* Ticket Stub Design */}
                   <div className="p-6 text-center border-bottom border-dashed" style={{borderBottom: '2px dashed rgba(255,255,255,0.2)'}}>
                      <div className="circle-btn mx-auto mb-4" style={{width:'60px', height:'60px', background: ticketModal.waitlist ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: ticketModal.waitlist ? 'var(--danger-color)' : 'var(--success-color)'}}>
                         <Ticket size={28}/>
                      </div>
                      <h2 className="mb-2" style={{lineHeight: '1.2'}}>{ticketModal.title}</h2>
                      <div className={`badge ${ticketModal.waitlist ? 'bg-danger text-danger' : 'badge-success'} mb-4`}>{ticketModal.waitlist ? 'WAITLIST TICKET' : 'CONFIRMED ADMISSION'}</div>
                      
                      <div className="flex-col gap-2 bg-dark p-4 rounded text-left border">
                         <div className="flex-align-center gap-3 text-sm"><Clock size={16} className="text-muted"/> <span className="fw-bold">{ticketModal.time}</span></div>
                         <div className="flex-align-center gap-3 text-sm"><MapPin size={16} className="text-muted"/> <span>Secure Virtual Node (Zoom)</span></div>
                      </div>
                   </div>
                   
                   {/* Actions */}
                   <div className="p-6" style={{background: 'rgba(0,0,0,0.2)'}}>
                      <p className="text-xs text-muted mb-4 text-center">Your private connection link has been sent to your registered email. Do not share this link.</p>
                      <div className="flex-col gap-3">
                         {!ticketModal.waitlist && (
                            <button className="btn btn-primary w-full py-4 justify-center" disabled={downloading} onClick={handleExportCal}>
                               {downloading ? "Generating standard file format..." : <><Download size={18} className="mr-2"/> Export to Calendar (.ics)</>}
                            </button>
                         )}
                         <Link to="/content" className="btn w-full btn-outline mt-4 btn-sm py-2 display-block text-center border-accent text-accent"><Plus size={16} className="inline mr-2"/> Find more in AI Hub</Link>
                         <button className="btn btn-outline w-full py-3 justify-center" onClick={() => setTicketModal(null)}>Close Ticket</button>
                      </div>
                   </div>

                   {/* Ticket hole punch cutouts using pseudo-elements implicitly via CSS or just raw div */}
                   <div className="absolute rounded-full" style={{width:'40px', height:'40px', background:'var(--bg-deep)', left:'-20px', top:'50%', transform:'translateY(-50%)'}}></div>
                   <div className="absolute rounded-full" style={{width:'40px', height:'40px', background:'var(--bg-deep)', right:'-20px', top:'50%', transform:'translateY(-50%)'}}></div>
                </div>
             </motion.div>
           </div>
         )}
      </AnimatePresence>

    </motion.div>
  );
}

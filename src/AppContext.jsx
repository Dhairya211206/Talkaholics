import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();
const MOCK_AVATARS = ['Quiet Fox', 'Calm Owl', 'Gentle Bear', 'Silent River', 'Steady Pine'];

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    username: MOCK_AVATARS[Math.floor(Math.random() * MOCK_AVATARS.length)],
    level: 1,
    timeSpent: 0,
    moodLogs: [],
    isSOSActive: false
  });
  
  const [savedArticles, setSavedArticles] = useState([]);
  const [joinedCircles, setJoinedCircles] = useState([1]); 
  const [customCircles, setCustomCircles] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleSOS = (status) => {
    setUser(prev => ({ ...prev, isSOSActive: status }));
  };

  const toggleSaveArticle = (articleTitle) => {
    setSavedArticles(prev => prev.includes(articleTitle) ? prev.filter(a => a !== articleTitle) : [...prev, articleTitle]);
    showToast(savedArticles.includes(articleTitle) ? "Removed from Library." : "Saved to Library!");
  };

  const logMood = (moodValue, note) => {
    setUser(prev => ({ ...prev, moodLogs: [...prev.moodLogs, { date: new Date().toISOString(), mood: moodValue, note }] }));
    showToast("Mood securely logged. AI adjusting your triage profile.");
  };

  const addTalkCircle = (newCircle) => {
    setCustomCircles(prev => [...prev, { ...newCircle, id: Date.now(), members: 1, active: true }]);
    showToast("Space created. Pending moderator approval.");
  };

  const joinCircle = (id) => {
    if (!joinedCircles.includes(id)) { setJoinedCircles(prev => [...prev, id]); }
  };

  return (
    <AppContext.Provider value={{
      user, savedArticles, joinedCircles, customCircles, toastMessage,
      showToast, toggleSaveArticle, logMood, addTalkCircle, joinCircle, toggleSOS
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() { return useContext(AppContext); }

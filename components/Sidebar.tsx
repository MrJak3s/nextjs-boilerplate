'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Sidebar({ 
  currentMode, 
  onModeChange, 
  currentVersion, 
  onVersionChange 
}) {
  const t = useTranslations('common');
  
  const gameModes = {
    "Overall": "/img/trophy.gif",
    "Bedwars": "/img/bedwars.png",
    // ... aggiungi tutte le modalità
  };

  return (
    <nav className="sidebar">
      {/* Implementa la sidebar come nel tuo HTML */}
      <div className="tier-toggle-container">
        <button 
          className={`tier-toggle-btn ${currentVersion === '1.8' ? 'active' : ''}`}
          onClick={() => onVersionChange('1.8')}
        >
          1.8
        </button>
        <button 
          className={`tier-toggle-btn ${currentVersion === '1.9' ? 'active' : ''}`}
          onClick={() => onVersionChange('1.9')}
        >
          1.9+
        </button>
      </div>
    </nav>
  );
}

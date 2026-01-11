'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Menu, Disc3 } from 'lucide-react';

const gameModes = {
  "Overall": "/img/trophy.gif",
  "Bedwars": "/img/bedwars.png",
  "Bedfight": "/img/bedfight.png",
  "Boxing": "/img/boxing.png",
  "Nodebuff": "/img/nodebuff.png",
  "Battlerush": "/img/battlerush.png",
  "Classic": "/img/classic.png",
  "BuildUHC": "/img/builduhc.png",
  "Sumo": "/img/sumo.png"
};

const gameModes19 = {
  "Overall": "/img/trophy-19.gif",
  "Axe": "/img/axe.svg",
  "Crystal": "/img/crystal.svg",
  "DiaPot": "/img/diapot.svg",
  "Elytra": "/img/elytra.svg",
  "NetPot": "/img/netpot.svg",
  "SMP": "/img/smp.svg",
  "Sword": "/img/sword.svg",
  "UHC": "/img/uhc.svg"
};

interface SidebarProps {
  currentMode: string;
  currentVersion: string;
  onModeChange: (mode: string) => void;
  onVersionChange: (version: string) => void;
  playerList: any[];
}

export default function Sidebar({ 
  currentMode, 
  currentVersion, 
  onModeChange, 
  onVersionChange,
  playerList 
}: SidebarProps) {
  const t = useTranslations('common');
  const tm = useTranslations('modes');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [localPlayer, setLocalPlayer] = useState(null);

  useEffect(() => {
    const savedPlayer = localStorage.getItem('tiertest_user');
    if (savedPlayer) {
      try {
        setLocalPlayer(JSON.parse(savedPlayer));
      } catch (e) {
        console.error('Error parsing saved player:', e);
      }
    }
  }, []);

  const modes = currentVersion === '1.8' ? gameModes : gameModes19;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleModeClick = (mode: string) => {
    onModeChange(mode.toLowerCase());
    setIsSidebarOpen(false);
  };

  const attemptLogin = () => {
    const nick = searchTerm.trim();
    if (!nick) return;

    const player = playerList.find(p => p.name.toLowerCase() === nick.toLowerCase());
    if (player) {
      setLocalPlayer(player);
      localStorage.setItem('tiertest_user', JSON.stringify(player));
    } else {
      alert(t('playerNotFound'));
    }
  };

  const handleLogout = () => {
    setLocalPlayer(null);
    localStorage.removeItem('tiertest_user');
    setSearchTerm('');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-5 left-5 z-50 bg-black/80 border border-white/20 rounded-lg p-2 backdrop-blur-sm"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 w-80 h-screen
        bg-bg-sidebar backdrop-blur-2xl p-6 flex flex-col gap-4
        border-r border-white/5 shadow-2xl
        transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center mb-5 pb-5 border-b border-white/5">
          <img 
            src={currentVersion === '1.9' ? "/img/site-logo-19.png" : "/img/site-logo.png"} 
            className="w-16 h-16 rounded-xl mr-5"
            alt="Logo"
          />
          <div className={`font-black text-xl uppercase leading-tight
            ${currentVersion === '1.9' 
              ? 'bg-gradient-to-br from-red-400 to-orange-500' 
              : 'bg-gradient-to-br from-blue-400 to-cyan-400'
            } bg-clip-text text-transparent`}
          >
            TierList <span className="block text-sm font-semibold tracking-widest">CoralMC</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && attemptLogin()}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-3 
                     text-white text-sm transition-colors focus:bg-cyan-500/10 
                     focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20 outline-none"
          />
        </div>

        {/* Version Toggle */}
        <div className="text-xs uppercase text-gray-500 tracking-widest font-black mt-6 mb-3 ml-1">
          {t('version')}
        </div>
        <div className="flex gap-1 bg-white/5 p-1 rounded-lg mb-4">
          {['1.8', '1.9'].map(version => (
            <button
              key={version}
              onClick={() => onVersionChange(version)}
              className={`
                flex-1 text-center text-xs font-black py-2 rounded-md transition-all
                ${currentVersion === version
                  ? 'bg-accent text-black shadow-lg shadow-accent/40'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {version}
            </button>
          ))}
        </div>

        {/* Modes List */}
        <div className="text-xs uppercase text-gray-500 tracking-widest font-black mb-3 ml-1">
          {t('leaderboards')}
        </div>
        <nav className="flex-1 space-y-1">
          {Object.entries(modes).map(([mode, icon]) => (
            <button
              key={mode}
              onClick={() => handleModeClick(mode)}
              className={`
                flex items-center w-full p-3 rounded-lg transition-all duration-200
                ${currentMode === mode.toLowerCase()
                  ? 'bg-accent text-black font-black shadow-lg shadow-accent/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <img src={icon} className="w-5 h-5 mr-3 object-contain" alt={mode} />
              <span>{tm(mode)}</span>
            </button>
          ))}
        </nav>

        {/* Discord */}
        <div className="text-xs uppercase text-gray-500 tracking-widest font-black mt-6 mb-3 ml-1">
          {t('community')}
        </div>
        <a
          href="https://discord.com/invite/ttcm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-3 rounded-lg bg-discord/10 text-white border border-discord/30 hover:bg-discord hover:shadow-lg hover:shadow-discord/40 transition-all"
        >
          <Disc3 className="w-5 h-5 mr-3" />
          <span>Discord</span>
        </a>

        {/* User Profile */}
        <div className="mt-4 p-4 bg-black/30 rounded-xl border border-white/5">
          {!localPlayer ? (
            <div>
              <div className="text-xs uppercase text-gray-500 tracking-widest font-black mb-3">
                {t('myProfile')}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t('loginPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 
                           text-white text-sm focus:border-accent outline-none"
                />
                <button
                  onClick={attemptLogin}
                  className="bg-accent text-black font-black px-4 rounded-lg hover:bg-white transition-colors"
                >
                  &gt;
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={`https://skins.mcstats.com/bust/${localPlayer.uuid || localPlayer.name}`}
                  className="w-12 h-12 rounded-lg border-2 border-white/10 bg-black/50 object-contain"
                  alt={localPlayer.name}
                />
                <div>
                  <div className="font-black text-white">{localPlayer.name}</div>
                  <div className="text-xs text-gray-400 font-mono">{localPlayer.points} PTS</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-white/5 text-gray-300 text-xs font-black py-2 rounded border border-white/10 hover:bg-white/10 transition-colors">
                  {t('stats')}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-500/10 text-red-400 text-xs font-black py-2 rounded border border-red-500/30 hover:bg-red-500/20 transition-colors"
                >
                  {t('logout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

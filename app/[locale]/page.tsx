'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: false });
const MainContent = dynamic(() => import('@/components/MainContent'), { ssr: false });
const PlayerModal = dynamic(() => import('@/components/PlayerModal'), { ssr: false });

const API_URL_18 = "https://bot.ttcm.it/api/leaderboard";
const API_URL_19 = "http://116.202.156.252:50432/api/leaderboard";

export default function HomePage() {
  const t = useTranslations('common');
  const [currentMode, setCurrentMode] = useState('overall');
  const [currentVersion, setCurrentVersion] = useState('1.8');
  const [playerList, setPlayerList] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData('overall');
  }, [currentVersion]);

  const loadData = async (mode: string) => {
    setIsLoading(true);
    try {
      const API_URL = currentVersion === '1.8' ? API_URL_18 : API_URL_19;
      const normalizedMode = mode === 'overall' ? '' : `/${encodeURIComponent(mode)}`;
      const response = await fetch(`${API_URL}${normalizedMode}?limit=10000`);
      const data = await response.json();
      
      if (data.success) {
        const sortedPlayers = mode === 'overall' 
          ? data.players.sort((a, b) => b.points - a.points)
          : data.players;
        setPlayerList(sortedPlayers);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (mode: string) => {
    setCurrentMode(mode);
    loadData(mode);
  };

  const handleVersionChange = (version: string) => {
    setCurrentVersion(version);
  };

  const openPlayerModal = (playerIndex: number) => {
    setSelectedPlayer(playerList[playerIndex]);
    setIsModalOpen(true);
  };

  const closePlayerModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  return (
    <div className="flex min-h-screen bg-bg-body text-text-main font-inter cursor-default select-none">
      <Sidebar
        currentMode={currentMode}
        currentVersion={currentVersion}
        onModeChange={handleModeChange}
        onVersionChange={handleVersionChange}
        playerList={playerList}
      />
      
      <MainContent
        currentMode={currentMode}
        playerList={playerList}
        isLoading={isLoading}
        onPlayerClick={openPlayerModal}
      />

      {isModalOpen && selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          currentMode={currentMode}
          currentVersion={currentVersion}
          onClose={closePlayerModal}
        />
      )}
    </div>
  );
}

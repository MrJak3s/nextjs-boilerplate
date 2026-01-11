'use client';
import { useTranslations } from 'next-intl';

interface MainContentProps {
  currentMode: string;
  playerList: any[];
  isLoading: boolean;
  onPlayerClick: (index: number) => void;
}

export default function MainContent({ currentMode, playerList, isLoading, onPlayerClick }: MainContentProps) {
  const t = useTranslations('common');
  const tm = useTranslations('modes');

  const top3 = playerList.slice(0, 3);
  const restPlayers = playerList.slice(3);

  if (isLoading) {
    return (
      <main className="flex-1 p-10 ml-0 lg:ml-80">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">{t('loading')}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 lg:p-10 ml-0 lg:ml-80 min-h-screen overflow-auto">
      {/* Header */}
      <div className="text-center mb-12 relative z-10 animate-slide-down">
        <h1 className="text-5xl lg:text-7xl font-black mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {tm('Overall')} <span className="inline-block animate-pulse-title">TIERLIST</span>
        </h1>
        <p className="text-text-muted text-sm lg:text-base uppercase tracking-widest font-light">
          CORALMC LEADERBOARDS
        </p>
      </div>

      {/* Podium - Only for Overall */}
      {currentMode === 'overall' && (
        <div className="flex flex-col lg:flex-row items-end justify-center gap-6 lg:gap-8 mb-20 lg:mb-32 max-w-7xl mx-auto">
          {top3.map((player, index) => (
            <PodiumCard
              key={player.name}
              player={player}
              rank={index + 1}
              onClick={() => onPlayerClick(index)}
            />
          ))}
        </div>
      )}

      {/* Leaderboard List */}
      <div className={`
        bg-[#0c0c0e]/80 backdrop-blur-xl rounded-3xl border border-white/5 
        shadow-2xl shadow-black/90 max-w-7xl mx-auto
        ${currentMode === 'overall' ? 'mt-20' : 'mt-0'}
      `}>
        <LeaderboardHeader isWide={currentMode !== 'overall'} />
        <LeaderboardList
          players={currentMode === 'overall' ? restPlayers : playerList}
          offset={currentMode === 'overall' ? 3 : 0}
          isWide={currentMode !== 'overall'}
          onPlayerClick={onPlayerClick}
        />
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 opacity-50 font-minecraft text-xs tracking-widest">
        Created by mrjak3s
      </footer>
    </main>
  );
}

function PodiumCard({ player, rank, onClick }: { player: any; rank: number; onClick: () => void }) {
  const rankClasses = {
    1: 'lg:-mb-16 z-10 scale-110',
    2: 'lg:-mb-8 z-5 scale-100',
    3: 'lg:-mb-4 z-5 scale-95'
  };

  const heightClasses = {
    1: 'h-60 lg:h-80',
    2: 'h-40 lg:h-60',
    3: 'h-32 lg:h-48'
  };

  const borderColors = {
    1: 'border-gold-base',
    2: 'border-plat-base',
    3: 'border-bronze-base'
  };

  return (
    <div 
      className={`
        relative w-full lg:w-64 cursor-pointer transition-transform hover:scale-105
        ${rankClasses[rank as keyof typeof rankClasses]}
      `}
      onClick={onClick}
    >
      {/* Aura Effects */}
      {rank === 1 && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-gold-glow/20 to-transparent rounded-full blur-xl animate-pulse-aura"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gold-base/10 to-transparent rounded-full animate-spin-aura"></div>
        </>
      )}

      {/* Player Info */}
      <div className="absolute -top-16 left-0 right-0 text-center z-20 text-shadow-lg">
        <div className="bg-black/60 px-4 py-2 rounded-lg border border-white/10 inline-block">
          <div className="font-black text-white">{player.name}</div>
          <div className="text-sm font-black text-gray-200">{player.points} PTS</div>
        </div>
      </div>

      {/* Avatar */}
      <div className="relative z-10 flex justify-center items-end mb-2">
        <img
          src={`https://skins.mcstats.com/body/front/${player.uuid || player.name}`}
          className={`
            object-contain transition-all animate-float-idle
            ${rank === 1 ? 'h-48 lg:h-72 filter drop-shadow-lg' : 
              rank === 2 ? 'h-36 lg:h-56 filter drop-shadow-md grayscale-20' : 
              'h-32 lg:h-52 filter drop-shadow-md sepia-40'}
          `}
          alt={player.name}
        />
      </div>

      {/* Podium Block */}
      <div className={`
        relative rounded-t-2xl border-t-4
        ${borderColors[rank as keyof typeof borderColors]}
        ${heightClasses[rank as keyof typeof heightClasses]}
        bg-gradient-to-b from-white/10 to-bg-body
        shadow-2xl backdrop-blur-sm
      `}>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`
            font-minecraft text-6xl lg:text-8xl font-black
            ${rank === 1 ? 'text-gold-base' : 
              rank === 2 ? 'text-plat-base' : 
              'text-bronze-base'}
            animate-text-glitch
          `}>
            {rank}
          </span>
        </div>
      </div>
    </div>
  );
}

function LeaderboardHeader({ isWide }: { isWide: boolean }) {
  const t = useTranslations('common');
  
  return (
    <div className="grid grid-cols-[80px_1fr_200px_100px] lg:grid-cols-[80px_1fr_200px_100px] items-center h-16 bg-white/5 text-gray-400 text-xs uppercase tracking-widest font-black border-b border-white/5">
      <div className="flex items-center justify-center h-full border-r border-white/5">#</div>
      <div className="flex items-center pl-8 h-full border-r border-white/5">{t('player')}</div>
      <div className="flex items-center justify-center h-full border-r border-white/5">{t('tier')}</div>
      <div className="flex items-center justify-center h-full">{t('region')}</div>
    </div>
  );
}

function LeaderboardList({ players, offset, isWide, onPlayerClick }: any) {
  if (!players.length) {
    return (
      <div className="p-20 text-center text-accent font-black">
        Nessun giocatore trovato
      </div>
    );
  }

  return (
    <div>
      {players.map((player, index) => (
        <LeaderboardRow
          key={player.name}
          player={player}
          rank={index + offset + 1}
          isWide={isWide}
          onClick={() => onPlayerClick(index + offset)}
        />
      ))}
    </div>
  );
}

function LeaderboardRow({ player, rank, isWide, onClick }: any) {
  return (
    <div
      className="grid grid-cols-[80px_1fr_200px_100px] lg:grid-cols-[80px_1fr_200px_100px] 
                 items-center h-20 border-b border-white/5 cursor-pointer 
                 transition-all hover:scale-[1.02] hover:shadow-lg hover:border-accent/20
                 bg-gradient-to-r from-black/50 via-black/30 to-black/50"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(15,20,25,0.96) 0%, rgba(15,20,25,0.85) 50%, rgba(15,20,25,0.96) 100%), url('/img/bg-overall.png')`
      }}
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-full border-r border-white/5">
        <span className={`font-minecraft text-lg ${rank <= 10 ? 'text-accent' : 'text-gray-400'}`}>
          #{rank}
        </span>
      </div>
      
      <div className="flex items-center gap-5 pl-8 h-full border-r border-white/5">
        <img
          src={`https://minotar.net/avatar/${player.name}`}
          className="w-10 h-10 rounded-lg border-2 border-white/5 shadow-lg transition-transform hover:scale-110 hover:border-accent"
          alt={player.name}
        />
        <span className="font-black text-lg">{player.name}</span>
      </div>
      
      <div className="flex items-center justify-center gap-2 h-full border-r border-white/5">
        <span className="tier-badge tier-U">U</span>
        {!isWide && <span className="text-gray-200 font-mono ml-3">{player.points}</span>}
      </div>
      
      <div className="flex items-center justify-center h-full">
        <span className="bg-white/5 px-3 py-1 rounded-lg text-xs font-black text-gray-400">
          {player.region || 'EU'}
        </span>
      </div>
    </div>
  );
}

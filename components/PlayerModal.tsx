'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { X, Disc3 } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface PlayerModalProps {
  player: any;
  currentMode: string;
  currentVersion: string;
  onClose: () => void;
}

export default function PlayerModal({ player, currentMode, currentVersion, onClose }: PlayerModalProps) {
  const t = useTranslations('common');
  const tm = useTranslations('modes');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!player) return null;

  const chartData = {
    labels: ['Overall', 'Bedwars', 'Bedfight', 'Boxing', 'Nodebuff', 'Battlerush', 'Classic', 'BuildUHC', 'Sumo'],
    datasets: [
      {
        label: 'Skill Rating',
        data: [85, 75, 60, 90, 70, 65, 80, 55, 75],
        backgroundColor: 'rgba(0, 170, 255, 0.2)',
        borderColor: '#00aaff',
        borderWidth: 2,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#00aaff',
      }
    ]
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { 
          color: '#ccc', 
          font: { 
            size: 11, 
            family: "'Inter', sans-serif", 
            weight: '600' 
          } 
        },
        ticks: { display: false, backdropColor: 'transparent' },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        ref={modalRef}
        className="bg-[#111] border border-accent/20 rounded-3xl shadow-2xl shadow-accent/10 
                   max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row
                   animate-in fade-in-90 slide-in-from-bottom-10 duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white 
                   flex items-center justify-center hover:bg-red-accent transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Panel */}
        <div className="lg:w-2/5 p-8 bg-gradient-to-br from-accent/10 to-bg-body relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/img/bg-overall.png')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 flex flex-col items-center">
            <img
              src={`https://skins.mcstats.com/body/front/${player.uuid || player.name}`}
              className="h-64 mb-6 animate-avatar-zoom filter drop-shadow-2xl"
              alt={player.name}
            />
            <div className="font-minecraft text-2xl text-accent animate-tier-s-glow">
              TIER S
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:w-3/5 p-8 flex flex-col overflow-auto">
          <h2 className="text-4xl font-black mb-4 animate-name-fade bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {player.name}
          </h2>
          
          <div className="flex gap-4 mb-6 flex-wrap items-center">
            <span className="font-mono text-sm text-gray-500 bg-white/5 px-3 py-1 rounded-lg">
              {player.uuid || "UUID not available"}
            </span>
            <div className="flex items-center gap-2 bg-discord/20 px-4 py-2 rounded-full text-white font-black text-sm">
              <Disc3 className="w-4 h-4" />
              <span>{player.discord || t('notConnected')}</span>
            </div>
          </div>

          <h4 className="text-accent border-b border-white/10 pb-3 mb-4 uppercase tracking-widest text-sm font-black">
            {t('statistics')}
          </h4>

          {/* Chart */}
          <div className="h-64 mb-6 animate-hud-slide">
            <Radar data={chartData} options={chartOptions} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {['Overall', 'Bedwars', 'Bedfight', 'Boxing', 'Nodebuff', 'Battlerush', 'Classic', 'BuildUHC', 'Sumo'].map((mode, index) => (
              <div 
                key={mode}
                className="bg-white/5 p-4 rounded-xl border border-transparent hover:border-accent hover:bg-accent/10 transition-all animate-hud-slide"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`/img/${mode.toLowerCase()}.png`} 
                      className="w-6 h-6 object-contain filter drop-shadow-sm" 
                      alt={mode}
                    />
                    <span className="font-black text-gray-300">{tm(mode)}</span>
                  </div>
                  <span className="tier-badge tier-S">S</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

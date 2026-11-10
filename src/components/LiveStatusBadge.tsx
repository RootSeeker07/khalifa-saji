import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface LiveStatusBadgeProps {
  className?: string;
  showTime?: boolean;
}

export const LiveStatusBadge: React.FC<LiveStatusBadgeProps> = ({
  className = '',
  showTime = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [pktTimeStr, setPktTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Calculate Pakistan Standard Time (PKT = UTC + 5)
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const pktDate = new Date(utcTime + 5 * 3600000);

      const hours = pktDate.getHours();
      const minutes = pktDate.getMinutes();

      // Open from 1:00 PM (13:00) until 3:00 AM (03:00) next morning
      const currentlyOpen = hours >= 13 || hours < 3;
      setIsOpen(currentlyOpen);

      // Formatted 12-hour PKT time string
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 === 0 ? 12 : hours % 12;
      const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setPktTimeStr(`${displayHours}:${displayMinutes} ${period} PKT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium tracking-wide transition-all ${
        isOpen
          ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
          : 'bg-zinc-900/80 border-amber-600/30 text-amber-200'
      } ${className}`}
    >
      <div className="relative flex items-center justify-center w-2 h-2">
        {isOpen && (
          <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        )}
        <span
          className={`relative inline-flex w-2 h-2 rounded-full ${
            isOpen ? 'bg-emerald-400' : 'bg-amber-400'
          }`}
        />
      </div>

      <span className="font-semibold">
        {isOpen ? 'Open Now' : 'Closed Now - Opening at 1:00 PM'}
      </span>

      {showTime && (
        <>
          <span className="text-zinc-500">·</span>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-300">
            <Clock className="w-3 h-3 text-zinc-400" />
            {pktTimeStr || '1:00 PM - 3:00 AM'}
          </span>
        </>
      )}
    </div>
  );
};

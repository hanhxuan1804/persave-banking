import React, { FC } from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  color: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress, total, color }) => {
  return (
    <div className="mt-2 h-2 w-full rounded-lg bg-white">
      <div
        className={`${color} h-full rounded-lg `}
        style={{
          width: `${Math.min((progress / total) * 100, 100)}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;

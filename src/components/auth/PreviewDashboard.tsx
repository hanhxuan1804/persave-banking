'use client';
import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface PreviewDashboardProps {}

const PreviewDashboard: FC<PreviewDashboardProps> = () => {
  const { theme } = useTheme();
  const [isDark, setIsDark] = React.useState(false);
  useEffect(() => {
    if (theme === 'dark') {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [theme]);

  return (
    <div className="flex h-full flex-col items-start justify-center overflow-hidden pl-[50px]">
      <div className="border-foreground relative h-[70%] max-h-[680px] w-[940px] rounded-[12px] rounded-r-none border-[10px] border-r-0">
        {isDark ? (
          <Image
            src="/auth-illustration-dark.png"
            alt="Illustration"
            width={940}
            height={680}
            className="absolute left-0 top-0 h-full w-[940px] rounded-[12px] rounded-r-none"
          />
        ) : (
          <Image
            src="/auth-illustration-light.png"
            alt="Illustration"
            width={940}
            height={680}
            className="absolute left-0 top-0 h-full w-[940px] rounded-[12px] rounded-r-none"
          />
        )}
      </div>
    </div>
  );
};

export default PreviewDashboard;

'use client';
import React, { FC, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface TableTransactionImageProps {
  url: string;
  name: string;
  variant?: string;
}

const TableTransactionImage: FC<TableTransactionImageProps> = ({
  url,
  name,
  variant,
}) => {
  const [loadError, setLoadError] = useState(false);
  const hiddenImage = loadError ? 'hidden' : '';
  const hiddenText = loadError ? '' : 'hidden';
  const checkIsValidUrl = (url: string) => {
    //check is example.com is not a valid url
    if (url.includes('https://example.com')) {
      return '';
    }
    return url;
  };
  const getShortName = (name: string) => {
    //return the first letter of each word in the name
    return name
      .split(' ')
      .map((word) => word[0])
      .join('');
  };
  return (
    <div className="flex size-10 items-center justify-center">
      <Image
        src={checkIsValidUrl(url)}
        alt={name}
        onError={() => setLoadError(true)}
        width={10}
        height={10}
        className={`rounded-full ${hiddenImage}`}
      />
      <div
        className={cn(
          `flex size-10 items-center justify-center rounded-full bg-gray-300 ${hiddenText}`,
          variant
        )}
      >
        {getShortName(name)}
      </div>
    </div>
  );
};

export default TableTransactionImage;

'use client';
import React, { FC, useEffect, useState } from 'react';
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
  const [validImageURL, setValidImageURL] = useState(false);
  const checkIsValidUrl = (url: string) => {
    //check if url is empty or null or undefined
    if (!url || url === '' || url === null || url === undefined) {
      return false;
    }
    //check is example.com is not a valid url
    if (url.includes('https://example.com')) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    setValidImageURL(checkIsValidUrl(url));
  }, [url]);
  const getShortName = (name: string) => {
    //return the first letter of each word in the name
    return name
      .split(' ')
      .map((word) => word[0])
      .slice(0, 3)
      .join('');
  };
  return (
    <div className="flex size-10 items-center justify-center">
      {validImageURL ? (
        <Image
          src={url ? url : '/images/placeholder.png'}
          alt={name}
          width={40}
          height={40}
          className={`rounded-full `}
        />
      ) : (
        <div
          className={cn(
            `flex size-10 items-center justify-center rounded-full bg-gray-300 `,
            variant
          )}
        >
          {getShortName(name)}
        </div>
      )}
    </div>
  );
};

export default TableTransactionImage;

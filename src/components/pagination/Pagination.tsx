'use client';
import React, { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useMySearchParams } from '@/hooks/useMySearchParams';
import * as m from '@/paraglide/messages';

interface PaginationProps {
  current: number;
  total: number;
  showPerSide?: number;
  onValueChange?: (value: number) => void;
}
const getPageShowArray = (
  current: number,
  total: number,
  showPerSide: number
) => {
  const showPage: number[] = [1];
  if (current - showPerSide > 1) {
    showPage.push(-1);
  }
  for (let i = current - showPerSide; i <= current + showPerSide; i++) {
    if (i > 1 && i < total) {
      showPage.push(i);
    }
  }
  if (current + showPerSide < total) {
    showPage.push(-1);
  }
  showPage.push(total);
  return showPage;
};
const Pagination: FC<PaginationProps> = ({
  current,
  total,
  showPerSide = 2,
  onValueChange,
}) => {
  const searchParams = useMySearchParams();
  const showPage: number[] = getPageShowArray(current, total, showPerSide);

  const onChange = (value: number) => {
    searchParams.set('page', value.toString());
    if (onValueChange) {
      onValueChange(value);
    }
  };
  return (
    <div className="flex w-full flex-row">
      {/* previous */}
      <Button
        variant="ghost"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        <ChevronLeft size={24} />
        <span className="text-sm font-semibold">{m.previous()}</span>
      </Button>
      {/* pages */}
      <div className="flex flex-1 flex-row items-center justify-center">
        {showPage.map((page, index) =>
          page === -1 ? (
            <span
              key={index}
              className="flex size-10 items-center justify-center text-sm font-semibold"
            >
              ...
            </span>
          ) : (
            <Button
              key={index}
              onClick={() => onChange(page)}
              variant={current === page ? 'outline' : 'ghost'}
              disabled={current === page}
              className="size-10 text-sm font-semibold"
            >
              {page}
            </Button>
          )
        )}
      </div>
      {/* next */}
      <Button
        variant="ghost"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        <span className="text-sm font-semibold">{m.next()}</span>
        <ChevronRight size={24} />
      </Button>
    </div>
  );
};

export default Pagination;

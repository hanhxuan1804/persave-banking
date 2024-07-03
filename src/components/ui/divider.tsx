import React, { FC } from 'react';

interface dividerProps {
  type?: 'horizontal' | 'vertical';
}

const Divider: FC<dividerProps> = ({ type = 'horizontal' }) => {
  const style =
    type === 'horizontal'
      ? 'mt-4 border-t border-gray-200 dark:border-[#f3f3f3]/50 w-full '
      : 'mr-4 border-r border-gray-200 dark:border-[#f3f3f3]/50 h-full ';
  return <div data-testid="divider" className={style}></div>;
};

export default Divider;

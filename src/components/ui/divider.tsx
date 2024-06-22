import React, { FC } from 'react';

interface dividerProps {}

const Divider: FC<dividerProps> = () => {
  return (
    <div data-testid="divider" className="my-4 border-t border-gray-200"></div>
  );
};

export default Divider;

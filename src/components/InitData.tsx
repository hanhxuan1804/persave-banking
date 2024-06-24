'use client';
import React, { FC } from 'react';

import { useAppDispatch } from '@/hooks';
import { fetchRates } from '@/lib/redux/feature/rateSlice';

interface InitDataProps {}

const InitData: FC<InitDataProps> = () => {
  const dispatch = useAppDispatch();
  dispatch(fetchRates());
  return <div className="hidden"></div>;
};

export default InitData;

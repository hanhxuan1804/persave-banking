'use client';
import React, { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

import * as m from '@/paraglide/messages';
import TAccount from '@/types/account';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  accounts: TAccount[];
}

const DoughnutChart: FC<DoughnutChartProps> = ({ accounts }) => {
  //TODO: Implement vietnamese translation
  const data = {
    datasets: [
      {
        label: m.dashboard_content_chart_balance(),
        data: accounts.map((account) => account.currentBalance),
        backgroundColor: accounts.map((account) => account.color),
      },
    ],
    labels: accounts.map((account) => account.officialName),
  };
  return (
    <Doughnut
      data={data}
      options={{
        cutout: '60%',
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;

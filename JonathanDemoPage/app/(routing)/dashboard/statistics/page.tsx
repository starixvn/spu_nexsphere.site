import React from 'react';
import { Metadata } from 'next';
import { lusitana } from '@/app/component/fonts';
import LineChart from '@/app/component/dashboard/line-chart';
import BarChart from '@/app/component/dashboard/bar-chart';
import PieChart from '@/app/component/dashboard/pie-chart';
import RadarChart from '@/app/component/dashboard/radar-chart';

export const metadata: Metadata = {
  title: "Statistics"
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>Dashboard Statistics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <LineChart />
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Sales Distribution</h2>
          <BarChart />
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Voting Results</h2>
          <PieChart />
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Activity Distribution</h2>
          <RadarChart />
        </div>
      </div>
    </div>
  );
}


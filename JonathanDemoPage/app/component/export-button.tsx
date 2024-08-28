"use client";

import { FC } from "react";
import { exportToCSV } from '@/app/lib/utils';

interface ExportButtonProps {
    data: any[];
}

const ExportButton: FC<ExportButtonProps> = ({ data }) => {
    const handleExportCSV = () => {
        exportToCSV(data, 'report_daily.csv');
    };

    return (
        <button
            onClick={handleExportCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Export CSV
        </button>
    );
};

export default ExportButton;

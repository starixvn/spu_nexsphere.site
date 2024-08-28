import LineChart from '@/app/component/dashboard/line-chart';
import { lusitana } from '@/app/component/fonts';

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard Overview
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <LineChart />
            </div>
        </main>
    );
}
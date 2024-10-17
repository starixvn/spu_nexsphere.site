import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/src/component/fonts';

export default function NexSphereLogo() {
  return (
    <div className={`${lusitana.className} ml-10 flex flex-col items-center justify-center leading-none text-white`}>
      <GlobeAltIcon className="h-12 w-12 rotate-[-15deg] mb-1" />
      <p className="text-[44px] text-center whitespace-nowrap">NexSphere</p>
    </div>
  );
}

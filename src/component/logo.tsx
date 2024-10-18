import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/src/component/fonts';

export default function NexSphereLogo() {
  return (
    <>
      <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
        <p className="text-[40px]">NexSphere</p>
      </div>
    </>
  );
}

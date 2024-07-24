import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function AcmeLogo() {
  return (
    <div
      className="flex flex-row items-center leading-none text-white"
    >
      <GlobeAltIcon className="h-12 w-12" />
      <p className="text-[28px] md:text-[44px]">SoJer</p>
    </div>
  );
}

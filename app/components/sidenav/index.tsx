import Link from 'next/link';
import NavLinks from './navLinks';
import AcmeLogo from './acmeLogo';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-2 pt-2 pb-0 md:px-2 md:py-4 ">
      <Link
        className="mb-2 flex h-12 items-center justify-start rounded-md bg-blue-600 md:h-40 md:items-end"
        href="/"
      >
        <div className="w-50 text-white md:w-60">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}

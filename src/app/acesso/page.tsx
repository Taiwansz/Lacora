import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { LacoraMark } from '@/components/brand/LacoraLogo';
import { isSafeInternalPath } from '@/lib/access-constants';
import { AccessForm } from './AccessForm';

export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = isSafeInternalPath(params.next) ? params.next : '/dashboard';

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111B3A] px-5 py-12">
      <Image src="/identity/floral-corner.webp" alt="" width={1100} height={1005} priority sizes="(max-width: 768px) 88vw, 44vw" className="floral-linework pointer-events-none absolute -right-24 -top-20 w-[30rem] opacity-[.16] sm:w-[42rem]" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-[#D7D2CB] transition hover:text-white">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar ao site
        </Link>
        <div className="mb-6 flex items-center px-2">
          <LacoraMark inverted className="h-16 w-14" />
        </div>
        <AccessForm nextPath={nextPath} />
      </div>
    </div>
  );
}

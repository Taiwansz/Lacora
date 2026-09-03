import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#e9ddca] px-5 py-12">
      <div className="wedding-ribbon wedding-ribbon-a" />
      <div className="wedding-ribbon wedding-ribbon-b" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-[#5d554c] transition hover:text-[#a05235]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar ao site
        </Link>
        <div className="mb-6 flex items-center gap-3 px-2">
          <LacoraMark className="h-10 w-10" />
          <span className="brand-wordmark text-3xl text-[#213d36]">Laçora</span>
        </div>
        <AccessForm nextPath={nextPath} />
      </div>
    </div>
  );
}

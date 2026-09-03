import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, Heart, MapPin } from 'lucide-react';
import { demoCoupleProfile, demoGifts } from '@/lib/demo-data';
import { isSupabaseConfigured } from '@/lib/supabase-config';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { formatDateLong } from '@/lib/utils';

interface PublicWeddingSite {
  slug: string;
  title: string;
  storyText: string;
  dressCodeNotes: string;
  lodgingNotes: string;
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  city: string;
  state: string;
}

async function loadWeddingSite(slug: string): Promise<PublicWeddingSite | null> {
  if (slug === 'alex-taylor-demo') {
    return {
      slug,
      title: 'Casamento Modelo',
      storyText:
        'Uma celebração fictícia criada para demonstrar como o site público pode apresentar as informações do grande dia.',
      dressCodeNotes: 'Traje social',
      lodgingNotes: 'Consulte as opções de hospedagem indicadas no convite.',
      partner1Name: demoCoupleProfile.partner1Name,
      partner2Name: demoCoupleProfile.partner2Name,
      weddingDate: demoCoupleProfile.weddingDate,
      city: demoCoupleProfile.city,
      state: demoCoupleProfile.state,
    };
  }

  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('website_settings')
      .select(
        'slug,title,story_text,dress_code_notes,lodging_notes,partner1_name,partner2_name,wedding_date,city,state'
      )
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error || !data) return null;
    return {
      slug: data.slug,
      title: data.title,
      storyText: data.story_text ?? '',
      dressCodeNotes: data.dress_code_notes ?? '',
      lodgingNotes: data.lodging_notes ?? '',
      partner1Name: data.partner1_name,
      partner2Name: data.partner2_name,
      weddingDate: data.wedding_date ?? '',
      city: data.city ?? '',
      state: data.state ?? '',
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = await loadWeddingSite(slug);
  if (!site) return { title: 'Site não encontrado' };

  const title = `${site.partner1Name} & ${site.partner2Name}`;
  return {
    title,
    description: site.title,
    robots: { index: false, follow: false },
    openGraph: { title, description: site.title, type: 'website' },
  };
}

export default async function PublicWeddingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await loadWeddingSite(slug);
  if (!site) notFound();

  const dateText = site.weddingDate
    ? formatDateLong(site.weddingDate)
    : 'Data a definir';
  const location = [site.city, site.state].filter(Boolean).join(' — ') || 'Local a definir';

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
      <section className="marsala-gradient px-6 py-20 text-center text-white sm:px-12">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-100">
          Celebre conosco
        </span>
        <h1 className="mt-4 font-serif text-4xl font-bold sm:text-6xl">
          {site.partner1Name} & {site.partner2Name}
        </h1>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm text-rose-50 sm:flex-row sm:gap-6">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {dateText}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {location}
          </span>
        </div>
      </section>

      <section className="space-y-10 px-6 py-12 sm:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <Heart className="mx-auto h-8 w-8 text-marsala-500" aria-hidden="true" />
          <h2 className="mt-3 font-serif text-2xl font-bold text-charcoal">Nossa história</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {site.storyText || 'Em breve o casal compartilhará sua história.'}
          </p>
        </div>

        <div className="grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          <div className="rounded-2xl bg-surface-muted p-5">
            <h2 className="font-serif text-lg font-bold text-charcoal">Traje</h2>
            <p className="mt-2 text-sm text-slate-600">
              {site.dressCodeNotes || 'Informações em breve.'}
            </p>
          </div>
          <div className="rounded-2xl bg-surface-muted p-5">
            <h2 className="font-serif text-lg font-bold text-charcoal">Hospedagem</h2>
            <p className="mt-2 text-sm text-slate-600">
              {site.lodgingNotes || 'Informações em breve.'}
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href={`/rsvp/${encodeURIComponent(site.slug)}`}
            className="inline-flex rounded-xl bg-marsala-500 px-6 py-3 text-sm font-bold text-white shadow-card transition-colors hover:bg-marsala-600"
          >
            Confirmar presença
          </Link>
        </div>

        {site.slug === 'alex-taylor-demo' && (
          <p className="text-center text-[11px] text-slate-400">
            Página demonstrativa com nomes e informações inteiramente fictícios.
          </p>
        )}
      </section>
    </article>
  );
}

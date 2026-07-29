import { redirect } from 'next/navigation';

export default async function LegacyPublicWeddingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/w/${encodeURIComponent(slug)}`);
}

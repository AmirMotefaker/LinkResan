import { Metadata } from "next";
import PublicBioClient from "./PublicBioClient";

type Props = {
  params: { slug: string }
}

// متادیتای داینامیک برای سئو صفحه بیو
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bio/${params.slug}`, { cache: 'no-store' });
  if (!res.ok) {
    return { title: "صفحه پیدا نشد" };
  }
  const data = await res.json();
  const bio = data.bio_page;

  return {
    title: bio.Title,
    description: bio.BioText,
    openGraph: {
      title: bio.Title,
      description: bio.BioText,
      url: `https://linkresan.ir/b/${params.slug}`,
    },
  };
}

export default async function PublicBioPage({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bio/${params.slug}`, { cache: 'no-store' });

  if (!res.ok) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 px-4">
        <h1 className="text-2xl font-bold mb-2">صفحه پیدا نشد</h1>
        <p className="text-gray-500">صفحه بیو مورد نظر وجود ندارد یا حذف شده است.</p>
      </main>
    );
  }

  const data = await res.json();
  const bio = data.bio_page;

  return <PublicBioClient bio={bio} />;
}
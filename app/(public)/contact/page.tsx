import { StandardPage } from "@/components/public/standard-page";

type ArabicContactPageProps = {
  searchParams: Promise<{ contact?: string }>;
};

export default async function ArabicContactPage({ searchParams }: ArabicContactPageProps) {
  const { contact } = await searchParams;
  const contactState = contact === "sent" || contact === "error" ? contact : undefined;

  return <StandardPage contactState={contactState} locale="ar" pageKey="contact" />;
}

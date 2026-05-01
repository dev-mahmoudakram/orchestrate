import { StandardPage } from "@/components/public/standard-page";

type EnglishContactPageProps = {
  searchParams: Promise<{ contact?: string }>;
};

export default async function EnglishContactPage({ searchParams }: EnglishContactPageProps) {
  const { contact } = await searchParams;
  const contactState = contact === "sent" || contact === "error" ? contact : undefined;

  return <StandardPage contactState={contactState} locale="en" pageKey="contact" />;
}

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found");

  return (
    <Section>
      <SectionHeading as="h1" rule>
        Page not found
      </SectionHeading>
      <p className="mt-6 max-w-[44ch] text-lg text-ink-2">The page you looked for is not here.</p>
      <div className="mt-9">
        <Button to="/">Back to the home page</Button>
      </div>
    </Section>
  );
}

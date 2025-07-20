import Companioncard from "@/components/Companioncard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";

// Helper to normalize query params safely
function normalizeParam(param?: string | string[]): string | undefined {
  if (!param) return undefined;
  if (Array.isArray(param)) return param[0]?.trim() || undefined;
  return param.trim();
}

interface SearchParams {
  searchParams: {
    subject?: string | string[];
    topic?: string | string[];
  };
}

const CompanionLibrary = async ({ searchParams }: SearchParams) => {
  const subject = normalizeParam(searchParams.subject);
  const topic = normalizeParam(searchParams.topic);

  const companions = await getAllCompanions({ subject, topic });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput/>
          <SubjectFilter/>
          </div>
      </section>
      <section className="flex flex-wrap gap-6 justify-center sm:justify-start">
        {companions.map((companion) => (
          <Companioncard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  );
};

export default CompanionLibrary;

import teamGroups from "@/locale/en/team.json";

export default function Team() {
  return (
    <section>
      <h1>Team</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamGroups.map((group) => (
          <div key={group.role} className="text-center">
            <h3 className="mb-3 bg-[var(--earth)] p-2">{group.role}</h3>

            <ul>
              {group.members.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </section>
  );
}
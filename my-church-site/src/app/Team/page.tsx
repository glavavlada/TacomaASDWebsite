import teamGroups from "@/data/team.json";

export default function Team() {
  return (
    <section className="teamPage">
      <h1>Team</h1>

      <section className="teamGrid">
        {teamGroups.map((group) => (
          <div key={group.role} className="teamColumn">
            <h3>{group.role}</h3>

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
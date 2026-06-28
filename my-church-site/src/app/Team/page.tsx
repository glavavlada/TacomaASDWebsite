type TeamGroup = {
  role: string;
  members: string[];
};

const teamGroups: TeamGroup[] = [
  {
    role: "Pastor",
    members: ["Vitalii Glavatskyi"]
  },
  {
    role: "Clerk",
    members: ["Dianna Croitor"]
  },
  {
    role: "Treasurer",
    members: ["Ala Cleofas"]
  },
  {
    role: "Elder",
    members: ["Serhii Kostiuk", "Ivan Bokov", "Maksym Briukhovets"]
  },
  {
    role: "Deacon",
    members: ["Victor Kasap", "Valerii Croitor", "Illia Kostiuk", "Pavlo Kostiuk", "Valentin Lala", "Timur Lechiev", "Maxim Lukin", "Oleksandr Shevchuk", "Vialii Vyshnevskyi"]
  },
  {
    role: "Deaconess",
    members: ["Maria Kasap","Tatiana Croitor", "Irina Gerasimchuk", "Yelena Kuzmina", "Liudmila Lala", "Elena Pindiurina", "Irina Pindiurina", "Elena Railean", "Lesya Voroniuk"]
  },
];

export default function Team() {
  return (
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
  );
}
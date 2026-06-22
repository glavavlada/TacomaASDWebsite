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
    role: "Elder",
    members: ["Serhii Kostiuk", "Ivan Bokov", "Maksym Briukhovets"]
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
    role: "Deacon - Head",
    members: ["Victor Kasap"]
  },
  {
    role: "Deacon",
    members: ["Valerii Croitor", "Illia Kostiuk", "Pavlo Kostiuk", "Valentin Lala", "Timur Lechiev", "Maxim Lukin", "Oleksandr Shevchuk", "Vialii Vyshnevskyi"]
  },
  {
    role: "Deaconess - Head",
    members: ["Maria Kasap"]
  },
  {
    role: "Deaconess",
    members: ["Tatiana Croitor", "Irina Gerasimchuk", "Yelena Kuzmina", "Liudmila Lala", "Elena Pindiurina", "Irina Pindiurina", "Elena Railean", "Lesya Voroniuk"]
  },
  {
    role: "Building Mgr",
    members: ["Pavlo Kostiuk", "Vasili Cleofas", "Valerii Croitor", "Leonid Lala", "Valentin Lala", "Gheorghe Sirbu"],
  },
  {
    role: "Chilren's Min Dir",
    members: ["Yelena Kuzmina"],
  },
  {
    role: "Children's Min Dir Asst",
    members: ["Tatiana Croitor"],
  },
  {
    role: "Family Min Coord",
    members: ["Ivan Melniciuc", "Larisa Melniciuc"],
  },
  {
    role: "Finance Comm - Chair",
    members: ["Eugeniu Baidiuc"],
  },
  {
    role: "Finance Officer",
    members: ["Irina Gerasimchuk", "Lilia Lala", "Svitlana Shevchuk", "Lesya Varoniuk"],
  },
  {
    role: "Health/Temp Dir",
    members: ["Natalia Bakhtala"],
  },
  {
    role: "Kitchen Ministry",
    members: ["Elena Railean"],
  },
  {
    role: "Librarian",
    members: ["Elena Pindiurina"],
  },
  {
    role: "Master Guide Coord",
    members: ["Andrey Glavatskyy"],
  },
  {
    role: "Media Min Coord",
    members: ["Reshat Sitdikov", "Vlad Glavatskyy"],
  },
  {
    role: "Music Coord",
    members: ["Liliya Sitdikova"],
  },
  {
    role: "Musician",
    members: ["Tetiana Kostiuk", "Vildan Sitdikov", "Victor Kasap","Serghei Railean"],
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
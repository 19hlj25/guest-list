import { useState } from "react";

export default function App() {
  const placeholderGuests = [
    {
      id: 1,
      name: "Angela Suell",
      email: "ang_sll@yahoo.com",
      phone: "(971)-832-2479",
      bio: "big business",
      job: "boss",
    },
    {
      id: 2,
      name: "Hudson Johnston",
      email: "Hudson@iamclinic.org",
      phone: "(555)-333-4444",
      bio: "queer and here",
      job: "Therapist",
    },
  ];

  const [guests] = useState(placeholderGuests);
  const [selectedGuest, setSelectedGuest] = useState(null);

  if (selectedGuest) {
    return (
      <main>
        <h1>Guest Details</h1>

        <p>Name: {selectedGuest.name}</p>
        <p>Email: {selectedGuest.email}</p>
        <p>Phone: {selectedGuest.phone}</p>
        <p>Bio: {selectedGuest.bio}</p>
        <p>Job: {selectedGuest.job}</p>

        <button onClick={() => setSelectedGuest(null)}>Back</button>
      </main>
    );
  }

  return (
    <main>
      <h1>Guest List</h1>

      <ul>
        {guests.map((guest) => (
          <li key={guest.id}
            onClick={() => setSelectedGuest(guest)}
            style={{ cursor: "pointer" }}
            >
            {guest.name} - {guest.email}
            
          </li>
        ))}
      </ul>
    </main>
  );
}

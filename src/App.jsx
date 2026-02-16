import { useEffect, useState } from "react";
const COHORT = "2511-FTB-CT-WEB-PT";
const API_BASE = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}`;


async function fetchAllGuests() {
  const res = await fetch(`${API_BASE}/guests`);
  if (!res.ok) throw new Error(`Failed to fetch guests (HTTP ${res.status})`);
  const json = await res.json(); 
  return json.data
}

  async function fetchGuestDetails(id) {
  const res = await fetch(`${API_BASE}/guests/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch guest ${id} (HTTP ${res.status})`);
  const json = await res.json();
  return json.data;
  }

export default function App() {
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    let ignore = false;

    async function loadGuests() {
      try {
        setError("");
        setLoadingList(true);

        const list = await fetchAllGuests();
        if (!ignore) setGuests(list);
      } catch (e) {
        if (!ignore) setError(e.message);
      } finally {
        if (!ignore) setLoadingList(false);
      }
    }

      loadGuests();
    return () => {
      ignore = true; 
    };
  }, []);

 
  useEffect(() => {
    if (selectedGuestId === null) {
      setSelectedGuest(null);
      return;
    }

    let ignore = false;

    async function loadGuest() {
      try {
        setError("");
        setLoadingDetails(true);
        const guest = await fetchGuestDetails(selectedGuestId);
        if (!ignore) setSelectedGuest(guest);
      } catch (e) {
        if (!ignore) setError(e.message);
      } finally {
        if (!ignore) setLoadingDetails(false);
      }
    }

     loadGuest();
    return () => {
      ignore = true;
    };
  }, [selectedGuestId]);

if (selectedGuestId !== null) {
    return (
      <main>
        <h1>Guest Details</h1>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        {loadingDetails || !selectedGuest ? (
          <p>Loading details...</p>
        ) : (
          <>
            <p>Name: {selectedGuest.name}</p>
            <p>Email: {selectedGuest.email}</p>
            <p>Phone: {selectedGuest.phone}</p>
            <p>Bio: {selectedGuest.bio}</p>
            <p>Job: {selectedGuest.job}</p>
          </>
        )}

        <button onClick={() => setSelectedGuestId(null)}>Back</button>
      </main>
    );
  }
 
  return (
    <main>
      <h1>Guest List</h1>

      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {loadingList && <p>Loading guests...</p>}

      <ul>
        {guests.map((guest) => (
          <li
            key={guest.id}
            onClick={() => setSelectedGuestId(guest.id)}
            style={{ cursor: "pointer" }}
          >
            {guest.name} - {guest.email}
          </li>
        ))}
      </ul>
    </main>
  );
}

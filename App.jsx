import { useEffect, useState } from 'react';

function App() {
  const [wings, setWings] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({});

  const API = import.meta.env.VITE_API_URL;
  if (!API) console.error("Variável VITE_API_URL não definida!");

  useEffect(() => {
    fetch(`${API}/buildingwings`)
      .then(res => res.json())
      .then(data => setWings(data));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`${API}/components`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => alert('Component added!'));
  };

  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Building Inventory</h1>

      <input
        placeholder="Search building wings..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="p-2 border mb-4 w-full"
      />

      <ul className="mb-8">
        {wings.filter(w => w['BuildingWing Name']?.toLowerCase().includes(search.toLowerCase()))
          .map(w => (
            <li key={w.BuildingWingID} className="border-b py-2">
              {w['BuildingWing Name']} – {w['Usage']}
            </li>
          ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Add Component</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        <input placeholder="ComponentTypeID" onChange={e => setForm({ ...form, ComponentTypeID: e.target.value })} />
        <input placeholder="CampusID" onChange={e => setForm({ ...form, CampusID: e.target.value })} />
        <input placeholder="FacilityID" onChange={e => setForm({ ...form, FacilityID: e.target.value })} />
        <input placeholder="BuildingWingID" onChange={e => setForm({ ...form, BuildingWingID: e.target.value })} />
        <input type="date" placeholder="InstallDate" onChange={e => setForm({ ...form, InstallDate: e.target.value })} />
        <input placeholder="UniqueTag" onChange={e => setForm({ ...form, UniqueTag: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 mt-2">Submit</button>
      </form>
    </div>
  );
}

export default App;
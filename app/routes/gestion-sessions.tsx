import { useEffect, useState } from "react";
import type { Session } from "../../types/Session";
import { buttonStyle, inputStyle } from "~/styles";

let mockSessions: Session[] = [
  {
    id: 1,
    theme: "Enquête au musée",
    duree: 60,
    prix: 80,
    nbParticipantsMin: 2,
    creneaux: ["2024-07-01 14:00", "2024-07-01 16:00"],
  },
];

const getSessions = (): Session[] => {
  return [...mockSessions];
};

const addSession = (session: Omit<Session, "id">) => {
  const newId =
    mockSessions.length > 0
      ? Math.max(...mockSessions.map((s) => s.id)) + 1
      : 1;
  const newSession = { id: newId, ...session };
  mockSessions.push(newSession);
  return newSession;
};

const updateSession = (id: number, session: Omit<Session, "id">) => {
  const idx = mockSessions.findIndex((s) => s.id === id);
  if (idx !== -1) {
    mockSessions[idx] = { id, ...session };
    return mockSessions[idx];
  }
  return null;
};

const deleteSession = (id: number) => {
  mockSessions = mockSessions.filter((s) => s.id !== id);
  return true;
};

const GestionSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [form, setForm] = useState<Omit<Session, "id">>({
    theme: "",
    duree: 60,
    prix: 0,
    nbParticipantsMin: 2,
    creneaux: [""],
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    refreshSessions();
  }, []);

  const refreshSessions = () => {
    const data = getSessions();
    setSessions(Array.isArray(data) ? data : []);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "duree" || name === "prix" || name === "nbParticipantsMin"
          ? Number(value)
          : value,
    });
  };

  const handleCreneauxChange = (idx: number, value: string) => {
    const newCreneaux = [...form.creneaux];
    newCreneaux[idx] = value;
    setForm({ ...form, creneaux: newCreneaux });
  };

  const addCreneau = () => {
    setForm({ ...form, creneaux: [...form.creneaux, ""] });
  };

  const removeCreneau = (idx: number) => {
    const newCreneaux = form.creneaux.filter((_, i) => i !== idx);
    setForm({ ...form, creneaux: newCreneaux });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateSession(editId, form);
      setEditId(null);
    } else {
      addSession(form);
    }
    setForm({
      theme: "",
      duree: 60,
      prix: 0,
      nbParticipantsMin: 2,
      creneaux: [""],
    });
    refreshSessions();
  };

  const handleEdit = (session: Session) => {
    setEditId(session.id);
    setForm({
      theme: session.theme,
      duree: session.duree,
      prix: session.prix,
      nbParticipantsMin: session.nbParticipantsMin,
      creneaux: [...session.creneaux],
    });
  };

  const handleDelete = (id: number) => {
    deleteSession(id);
    refreshSessions();
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-4  ">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center">
        Gestion des sessions
      </h2>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-2">
        <input
          name="theme"
          placeholder="Thème"
          value={form.theme}
          onChange={handleChange}
          className={inputStyle}
        />
        <input
          name="duree"
          type="number"
          placeholder="Durée (min)"
          value={form.duree}
          onChange={handleChange}
          className={inputStyle}
        />
        <input
          name="prix"
          type="number"
          placeholder="Prix (€)"
          value={form.prix}
          onChange={handleChange}
          className={inputStyle}
        />
        <input
          name="nbParticipantsMin"
          type="number"
          placeholder="Participants min."
          value={form.nbParticipantsMin}
          onChange={handleChange}
          className={inputStyle}
        />
        <label>Créneaux disponibles :</label>
        {form.creneaux.map((cr, idx) => (
          <div key={idx} className="flex gap-2 mb-1">
            <input
              type="text"
              value={cr}
              onChange={(e) => handleCreneauxChange(idx, e.target.value)}
              className={inputStyle}
              placeholder="ex: 2024-07-01 14:00"
            />
            {form.creneaux.length > 1 && (
              <button
                type="button"
                onClick={() => removeCreneau(idx)}
                className={buttonStyle + " text-red-500 border-red-500"}
              >
                X
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addCreneau} className={buttonStyle}>
          Ajouter un créneau
        </button>
        <button type="submit" className={buttonStyle}>
          {editId ? "Modifier" : "Créer"} la session
        </button>
      </form>
      <ul>
        {sessions.map((session) => (
          <li key={session.id} className="mb-4 border p-2 rounded">
            <b>{session.theme}</b> ({session.duree} min, {session.prix} €) -
            Min: {session.nbParticipantsMin}
            <br />
            Créneaux: {session.creneaux.join(", ")}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(session)}
                className={`${buttonStyle} text-yellow-400 border-yellow-400`}
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(session.id)}
                className={`${buttonStyle} text-red-500 border-red-500`}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionSessions;

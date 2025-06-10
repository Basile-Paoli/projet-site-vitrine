import { NavLink } from "react-router";

type Session = {
  id: number;
  nom: string;
  tempsLimite: string;
  nombreJoueurs: string;
  photos: string[];
};

export function SessionCard({ session }: { session: Session }) {
  return (
    <NavLink
      to={`/sessions/${session.id}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {session.nom}
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Temps limite: {session.tempsLimite}
      </p>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Nombre de joueurs: {session.nombreJoueurs}
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {session.photos.map((photo, index) => (
          <img
              alt={`Photo ${index + 1} de la session ${session.nom}`}
              key={index}
              src={photo}
              className="w-full h-auto max-h-[300px] rounded-md"
          />
        ))}
      </div>
    </NavLink>
  );
}

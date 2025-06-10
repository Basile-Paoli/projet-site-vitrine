import { useNavigate } from "react-router";
import type { Route } from "./+types/session";
import sessions from "~/datas/sessions.json";
import { useEffect } from "react";
export default function Session({ params }: Route.ComponentProps) {

  const session = sessions.find((s) => s.id === parseInt(params.id));
  const navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/404", { replace: true });
    }
  }, []);

  if (!session) {
    return null;
  }

  return (
    <div>
      <h1>{session.nom}</h1>
        <p><strong>Genre :</strong> {session.genre}</p>
        <p><strong>Difficulté :</strong> {session.difficulte}</p>
        <p><strong>Nombre de joueurs :</strong> {session.nombreJoueurs}</p>
        <p><strong>Langue :</strong> {session.langue}</p>
        <p><strong>Description :</strong> {session.description}</p>
        <p><strong>Âge minimum :</strong> {session.ageMini}</p>
        <p><strong>Temps limite :</strong> {session.tempsLimite}</p>
      {session.photos && session.photos.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {session.photos.map((photo, index) => (
                <img
                    alt={`Photo ${index + 1} de la session ${session.nom}`}
                    key={index}
                    src={photo}
                    className="w-full max-w-md h-auto max-h-[300px] rounded-md"
                />
            ))}
          </div>
      )}

    </div>
  );
}
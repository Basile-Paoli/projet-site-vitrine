import sessions from "../datas/sessions.json";
import { SessionCard } from "./SessionCard";
import { FaPaintBrush, FaGem, FaHeadphones, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export function Welcome() {
  return (
    <>
      <div className="container mx-auto py-16 text-black px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div className="col-span-full mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
              Bienvenue sur La Maison Horrifique
            </h1>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4">
              <FaPaintBrush aria-label="Thèmes" className="text-4xl text-black" />
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-2">Explorez des univers inédits</h2>
              <p className="text-base leading-relaxed">
                Plongez dans des aventures artistiques et mystérieuses, où chaque scénario repousse les limites de l'imagination.
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4">
              <FaGem aria-label="Expérience" className="text-4xl text-black" />
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-2">Vivez une aventure sans pareil</h2>
              <p className="text-base leading-relaxed">
                Laissez-vous emporter par des décors époustouflants et des récits captivants qui vous feront vibrer à chaque instant.
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4">
              <FaHeadphones aria-label="Sensoriel" className="text-4xl text-black" />
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-2">Éveillez vos émotions</h2>
              <p className="text-base leading-relaxed">
                Une expérience sensorielle complète qui sollicite et réveille tous vos sens pour un voyage inoubliable.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-md p-01 rounded-xl">
          <div className="col-span-full my-6">
            <h2 className="text-3xl font-bold">Venez vous mesurer au défi Maison Horrifique !</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-5xl font-bold mb-4">5</p>
              <p className="text-lg">Scénarios Exclusifs</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-4">2 à 6</p>
              <p className="text-lg">Joueurs par équipe</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-4">60 à 90</p>
              <p className="text-lg">Minutes de jeu</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mx-32 max-w-[800px]">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
      <div className="mt-12 p-6 bg-white/10 backdrop-blur-md rounded-xl text-center">
        <h3 className="text-2xl font-bold mb-6">Où nous trouver ?</h3>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div>
            <h2 className="text-xl font-medium">Adresse</h2>
            <p className="text-lg">123 Rue Exemple, 75000 Paris, France</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div>
            <h2 className="text-xl font-medium">Téléphone</h2>
            <p className="text-lg">+33 1 23 45 67 89</p>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import sessions from "~/datas/sessions.json";
import { buttonStyle, inputStyle } from "~/styles";

type ReservationFormData = {
  sessionId: string;
  nbParticipants: number;
  email: string;
  slot: string;
};

const timeSlots: [Date, Date][] = [
  [new Date("2023-10-01T10:00:00"), new Date("2023-10-01T12:00:00")],
  [new Date("2023-10-01T14:00:00"), new Date("2023-10-01T16:00:00")],
  [new Date("2023-10-01T18:00:00"), new Date("2023-10-01T20:00:00")],
];

function dateRangeToString(slot: [Date, Date]): string {
  return `${slot[0].toLocaleString()} - ${slot[1].toLocaleString()}`;
}

export default function Reservation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormData>({
    defaultValues: {
      sessionId: sessions[0].id.toString(),
      nbParticipants: 0,
      email: "",
      slot: dateRangeToString(timeSlots[0]),
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: ReservationFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Réservation réussie !");
    }, 2000);
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-md mx-auto p-4  "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold mb-4">Réservation d'une session</h1>
      <label>
        Sélectionnez une session
        <select {...register("sessionId")} className={inputStyle}>
          {sessions.map((session) => (
            <option key={session.id} value={session.id}>
              {session.nom}
            </option>
          ))}
        </select>
        {errors.sessionId && (
          <span className="text-red-500">{errors.sessionId.message}</span>
        )}
      </label>
      <label>
        Sélectionnez un créneau horaire
        <select {...register("slot")} className={inputStyle}>
          {timeSlots.map((slot, index) => (
            <option key={index} value={dateRangeToString(slot)}>
              {slot[0].toLocaleString()} - {slot[1].toLocaleString()}
            </option>
          ))}
        </select>
        {errors.slot && (
          <span className="text-red-500">{errors.slot.message}</span>
        )}
      </label>
      <label>
        Nombre de participants
        <input
          type="number"
          {...register("nbParticipants", {
            required: "Le nombre de participants est requis",
            min: {
              value: 1,
              message: "Au moins 1 participant est requis",
            },
            max: {
              value: 10,
              message: "Au maximum 10 participants sont autorisés",
            },
          })}
          className={inputStyle}
        />
        {errors.nbParticipants && (
          <span className="text-red-500">{errors.nbParticipants.message}</span>
        )}
      </label>
      <label>
        Adresse e-mail
        <input
          type="email"
          {...register("email", {
            required: "L'email est requis",
          })}
          className={inputStyle}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      {isLoading ? (
        <div>Réservation en cours...</div>
      ) : (
        <button className={buttonStyle} type="submit">
          Réserver
        </button>
      )}
    </form>
  );
}

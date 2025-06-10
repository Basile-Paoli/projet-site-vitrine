import sessions from "../datas/sessions.json";
import { SessionCard } from "./SessionCard";

export function Welcome() {
  return (
    <div className="flex flex-col gap-4 mx-32 max-w-[800px] ">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}

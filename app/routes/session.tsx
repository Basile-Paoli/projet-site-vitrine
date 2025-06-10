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
      <h1>Session {session.id}</h1>
    </div>
  );
}

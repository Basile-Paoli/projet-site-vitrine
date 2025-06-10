import type { Route } from "./+types/session";
export default function Session({ params }: Route.ComponentProps) {
  return (
    <div>
      <h1>Session {params.id}</h1>
    </div>
  );
}

import { useState } from "react";
import { NavLink, useLocation } from "react-router";

const linkStyles = ({ isActive }: { isActive: boolean }) =>
  "cursor-pointer px-3 py-2 rounded transition-colors duration-200 " +
  (isActive ? "text-blue-500" : "text-gray-700");

export function Navbar() {
  return (
    <header className="flex items-center p-4 justify-between w-full bg-gray-200 border-b">
      <div className="break-words w-32">LA MAISON HORRIFIQUE</div>
      <div className="flex items-center gap-4">
        <SessionDropdown />
        <NavLink to="/reservation" className={linkStyles}>
          Réserver
        </NavLink>
        <NavLink to="/contact" className={linkStyles}>
          Contact
        </NavLink>
      </div>
    </header>
  );
}

function SessionDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const sessions = [
    { name: "session1", path: "/session/login" },
    { name: "session2", path: "/session/register" },
  ];
  const isInSessionPage = location.pathname.startsWith("/session");
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={linkStyles({ isActive: isInSessionPage })}
      >
        Session
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-20 min-w-fit bg-white border rounded shadow-lg">
          <ul className="py-1">
            {sessions.map((session) => (
              <li key={session.name}>
                <NavLink
                  to={session.path}
                  className={
                    linkStyles({ isActive: isActive(session.path) }) +
                    " block px-4 py-2"
                  }
                >
                  {session.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

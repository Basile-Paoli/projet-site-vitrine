import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import sessions from "../datas/sessions.json";

const linkStyles = ({ isActive }: { isActive: boolean }) =>
  "cursor-pointer px-3 py-2 rounded transition-colors duration-200 " +
  (isActive ? "text-blue-500" : "text-gray-700");

export function Navbar() {
  return (
    <header className="flex items-center p-4 justify-between w-full bg-gray-200 border-b">
      <NavLink to="/" className="break-words w-32">LA MAISON HORRIFIQUE</NavLink>
      <div className="flex items-center gap-4">
        <SessionDropdown />
        <GestionDropdown />
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
  const isInSessionPage = location.pathname.startsWith("/session");

  const links = sessions.map((session) => ({
    name: session.nom,
    path: `/sessions/${session.id}`,
  }));

  useEffect(() => setIsOpen(false), [location]);

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
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    linkStyles({ isActive }) + " block px-4 py-2"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function GestionDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const location = useLocation();

  const links = [
    { name: "Session", path: "/gestion-sessions" },
    { name: "Employés", path: "/gestion-employes" },
  ];

  useEffect(() => setIsOpen(false), [location]);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className={linkStyles({ isActive: false })}>
        Gestion
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 min-w-fit bg-white border rounded shadow-lg">
          <ul className="py-1">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    linkStyles({ isActive }) + " block px-4 py-2"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

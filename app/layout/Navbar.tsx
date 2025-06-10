import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import sessions from "../datas/sessions.json";

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
  const isInSessionPage = location.pathname.startsWith("/session");

  const links = sessions.map((session) => ({
    name: session.nom,
    path: `/session/${session.id}`,
  }));
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

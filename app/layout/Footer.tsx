import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import data from "~/datas/sessions.json";

export function Footer() {
    return (
        <footer className="w-full bottom-0 left-0 right-0 flex flex-col items-center justify-center p-4 bg-gray-200 dark:bg-gray-700 border-t">
            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
                <div>
                    <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1">Nos missions</h2>
                    {data
                        .sort((a, b) => a.id - b.id)
                        .map((session) => (
                            <ul className="text-sm mb-2">
                                <li key={session.id}>
                                    <a href={`/sessions/${session.id}`} className="hover:text-blue-500 transition-colors">
                                        {session.nom}
                                    </a>
                                </li>
                            </ul>
                        ))
                    }
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1">Informations</h2>
                    <ul className="text-sm space-y-2">
                        <li>
                            <a href="/mentions-legales" className="hover:text-blue-500 transition-colors">
                                Mentions légales
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-blue-500 transition-colors">
                                Contactez-nous
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex space-x-4 mb-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 hover:scale-110 transition-transform">
                    <FaFacebook size={30} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 hover:scale-110 transition-transform">
                    <FaInstagram size={30} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 hover:scale-110 transition-transform">
                    <FaLinkedin size={30} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 hover:scale-110 transition-transform">
                    <FaSquareXTwitter size={30} />
                </a>
            </div>
        </footer>
    );
};

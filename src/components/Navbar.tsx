import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Car, Moon, Sun } from "lucide-react";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

 const [isDark, setIsDark] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});

  const toggleTheme = () => {
  const newDark = !isDark;
  setIsDark(newDark);

  if (newDark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");   // 👈 saqlayapti
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");  // 👈 saqlayapti
  }
};

useEffect(() => {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, []);


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Car size={18} />
          </div>

          <span className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            OilTrack <span className="text-blue-600">Usta</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-rose-500"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Chiqish</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
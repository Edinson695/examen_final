import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <nav className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-6">
        <h1 className="font-bold text-xl tracking-wider text-cyan-400">titulo empresa </h1>
        
        <div className="flex gap-4">
          <Link to="/dashboard" className="hover:text-cyan-300 transition-colors">
            Dashboard
          </Link>
          <Link to="/products/new" className="hover:text-cyan-300 transition-colors">
            Nuevo Producto
          </Link>

          <Link to="/login" className="hover:text-cyan-300 transition-colors">
            Login
          </Link>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors text-sm font-semibold"
      >
        Cerrar Sesión 
      </button>
    </nav>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRouter";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
//import { CatalogoGenerico } from "./pages/handleSavedAction";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*PROTEGIDAS*/}
        <Route element={<ProtectedRoute />}>
          <Route 
            element={
              <>
                <Navbar />
                <main className="container mx-auto p-6">
                  {/* Aquí React renderizará la página interna correspondiente */}
                  <div className="animate-fade-in" /> 
                </main> 
              </>
            }
          >
            {/* Endpoints*/}
            <Route path="/dashboard" element={<div>/* REEMPLAZA CON TU COMPONENTE  */</div>} />
            <Route path="/products/new" element={<div>/* REEMPLAZA CON TU COMPONENTE  */</div>} />
            <Route path="/products/:id" element={<div>/* REEMPLAZA CON TU COMPONENTE  */</div>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
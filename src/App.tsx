import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRouter";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CatalogoGenerico } from "./pages/dashboard";

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
            <Route path="/dashboard" element={<CatalogoGenerico/>} />
            <Route path="/products/new" element={<div>/* pipipi*/</div>} />
            <Route path="/products/:id" element={<div>/* pipipi  */</div>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginPayload } from "../types";
import { loginUser } from "../api/axiosInstance";

export function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginPayload>({
        username:'',
        password:''
    });

    const[errorMsg, setErrorMsg] = useState<string | null>(null);
    const[successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]:value
        }));
    }

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();

        if (!formData.username.trim() || !formData.password.trim()){
            setErrorMsg("Todos los campos son requeridos!");
            setSuccessMsg(null);
            return;
        }
        try{
            setErrorMsg(null);
            const response = await loginUser(formData);
            localStorage.setItem('token', response.token);

            setSuccessMsg("Ahh si eras tú...");
            setTimeout(() =>{
                navigate('/dashboard');
            },2000);
        } catch (err: any) {
            console.error("Error detectado en la petición:", err);
        if (err.response) {
            const statusCode = err.response.status;
            const mensajeBackend = err.response.data?.message;

        if (statusCode === 401) {
            localStorage.removeItem("token"); 
            window.location.href = "/login";   
            return;
        }

        if (statusCode === 409) {
            setErrorMsg(mensajeBackend || "¡Error de conflicto! Los datos ya se encuentran registrados. ");
        } else if (statusCode === 404) {
            setErrorMsg("El recurso que intentas buscar o modificar no existe. ");
        } else if (statusCode === 400) {

            setErrorMsg("Campos inválidos o incompletos. Revisa la información ingresada. ");
        } else {

            setErrorMsg(mensajeBackend || "Ocurrió un error interno en el servidor (500). ");
        }

        } else {
        setErrorMsg("Error de red: No se pudo establecer conexión con el servidor. ");
    }
    }
    };

    return(
        <div className="auth-container">
            <h2>Login</h2>
                {errorMsg && (
                <div style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{errorMsg}
                </div>)}
                {successMsg && <div className="alert error">{successMsg}</div>}


            <form onSubmit={handleSubmit}>

                <div className="from-group">
                    <label>username</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="el de register"
                    />
                </div>

                <div className="from-group">
                    <label>password</label>
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="el mismo mensaje de arriba"
                    />
                </div>
                <button type="submit"> Login </button>
            </form>
            <Link to="/register" className="text-cyan-600 hover:underline font-semibold">
            Regístrate aquí
          </Link>

        </div>
    )
};
import { useState } from "react";
import type { RegisterPayload } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/axiosInstance";

export function Register(){
    const navigate= useNavigate();

    const[formData, setFormData] = useState<RegisterPayload>({
        username:'',
        email:'',   
        password:'',
        fullName:''
    });

    const[errorMsg, setErrorMsg] = useState<string | null>(null);
    const[successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim() || !formData.fullName.trim() || !formData.username.trim()){
            setErrorMsg("Todos los campos son requeridos");
            setSuccessMsg(null);
            return;
        }
        try{
            setErrorMsg(null);
            const response =  await registerUser(formData);
            localStorage.setItem('token', response.token);

            setSuccessMsg("Bienvenido!");

            setTimeout(() =>{
                navigate('/login');
            },2000);
        } catch (err : any){
            const MensajeAPI = err.response?.data?.message || "el servidor falló";
            setErrorMsg(MensajeAPI);
            console.error("el servidor no responde", err);
        }
    };

    return(
        <div className="auth-container">
            <h2>Registrarse</h2>

            {errorMsg && <div className="alert error">{errorMsg}</div>}
            {successMsg && <div className="alert error">{successMsg}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@utec.edu.pe / Aaron"
                        />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="M123"
                        />
                </div>

                <div className="form-group">
                    <label>Fullname</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Aaron Admin"
                    />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Aaronxd"
                        />
                </div>

                <button type="submit">Registrarse</button>
            </form>

            <Link to="/login" className="text-cyan-600 hover:underline font-semibold">
            Logueate aca
          </Link>
        </div>
    )
}
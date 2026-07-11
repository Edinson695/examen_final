import { useState, useEffect } from "react";
import { allProducts } from "../api/axiosInstance";
import type { Product } from "../types";

export function CatalogoGenerico() {
    const [product, setProduct] = useState<Product[]>([]); 
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [succesMsg, setSuccesMsg] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const response = await allProducts(); 
                setProduct(response);
                setSuccesMsg("Productos traidos con exito!");

            } catch (err: any) {
                const mensajeAPI = err.response?.data?.message || "Error: No se pudo cargar la información.";
                setErrorMsg(mensajeAPI);
                console.error("Error en el GET:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="catalog-container" style={{ padding: '20px' }}>
            <h2>Catálogo de [Techstore]</h2>

            {succesMsg && <p style={{ color: 'green', fontWeight: 'bold' }}>{succesMsg}</p>}
            {errorMsg && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMsg}</p>}
            
            <div className="item-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
                {product.map((product) => (
                    <div key={product.id} className="item-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', maxWidth: '250px' }}>
                        
                        <h3>{product.id}</h3>
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            style={{ width: '100%', height: 'auto', borderRadius: '4px' }} 
                        />
                        <p><strong>Categoría: </strong>{product.category}</p>
                        <p><strong>Descripción: </strong>{product.description}</p>
                        <p style={{ fontSize: '1.2em', color: '#0891b2' }}><strong>${product.price}</strong></p>

                        <hr style={{ margin: '15px 0' }}/>

                    </div>
                ))}
            </div>
        </div>
    );
}
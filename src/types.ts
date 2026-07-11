export interface LoginPayload{
    email_username : string,
    password : string
}

export interface LoginResponse{
    token: string
}
export interface RegisterPayload {
    username : string,
    email : string,
    password : string,
    full_name : string
}

export type EventCategory = 'DISPONIBLE' | 'AGOTADO' | 'PRÓXIMAMENTE'

export interface Product{
    id : number,
    name : string,
    description: string,
    category: string,
    price: number,
    stock: number,
    imageUrl: string,
    availability: EventCategory
}

export interface ProductNew{
    id : number,
    name : string,
    description: string,
    category: string,
    price: number,
    stock: number,
    imageUrl: string,
    availability: EventCategory
}

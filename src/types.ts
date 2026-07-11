export interface LoginPayload{
    username : string,
    password : string
}

export interface LoginResponse{
    token: string
}
export interface RegisterPayload {
    username : string,
    email : string,
    password : string,
    fullName : string
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
    name : string,
    description: string,
    category: string,
    price: number,
    stock: number,
    imageUrl: string,
    availability: EventCategory
}

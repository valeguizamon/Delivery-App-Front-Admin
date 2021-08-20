export class Domicilio {
    calle?: string
    latitud?: number
    longitud?: number
    numero?: number
    localidad?: string
}
export class User {
    uid: string
    domicilio?:Domicilio
    email: string
    estado: number
    nombre?: string
    online?: boolean
    photoURL?: string
    role: string
}
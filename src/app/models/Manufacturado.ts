import { Observable } from "rxjs"

export class DetalleManu{
    cantidad: number
    ArtInsumo: string
}
export class Manufacturado{
    _id: string
    denominacion: string
    tiempoEstimado: number
    precioVenta: number
    img: string
    ArtManufactDet: DetalleManu[]
    RubroGeneral: string
}
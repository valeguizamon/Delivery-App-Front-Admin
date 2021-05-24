import { Observable } from "rxjs"

export class DetalleManu{
    cantidad: Number
    ArtInsumo: string
}
export class Manufacturado{
    _id: string
    denominacion: string
    tiempoEstimado: Number
    precioVenta: Number
    img: string
    ArtManufactDet: DetalleManu[]
    RubroGeneral: string
}
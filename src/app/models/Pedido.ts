
export class Pedido{
    _id:string
    fecha: Date 
    estado:string
    horaEstimadaFin: number
    tipoEnvio: number
    total: number
    Cliente?: {
        id:string,
        Domicilio:{
            calle:string,
            numero:string,
            localidad:string
        }
    }
    DetallePedido:[{
        cantidad: number,
        subTotal:number,
        ArtManufact?: string,
        ArticuloInsumo?: string
    }]
    Factura?: string
    MdoPago?: string

    constructor(){}
    setDetalle(detalle){
        const detalleFinal = detalle.map((item)=>{
            let det = {
              cantidad: item.cantidad,
              subTotal: item.subtotal,
            }
            if(item.tipo=="manu"){
                det["ArtManufact"]=item.artId
            }else{
                det["ArticuloInsumo"]=item.artId
            }
            return det
        })
        this.DetallePedido= detalleFinal
    }
    
}
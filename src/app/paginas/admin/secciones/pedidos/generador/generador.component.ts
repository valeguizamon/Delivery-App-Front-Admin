import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Insumo } from 'src/app/models/Insumo';
import { Manufacturado } from 'src/app/models/Manufacturado';
import { Pedido } from 'src/app/models/Pedido';
import { InsumoService } from 'src/app/servicios/insumos.service';
import { ManufacturadosService } from 'src/app/servicios/manufacturados.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-generador',
  templateUrl: './generador.component.html',
  styleUrls: ['./generador.component.scss']
})
export class GeneradorComponent implements OnInit {
  public articulos =[]
  public manufacturados : Manufacturado[]=[]
  public insumos : Insumo[] = []
  public tipo: string=""
  public pedido : Pedido = new Pedido()
  public detalleFinal = []
  public detalle ={
    denominacion:'',
    cantidad: 1,
    precioU: 0,
    subtotal: 0,
    articulo: null,
    artId: '',
    tipo: ''
  }
  public total = 0
  constructor(public servicio: PedidosService,private manuService: ManufacturadosService,private insService: InsumoService) { }
  
  ngOnInit(): void {
    this.getAllArt()
  }

  //-------------------DATOS DE API------------------------//
  getAllArt(){
    this.manuService.getAll().subscribe((data)=>{
      this.manufacturados = data;
     
    })
    this.insService.getAll().subscribe((data)=>{
      this.insumos = data
    })
  }

  //---------------FUNCION PARA EL CAMBIO DE OPTIONS EN EL SELECT------------//
  cambioTipo(value){
    if(value=="manufacturado"){
      this.articulos = this.manufacturados
      this.tipo = "manu"
    }else if(value=="articulo"){
      this.articulos = this.insumos
      this.tipo="insumo"
    }
  }

  //-----------------DETALLE DEL PEDIDO------------------------//

  //Buscamos con el id segun el tipo de articulo(manufact o insumo)
  buscarItem(id){
    if(this.tipo == "manu"){
      return this.manufacturados.find(item => item._id == id)
    }else{
      return this.insumos.find(item => item._id ==id)
    }
  } 
  calcularSubTotal(item){
    return item.cantidad*item.precioU;
  }
  //agregamos cada detalle al detalleFinal
  agregarDetalle(){
    this.detalle.articulo = this.buscarItem(this.detalle.artId)
    this.detalle.denominacion = this.detalle.articulo.denominacion
    this.detalle.precioU = this.detalle.articulo.precioVenta
    this.detalle.subtotal =this.calcularSubTotal(this.detalle)
    this.detalle.tipo=this.tipo
    this.detalleFinal.push(this.detalle)
    this.detalle = {
      denominacion:'',
      cantidad: 1,
      precioU:0,
      subtotal:0,
      articulo: null,
      artId:'',
      tipo: ''
    }
    this.calcularTotal()
  }

  //---------------OPERACIONES CON LOS ARTICULOS--------------//
  
  //agregar una unidad desde la vista 
  agregar(ind){
    this.detalleFinal[ind].cantidad++;
    this.detalleFinal[ind].subtotal = this.calcularSubTotal(this.detalleFinal[ind])
    this.calcularTotal()
  }

  //disminuir una unidad desde la vista
  restar(ind){
    if(this.detalleFinal[ind].cantidad >1){
      this.detalleFinal[ind].cantidad--;
      this.detalleFinal[ind].subtotal = this.calcularSubTotal(this.detalleFinal[ind])
      this.calcularTotal()
    }
  }
  //eliminar un detalle desde la vista
  eliminarItem(ind){
    this.detalleFinal.splice(ind,1)
    this.calcularTotal()
  }

  //calcular el valor total del pedido
  calcularTotal(){
    this.total = 0
    this.detalleFinal.forEach(item => this.total+=item.subtotal)
  }

  //-------------VALIDACIONES------------//

  validarItem():boolean{
    return this.detalle.cantidad==0 || this.detalle.artId==""
  }
  validarTodo(formManu: NgForm):boolean{
    return this.detalleFinal.length==0 || formManu.invalid?true:false
  }
  //------------------GUARDAR----------------------//
  onSave(){
    this.pedido.setDetalle(this.detalleFinal)
    this.pedido.fecha = new Date()
    let tiempo = 0
    this.detalleFinal.forEach((detalle)=>{
      if(detalle.tipo == "manu"){
        if(detalle.articulo.tiempoEstimado > tiempo){
          tiempo = detalle.articulo.tiempoEstimado
        }
      }
    })
    let fechaFin = new Date()
    fechaFin.setMinutes(fechaFin.getMinutes()+tiempo)
    this.pedido.horaEstimadaFin = fechaFin
    this.pedido.total = this.total
    this.pedido.estado = "en espera"
    

    this.servicio.post(this.pedido).subscribe(()=>{
      console.log("generado con exito")
    })
    console.log(this.pedido)
  }

}

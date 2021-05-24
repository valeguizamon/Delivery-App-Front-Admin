import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RubroGral } from 'src/app/models/RubroGral';
import { ManufacturadosService } from 'src/app/servicios/manufacturados.service';
import { RubroService } from 'src/app/servicios/rubros.service';
import { RubrosartService } from 'src/app/servicios/rubrosart.service';
import { AngularFireStorage} from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { InsumoService } from 'src/app/servicios/insumos.service';
import { Insumo } from 'src/app/models/Insumo';
import { DetalleManu, Manufacturado } from 'src/app/models/Manufacturado';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-manufacturados',
  templateUrl: './manufacturados.component.html',
  styleUrls: ['./manufacturados.component.scss']
})
export class ManufacturadosComponent implements OnInit {
 
  @ViewChild ('btnClose') btnClose : ElementRef
  urlPreview: string = ''
  imgFile
  imgLoading: boolean =false
  public manufacturados: Manufacturado[]=[]
  public rubros : RubroGral[] = []
  public insumos: Insumo[] = []
  
  public ingrediente={
    cantidad: 0,
    ArtInsumo: '',
    vista: ''
  }
  public ingredientes= []
  constructor(public rubroService:RubroService, public servicio: ManufacturadosService, private storage : AngularFireStorage, private insumoService: InsumoService) { }

  ngOnInit(): void {
    this.getAllManufacturados()
    this.getAllRubros()
    this.getAllInsumos()
  }
  //---------------DATOS DE API-----------------------

  //traemos todos los articulos
  getAllManufacturados(){
    this.servicio.getAll().subscribe(
      data=> {
        console.log(data)
        this.manufacturados = data
        
      },
      err=> console.log(err)
    )
  }
  //traemos los rubros generales
  getAllRubros(){
    this.rubroService.getAll().subscribe(
      data=>this.rubros = data,
      err=> console.log(err)
    )
  }
  //traemos todos los insumos
  getAllInsumos(){
    this.insumoService.getAll().subscribe(
      data=> this.insumos = data,
      err => console.log(err)
    )
  }
  
  //--------------IMAGEN --------------//

  //previsualizar imagen
  prevImage(e){
    
    this.imgLoading=true
    // Creamos el objeto de la clase FileReader
    let reader = new FileReader()
    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    if(e.target.files[0]){
      this.urlPreview = ''
      setTimeout(()=>{
        //almacenamos el archivo para su posterior guardado
        this.imgFile= e.target.files[0]
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => this.urlPreview = reader.result as string
        this.imgLoading =false
      },1500)
    }
  }
  
  //guardar imagen en firebase
  saveImage(){
    const id = Math.random().toString(36).substring(2)
    const filePath =`uploads/manufacturados/food_${id}`
    const ref = this.storage.ref(filePath)
    return new Promise<string>((resolve,reject) =>{
      this.storage.upload(filePath,this.imgFile).then(()=>{
        ref.getDownloadURL().subscribe((data)=>{
          //retornamos la url final para guardarla en nuestro articulo
          resolve(data)
        })
        
      }).catch(err => reject(err))
    })
  }

  //-----------LISTA DE INGREDIENTES-------------//

  buscarInsumo(id){
    return this.insumos.find(insumo => insumo._id === id)
  }
  generarItemVista(insumo,ingrediente):string{
    return ingrediente.cantidad +""+ insumo.unidadMedida+" "+insumo.denominacion
  }
  agregarItem(){
    let insumoSelected = this.buscarInsumo(this.ingrediente.ArtInsumo)
    this.ingrediente.vista = this.generarItemVista(insumoSelected,this.ingrediente)
    this.ingredientes.push(this.ingrediente)
    this.ingrediente={
      cantidad:0,
      ArtInsumo:'',
      vista: ''
    }
  }
  eliminarItem(ind: number){
    this.ingredientes.splice(ind,1)
  }
  prepararParaEdit(){
    const detalleFinal = this.servicio.selected.ArtManufactDet.map((item) =>{
      let insumo = this.buscarInsumo(item.ArtInsumo)
      let ing = {
        cantidad: item.cantidad,
        ArtInsumo: item.ArtInsumo,
        vista: this.generarItemVista(insumo,item)
      }
      return ing
    })
    
    return detalleFinal
  }
  prepararIngredientes(){
    const detalleFinal = this.ingredientes.map((item)=>{
      let ing = {
        cantidad: item.cantidad,
        ArtInsumo: item.ArtInsumo
      }
      return ing
    })
    return detalleFinal
  }

  //-------------VALIDACIONES------------//

  validarItem():boolean{
    return this.ingrediente.cantidad==0 || this.ingrediente.ArtInsumo==""
  }
  validarTodo():boolean{
    return this.ingredientes.length==0?true:false
  }

  //-----------PREPARAR FORM PARA EDITAR ARTICULO--------//
  
  preUpdate(manufacturado : Manufacturado){
    this.servicio.selected = manufacturado
    
    this.ingredientes = this.prepararParaEdit()
    this.urlPreview = this.servicio.selected.img

    
  }


  //-----------GUARDAR-------//

  async onSave(){
   
      
      if(this.imgFile){
        
        //en caso de edicion, se borra la imagen anterior del storage de firebase
        /*if(this.servicio.selected.img){
          let refImgAnterior = this.storage.refFromURL(this.servicio.selected.img)
          if(refImgAnterior) refImgAnterior.delete().subscribe()
          
        }*/
        this.servicio.selected.img = await this.saveImage()
      }
      //si no seleccion ninguna imagen pero ya existia una(editar) se deja la que estaba, sino se carga una por default (nuevo)
      else if(!this.servicio.selected.img){
        if(confirm("No ha cargado ninguna foto, se cargará una por default. ¿Desea continuar?")){
          this.servicio.selected.img = "../../../assets/img/comida1.jfif"
        }
      }

      this.servicio.selected.ArtManufactDet = this.prepararIngredientes()
      console.log(this.servicio.selected)

      //nuevo articulo
      if(!this.servicio.selected._id){
        this.servicio.post(this.servicio.selected).subscribe(()=>{
          
          alert('Articulo cargado correctamente')
          this.btnClose.nativeElement.click()
        })
      }
      //editar articulo
      else{
        this.servicio.put(this.servicio.selected._id as string, this.servicio.selected).subscribe(()=>{
          alert('Articulo editado correctamente')
          this.btnClose.nativeElement.click()
        })
      }


  
   
  }
  //-----------ELIMINAR ARTICULO---------//
  onDelete(id){
    const confirmacion=confirm("¿Está seguro que desea eliminar este artículo?")
    if(confirmacion){
      this.servicio.delete(id).subscribe(
        ()=>alert("Artículo eliminado correctamente")
      )
    }
    this.servicio.setNull()
    this.getAllManufacturados()
  }
  //-----------RESET FORMULARIO------//
  resetForm(){
    this.servicio.setNull()
    this.ingrediente= {
      cantidad: 0,
      ArtInsumo: '',
      vista: ''
    }
    this.ingredientes= []
    this.urlPreview=''
    this.imgFile = null
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportesService } from 'src/app/servicios/reportes.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-usuariopedidos',
  templateUrl: './usuariopedidos.component.html',
  styleUrls: ['./usuariopedidos.component.scss']
})
export class UsuariopedidosComponent implements OnInit {

  public pedidos$: Observable<any[]>;

  public allTime: boolean = true;

  public error: boolean = false;

  private fecha:any = null;

  public errorMsg: string = '';

  public desde:any = null;

  public hasta:any = null;

  public skip: number = 0;

  public limit: number = 5;
  constructor(private reporteSvc: ReportesService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.pedidos$ = this.reporteSvc.getPedidosByUser(this.fecha,this.skip,this.limit);
  }

  public changeAllTime(e:Event){
    if(this.allTime){
      this.desde = null;
      this.hasta = null;
      this.fecha = null;
      this.getData()
    }
  }
  public changeFecha(){
    if(this.desde && this.hasta){
      if(this.desde < this.hasta){
        this.fecha = {fecha:{desde:this.desde,hasta:this.hasta}};
        this.getData()
      }else{
        this.error = true;
        this.errorMsg = "La fecha DESDE tiene que ser menor que la fecha HASTA"
        setTimeout(()=>{this.error = false},4000)
      }
    }else{
      this.error = true;
      this.errorMsg = 'Por favor seleccione las 2 fechas'
      setTimeout(()=>{this.error = false},4000)
    }

  }

  //Metodos de paginacion
  public next(){
    this.skip += this.limit;
    this.getData()
  }
  public prev(){
    this.skip -= this.limit;
    this.getData()
  }

  //Guardar Excel
  public saveExcel():void{
    console.log('Guardando')
    let element = document.getElementById('table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'pedidos-usuario'+new Date().toString()+'.xlsx');
  }

}

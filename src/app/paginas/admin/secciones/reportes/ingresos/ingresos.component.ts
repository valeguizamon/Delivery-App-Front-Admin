import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportesService } from 'src/app/servicios/reportes.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {

  public ganancia$: Observable<any[]>;

  public allTime: boolean = true;

  public error: boolean = false;

  public errorMsg: string = '';

  private fecha:any = null;

  public desde:any = null;

  public hasta:any = null;

  public mensual: string = 'si';

  public skip: number = 0;

  public limit: number = 5;

  public ingresos$: Observable<any[]>;

  constructor(private reporteSvc: ReportesService) { }

  ngOnInit(): void {
    this.getData()
  }
  public getData(){
    this.ingresos$ = this.reporteSvc.getIngresosPorPeriodo(this.fecha,this.mensual,this.skip,this.limit);
  }
  public changeMensual(e:Event){
    console.log(this.mensual);
    this.getData()
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
        this.getData();
      }else{
        this.error = true;
        this.errorMsg = "La fecha DESDE tiene que ser menor que la fecha HASTA"
        this.fecha = null;
        setTimeout(()=>{this.error = false},4000)
      }
    }else{
      this.error = true;
      this.errorMsg = 'Por favor seleccione las 2 fechas'
      this.fecha= null;
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

  public saveExcel():void{
    console.log('Guardando')
    let element = document.getElementById('table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'ingresos-'+new Date().toString()+'.xlsx');
  }

}

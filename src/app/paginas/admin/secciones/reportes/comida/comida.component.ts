import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportesService } from 'src/app/servicios/reportes.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.scss']
})
export class ComidaComponent implements OnInit {

  public comida$: Observable<any[]>;

  public allTime: boolean = true;

  public error: boolean = false;

  public errorMsg: string = '';

  public desde:any = null;

  public hasta:any = null;

  public limit:number = 5;

  public skip: number = 0;

  constructor(private reporteSvc: ReportesService) { }

  ngOnInit(): void {
    this.getData()
  }

  public getData(){
    this.comida$ = this.reporteSvc.getComidaRanking(null)
  }

  public changeAllTime(e:Event){
    if(this.allTime){
      this.desde = null;
      this.hasta = null;
      this.getData()
    }
  }
  public changeFecha(){
    if(this.desde && this.hasta){
      if(this.desde < this.hasta){
        this.comida$ = this.reporteSvc.getComidaRanking({fecha:{desde:this.desde,hasta:this.hasta}})
      }else{
        this.error = true;
        this.errorMsg = "La fecha DESDE tiene que ser menor que la fecha HASTA"
        this.desde = null;
        this.hasta = null;
        setTimeout(()=>{this.error = false},4000)
      }
    }else{
      this.error = true;
      this.errorMsg = 'Por favor seleccione las 2 fechas'
      this.desde = null;
      this.hasta = null;
      setTimeout(()=>{this.error = false},4000)
    }
  }

  public saveExcel():void{
    console.log('Guardando')
    let element = document.getElementById('table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'comida-ranking-'+new Date().toString()+'.xlsx');
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportesService } from 'src/app/servicios/reportes.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ganancias',
  templateUrl: './ganancias.component.html',
  styleUrls: ['./ganancias.component.scss']
})
export class GananciasComponent implements OnInit {

  public ganancia$: Observable<any[]>;

  public allTime: boolean = true;

  public error: boolean = false;

  public errorMsg: string = '';

  public desde:any = null;

  public hasta:any = null;
  
  public configChar = {
    view: [750,600],
    results: [],
    scheme: "natural",
    label: true,
    legend: true,
    axis: true
  };


  constructor(private reporteSvc: ReportesService) { }

  ngOnInit(): void {
    this.getGanancia()
  }


  private updateGraphicData(ganancia$: Observable<any>) {
    ganancia$.subscribe( response => {
      if(response.length) {
        this.configChar.results = [
          { name: "Venta", value: response[0].totalVenta},
          { name: "Costo", value: response[0].totalCosto},
          { name: "Ganancia", value: response[0].totalGanancia}
        ];
      }
    });
  }

  public getGanancia(){
    this.ganancia$ = this.reporteSvc.getGananciasPorPeriodo(null);
    this.updateGraphicData(this.ganancia$);
  }

  public changeAllTime(e:Event){
    if(this.allTime){
      this.getGanancia()
      this.desde = null;
      this.hasta = null;
    }
  }
  public changeFecha(){
    if(this.desde && this.hasta){
      if(this.desde < this.hasta){
        this.ganancia$ = this.reporteSvc.getGananciasPorPeriodo({fecha:{desde:this.desde,hasta:this.hasta}});
        this.updateGraphicData(this.ganancia$);
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

  public saveExcel():void{
    console.log('Guardando')
    let element = document.getElementById('table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'ganancias-'+new Date().toString()+'.xlsx');
  }


}

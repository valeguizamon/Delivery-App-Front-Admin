import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-modalcancel',
  templateUrl: './modalcancel.component.html',
  styleUrls: ['./modalcancel.component.scss'],
})
export class ModalcancelComponent implements OnInit {
  @Input('idCancel') idCancel;
  @Output()
  refresh = new EventEmitter();
  @ViewChild('btnClose') btnClose: ElementRef;
  public motivoCancel = '';
  constructor(private servicio: PedidosService) {}

  ngOnInit(): void {}

  resetText() {
    this.motivoCancel = '';
  }
  cancelPedido() {
    this.servicio.cancelPedido(this.idCancel, {"motivo":this.motivoCancel}).subscribe(
      (res) => {
        // console.log('respuesta', res);
        this.resetText();
        this.btnClose.nativeElement.click();
        this.onRefresh();
      },
      (err) => console.log('Error', err)
    );
  }

  onRefresh() {
    this.refresh.emit();
  }
}

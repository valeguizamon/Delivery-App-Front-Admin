import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariopedidosComponent } from './usuariopedidos.component';

describe('UsuariopedidosComponent', () => {
  let component: UsuariopedidosComponent;
  let fixture: ComponentFixture<UsuariopedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariopedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariopedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

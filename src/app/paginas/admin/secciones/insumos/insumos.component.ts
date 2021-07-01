import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InsumoService } from 'src/app/servicios/insumos.service';
import { NgForm } from '@angular/forms';
import { Insumo } from 'src/app/models/Insumo';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss'],
})
export class InsumosComponent implements OnInit {
  @ViewChild('btnClose') btnClose: ElementRef;

  urlPreview: string = '';
  imgFile;
  imgLoading: boolean = false;

  public insumos = [];

  constructor(
    public servicio: InsumoService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  //---------------------DATOS DE API-----------------------
  getAll() {
    this.servicio.getAll().subscribe((data) => {
      this.insumos = data;
    });
  }
  //--------------IMAGEN --------------//

  //previsualizar imagen
  prevImage(e) {
    this.imgLoading = true;
    // Creamos el objeto de la clase FileReader
    let reader = new FileReader();
    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    if (e.target.files[0]) {
      this.urlPreview = '';
      setTimeout(() => {
        //almacenamos el archivo para su posterior guardado
        this.imgFile = e.target.files[0];
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => (this.urlPreview = reader.result as string);
        this.imgLoading = false;
      }, 1500);
    }
  }

  //guardar imagen en firebase
  saveImage() {
    const id = Math.random().toString(36).substring(2);
    const filePath = `uploads/articulos/art_${id}`;
    const ref = this.storage.ref(filePath);
    return new Promise<string>((resolve, reject) => {
      this.storage
        .upload(filePath, this.imgFile)
        .then(() => {
          ref.getDownloadURL().subscribe((data) => {
            //retornamos la url final para guardarla en nuestro articulo
            resolve(data);
          });
        })
        .catch((err) => reject(err));
    });
  }

  //-----------PREPARAR FORM PARA EDITAR ARTICULO--------//
  preUpdateInsumo(insumo: Insumo) {
    this.servicio.selected = insumo;
    this.urlPreview = this.servicio.selected.img;
    console.log(this.servicio.selected);
  }

  //-----------------------GUARDAR-----------------------//

  async onSave() {
    if (this.servicio.selected.esInsumo == false) {
      if (this.imgFile) {
        this.servicio.selected.img = await this.saveImage();
        console.log('img', this.servicio.selected.img);
      } else if (!this.servicio.selected.img) {
        if (
          confirm(
            'No ha cargado ninguna foto, se cargará una por default. ¿Desea continuar?'
          )
        ) {
          this.servicio.selected.img = '../../../assets/img/comida1.jfif';
        }
      }
    } else {
      this.servicio.selected.img = '';
    }

    //nuevo articulo
    if (!this.servicio.selected._id) {
      console.log('nuevo', this.servicio.selected);
      this.servicio.post(this.servicio.selected).subscribe(
        () => alert('Articulo guardado con éxito'),
        (err) => console.log('Error', err)
      );
    }
    //editar articulo
    else {
      this.servicio
        .put(this.servicio.selected._id, this.servicio.selected)
        .subscribe(
          () => alert('Editado con exito'),
          (err) => console.log('Error', err)
        );
    }
    this.resetForm();
    this.btnClose.nativeElement.click();
    this.getAll();
  }

  //-----------ELIMINAR ARTICULO---------//
  onDelete(id: string) {
    const confirmacion = confirm(
      '¿Está seguro que desea eliminar este artículo?'
    );
    if (confirmacion) {
      this.servicio.delete(id).subscribe(() => {
        this.servicio.setNull();
        this.getAll();
      });
    }
  }

  //reiniciar formulario
  resetForm() {
    this.servicio.setNull();
    this.urlPreview = '';
    this.imgFile = null;
    this.getAll();
  }
}

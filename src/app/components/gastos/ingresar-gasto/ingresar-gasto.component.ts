import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/service/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {

  nombreGasto: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textIncorrecto: string;

  constructor(private _presupuestoService: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textIncorrecto = '';
  }

  ngOnInit(): void {

  }

  agregarGasto() {

    if (this.cantidad > this._presupuestoService.restante) {
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Cantidad ingresada es mayore al restante';
      return
    }

    if (this.nombreGasto === '' || this.cantidad <= 0) {
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Nombre gasto o cantidad Incorrecta';
    } else {
      // Creamos el objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }
      //Enviamos el obj a los sips via subjt
      this._presupuestoService.agregarGasto(GASTO);
      //Resetaemos

      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
}

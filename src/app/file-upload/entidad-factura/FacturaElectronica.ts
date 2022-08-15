import {Autorizacion} from "./Autorizacion";

export class FacturaElectronica {
  autorizacion: Autorizacion;


  constructor(autorizacion: Autorizacion) {
    this.autorizacion = autorizacion;
  }
}

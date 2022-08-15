import {Comprobante} from "./Comprobante";

export class Autorizacion {
  comprobante: Comprobante;

  constructor(comprobante: Comprobante) {
    this.comprobante = comprobante;
  }
}

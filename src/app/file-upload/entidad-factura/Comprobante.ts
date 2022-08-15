import {InformacionFactura} from "./InformacionFactura";

export class Comprobante {

  informacionFactura: InformacionFactura;

  constructor(informacionFactura: InformacionFactura) {
    this.informacionFactura = informacionFactura;
  }
}

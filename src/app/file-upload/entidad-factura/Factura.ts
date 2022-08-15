import {InfoFactura} from "./InfoFactura";
import {InfoTributaria} from "./InfoTributaria";

export class Factura {

  infoFactura: InfoFactura;
  infoTributaria: InfoTributaria;


  constructor(infoFactura: InfoFactura, infoTributaria: InfoTributaria) {
    this.infoFactura = infoFactura;
    this.infoTributaria = infoTributaria;
  }
}

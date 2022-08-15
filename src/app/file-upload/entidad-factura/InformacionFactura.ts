import {Factura} from "./Factura";
import {InfoFactura} from "./InfoFactura";
import {InfoTributaria} from "./InfoTributaria";

export class InformacionFactura {
  factura: Factura;
  infoFactura: InfoFactura;
  infoTributaria: InfoTributaria;


  constructor(factura: Factura, infoFactura: InfoFactura, infoTributaria: InfoTributaria) {
    this.factura = factura;
    this.infoFactura = infoFactura;
    this.infoTributaria = infoTributaria;
  }
}

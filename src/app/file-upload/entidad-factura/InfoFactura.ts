import {Texto} from "./Texto";
import {TotalConImpuestos} from "./TotalConImpuestos";

export class InfoFactura {
  fechaEmision: Texto;
  totalConImpuesto: TotalConImpuestos;


  constructor(fechaEmision: Texto, totalConImpuesto: TotalConImpuestos) {
    this.fechaEmision = fechaEmision;
    this.totalConImpuesto = totalConImpuesto;
  }
}

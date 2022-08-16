export class DeclaracionFactura {
  secuencial: string;
  rucProveedor: string;
  noFactura: string;
  ivaSolicitado: string;
  fechaEmision: string;


  constructor(secuencial: string, rucProveedor: string, noFactura: string, ivaSolicitado: string, fechaEmision: string) {
    this.secuencial = secuencial;
    this.rucProveedor = rucProveedor;
    this.noFactura = noFactura;
    this.ivaSolicitado = ivaSolicitado;
    this.fechaEmision = fechaEmision;
  }
}

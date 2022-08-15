export class DeclaracionFactura {
  secuencial: string;
  rucProveedor: string;
  noFactura: string;
  dia: number;
  mes: number;
  anio: number;
  ivaSolicitado: string;
  fechaEmision: string;


  constructor(secuencial: string, rucProveedor: string, noFactura: string, dia: number, mes: number, anio: number, ivaSolicitado: string, fechaEmision: string) {
    this.secuencial = secuencial;
    this.rucProveedor = rucProveedor;
    this.noFactura = noFactura;
    this.dia = dia;
    this.mes = mes;
    this.anio = anio;
    this.ivaSolicitado = ivaSolicitado;
    this.fechaEmision = fechaEmision;
  }
}

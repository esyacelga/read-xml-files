export class DeclaracionFactura {
  secuencial: number;
  rucProveedor: string;
  noFactura: string;
  dia: number;
  mes: number;
  anio: number;
  ivaSolicitado: number;

  constructor(secuencial: number, rucProveedor: string, noFactura: string, dia: number, mes: number, anio: number, ivaSolicitado: number) {
    this.secuencial = secuencial;
    this.rucProveedor = rucProveedor;
    this.noFactura = noFactura;
    this.dia = dia;
    this.mes = mes;
    this.anio = anio;
    this.ivaSolicitado = ivaSolicitado;
  }
}

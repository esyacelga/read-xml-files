export class DeclaracionFactura {
  secuencial: string;
  rucProveedor: string;
  noFactura: string;
  dia: number;
  mes: number;
  anio: number;
  ivaSolicitado: string;

  constructor(secuencial: string, rucProveedor: string, noFactura: string, dia: number, mes: number, anio: number, ivaSolicitado: string) {
    this.secuencial = secuencial;
    this.rucProveedor = rucProveedor;
    this.noFactura = noFactura;
    this.dia = dia;
    this.mes = mes;
    this.anio = anio;
    this.ivaSolicitado = ivaSolicitado;
  }
}

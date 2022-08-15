import {Texto} from "./Texto";

export class InfoTributaria {
  ambiente: Texto;
  ruc: Texto;
  estab: Texto;
  ptoEmi: Texto;
  secuencial: Texto;

  constructor(ambiente: Texto, ruc: Texto, estab: Texto, ptoEmi: Texto, secuencial: Texto) {
    this.ambiente = ambiente;
    this.ruc = ruc;
    this.estab = estab;
    this.ptoEmi = ptoEmi;
    this.secuencial = secuencial;
  }

  public obtenerNumeroFactura() {
    return this.estab + '-' + this.ptoEmi + '-' + this.secuencial;
  }
}



import {Texto} from "./Texto";

export class Impuesto {
  baseImponible: Texto;
  valor: Texto;


  constructor(baseImponible: Texto, valor: Texto) {
    this.baseImponible = baseImponible;
    this.valor = valor;
  }
}

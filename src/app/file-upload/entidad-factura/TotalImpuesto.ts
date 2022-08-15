import {Texto} from "./Texto";
import {Impuesto} from "./Impuesto";

export class TotalImpuesto {
  valor: Texto;
  "0": Impuesto;
  "1": Impuesto;


  constructor(valor: Texto) {
    this.valor = valor;
  }
}

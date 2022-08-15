import {Component, OnInit} from '@angular/core';
import {FileUploadService} from "./service/file-upload.service";
import {FacturaElectronica} from "./entidad-factura/FacturaElectronica";
import {DeclaracionFactura} from "./entidad-factura/DeclaracionFactura";
import {TotalImpuesto} from "./entidad-factura/TotalImpuesto";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  file: File | null = null;
  files: [File] | null = null;
  // @ts-ignore
  compobantes: [DeclaracionFactura] = [];

  // @ts-ignore
  selectedProducts: DeclaracionFactura[];
  // @ts-ignore
  cols: any[];

  // @ts-ignore
  compobantes = [];

  constructor(public fileService: FileUploadService) {
  }

  ngOnInit(): void {
    this.cols = [
      {field: 'secuencial', header: 'secuencial', customExportHeader: 'secuencial'},
      {field: 'rucProveedor', header: 'Name'},
      {field: 'noFactura', header: 'noFactura'},
      {field: 'fechaEmision', header: 'Fecha Emision'},
      {field: 'ivaSolicitado', header: 'Iva solicitado'}


    ];
  }

  private generarLista(data: any) {
    // @ts-ignore
    this.files = [];
    for (var i = 0; i < data.files.length; i++) {
      // @ts-ignore
      this.files.push(data.files[i])
    }
  }

  onFilechange(event: any) {
    this.generarLista(event.target);
  }

  upload() {
    if (this.files) {
      // @ts-ignore
      //this.obtenerInformacionArchivo(this.file);
      this.procesarArchivos();
    } else {
      alert("Please select a file first")
    }
  }

  // @ts-ignore
  private stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }

  private async procesarArchivos() {

    // @ts-ignore
    for (var i = 0; i < this.files.length; i++) {
      // @ts-ignore
      const objDec: DeclaracionFactura = await this.obtenerInformacionArchivo(this.files[i], i.toString()) as DeclaracionFactura;
      var filtroNumero = this.compobantes.find((t: DeclaracionFactura) => t.noFactura == objDec.noFactura);
      var filtroRuc = this.compobantes.find((t: DeclaracionFactura) => t.rucProveedor == objDec.rucProveedor);
      if (filtroNumero && filtroRuc)
        console.log("Existente")
      else {
        // @ts-ignore
        this.compobantes.push(objDec);
      }
    }
  }

  private simplificaObjeto(facturaElectronica: FacturaElectronica, sec: string): DeclaracionFactura {
    let secuencial = "";
    let secuencialFactura = "";
    let ruc = "";
    let puntoEmision = "";
    let establecimiento = "";
    let fechaEmision = "";
    let ivaSolicitado = "";
    if (facturaElectronica.autorizacion.comprobante.informacionFactura.factura) {
      if (facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoFactura.totalConImpuestos.totalImpuesto.valor)
        ivaSolicitado = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoFactura.totalConImpuestos.totalImpuesto.valor["#text"];
      else
        ivaSolicitado = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoFactura.totalConImpuestos.totalImpuesto["1"].valor["#text"];
    } else {
      const data: TotalImpuesto = facturaElectronica.autorizacion.comprobante.informacionFactura.infoFactura.totalConImpuestos.totalImpuesto;
      if (data.valor)
        ivaSolicitado = data.valor["#text"];
      else
        ivaSolicitado = data["1"].valor["#text"];
    }
    secuencial = sec;

    if (facturaElectronica.autorizacion.comprobante.informacionFactura.factura)
      secuencialFactura = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.secuencial["#text"];
    else
      secuencialFactura = facturaElectronica.autorizacion.comprobante.informacionFactura.infoTributaria.secuencial["#text"];

    if (facturaElectronica.autorizacion.comprobante.informacionFactura.factura)
      ruc = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.ruc["#text"];
    else
      ruc = facturaElectronica.autorizacion.comprobante.informacionFactura.infoTributaria.ruc["#text"];
    if (facturaElectronica.autorizacion.comprobante.informacionFactura.factura)
      puntoEmision = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.ptoEmi["#text"];
    else
      puntoEmision = facturaElectronica.autorizacion.comprobante.informacionFactura.infoTributaria.ptoEmi["#text"];
    if (facturaElectronica.autorizacion.comprobante.informacionFactura.factura)
      establecimiento = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.estab["#text"];
    else
      establecimiento = facturaElectronica.autorizacion.comprobante.informacionFactura.infoTributaria.estab["#text"];

    const numeroFactura = establecimiento + '-' + puntoEmision + '-' + secuencialFactura;
    if (facturaElectronica.autorizacion.comprobante.informacionFactura.factura)
      fechaEmision = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoFactura.fechaEmision["#text"];
    else
      fechaEmision = facturaElectronica.autorizacion.comprobante.informacionFactura.infoFactura.fechaEmision["#text"];
    const emisionDate = new Date(fechaEmision);
    const objDeclacion: DeclaracionFactura = new DeclaracionFactura(secuencial, ruc, numeroFactura, emisionDate.getDay(), emisionDate.getMonth(), emisionDate.getFullYear(), ivaSolicitado, fechaEmision);
    return objDeclacion;
  }

  private async obtenerInformacionArchivo(data: any, secuencial: string) {
    const objFactura: FacturaElectronica = await this.fileService.procesaXml(data) as FacturaElectronica;
    const objDec: DeclaracionFactura = this.simplificaObjeto(objFactura, secuencial);
    return objDec;

  }


}

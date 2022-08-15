import {Component, OnInit} from '@angular/core';
import {FileUploadService} from "./service/file-upload.service";
import {FacturaElectronica} from "./entidad-factura/FacturaElectronica";
import {DeclaracionFactura} from "./entidad-factura/DeclaracionFactura";

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

  constructor(public fileService: FileUploadService) {
  }

  ngOnInit(): void {
    this.cols = [
      {field: 'secuencial', header: 'secuencial', customExportHeader: 'secuencial'},
      {field: 'rucProveedor', header: 'Name'},
      {field: 'noFactura', header: 'noFactura'},
      {field: 'dia', header: 'Dia'},
      {field: 'mes', header: 'Mes'},
      {field: 'anio', header: 'Anio'},
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

  private async procesarArchivos() {
    // @ts-ignore
    this.compobantes = [];
    // @ts-ignore
    for (var i = 0; i < this.files.length; i++) {
      // @ts-ignore
      const objDec: DeclaracionFactura = await this.obtenerInformacionArchivo(this.files[i]) as DeclaracionFactura;
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

  private simplificaObjeto(facturaElectronica: FacturaElectronica): DeclaracionFactura {
    const secuencial = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.secuencial["#text"];
    const ruc = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.ruc["#text"];
    const puntoEmision = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.ptoEmi["#text"];
    const establecimiento = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.estab["#text"];
    const numeroFactura = establecimiento + '-' + puntoEmision + '-' + secuencial;
    const fechaEmision = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoFactura.fechaEmision["#text"];
    const emisionDate = new Date(fechaEmision);
    const ivaSolicitado = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoFactura.totalConImpuestos.totalImpuesto.valor["#text"];
    const objDeclacion: DeclaracionFactura = new DeclaracionFactura(secuencial, ruc, numeroFactura, emisionDate.getDay(), emisionDate.getMonth(), emisionDate.getFullYear(), ivaSolicitado);
    return objDeclacion;
  }

  private async obtenerInformacionArchivo(data: any) {
    const objFactura: FacturaElectronica = await this.fileService.procesaXml(data) as FacturaElectronica;
    const objDec: DeclaracionFactura = this.simplificaObjeto(objFactura);
    return objDec;

  }


}

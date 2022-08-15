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

  constructor(public fileService: FileUploadService) {
  }

  ngOnInit(): void {
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }

  upload() {
    if (this.file) {
      // @ts-ignore
      this.obtenerInformacionArchivo(this.file);
    } else {
      alert("Please select a file first")
    }
  }

  private simplificaObjeto(facturaElectronica: FacturaElectronica): DeclaracionFactura {
    const secuencial = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.secuencial;
    const ruc = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.ruc;
    const puntoEmision = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.ptoEmi;
    const establecimiento = facturaElectronica.autorizacion.comprobante.informacionFactura.factura.infoTributaria.estab;

    const objDeclacion: DeclaracionFactura = new DeclaracionFactura(secuencial, ruc)
    return null;
  }

  private async obtenerInformacionArchivo(data: { files: File }) {
    const objFactura: FacturaElectronica = await this.fileService.procesaXml(data) as FacturaElectronica;
    console.log(objFactura);
    /*const promesa = new Promise(async (resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const obj = this.fileService.entidadDesdeXML(reader.result) as FacturaElectronica;
        console.log(obj.autorizacion.comprobante.informacionFactura.factura.infoTributaria.ambiente["#text"])
        window.alert(obj.autorizacion.comprobante.informacionFactura.factura.infoTributaria.ambiente["#text"]);
      };
      // @ts-ignore
      reader.readAsText(data);
    });
    return promesa;*/
  }


}

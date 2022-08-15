import {Injectable} from '@angular/core';
// @ts-ignore
import {FacturaElectronica} from "../entidad-factura/FacturaElectronica";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  public xml: string | undefined;

  constructor() {
  }

  public async procesaXml(data: any): Promise<any> {
    const promesa = new Promise(async (resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const obj = this.entidadDesdeXML(reader.result) as FacturaElectronica;
        resolve(obj);
      };
      // @ts-ignore
      reader.readAsText(data);
    });
    return promesa;
  }

  public entidadDesdeXML = (data: any): any => {
    if (!data || data == null) {
      return null;
    }
    var newstr = data.replace("![CDATA[<?xml version=\"1.0\" encoding=\"UTF-8\"?", "informacionFactura");
    const parseXml = this.parseXml(newstr);
    const obj = this.xmlToJson(parseXml);
    // @ts-ignore
    if (!obj && !obj.root && !obj.root.entidad && !obj.root.entidad.row) {
      return null;
    } else
      return obj;
  };

  private parseXml = function (data: any): any {
    let parser;
    let xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(data, 'text/xml');
    return xmlDoc;
  };

  private xmlToJson = function (xml: any): any {
    // Create the return object
    let obj = {};

    if (xml.nodeType === 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        // @ts-ignore
        obj['row'] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          // @ts-ignore
          obj['row'][attribute.nodeName.replace('_x0020_', ' ')] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        // @ts-ignore
        if (typeof (obj[nodeName]) === 'undefined') {
          // @ts-ignore
          obj[nodeName] = this.xmlToJson(item);
        } else {
          // @ts-ignore
          if (typeof (obj[nodeName].push) === 'undefined') {
            // @ts-ignore
            const old = obj[nodeName];
            // @ts-ignore
            obj[nodeName] = [];
            // @ts-ignore
            obj[nodeName].push(old);
          }
          // @ts-ignore
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  };
}

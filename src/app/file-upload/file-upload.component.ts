import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  file: File | null = null;
  constructor() { }

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
  private obtenerInformacionArchivo(data: { files: File }) {
    const promesa = new Promise(async (resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        console.log(reader.result);
      };
      // @ts-ignore
      reader.readAsText(data);
    });
    return promesa;
  }


}
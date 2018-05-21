import { Component, OnInit } from '@angular/core';
import { FileSystemFileEntry, UploadEvent, UploadFile  } from 'ngx-file-drop/public_api';

@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.css']
})
export class ToolDetailComponent implements OnInit {
  static isDropped: boolean = false;
  uploadedImage: string = '';

  constructor() { }

  public dropped(event: UploadEvent) {
    
    for (const droppedFile of event.files) { 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          // Here you can access the real file
          //console.log(droppedFile.relativePath, file);          
          
          //this.uploadedPhoto = droppedFile.relativePath;
          
          var reader = new FileReader();
          var preview = <HTMLImageElement>document.querySelector("#toolImage");          
          reader.addEventListener("load", function () {
            ToolDetailComponent.isDropped = true;
            preview.src = reader.result;
          }, false);
          reader.readAsDataURL(file);
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
 
        });
      } 
    } 
       
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  ngOnInit() {
  }

}

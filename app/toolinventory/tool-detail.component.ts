import { Component, OnInit } from '@angular/core';
import { FileSystemFileEntry, UploadEvent, UploadFile } from 'ngx-file-drop/public_api';
import { ToolInventoryService } from './toolinventory.service';

@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.css']
})
export class ToolDetailComponent implements OnInit {
  static isDropped: boolean = false;
  uploadedImage: string = '';
  errorMessage: string = '';

  constructor(private toolInventoryService: ToolInventoryService) { }

  public dropped(event: UploadEvent) {

    for (const droppedFile of event.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          
          var reader = new FileReader();
          var preview = <HTMLImageElement>document.querySelector("#toolImage");
          reader.addEventListener("load", function () {
            ToolDetailComponent.isDropped = true;
            preview.src = reader.result;
          }, false);
          reader.readAsDataURL(file);

          const formData = new FormData()
          formData.append('toolImage', file, droppedFile.relativePath)
          formData.append('toolId', '1');

          this.toolInventoryService.UploadToolImage(formData)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        });
      }
    }

  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  onSaveComplete(): void {

  }

  ngOnInit() {
  }

}

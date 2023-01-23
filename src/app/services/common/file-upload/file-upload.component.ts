import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';
import { Sweetalert2Service } from '../sweetalert2.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  constructor
  (
    private httpClientService: HttpClientService,
    private alertService: Sweetalert2Service,
    private dialogService: DialogService
  ){}

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    
    const fileData: FormData = new FormData();

    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name,_file,file.relativePath);
      })
    }

    this.dialogService.openDialog({
      componentType: FileUploadComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () =>{
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({'responseType': 'blob'})
        },fileData).subscribe(data => {
          this.alertService.toastMessage('Dosyalar basarıyla yüklendi.','success')
        }, error => {
            this.alertService.toastMessage('Dosya Yüklenirken Bir Hata Oluştu!','error')
        })
      }
    })

    
  }
}

export class FileUploadOptions{
    controller?: string;
    action?: string;
    queryString?: string;
    explanation?: string;
    accept?: string;
}

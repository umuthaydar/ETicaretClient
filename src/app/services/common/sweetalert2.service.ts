import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class Sweetalert2Service {
  constructor() { }

  toastMessage(title: string, messageType: SweetAlertIcon){
    Swal.fire
    ({
       toast: true,
       position: 'top-end',
       icon: messageType,
       title: title,
       showConfirmButton: false,
       timer: 3000
    })
  }

  
  // modalMessage(){
  //   Swal.fire({
  //     title: 'Ürünü silmek istediğinize emin misiniz?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Evet, Sil!'
      
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(
  //         'Ürün Silindi!',
  //         'success'
  //       )
  //      }
  //     })
      
  // }
}




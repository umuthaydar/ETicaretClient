import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListProduct } from 'src/app/contracts/list-product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClientService) { }

  createProduct(product: CreateProduct, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    this.httpClient.post({
      controller: 'products'
    },product).subscribe({
      next: (result => {
        successCallBack();
      }),
      error: (errorResponse: HttpErrorResponse) => {
        const _error: Array<{key: string, value: Array<string>}> = errorResponse.error;
        console.log(_error)
        let message = '';
        Array.from(_error).forEach(v => {
          v.value.forEach((_v, _index) => {
            message += _v;
          })
        })
        errorCallBack(message);
      }
      
      
    })
      
      
      
    //   result => {
    //   successCallBack();
    // }, (errorResponse: HttpErrorResponse) => {
    //   const _error: Array<{key: string, value: Array<string>}> = errorResponse.error;
    //   let message = '';
    //   _error.forEach((v, index) => {
    //     v.value.forEach((_v, _index) => {
    //       message += `${_v}<br>`;
    //     })
    //   })
    //   errorCallBack(message);
    // }
    
  }

  async readProduct(page: number = 0, size:number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) : Promise<{totalCount: number; products: ListProduct[]}>{
    const getObservable: Observable<{totalCount: number; products: ListProduct[]}> = this.httpClient.get<{totalCount: number; products: ListProduct[]}>({
      controller: 'products',
      queryString: `page=${page}&size=${size}`
    })
    const products = firstValueFrom(getObservable)
    products.then(value => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))
    return await products;
  }

  async deleteProduct(id: string){
    const deleteObservable: Observable<any> = this.httpClient.delete<any>({
      controller: 'products'
    },id)
    await firstValueFrom(deleteObservable)
  }
}

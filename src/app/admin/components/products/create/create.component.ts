import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateProduct } from 'src/app/contracts/create-product'; 
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { Sweetalert2Service } from 'src/app/services/common/sweetalert2.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private sweetAlert: Sweetalert2Service
    ){}

  ngOnInit(): void {}

  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Resimleri sürükleyin veya seçin...",
    accept:".png, .jpg, .jpeg, .json"
  };

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement){
      this.spinner.show()
      const createProduct: CreateProduct = new CreateProduct()
      createProduct.name = name.value;
      createProduct.stock = parseInt(stock.value);
      createProduct.price = parseFloat(price.value);
      this.productService.createProduct(createProduct, () => {
        this.spinner.hide();
        this.sweetAlert.toastMessage('Ürün başarıyla eklendi!','success')
        this.createdProduct.emit(createProduct)
      },errorMessage => {
        this.spinner.hide();
        this.sweetAlert.toastMessage(errorMessage,'error');
        console.log(errorMessage)
      })
  }

}

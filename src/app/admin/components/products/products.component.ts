import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateProduct } from 'src/app/contracts/create-product';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService){}
  
  ngOnInit(): void {
    
  }

  @ViewChild(ListComponent) listComponent : ListComponent;

  createdProduct(createdProduct : CreateProduct){
    this.listComponent.getProducts();
  }
}

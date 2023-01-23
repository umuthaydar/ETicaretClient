import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListProduct } from 'src/app/contracts/list-product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { Sweetalert2Service } from 'src/app/services/common/sweetalert2.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor
  (
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private sweetAlert: Sweetalert2Service, 
  ){}
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<ListProduct> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts(){
    this.spinner.show()
    const allProducts: {totalCount: number; products: ListProduct[]} = await this.productService.readProduct
    (
      this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () =>
     this.spinner.hide(),(errorMessage) => this.sweetAlert.toastMessage(errorMessage,'error')
    )
    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }

  async pageChanged(){
    await this.getProducts()
  }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }

}

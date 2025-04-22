import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../models/product-category';
import { ProductService } from '../services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent implements OnInit{
  list:ProductCategory[]=[];
  constructor(private service: ProductService){}
ngOnInit(): void {
  // throw new Error('Method not  implemented.');
  this.getList();
}
getList(){
  this.service.getAllProducts().subscribe(data=>{
    this.list=data;
  })
}
onDelete(cate:ProductCategory){
  const isConfirm=confirm('Are you sure you want delete the record of '+ cate.name)
  if(isConfirm){
    this.service.deleteCategoryAndProductsById(cate.productCategoryID).subscribe((res)=>{
      alert("Deleted Successfully");
      this.getList();
    })
  }
}
}

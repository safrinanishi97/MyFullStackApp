import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  constructor(private service:ProductService, private router:Router, private route:ActivatedRoute){}

    productList:Product[]=[];
    productCategoryList:ProductCategory[]=[];
    productObj:Product={productID:0,name:'',productNumber:'',color:'',standardCost:0,listPrice:0,weight:0,size:0,productCategoryID:0}
    productCateObj:ProductCategory={name:'',productCategoryID:0,products:[]}
   
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=params.get('id');
        if (id) {
          this.service.getCategoryAndProductById(Number(id)).subscribe({
              next:(res)=>{
                this.productList=res.products;
                this.productCateObj={
                  productCategoryID:res.productCategoryID,
                  name:res.name,
                  products:this.productList
                }
              }
          })
        }
      }

    })
  }

  //This is the Angular lifecycle hook that runs when the component is initialized.
//It is commonly used to fetch data when the component loads.
//this.route.paramMap.subscribe() listens for changes in the route parameters.
//It allows the component to extract the :id parameter from the URL dynamically.

// Extracts the id parameter from the URL.
// params.get('id') retrieves the value of id as a string.
// Example: If the URL is /category/5, then id = "5"

// Converts id to a number using Number(id).
// Calls the getCategoryAndProductById() method from this.service, which likely makes an HTTP GET request to fetch category data.
//res contains the category and its associated products from the server

// Step-by-Step Execution
// URL contains id=1 (/category/1).
// Extracts id=1.
// Calls getCategoryAndProductById(1) to fetch data.
// Receives the API response.
// Stores the data:



  deleteProduct(p:Product,arry:any[]){
    const row=arry.findIndex((obj)=>obj.name==p.name && obj.color==p.color && obj.productNumber==p.productNumber)
    if (row>-1) {
      arry.splice(row,1)
    }
  }

  addProduct(){
    if (this.productObj.name !='' && this.productObj.name !=null) {
      var expr=JSON.stringify(this.productObj);
      var obj= JSON.parse(expr);
      this.productList.unshift(obj);
      this.productObj={productID:0,name:'',productNumber:'',color:'',standardCost:0,listPrice:0,weight:0,size:0,productCategoryID:0}
    }
  }
  updateCategory(){
    this.service.updateCategoryWithProducrt(this.productCateObj.productCategoryID,this.productCateObj).subscribe({
      next:()=>{
        this.router.navigate(['products'])
      }
    })
  }

}

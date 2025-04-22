import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ProductCategory } from '../models/product-category';
import { Product } from '../models/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  constructor(private service:ProductService, private router:Router,fb:FormBuilder){}
  ngOnInit():void{
    // throw new Error('Method not implemented.')
  }
  productList:Product[]=[];
  productCategoryList:ProductCategory[]=[];
  productObj:Product={productID:0,name:'',productNumber:'',color:'',standardCost:0,listPrice:0,weight:0,size:0,productCategoryID:0}
  productCateObj:ProductCategory={name:'',productCategoryID:0,products:[]}
 
  deleteProduct(p:Product,arry:any[]){
    const row=arry.findIndex((obj)=>obj.name==p.name && obj.color==p.color && obj.productNumber==p.productNumber)
    //findIndex() searches for the product in the array.
    //It loops through each element (obj) in arry and checks three conditions:
//     If a matching object is found, its index is stored in row.
// If no match is found, findIndex() returns -1.
    if (row>-1) {
      //If row > -1, it means the product exists in the array.
    //If row == -1, it means the product was not found and nothing happens.
      arry.splice(row,1)
    }
    //splice(row, 1) removes one element from the array at the row index.
   //This ensures that the matching product is deleted.
  }

  addProduct(){
    if (this.productObj.name !='' && this.productObj.name !=null) {
      var expr=JSON.stringify(this.productObj);
      //prothome data gulo JSON string(key value pair, productObj er moto) a convert kore, 
      var obj= JSON.parse(expr);
      //oi datagulo list a save korte abar  JavaScript objects  a convert kore 
      this.productList.unshift(obj);
      //unshift(obj) adds the newly created object (obj) at the beginning of the productList array.
      //This means the latest added product appears at the top of the list.
      this.productObj={productID:0,name:'',productNumber:'',color:'',standardCost:0,listPrice:0,weight:0,size:0,productCategoryID:0}
      //This resets productObj to its default empty values.
      //This ensures that when the user adds a new product, they start with a clean form.
    }
  }
  addCategory(){
   const cate:ProductCategory=
   {
    products:this.productList,
    name:this.productCateObj.name,
    productCategoryID:this.productCateObj.productCategoryID
   }
   //A new object cate of type ProductCategory is created.
   this.service.postProduct(cate).subscribe({
    next:x=>{
      console.log(x)
      this.router.navigate(['products'])
    },
    error:err=>{
      console.log(err)
    }
   })
  }
}
//The .subscribe() method listens for the server's response.
//(a) If the request is successful (next)

//Logs the response (x) to the console.
//Navigates to the 'products' page(product page a jao) after a successful request using this.router.navigate(['products'])
//(b) If there is an error (error)
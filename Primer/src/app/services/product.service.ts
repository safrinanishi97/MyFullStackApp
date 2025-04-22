import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/product-category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  baseUrl='http://localhost:5289/ProductCategories';
  getAllProducts():Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(this.baseUrl)
  }
  deleteCategoryAndProductsById(id:number){
   return this.http.delete(`${this.baseUrl}/${id}`)
  }
  postProduct(category:ProductCategory):Observable<ProductCategory>{
    return this.http.post<ProductCategory>(this.baseUrl,category)
  }
  getCategoryAndProductById(id:number){
    return this.http.get<ProductCategory>(this.baseUrl+`/${id}`)
  }
  updateCategoryWithProducrt(id:number,category:ProductCategory):Observable<ProductCategory>{
    return this.http.put<ProductCategory>(this.baseUrl+`/${id}`,category)
  }
}

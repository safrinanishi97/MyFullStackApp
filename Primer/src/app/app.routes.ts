import { Routes } from '@angular/router';
import { ViewProductsComponent } from './view-products/view-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

export const routes: Routes = [
    {path:"",component:ViewProductsComponent},
    {path:"products",component:ViewProductsComponent},
    {path:"addProduct",component:AddProductComponent},
    {path:"addProduct/edit/:id",component:EditProductComponent},
];

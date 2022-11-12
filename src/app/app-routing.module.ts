import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:  "products",    component: ProductsComponent},
  {path:  "add-product", component: AddProductComponent},
  {path:  "edit-product/:id", component: EditProductComponent },
  {path: "", redirectTo: "products", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

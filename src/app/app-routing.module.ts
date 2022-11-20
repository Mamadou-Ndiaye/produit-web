import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';
import { RechercheParCategorieComponent } from './recherche-par-categorie/recherche-par-categorie.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';

const routes: Routes = [
  {path:  "products",    component: ProductsComponent},
  {path:  "add-product", component: AddProductComponent},
  {path:  "rechercheParCategorie", component: RechercheParCategorieComponent},
  {path:  "rechercheParNom", component: RechercheParNomComponent},
  {path:  "edit-product/:id", component: EditProductComponent },
  {path: "", redirectTo: "products", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

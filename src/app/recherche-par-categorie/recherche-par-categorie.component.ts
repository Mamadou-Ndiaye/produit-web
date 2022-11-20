import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../models/categorie';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
  styles: [
  ]
})
export class RechercheParCategorieComponent implements OnInit {

  produits! : Product[];
  id! : number; // IdCategorie
  categories! : Categorie[];
  errorMessage: any;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

   getAllCategories(): void {
    this.productService.listeCategories().
      subscribe(cats => {this.categories = cats; console.log(cats);
       });
   }

   onChange() {
    this.productService.rechercherParCategorie(this.id).
    subscribe(prods =>{this.produits=prods});
   }

   public handleDeleteProduct(product:Product){
    let conf = confirm("Etes-vous sûr ?");
    if (conf){
        this.productService.deleteProduct(product).subscribe({
           next: (data)=>{
              console.log("Suppression effectuer avec succees");
              //this.getAllProducts();
           },
           error: err => {
             this.errorMessage= err;
           }
        });
       console.log(this.produits);
    }
    this.router.navigate(['products']);
 }

}

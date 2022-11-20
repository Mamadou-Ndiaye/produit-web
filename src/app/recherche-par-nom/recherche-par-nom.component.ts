import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {
  produits!: Product[];
  allPoducts!: Product[];
  nomProduit!: string;
  errorMessage!: string;

  constructor(private produitService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.produitService.getAllProducts().subscribe({
    next: (data)=>{
      this.produits = data;
    },
    error: err => {
      this.errorMessage= err;
    }
  });
}

onKeyUp(filterText : string){
  this.produits = this.produits.filter(product => product.name?.toLowerCase().includes(filterText));
}

  rechercherProds(){
     this.produitService.rechercherParNom(this.nomProduit).
     subscribe(prods => {
       this.produits = prods;
       console.log(prods)
      });
    }

    public handleDeleteProduct(product:Product){
      let conf = confirm("Etes-vous sûr ?");
      if (conf){
          this.produitService.deleteProduct(product).subscribe({
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

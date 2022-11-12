import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  produits!: Product[];
  errorMessage: any;

  constructor(protected productService:ProductService, protected router: Router) {

  }

  ngOnInit(): void {
     this.getAllProducts();
  }

  getAllProducts(){
      this.productService.getAllProducts().subscribe({
      next: (data)=>{
        this.produits = data;
      },
      error: err => {
        this.errorMessage= err;
      }
    });
  }

  public handleDeleteProduct(product:Product){
     let conf = confirm("Etes-vous sûr ?");
     if (conf){
         this.productService.deleteProduct(product).subscribe({
            next: (data)=>{
               console.log("Suppression effectuer avec succees");

            },
            error: err => {
              this.errorMessage= err;
            }
         });
        console.log(this.produits);
     }
     this.router.navigate(['products']);
  }

  handleUpdateProduct(product:Product){
    console.log(product.id);
    this.router.navigate(["/edit-product/" + product.id]);
  }

}

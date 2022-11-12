import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../models/categorie';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  newProduct = new Product();
  newidCategorie!: number;
  categories!: Categorie[];
  categorie!: Categorie;
  errorMessage!: string;

  constructor(protected productService:ProductService, protected router: Router) { }

  ngOnInit(): void {
     this.getAllCategories();
  }

  addProduct(){
    let categorie = this.productService.findCategorie(this.newidCategorie);
    this.newProduct.categorie= this.categorie;
    this.productService.addProduct(this.newProduct);
    this.newProduct = new Product();
    this.router.navigateByUrl("/products");
  }

  getAllCategories(){
    this.productService.listeCategories().subscribe({
      next: (data)=>{
        this.categories= data;
        return this.categorie;
      },
      error : err=> {
        this.errorMessage= err;
      }
    });
  }

  findCategorie(id : number) : any {
    this.productService.findCategorie(id).subscribe({
      next: data =>{
       this.categorie  = data;
        return this.categorie;
      },
      error : err =>{
        this.errorMessage = err;
      }
    })
  }


}

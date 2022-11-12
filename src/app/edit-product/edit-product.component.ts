import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../models/categorie';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id!: number;
  currrentProduct!: Product;
 public currentidCategorie!: number;
  categories!: Categorie[];
  categorie!: Categorie;
  errorMessage!: string;


  constructor(protected route : ActivatedRoute, protected router: Router,  protected productService : ProductService) {
     this.id = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
      this.listeCategories();
    this.currrentProduct = this.productService.getProduct(this.id);
    this.currentidCategorie = this.currrentProduct.categorie?.id!;
  }

  listeCategories(){
    this.productService.listeCategories().subscribe({
      next: (data)=>{
        this.categories = data;
      },
      error: err => {
        this.errorMessage= err;
      }
    })
  }

  updateProduct(){
      this.currrentProduct.categorie= this.findCategorie(this.currentidCategorie);
      this.productService.editProduct(this.currrentProduct);
      this.router.navigate(['products']);
  }

  /* findCategorie(): any{
     this.productService.findCategorie(this.currentidCategorie).subscribe({
      next: (data)=>{
        this.categorie = data;
        return this.categorie ;
      },
      error: (err)=> {
        this.errorMessage= err;
      }
    });
  }
 */

  findCategorie(id : number) : any {
    this.productService.findCategorie(id).subscribe({
      next: data =>{
       this.categorie  = data;
        return this.categorie;
      },
      error : err =>{
        this.errorMessage = err;
        return this.errorMessage;
      }
    });
  }


}

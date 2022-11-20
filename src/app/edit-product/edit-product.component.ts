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
    this.getProduct();
   // console.log("======={} =============", this.currentidCategorie);
  }

  getProduct() {
    this.productService.getProduct(this.id).subscribe({
      next: data=>{
        this.currrentProduct = data;
        this.currentidCategorie = this.currrentProduct.category?.id!;
      },
      error: err => {
        this.errorMessage= err;
      }
    });
  }

  listeCategories(){
    this.productService.listeCategories().subscribe({
      next: data =>{
        this.categories = data;
      },
      error: err => {
        this.errorMessage= err;
      }
    })
  }

  updateProduct(){
      this.currrentProduct.category= this.findCategorie(this.currentidCategorie);
      this.productService.editProduct(this.currrentProduct).subscribe({
        next: data=>{
            console.log(data);
            this.router.navigate(['products']);
        },
        error: err=>{
          this.errorMessage= err;
        }
      });

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

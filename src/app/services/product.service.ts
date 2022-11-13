import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Categorie } from '../models/categorie';
import { Product } from '../models/product';

const httpOptions = { headers: new HttpHeaders( {'Content-Type': 'application/json'} ) };

@Injectable({
  providedIn: 'root'
})
export class ProductService {

     baseUrl : string = "http://localhost:8086/api";
     apiUrl : string = this.baseUrl +"/products";
     urlApi : string = this.baseUrl + "/categories" ;


  produits: Product[];
  categories: Categorie[];

  constructor(protected http: HttpClient) {

    this.categories = [ {id : 1, nom : "PC"}, {id : 2, nom : "Téléphone"}];

    this.produits = [{id: 1, name : "PC Asus",prix : 250000, dateCreation : new Date("04/11/2022"), categorie: {id : 1, nom : "PC"}},
        {id: 2, name : "Lenovo",prix : 750000, dateCreation : new Date("05/11/2022"),   categorie: {id : 1, nom : "PC"}},
        {id: 3, name : "Mac Book",prix: 1050000, dateCreation : new Date("06/11/2022"),  categorie: {id : 1, nom : "PC"}},
        {id: 4, name : "Iphone 11",prix : 350000, dateCreation : new Date("07/11/2022"), categorie:{id : 2, nom : "Téléphone"}},
        {id: 5, name : "Samsung",prix : 450000, dateCreation : new Date("08/11/2022"),   categorie: {id : 2, nom : "Téléphone"}}
     ];
   }

   getAllProducts():Observable<Product[]>{
      return this.http.get<Product[]>(this.apiUrl);
   }

   addProduct(product: Product) : Observable<Product>{
    const url = `${this.apiUrl}`;

    return this.http.post<Product>(url, product, httpOptions);

   }

   deleteProduct(product: Product) {
    const url = `${this.apiUrl}/${product.id}`;
     return this.http.delete<Product>(url);
  }


 /*  editProduct(product: Product) : Observable<Product> {
    this.produits= this.produits.map(p=>(p.id==product.id)?product:p);
    return of(product);
  } */

  editProduct(product: Product)  {
    this.produits= this.produits.map(p=>(p.id==product.id)?product:p);
    this.sortProducts();

  }

  public getProduct(idProduct: number): Product{
    let product = this.produits.find(prod=> prod.id == idProduct)!;
    return product;
  }

  sortProducts(){
        this.produits =  this.produits.sort((n1, n2)=>{
          if(n1.name! < n2.name!)
               return -1;
          if(n1.name! > n2.name!)
            return 1;
          return 0;
        });
  }

/*   public listeCategories():Categorie[] {
     return this.categories;
  } */

  listeCategories():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.urlApi);
  }


  /* public findCategorie(id: number): Categorie{
    let categorie = this.categories.find(cat=> cat.id == id)!;
    return categorie;
  } */

  public findCategorie(id: number): Observable<Categorie>{
    const url = `${this.urlApi}/${id}`;
    return this.http.get<Categorie>(this.urlApi);
  }

}

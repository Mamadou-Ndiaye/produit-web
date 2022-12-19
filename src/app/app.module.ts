import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RechercheParCategorieComponent } from './recherche-par-categorie/recherche-par-categorie.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { NavbarComponent } from './navbar/navbar.component';


/* Configuration de keycloak */
export  function kcFactory(kcService: KeycloakService){
  return ()=>{
      kcService.init({
       config: {
              realm : "product-realm",
              clientId : "product-client",
              url : "http://localhost:9090"
             },
             initOptions : {
              onLoad : "check-sso",
              checkLoginIframe :true
             }
      })
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    RechercheParCategorieComponent,
    RechercheParNomComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    {provide : APP_INITIALIZER, deps : [KeycloakService], useFactory : kcFactory, multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

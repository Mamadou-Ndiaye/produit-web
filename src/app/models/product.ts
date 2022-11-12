import { Categorie } from "./categorie";

export class Product {
  public id? : number;
  public name? : string;
  public  prix? : number;
  public dateCreation?: Date;
   public categorie?: Categorie
}

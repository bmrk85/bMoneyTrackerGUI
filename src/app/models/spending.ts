import {User} from "./user";
import {Category} from "./category";

export class Spending {

  id: number;

  category: Category;

  amount: number;

  date: Date;

  userEntity: User;

}

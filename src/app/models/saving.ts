import {User} from "./user";
import {Category} from "./category";

export class Saving {


  id: number;

  name: string;

  dateFrom: Date;

  dateTo: Date;

  amount: number;

  category: Category;

  userEntity: User;

}

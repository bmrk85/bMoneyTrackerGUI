import {Spending} from "./spending";
import {Saving} from "./saving";
import {Income} from "./income";
import {Category} from './category';

export class User {

  id: number;

  username: string;

  password: string;

  registerDate: Date;

  spendings: Spending[];

  categories: Category[];

  savings: Saving[];

  incomes: Income[];

}

import {Spending} from "./spending";
import {Saving} from "./saving";
import {Income} from "./income";

export class User {

  id: number;

  username: string;

  password: string;

  spendings: Spending[];

  savings: Saving[];

  incomes: Income[];

}

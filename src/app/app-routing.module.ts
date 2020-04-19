import {ErrorComponent} from './components/error/error.component';
import {CashFlowComponent} from './components/cash-flow/cash-flow.component';
import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {LogoutComponent} from "./components/home/logout/logout.component";
import {IncomeComponent} from "./components/income/income.component";
import {SpendingComponent} from "./components/spending/spending.component";
import {SavingComponent} from "./components/saving/saving.component";
import {ProfileComponent} from './components/profile/profile.component';
import { FaqComponent } from './components/faq/faq.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'cashflow', component: CashFlowComponent, canActivate: [AuthGuardService]},
  {path: 'incomes', component: IncomeComponent, canActivate: [AuthGuardService]},
  {path: 'spendings', component: SpendingComponent, canActivate: [AuthGuardService]},
  {path: 'savings', component: SavingComponent, canActivate: [AuthGuardService]},
  {path: 'myprofile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'logout', component: LogoutComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {ErrorComponent} from './components/error/error.component';
import {PaymentHistoryComponent} from './components/payment-history/payment-history.component';
import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {LogoutComponent} from "./components/home/logout/logout.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'payments', component: PaymentHistoryComponent, canActivate: [AuthGuardService]},
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

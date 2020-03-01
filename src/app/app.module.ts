import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { ErrorComponent } from './components/error/error.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BasicAuthHttpInterceptorService} from "./services/basic-auth-http-interceptor-service/basic-auth-http-interceptor.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LogoutComponent } from './components/home/logout/logout.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { RegisterModalComponent } from './modals/register-modal/register-modal.component';
import { NewSpendingModalComponent } from './modals/new-spending-modal/new-spending-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule
} from "@angular/material";
import { SpendingComponent } from './components/spending/spending.component';
import { IncomeComponent } from './components/income/income.component';
import { SavingComponent } from './components/saving/saving.component';
import { NewSavingModalComponent } from './modals/new-saving-modal/new-saving-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PaymentHistoryComponent,
    ErrorComponent,
    LogoutComponent,
    LoginModalComponent,
    RegisterModalComponent,
    NewSpendingModalComponent,
    SpendingComponent,
    IncomeComponent,
    SavingComponent,
    NewSavingModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent, RegisterModalComponent, NewSavingModalComponent]
})
export class AppModule { }

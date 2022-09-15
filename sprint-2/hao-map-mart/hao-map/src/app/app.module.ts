import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import {HttpClientModule} from '@angular/common/http';
import { WatchComponent } from './product/watch/watch.component';
import { HeadPhoneComponent } from './product/head-phone/head-phone.component';
import { SpeakerComponent } from './product/speaker/speaker.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ErrorComponent } from './error/error/error.component';
import { EditComponent } from './product/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DetailComponent,
    LoginComponent,
    CartComponent,
    WatchComponent,
    HeadPhoneComponent,
    SpeakerComponent,
    ErrorComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

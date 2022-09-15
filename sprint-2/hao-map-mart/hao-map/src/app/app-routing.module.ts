import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DetailComponent} from "./detail/detail.component";
import {LoginComponent} from "./login/login.component";
import {CartComponent} from "./cart/cart.component";
import {WatchComponent} from "./product/watch/watch.component";
import {HeadPhoneComponent} from "./product/head-phone/head-phone.component";
import {SpeakerComponent} from "./product/speaker/speaker.component";
import {ErrorComponent} from "./error/error/error.component";
import {EditComponent} from "./product/edit/edit.component";
import {AdminRoleService} from "./service/admin-role.service";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'watch', component: WatchComponent},
  {path: 'headPhone', component: HeadPhoneComponent},
  {path: 'speaker', component: SpeakerComponent},
  {path: 'error/:error', component: ErrorComponent},
  {path: 'edit-product/:id', component: EditComponent, canActivate: [AdminRoleService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

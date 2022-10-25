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
import {UserInformationComponent} from "./user-information/user-information.component";
import {AdminMemberRoleService} from "./service/admin-member-role.service";
import {AddNewComponent} from "./product/add-new/add-new.component";
import {ChartComponent} from "./product/chart/chart.component";
import {ChatRealTimeComponent} from "./chat-real-time/chat-real-time.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'watch', component: WatchComponent},
  {path: 'headPhone', component: HeadPhoneComponent},
  {path: 'speaker', component: SpeakerComponent},
  {path: 'error/:error', component: ErrorComponent},
  {path: 'edit-product/:id', component: EditComponent, canActivate: [AdminRoleService]},
  {path: 'add-new', component: AddNewComponent, canActivate: [AdminRoleService]},
  {path: 'chart', component: ChartComponent, canActivate: [AdminRoleService]},
  {path: 'user-information', component: UserInformationComponent, canActivate: [AdminMemberRoleService]},
  {path: 'chat', component: ChatRealTimeComponent, canActivate: [AdminMemberRoleService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { SystemComponent } from './system.component';
import { AuthGuard } from '../shared/services/auth.guard';
import { MainPageComponent } from './main-page/main-page.component';
import { CreateUserPageComponent } from './create-user-page/create-user-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { CreateShippingUserComponent } from './create-shipping-user/create-shipping-user.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'search', component: MainPageComponent },
      { path: 'allusers', component: SearchPageComponent },
      { path: 'create', component: CreateUserPageComponent },
      { path: 'shipping', component: CreateShippingUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { MomentPipe } from './shared/pipes/moment.pipe';
import { MainPageComponent } from './main-page/main-page.component';
import { CreateUserPageComponent } from './create-user-page/create-user-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import {
  MatAutocompleteModule,
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '../barel/index';
import { DialogUpdateUserComponent } from './shared/components/dialogUpdateUser/dialog-update-user.component';
import { DialogUpdateShippingComponent } from './shared/components/dialogUpdateShipping/dialog-update-shipping.component';
import { DialogAddShippingComponent } from './shared/components/dialogAddShipping/dialog-add-shipping.component';
import { CreateShippingUserComponent } from './create-shipping-user/create-shipping-user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SystemComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective,
    MomentPipe,
    MainPageComponent,
    CreateUserPageComponent,
    SearchPageComponent,
    FooterComponent,
    DialogAddShippingComponent,
    DialogUpdateUserComponent,
    DialogUpdateShippingComponent,
    CreateShippingUserComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule
  ],
  providers: []
})
export class SystemModule {}

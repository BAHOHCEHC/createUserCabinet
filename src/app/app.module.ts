import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UsersService } from './shared/services/users.service';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, AuthModule, AppRoutingModule],
  providers: [UsersService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

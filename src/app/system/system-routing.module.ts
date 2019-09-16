import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";

import { SystemComponent } from "./system.component";
import { AuthGuard } from "../shared/services/auth.guard";
import { MainPageComponent } from "./main-page/main-page.component";
import { CreateUserPageComponent } from "./create-user-page/create-user-page.component";
import { SearchPageComponent } from "./search-page/search-page.component";

const routes: Routes = [
  {
    path: "",
    component: SystemComponent,
    // ______________________________________
    // canActivate: [AuthGuard],
    // ______________________________________
    children: [
      { path: "mainpage", component: MainPageComponent },
      { path: "create", component: CreateUserPageComponent },
      { path: "search", component: SearchPageComponent }
      // {path: 'history/:id', component: SearchPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SystemRoutingModule {}

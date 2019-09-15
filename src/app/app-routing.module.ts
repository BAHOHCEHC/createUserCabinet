import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { PreloadStrategyService } from "./shared/services/preload-strategy.service";

const routes: Routes = [
  {
    path: "system",
    data: { preload: true },
    loadChildren: () =>
      import("./system/system.module").then(m => m.SystemModule)
  },
  { path: "**", component: NotFoundComponent },
  { path: "", redirectTo: "login", pathMatch: "full" }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadStrategyService
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

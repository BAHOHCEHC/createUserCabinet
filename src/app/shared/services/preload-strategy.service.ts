import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";
import { flatMap, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PreloadStrategyService implements PreloadingStrategy {
  // preload(route: Route, fn: () => Observable<any>): Observable<any> {
  //   if (route.data && route.data["preload"]) {
  //     return fn();
  //   } else {
  //     return of(null);
  //   }
  preload(route: Route, fn: () => Observable<boolean>): Observable<boolean> {
    return of(true).pipe(
      delay(3000),
      flatMap((_: boolean) => fn())
    );
  }
}

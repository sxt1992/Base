import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import Hero from './hero/a.component';

const routes: Routes = [{
  path: 'heroes', component: Hero
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

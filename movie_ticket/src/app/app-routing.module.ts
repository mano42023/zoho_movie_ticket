import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TheaterComponent } from './theater/theater.component';

const routes: Routes = [
  { path: '', component: TheaterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

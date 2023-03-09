import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookSeatsComponent } from './book-seats/book-seats.component';
import { ShowsComponent } from './shows/shows.component';
import { TheaterComponent } from './theater/theater.component';

const routes: Routes = [
  { path: '', component: TheaterComponent },
  { path: 'show_list/:name', component: ShowsComponent },
  { path: 'seats', component: BookSeatsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { NotFoundComponent } from './not-found-component/not-found-component.component';

const routes: Routes = [
  {path: '',  redirectTo: '/planets', pathMatch: 'full'},
  {path: 'planets', component:ListComponent},
  {path: 'planets/:id', component: ListComponent},
  {path: 'planet/:id', component: PlanetDetailsComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

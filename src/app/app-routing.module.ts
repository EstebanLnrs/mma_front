import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'fighters',
    pathMatch: 'full'
  },
  {
    path: 'fighters',
    loadChildren: () => import('./fighter/fighter.module').then(m => m.FighterModule)
  },
  {
    path: 'organisations',
    loadChildren: () => import('./organisation/organisation.module').then(m => m.OrganisationModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

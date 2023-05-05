import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FighterComponent } from './fighter.component';
import { FighterDetailsComponent } from './pages/fighter-details/fighter-details.component';

const routes: Routes = [
  {
    path: '',
    component: FighterComponent
  },
  {
    path: ':id',
    component: FighterDetailsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FighterRoutingModule { }

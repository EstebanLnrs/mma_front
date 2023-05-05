import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FighterRoutingModule } from './fighter-routing.module';
import { FighterComponent } from './fighter.component';
import { SharedModule } from '../shared/shared.module';
import { FighterListComponent } from './pages/fighter-list/fighter-list.component';
import { FighterFormComponent } from './components/fighter-form/fighter-form.component';
import { FighterDetailsComponent } from './pages/fighter-details/fighter-details.component';
import { FighterCardComponent } from './components/fighter-card/fighter-card.component';


@NgModule({
  declarations: [
    FighterComponent,
    FighterListComponent,
    FighterFormComponent,
    FighterDetailsComponent,
    FighterCardComponent
  ],
  imports: [
    CommonModule,
    FighterRoutingModule,
    SharedModule
  ]
})
export class FighterModule { }

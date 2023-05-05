import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationRoutingModule } from './organisation-routing.module';
import { OrganisationComponent } from './organisation.component';
import { SharedModule } from '../shared/shared.module';
import { OrganisationListComponent } from './pages/organisation-list/organisation-list.component';
import { OrganisationFormComponent } from './components/organisation-form/organisation-form.component';
import { OrganisationDetailsComponent } from './pages/organisation-details/organisation-details.component';
import { OrganisationCardComponent } from './components/organisation-card/organisation-card.component';


@NgModule({
  declarations: [
    OrganisationComponent,
    OrganisationListComponent,
    OrganisationFormComponent,
    OrganisationDetailsComponent,
    OrganisationCardComponent
  ],
  imports: [
    CommonModule,
    OrganisationRoutingModule,
    SharedModule
  ]
})
export class OrganisationModule { }

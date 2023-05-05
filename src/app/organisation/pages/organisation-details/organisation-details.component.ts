import { Component } from '@angular/core';
import { Organisation } from '../../models/organisation';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrganisationService } from '../../services/organisation.service';

@Component({
  selector: 'app-organisation-details',
  templateUrl: './organisation-details.component.html',
  styleUrls: ['./organisation-details.component.scss']
})
export class OrganisationDetailsComponent {
  organisationId!: number;
  organisation$!: Observable<Organisation>;

  constructor(private route: ActivatedRoute, private organisationService: OrganisationService) {
    route.params.subscribe(params => {
      this.organisationId = params['id'];
    });
  }
  ngOnInit(): void {
    if (this.organisationId) {
      this.organisation$ = this.organisationService.getById(this.organisationId);
    }

  }
}

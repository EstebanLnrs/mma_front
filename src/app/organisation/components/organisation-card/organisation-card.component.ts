import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Organisation } from '../../models/organisation';

@Component({
  selector: 'app-organisation-card',
  templateUrl: './organisation-card.component.html',
  styleUrls: ['./organisation-card.component.scss']
})
export class OrganisationCardComponent {
  @Input() selectedOrganisation!: Organisation;
  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.selectedOrganisation) {
      this.received.emit(true);
    }
  }
}

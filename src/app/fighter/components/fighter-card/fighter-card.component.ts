import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fighter } from '../../models/fighter';

@Component({
  selector: 'app-fighter-card',
  templateUrl: './fighter-card.component.html',
  styleUrls: ['./fighter-card.component.scss']
})
export class FighterCardComponent {
  @Input() selectedFighter!: Fighter;
  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.selectedFighter) {
      this.received.emit(true);
    }
  }
}

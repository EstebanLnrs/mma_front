import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Fighter } from '../../models/fighter';
import { FighterService } from '../../services/fighter.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fighter-details',
  templateUrl: './fighter-details.component.html',
  styleUrls: ['./fighter-details.component.scss']
})
export class FighterDetailsComponent implements OnInit {
  fighterId!: number;
  fighter$!: Observable<Fighter>;

  constructor(private route: ActivatedRoute, private fighterService: FighterService, private location: Location) {
    route.params.subscribe(params => {
      this.fighterId = params['id'];
    });
  }
  ngOnInit(): void {
    if (this.fighterId) {
      this.fighter$ = this.fighterService.getById(this.fighterId);
    }
  }
  goBack() {
    this.location.back();
  }

  showReceivedValue(value: boolean) {
    console.log(value);
  }
}

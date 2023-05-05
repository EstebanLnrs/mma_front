import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterListComponent } from './fighter-list.component';

describe('FighterListComponent', () => {
  let component: FighterListComponent;
  let fixture: ComponentFixture<FighterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FighterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FighterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

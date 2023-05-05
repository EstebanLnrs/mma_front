import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterFormComponent } from './fighter-form.component';

describe('FighterFormComponent', () => {
  let component: FighterFormComponent;
  let fixture: ComponentFixture<FighterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FighterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FighterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

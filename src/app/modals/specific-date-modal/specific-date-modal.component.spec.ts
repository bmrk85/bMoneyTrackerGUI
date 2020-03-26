import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDateModalComponent } from './specific-date-modal.component';

describe('SpecificDateModalComponent', () => {
  let component: SpecificDateModalComponent;
  let fixture: ComponentFixture<SpecificDateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificDateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

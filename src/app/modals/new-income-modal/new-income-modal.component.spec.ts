import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIncomeModalComponent } from './new-income-modal.component';

describe('NewIncomeModalComponent', () => {
  let component: NewIncomeModalComponent;
  let fixture: ComponentFixture<NewIncomeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIncomeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIncomeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

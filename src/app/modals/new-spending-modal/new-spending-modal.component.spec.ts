import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpendingModalComponent } from './new-spending-modal.component';

describe('NewSpendingModalComponent', () => {
  let component: NewSpendingModalComponent;
  let fixture: ComponentFixture<NewSpendingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSpendingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpendingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

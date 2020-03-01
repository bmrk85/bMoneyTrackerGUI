import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSavingModalComponent } from './new-saving-modal.component';

describe('NewSavingModalComponent', () => {
  let component: NewSavingModalComponent;
  let fixture: ComponentFixture<NewSavingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSavingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSavingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

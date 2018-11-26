import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAdvanceComponent } from './signup-advance.component';

describe('SignupAdvanceComponent', () => {
  let component: SignupAdvanceComponent;
  let fixture: ComponentFixture<SignupAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

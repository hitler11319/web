import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page2DetailComponent } from './page2-detail.component';

describe('Page2DetailComponent', () => {
  let component: Page2DetailComponent;
  let fixture: ComponentFixture<Page2DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page2DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page2DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInTouchFormComponent } from './get-in-touch-form.component';

describe('GetInTouchFormComponent', () => {
  let component: GetInTouchFormComponent;
  let fixture: ComponentFixture<GetInTouchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetInTouchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInTouchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

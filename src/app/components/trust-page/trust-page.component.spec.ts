import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustPageComponent } from './trust-page.component';

describe('TrustPageComponent', () => {
  let component: TrustPageComponent;
  let fixture: ComponentFixture<TrustPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

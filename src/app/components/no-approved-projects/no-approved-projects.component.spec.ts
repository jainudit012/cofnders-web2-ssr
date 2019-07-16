import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoApprovedProjectsComponent } from './no-approved-projects.component';

describe('NoApprovedProjectsComponent', () => {
  let component: NoApprovedProjectsComponent;
  let fixture: ComponentFixture<NoApprovedProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoApprovedProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoApprovedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

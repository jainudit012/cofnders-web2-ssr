import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFundFormComponent } from './list-fund-form.component';

describe('ListFundFormComponent', () => {
  let component: ListFundFormComponent;
  let fixture: ComponentFixture<ListFundFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFundFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFundFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSignUpFormComponent } from './post-sign-up-form.component';

describe('PostSignUpFormComponent', () => {
  let component: PostSignUpFormComponent;
  let fixture: ComponentFixture<PostSignUpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSignUpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

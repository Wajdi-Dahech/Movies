import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectBlogsingleComponent } from './redirect-blogsingle.component';

describe('RedirectBlogsingleComponent', () => {
  let component: RedirectBlogsingleComponent;
  let fixture: ComponentFixture<RedirectBlogsingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectBlogsingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectBlogsingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

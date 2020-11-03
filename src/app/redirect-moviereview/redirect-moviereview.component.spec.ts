import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectMoviereviewComponent } from './redirect-moviereview.component';

describe('RedirectMoviereviewComponent', () => {
  let component: RedirectMoviereviewComponent;
  let fixture: ComponentFixture<RedirectMoviereviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectMoviereviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectMoviereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

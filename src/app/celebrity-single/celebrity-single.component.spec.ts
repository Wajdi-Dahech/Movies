import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebritySingleComponent } from './celebrity-single.component';

describe('CelebritySingleComponent', () => {
  let component: CelebritySingleComponent;
  let fixture: ComponentFixture<CelebritySingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebritySingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebritySingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

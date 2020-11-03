import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebrityListComponent } from './celebrity-list.component';

describe('CelebrityListComponent', () => {
  let component: CelebrityListComponent;
  let fixture: ComponentFixture<CelebrityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebrityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebrityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

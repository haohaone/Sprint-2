import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadPhoneComponent } from './head-phone.component';

describe('HeadPhoneComponent', () => {
  let component: HeadPhoneComponent;
  let fixture: ComponentFixture<HeadPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

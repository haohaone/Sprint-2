import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRealTimeComponent } from './chat-real-time.component';

describe('ChatRealTimeComponent', () => {
  let component: ChatRealTimeComponent;
  let fixture: ComponentFixture<ChatRealTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRealTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRealTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAnimation } from './home-animation';

describe('HomeAnimation', () => {
  let component: HomeAnimation;
  let fixture: ComponentFixture<HomeAnimation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAnimation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAnimation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

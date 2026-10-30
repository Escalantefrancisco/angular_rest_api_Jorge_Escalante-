import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonSlayer } from './demon-slayer';

describe('DemonSlayer', () => {
  let component: DemonSlayer;
  let fixture: ComponentFixture<DemonSlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemonSlayer],
    }).compileComponents();

    fixture = TestBed.createComponent(DemonSlayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

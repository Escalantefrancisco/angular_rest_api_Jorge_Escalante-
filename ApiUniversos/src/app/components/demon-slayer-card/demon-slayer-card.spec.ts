import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonSlayerCard } from './demon-slayer-card';

describe('DemonSlayerCard', () => {
  let component: DemonSlayerCard;
  let fixture: ComponentFixture<DemonSlayerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemonSlayerCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DemonSlayerCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

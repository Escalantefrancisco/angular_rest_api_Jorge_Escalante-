import { TestBed } from '@angular/core/testing';

import { DemonSlayer } from './demon-slayer';

describe('DemonSlayer', () => {
  let service: DemonSlayer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemonSlayer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

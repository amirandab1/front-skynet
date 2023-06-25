import { TestBed } from '@angular/core/testing';

import { ServiciosAppService } from './servicios-app.service';

describe('ServiciosAppService', () => {
  let service: ServiciosAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

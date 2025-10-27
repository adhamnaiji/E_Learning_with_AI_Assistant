import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RagService } from './rag.service';

describe('RagService', () => {
  let service: RagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

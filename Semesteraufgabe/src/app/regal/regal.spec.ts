import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regal } from './regal';

describe('Regal', () => {
  let component: Regal;
  let fixture: ComponentFixture<Regal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Regal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Regal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

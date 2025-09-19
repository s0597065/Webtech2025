import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hinzufuegen } from './hinzufuegen';

describe('Hinzufuegen', () => {
  let component: Hinzufuegen;
  let fixture: ComponentFixture<Hinzufuegen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hinzufuegen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hinzufuegen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

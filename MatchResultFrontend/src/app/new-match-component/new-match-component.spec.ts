import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMatchComponent } from './new-match-component';

describe('NewMatchComponent', () => {
  let component: NewMatchComponent;
  let fixture: ComponentFixture<NewMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMatchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewMatchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

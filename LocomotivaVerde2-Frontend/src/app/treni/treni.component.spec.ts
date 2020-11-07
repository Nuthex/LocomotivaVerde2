import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreniComponent } from './treni.component';

describe('TreniComponent', () => {
  let component: TreniComponent;
  let fixture: ComponentFixture<TreniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

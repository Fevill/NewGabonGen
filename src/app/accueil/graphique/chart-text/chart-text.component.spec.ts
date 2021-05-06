import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTextComponent } from './chart-text.component';

describe('ChartTextComponent', () => {
  let component: ChartTextComponent;
  let fixture: ComponentFixture<ChartTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

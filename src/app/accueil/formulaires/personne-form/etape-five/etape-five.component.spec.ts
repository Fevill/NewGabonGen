import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeFiveComponent } from './etape-five.component';

describe('EtapeFiveComponent', () => {
  let component: EtapeFiveComponent;
  let fixture: ComponentFixture<EtapeFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapeFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapeFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

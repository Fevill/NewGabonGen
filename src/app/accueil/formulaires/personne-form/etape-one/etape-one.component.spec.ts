import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeOneComponent } from './etape-one.component';

describe('EtapeOneComponent', () => {
  let component: EtapeOneComponent;
  let fixture: ComponentFixture<EtapeOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapeOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

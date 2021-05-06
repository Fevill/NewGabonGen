import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeThreeComponent } from './etape-three.component';

describe('EtapeThreeComponent', () => {
  let component: EtapeThreeComponent;
  let fixture: ComponentFixture<EtapeThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapeThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapeThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

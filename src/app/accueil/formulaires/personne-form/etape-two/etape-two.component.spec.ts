import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeTwoComponent } from './etape-two.component';

describe('EtapeTwoComponent', () => {
  let component: EtapeTwoComponent;
  let fixture: ComponentFixture<EtapeTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapeTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

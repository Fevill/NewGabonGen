import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeFourComponent } from './etape-four.component';

describe('EtapeFourComponent', () => {
  let component: EtapeFourComponent;
  let fixture: ComponentFixture<EtapeFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapeFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapeFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

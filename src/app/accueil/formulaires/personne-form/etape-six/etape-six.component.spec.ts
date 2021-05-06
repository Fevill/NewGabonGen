import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeSixComponent } from './etape-six.component';

describe('EtapeSixComponent', () => {
  let component: EtapeSixComponent;
  let fixture: ComponentFixture<EtapeSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapeSixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapeSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

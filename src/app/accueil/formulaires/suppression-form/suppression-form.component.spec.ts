import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionFormComponent } from './suppression-form.component';

describe('SuppressionFormComponent', () => {
  let component: SuppressionFormComponent;
  let fixture: ComponentFixture<SuppressionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppressionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppressionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

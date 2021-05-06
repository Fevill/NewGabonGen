import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanFormComponent } from './clan-form.component';

describe('ClanFormComponent', () => {
  let component: ClanFormComponent;
  let fixture: ComponentFixture<ClanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

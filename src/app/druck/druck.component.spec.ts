import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DruckComponent } from './druck.component';

describe('DruckComponent', () => {
  let component: DruckComponent;
  let fixture: ComponentFixture<DruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DruckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

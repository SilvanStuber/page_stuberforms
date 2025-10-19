import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMaterialTypesComponent } from './print-material-types.component';

describe('PrintMaterialTypesComponent', () => {
  let component: PrintMaterialTypesComponent;
  let fixture: ComponentFixture<PrintMaterialTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintMaterialTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintMaterialTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

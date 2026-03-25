import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandDetailComponent } from './brand-detail.component';
import { VehicleStore } from '../../store/vehicle.store';
import { signal, computed } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('BrandDetailComponent', () => {
  let component: BrandDetailComponent;
  let fixture: ComponentFixture<BrandDetailComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      typesCache: signal({
        440: [{ VehicleTypeId: 1, VehicleTypeName: 'Passenger Car' }]
      }),
      modelsCache: signal({
        440: [{ Model_ID: 1684, Model_Name: 'V8 Vantage' }]
      }),
      brands: signal([{ Make_ID: 440, Make_Name: 'Aston Martin' }]),
      isLoadingDetails: signal(false),
      loadBrands: jasmine.createSpy('loadBrands'),
      loadBrandDetails: jasmine.createSpy('loadBrandDetails')
    };

    await TestBed.configureTestingModule({
      imports: [BrandDetailComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: VehicleStore, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BrandDetailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '440');
    fixture.detectChanges();
  });

  it('Existe el componente', () => {
    expect(component).toBeTruthy();
    expect(mockStore.loadBrandDetails).toHaveBeenCalledWith(440);
  });

  it('Obtenemos el nombre de la marca', () => {
    expect(component.brandName()).toBe('Aston Martin');
  });

  it('Obtenemos los modelos', () => {
    expect(component.models().length).toBe(1);
    expect(component.models()[0].Model_Name).toBe('V8 Vantage');
  });
});

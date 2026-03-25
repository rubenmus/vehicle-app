import { TestBed } from '@angular/core/testing';
import { VehicleStore } from './vehicle.store';
import { VehicleService } from '../core/services/vehicle.service';
import { of } from 'rxjs';

describe('VehicleStore', () => {
  let store: any;
  let vehicleServiceSpy: any;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('VehicleService', ['getAllBrands', 'getVehicleTypesByBrandId', 'getModelsByBrandId']);

    spy.getAllBrands.and.returnValue(of([{ Make_ID: 1, Make_Name: 'Tesla' }]));
    spy.getVehicleTypesByBrandId.and.returnValue(of([{ VehicleTypeId: 1, VehicleTypeName: 'Car' }]));
    spy.getModelsByBrandId.and.returnValue(of([{ Model_ID: 100, Model_Name: 'Model S' }]));

    TestBed.configureTestingModule({
      providers: [
        VehicleStore,
        { provide: VehicleService, useValue: spy }
      ]
    });

    store = TestBed.inject(VehicleStore);
    vehicleServiceSpy = TestBed.inject(VehicleService);
  });

  it('Comprobamos que inicializa vacio', () => {
    expect(store.brands()).toEqual([]);
    expect(store.isLoadingBrands()).toBeFalse();
  });

  it('Cargamos las marcas', () => {
    store.loadBrands();
    expect(vehicleServiceSpy.getAllBrands).toHaveBeenCalledTimes(1);
    expect(store.brands().length).toBe(1);
    expect(store.brands()[0].Make_Name).toBe('Tesla');
  });

  it('No llama a la API si ya hay marcas', () => {
    store.loadBrands();
    expect(vehicleServiceSpy.getAllBrands).toHaveBeenCalledTimes(1);
    store.loadBrands();
    expect(vehicleServiceSpy.getAllBrands).toHaveBeenCalledTimes(1);
  });
});

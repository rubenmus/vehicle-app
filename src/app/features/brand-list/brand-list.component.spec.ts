import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrandListComponent } from './brand-list.component';
import { VehicleStore } from '../../store/vehicle.store';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BrandListComponent', () => {
  let component: BrandListComponent;
  let fixture: ComponentFixture<BrandListComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      brands: signal([{ Make_ID: 1, Make_Name: 'Toyota' }, { Make_ID: 2, Make_Name: 'Tesla' }]),
      isLoadingBrands: signal(false),
      loadBrands: jasmine.createSpy('loadBrands')
    };

    await TestBed.configureTestingModule({
      imports: [BrandListComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: VehicleStore, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Existe el componente', () => {
    expect(component).toBeTruthy();
    expect(mockStore.loadBrands).toHaveBeenCalled();
  });

  it('Tiene las marcas)', () => {
    expect(component.filteredBrands().length).toBe(2);
  });

  it('Filtramos las marcas', fakeAsync(() => {
    component.searchControl.setValue('tesla');
    tick(300);
    expect(component.filteredBrands().length).toBe(1);
    expect(component.filteredBrands()[0].Make_Name).toBe('Tesla');
  }));
});

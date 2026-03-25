import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { Brand, Model, Vehicle } from '../core/models/vehicle.model';
import { VehicleService } from '../core/services/vehicle.service';

type VehicleState = {
  brands: Brand[];
  isLoadingBrands: boolean;
  typesCache: Record<number, Vehicle[]>;
  modelsCache: Record<number, Model[]>;
  isLoadingDetails: boolean;
  error: string | null;
};

const initialState: VehicleState = {
  brands: [],
  isLoadingBrands: false,
  typesCache: {},
  modelsCache: {},
  isLoadingDetails: false,
  error: null,
};

export const VehicleStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, vehicleService = inject(VehicleService)) => ({

    loadBrands: rxMethod<void>(
      pipe(
        tap(() => {
          if (store.brands().length > 0) {
            console.log('Ya tenemos datos de las marcas.');
            return;
          }
          patchState(store, { isLoadingBrands: true, error: null });
        }),
        switchMap(() => {
          if (store.brands().length > 0) return [];

          return vehicleService.getAllBrands().pipe(
            tapResponse({
              next: (brands) => patchState(store, { brands, isLoadingBrands: false }),
              error: (err) => patchState(store, { error: 'Error al cargar las marcas', isLoadingBrands: false })
            })
          );
        })
      )
    ),

    loadBrandDetails: rxMethod<number>(
      pipe(
        tap((brandId) => {
          const hasTypes = !!store.typesCache()[brandId];
          const hasModels = !!store.modelsCache()[brandId];

          if (hasTypes && hasModels) {
            return;
          }

          patchState(store, { isLoadingDetails: true, error: null });
        }),
        switchMap((brandId) => {
          if (store.typesCache()[brandId] && store.modelsCache()[brandId]) return [];

          patchState(store, { isLoadingDetails: true });

          vehicleService.getVehicleTypesByBrandId(brandId).subscribe({
            next: (types) => patchState(store, (state) => ({ typesCache: { ...state.typesCache, [brandId]: types } }))
          });

          vehicleService.getModelsByBrandId(brandId).subscribe({
            next: (models) => patchState(store, (state) => ({ modelsCache: { ...state.modelsCache, [brandId]: models }, isLoadingDetails: false })),
            error: () => patchState(store, { error: 'Error cargando detalles', isLoadingDetails: false })
          });

          return [];
        })
      )
    )
  }))
);

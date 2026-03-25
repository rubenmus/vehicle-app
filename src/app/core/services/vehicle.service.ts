import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiResponse, Brand, Model, Vehicle } from "../models/vehicle.model";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly http = inject(HttpClient);
  private readonly Url = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<{ Results: Brand[] }>(`${this.Url}/getallmakes?format=json`).pipe(
      map(response => response.Results)
    );
  }

  getVehicleTypesByBrandId(brandId: number): Observable<Vehicle[]> {
    return this.http.get<ApiResponse<Vehicle>>(`${this.Url}/GetVehicleTypesForMakeId/${brandId}?format=json`).pipe(
      map(response => response.Results)
    );
  }

  getModelsByBrandId(brandId: number): Observable<Model[]> {
    return this.http.get<ApiResponse<Model>>(`${this.Url}/GetModelsForMakeId/${brandId}?format=json`).pipe(
      map(response => response.Results)
    );
  }

}

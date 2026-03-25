export interface ApiResponse<T>{
  Count : number;
  Message: string;
  Searchcriteria: string | null;
  Results: [];
}

export interface Brand {
  Make_ID: number;
  Make_Name: string;
}


export interface Vehicle {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface Model {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

import { Component, OnInit, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VehicleStore } from '../../store/vehicle.store';

@Component({
  selector: 'app-brand-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './brand-detail.component.html',
  styleUrl: './brand-detail.component.scss'
})
export class BrandDetailComponent implements OnInit {
  id = input.required<string>();

  readonly store = inject(VehicleStore);

  vehicle = computed(() => this.store.typesCache()[Number(this.id())] || []);
  models = computed(() => this.store.modelsCache()[Number(this.id())] || []);

  brandName = computed(() => {
    const brand = this.store.brands().find(b => b.Make_ID === Number(this.id()));
    return brand ? brand.Make_Name : 'Sin Nombre de Marca';
  });

  ngOnInit() {
    this.store.loadBrands();
    this.store.loadBrandDetails(Number(this.id()));
  }
}

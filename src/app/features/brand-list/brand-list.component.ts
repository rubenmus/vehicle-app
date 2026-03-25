import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling'; // FUNDAMENTAL para Virtual Scroll
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { VehicleStore } from '../../store/vehicle.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatCardModule,
    MatProgressSpinnerModule,
    ScrollingModule
  ],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.scss'
})
export class BrandListComponent implements OnInit {
  readonly store = inject(VehicleStore);

  searchControl = new FormControl('');

  private filteredResults = signal('');

  filteredBrands = computed(() => {
    const data = this.filteredResults().toLowerCase();
    const allBrands = this.store.brands();

    if (!data) return allBrands;

    return allBrands.filter(brand =>
      brand.Make_Name.toLowerCase().includes(data)
    );
  });

  ngOnInit() {
    this.store.loadBrands();

    this.searchControl.valueChanges.pipe(
      debounceTime(300), //Esperamos para que deje escribir al usuario y no haga muchas llamadas seguidas
      distinctUntilChanged()
    ).subscribe(value => {
      this.filteredResults.set(value || '');
    });
  }
}

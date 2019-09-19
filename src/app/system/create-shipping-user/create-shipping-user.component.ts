import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Shipping, User } from 'src/app/shared/models/user.model';
import { CountriesGroup } from '../shared/components/dialogAddShipping/dialog-add-shipping.component';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UsersService } from 'src/app/shared/services/users.service';

export const filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-create-shipping-user',
  templateUrl: './create-shipping-user.component.html',
  styleUrls: ['./create-shipping-user.component.css']
})
export class CreateShippingUserComponent implements OnInit {
  shippingForm: FormGroup;
  newShipping: Shipping;
  countriesList: CountriesGroup[] = [
    {
      letter: 'A',
      names: ['Afganistan', 'Albania', 'Argentina']
    },
    {
      letter: 'C',
      names: ['Cyprus', 'Cambogia']
    },
    {
      letter: 'D',
      names: ['Denmark']
    },
    {
      letter: 'F',
      names: ['France']
    },
    {
      letter: 'G',
      names: ['Georgia']
    },
    {
      letter: 'H',
      names: ['Horvatia']
    },
    {
      letter: 'I',
      names: ['Ireland', 'Italy', 'India']
    },
    {
      letter: 'K',
      names: ['Kazahstan', 'Kirgizia']
    },
    {
      letter: 'L',
      names: ['Laos', 'Livan']
    },
    {
      letter: 'M',
      names: ['Makao', 'Monako', 'Mexico']
    },
    {
      letter: 'N',
      names: ['Nigger', 'Nepal', 'Netherlan']
    },
    {
      letter: 'O',
      names: ['Oman']
    },
    {
      letter: 'P',
      names: ['Pakistan', 'Panama', 'Poland']
    },
    {
      letter: 'R',
      names: ['Russia', 'Romania', 'Ruanda']
    },
    {
      letter: 'S',
      names: ['Samoa', 'Somali']
    },
    {
      letter: 'T',
      names: ['Turky', 'Tunis']
    },
    {
      letter: 'U',
      names: ['Ukraine', 'Uzbekhistan']
    },
    {
      letter: 'V',
      names: ['Vietnam']
    }
  ];
  countries: Observable<CountriesGroup[]>;
  user: User = JSON.parse(window.localStorage.getItem('createUser'));

  constructor(private router: Router, private userservice: UsersService) {}
  ngOnInit() {
    this.shippingForm = new FormGroup({
      addressType: new FormControl(null, [Validators.required]),
      adress: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      postalCode: new FormControl(''),
      country: new FormControl(null, [Validators.required])
    });

    this.countries = this.shippingForm.controls.country.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value))
    );
  }
  private _filterGroup(value: string): CountriesGroup[] {
    if (value) {
      return this.countriesList.map(group => ({ letter: group.letter, names: filter(group.names, value) })).filter(group => group.names.length > 0);
    }
    return this.countriesList;
  }

  cancel() {
    this.router.navigate(['/system', 'create']);
    localStorage.removeItem('createUser');
  }
  save() {
    const newShipping: Shipping = {
      addressType: this.shippingForm.controls.addressType.value,
      adress: this.shippingForm.controls.adress.value,
      city: this.shippingForm.controls.city.value,
      country: this.shippingForm.controls.country.value,
      postalCode: this.shippingForm.controls.postalCode.value
    };
    this.user.shipping = [];
    this.user.shipping.push(newShipping);

    this.userservice.createNewUser(this.user).subscribe(res => {
      this.router.navigate(['/system', 'search']);
      localStorage.removeItem('createUser');
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shipping } from 'src/app/shared/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UsersService } from 'src/app/shared/services/users.service';

export interface CountriesGroup {
  letter: string;
  names: string[];
}
export const filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-dialog-add-shipping',
  templateUrl: './dialog-add-shipping.component.html'
})
export class DialogAddShippingComponent implements OnInit {
  updateForm: FormGroup;
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

  constructor(private userservice: UsersService, private dialogRef: MatDialogRef<DialogAddShippingComponent>, @Inject(MAT_DIALOG_DATA) private data) {}
  countries: Observable<CountriesGroup[]>;

  ngOnInit() {
    this.updateForm = new FormGroup({
      addressType: new FormControl(null, [Validators.required]),
      adress: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      postalCode: new FormControl(''),
      country: new FormControl(null, [Validators.required])
    });

    this.countries = this.updateForm.controls.country.valueChanges.pipe(
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

  save() {
    const user = this.data.user;
    const newShipping: Shipping = {
      addressType: this.updateForm.controls.addressType.value,
      adress: this.updateForm.controls.adress.value,
      city: this.updateForm.controls.city.value,
      country: this.updateForm.controls.country.value,
      postalCode: this.updateForm.controls.postalCode.value
    };
    user.shipping.push(newShipping);
    this.userservice.addShipping(user).subscribe(res => {
      this.close(res);
    });
  }
  close(res) {
    this.dialogRef.close(res);
  }
}

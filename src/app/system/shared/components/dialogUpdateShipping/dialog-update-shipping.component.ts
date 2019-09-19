import { Inject, OnInit, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
  selector: 'app-dialog-update-shipping',
  templateUrl: './dialog-update-shipping.component.html'
})
export class DialogUpdateShippingComponent implements OnInit {
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

  constructor(
    private userservice: UsersService,
    private dialogRef: MatDialogRef<DialogUpdateShippingComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}
  countries: Observable<CountriesGroup[]>;

  ngOnInit() {
    this.updateForm = new FormGroup({
      addressType: new FormControl(this.data.shipping.addressType, [Validators.required]),
      adress: new FormControl(this.data.shipping.adress, [Validators.required]),
      city: new FormControl(this.data.shipping.city, [Validators.required]),
      postalCode: new FormControl(this.data.shipping.postalCode),
      country: new FormControl(this.data.shipping.country, [Validators.required])
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
  addNewShipping() {
    this.close(true);
  }
  save() {
    const indx = this.data.user.shipping.indexOf(this.data.shipping);
    const shipping = this.data.user.shipping[indx];
    shipping.addressType = this.updateForm.controls.addressType.value;
    shipping.adress = this.updateForm.controls.adress.value;
    shipping.city = this.updateForm.controls.city.value;
    shipping.postalCode = this.updateForm.controls.postalCode.value;
    shipping.country = this.updateForm.controls.country.value;
    this.newShipping = shipping;

    this.userservice.updateShipping(this.data.user).subscribe(() => {
      this.close(false);
    });
  }
  close(state) {
    if (state) {
      this.dialogRef.close(state);
    } else {
      this.dialogRef.close(false);
    }
  }
}

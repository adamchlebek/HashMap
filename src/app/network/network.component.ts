import { Component, OnInit } from '@angular/core';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { MatDialog } from '@angular/material';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';
import { Profile } from '../setup/models/profile.model';
import { QuerySnapshot, DocumentSnapshot } from '@angular/fire/firestore';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Food {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})

export class NetworkComponent implements OnInit {

  profiles : Profile[];

  constructor(public dialog: MatDialog, private api: NetworkService) { }

  ngOnInit() {
    this.api.getUsers().subscribe((users$: any) => {
      console.log(users$);
      console.log(users$.docs);
      let users = []
      users$.docs.forEach((user: DocumentSnapshot<Profile>) => {
        users.push(user.data());
      });
      this.profiles = users;
    });
  }

  openModal(row){
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: '80%',
      data: {name: 'Adam', animal: 'Dog'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    console.log(row);
  }

  accepted(row){
    console.log('Accepted');
  }

  declined(row){
    console.log('Declined');
  }

  displayedColumns: string[] = ['image', 'name', 'region', 'buttons'];
  dataSource = ELEMENT_DATA;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

}

import { Component, inject, OnInit } from '@angular/core';
import { Backend } from '../shared/backend';
import { Book } from '../shared/book';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit{

  private bs = inject(Backend)
  private route = inject(ActivatedRoute)
  book!: Book; //enthält Daten des aktuelle Buches
  id: string | null = '' //Buch-ID

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id = ', this.id)
    this.bs.getOne(this.id!) 
    .then( response => this.book = response ) //speichert
    .then( book => console.log('book in Details : ', book ))   
  }

  get progress(): number {
    return Math.round((this.book.pagesRead / this.book.pagesTotal) * 100);
  }
  

}

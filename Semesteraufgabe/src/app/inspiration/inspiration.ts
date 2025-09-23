import { Component, inject } from '@angular/core';
import { Backend } from '../shared/backend';
import { Book } from '../shared/book';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspiration',
  imports: [ReactiveFormsModule],
  templateUrl: './inspiration.html',
  styleUrls: ['./inspiration.css']
})
export class Inspiration {

  private bs = inject(Backend)
  private router = inject (Router)
  book: Book = {_id: '', title: '', author: '', genre: '', status: '', rating: '', notes: '', coverURL: '', pagesTotal: 1, pagesRead: 0} //neues Buchobjekt wird erstellt
  saved: boolean = false


 // Formular wie in Hinzufuegen
 form = new FormGroup({
  titleControl: new FormControl<string>('', [Validators.required]),
  authorControl: new FormControl<string>('', [Validators.required]),
  genreControl: new FormControl<string>('', [Validators.required]),
  coverControl: new FormControl<string>('', [Validators.required]),
  pagesTotalControl: new FormControl<number>(1, [Validators.required, Validators.min(1)])
});

addToRegal(infoBuch: any): void { //befüllen wir so in html bei aufruf der Methode
  this.form.setValue({
    titleControl: infoBuch.title,
    authorControl: infoBuch.author,
    genreControl: infoBuch.genre,
    coverControl: infoBuch.coverURL,
    pagesTotalControl: infoBuch.pagesTotal
  });

  const values = this.form.value; //Überschreiben Formularfelder
  console.log('values : ', values)
  this.book.title = values.titleControl || '';
  this.book.author = values.authorControl || '';
  this.book.genre = values.genreControl || '';
  this.book.coverURL = values.coverControl || '';
  this.book.status = 'möchte lesen';
  this.book.rating = 'weiß nicht';
  this.book.notes = 'Von Literary Love empfohlen';
  this.book.pagesTotal = values.pagesTotalControl || 0;
  this.book.pagesRead = 0;
  console.log('new book : ', this.book)


    this.bs.create(this.book)
    .then( () => this.saved = true )
  }

  confirm(): void {
    this.saved = false;
    this.router.navigate(['/inspiration'])
  }
}


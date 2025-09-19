import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Backend } from '../shared/backend';
import { Book } from '../shared/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hinzufuegen',
  imports: [ReactiveFormsModule],
  templateUrl: './hinzufuegen.html',
  styleUrl: './hinzufuegen.css'
})
export class Hinzufuegen {

  private bs = inject(Backend)
  private router = inject (Router)
  book: Book = {_id: '', title: '', author: '', genre: '', status: '', rating: '', notes: '', coverURL: '', pagesTotal: 1, pagesRead: 0}
  saved: boolean = false


  form = new FormGroup({
    titleControl : new FormControl<string>('', [Validators.required]),
    authorControl: new FormControl<string>('', [Validators.required]),
    genreControl: new FormControl<string>('', [Validators.required]),
    statusControl: new FormControl<string>('', [Validators.required]),
    ratingControl: new FormControl<string>('', [Validators.required]),
    notesControl: new FormControl<string>('', [Validators.required]), 
    pagesTotalControl: new FormControl<number>(1, [Validators.required, Validators.min(1)]),
    pagesReadControl: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    coverControl : new FormControl<string>('',[Validators.required])  
});

create(): void {
  const values = this.form.value;
  console.log('values : ', values)
  this.book.title = values.titleControl || '';
  this.book.author = values.authorControl || '';
  this.book.genre = values.genreControl || '';
  this.book.coverURL = values.coverControl || ''; 
  this.book.status = values.statusControl || '';
  this.book.rating = values.ratingControl || '';
  this.book.notes = values.notesControl || '';
  this.book.pagesTotal = values.pagesTotalControl!;
  this.book.pagesRead = values.pagesReadControl!;
  console.log('new book : ', this.book)

  if (this.book.pagesRead > this.book.pagesTotal) {
    alert('Gelesene Seiten dürfen nicht größer sein als die Gesamtseitenzahl.');
    return;
  }

  if(this.book.title!='' && this.book.author!='' && this.book.genre!='' && this.book.status!='' && this.book.rating!='' && this.book.coverURL!='' && this.book.notes!='' && this.book.pagesTotal!=0 && this.book.pagesRead!=-1 ){
    this.bs.create(this.book)
    .then( () => this.saved = true )
  }
}

confirm(): void {
  this.router.navigate(['/regal'])
}

  cancel():void {
    this.router.navigate(['/regal']);
  }
}

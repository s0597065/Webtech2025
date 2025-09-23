import { Component, inject, OnInit } from '@angular/core';
import { Backend } from '../shared/backend';
import { Book } from '../shared/book';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formular',
  imports: [ReactiveFormsModule],
  templateUrl: './formular.html',
  styleUrl: './formular.css'
})
export class Formular implements OnInit{

  private bs = inject(Backend)
  private route = inject(ActivatedRoute)
  private router = inject (Router)
  book!: Book;
  id: string | null = ''
  form = new FormGroup({ //erzuegen FormControl-ELemente
    titleControl : new FormControl<string>(''),
    authorControl: new FormControl<string>(''),
    genreControl: new FormControl<string>(''),
    statusControl: new FormControl<string>(''),
    ratingControl: new FormControl<string>(''),
    notesControl: new FormControl<string>(''),
    pagesTotalControl: new FormControl<number>(1),
    pagesReadControl: new FormControl<number>(0),
    coverControl: new FormControl<string>('') 
});

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id = ', this.id)
    this.bs.getOne(this.id!)
    .then( response => {
      this.book = response 
      this.form.patchValue({ //füllt Formular mit den aktuellen Buchdaten
        titleControl: this.book?.title,
        authorControl: this.book?.author,
        genreControl: this.book?.genre,
        statusControl: this.book?.status,
        ratingControl: this.book?.rating,
        notesControl: this.book?.notes,
        pagesTotalControl: this.book.pagesTotal,
        pagesReadControl: this.book.pagesRead,
        coverControl: this.book?.coverURL
      })
      return this.book
    })
    .then( book => console.log('book in Formular : ', book ))
  }

  update(): void { //liest Werte aus Formular und aktualisiert
    const values = this.form.value;
    this.book.title = values.titleControl!;
    this.book.author = values.authorControl!;
    this.book.genre = values.genreControl!;
    this.book.coverURL = values.coverControl!; 
    this.book.status = values.statusControl!;
    this.book.rating = values.ratingControl!;
    this.book.notes = values.notesControl!;
    this.book.pagesTotal = values.pagesTotalControl!;
    this.book.pagesRead = values.pagesReadControl!;

      if (this.book.pagesRead > this.book.pagesTotal) {
    alert('Gelesene Seiten dürfen nicht größer sein als die Gesamtseitenzahl.');
    return;
  }


    this.bs.update(this.id!, this.book)
    .then( () => this.router.navigate(['/book', this.id]))
  }

  cancel():void {
    this.router.navigate(['/book', this.id]);
  }

}

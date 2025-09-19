import { Component, inject, OnInit } from '@angular/core';
import { Backend } from '../shared/backend';
import { Book } from '../shared/book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-regal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './regal.html',
  styleUrls: ['./regal.css']
})
export class Regal implements OnInit {

  private bs = inject(Backend);
  books: Book[] = [];
  book!: Book;             // aktuell zu löschendes Buch
  deleteStatus: boolean = false;

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.bs.getAll()
      .then(response => this.books = response)
      .then(() => console.log('books in Regal: ', this.books));
  }

  delete(book: Book): void {
    this.book = book;
    this.deleteStatus = true;  // Modal anzeigen
  }

  confirm(): void {
    if (!this.book) return;
    this.bs.deleteOne(this.book._id)
      .then(() => {
        this.loadBooks();      // Tabelle neu laden
        this.deleteStatus = false;
      });
  }

  cancel(): void {
    this.deleteStatus = false; // Modal schließen
  }

  onImgError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/placeholder.jpg';
  }

}

  


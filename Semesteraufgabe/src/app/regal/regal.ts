import { Component, inject, OnInit } from '@angular/core';
import { Backend } from '../shared/backend';
import { Book } from '../shared/book';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common'; // Für standalone Components

@Component({
  selector: 'app-regal',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './regal.html',
  styleUrls: ['./regal.css']
})
export class Regal implements OnInit {

  private bs = inject(Backend);
  books: Book[] = [];           //enthält alle Bücher, die aus Datenbank geladen werden
  filteredBooks: Book[] = [];   // Für die Anzeige (gefiltert)
  book!: Book;             // aktuell zu löschendes Buch
  loeschen: boolean = false;
  

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.bs.getAll()
      .then(response => { this.books = response; //speichert Bücher
        this.filteredBooks = [...this.books];  // Kopie, dait zu Beginn alle Bücher angezeigt werden
      });
  }


  filterResults(searchText: string, status: string, rating: string) {
    // Alle Bücher durchlaufen
    this.filteredBooks = this.books.filter(book => { //erstellt eine neue Liste, in der nur die Bücher enthalten sind, die  Bedingungen erfüllen
      // Textfilter auf Titel/Autor 
      const matchesText = !searchText || //Wenn nichts eigegeben alle Bücher gültig
        book.title.toLowerCase().includes(searchText.toLowerCase()) || 
        book.author.toLowerCase().includes(searchText.toLowerCase());
  
      // Statusfilter, wenn keins ausgewählt alles gültig
      const matchesStatus = !status || book.status === status;
  
      // Ratingfilter
      const matchesRating = !rating || book.rating === rating;
  
      // Buch nur anzeigen, wenn alle Bedingungen erfüllt sind
      return matchesText && matchesStatus && matchesRating;
    });
  }
  

  delete(book: Book): void {
    this.book = book;
    this.loeschen = true;  // Anzeige sichtbar
  }

  confirm(): void {
    if (!this.book) return; //Sicherheitsabfrage, ist buch gesetz oder leer
    this.bs.deleteOne(this.book._id) //löscht Buch mit der ID
      .then(() => {
        this.loadBooks();      //neu laden
        this.loeschen = false; //Anzeige weg
      });
  }

  cancel(): void {
    this.loeschen = false; // Anzeige schließen
  }

  onImgError(event: Event) { //Wenn Urls ungültig oder nicht exisiert
    const target = event.target as HTMLImageElement; //ausgelöst, für Compiler
    target.src = 'assets/placeholder.jpg';
  }

  get totalBooks(): number {
    return this.books.length;
  }
  
  get filteredAnzahl(): number {
    return this.filteredBooks.length;
  }

}

  


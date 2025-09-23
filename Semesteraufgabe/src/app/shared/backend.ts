import { Injectable } from '@angular/core';
import { Book } from './book'

@Injectable({
  providedIn: 'root'
})
export class Backend {
  apiURL = 'http://localhost:3000/api'

  constructor() { }

  //Holt alle Bücher aus Backend
  async getAll(): Promise<Book[]> {
    let response = await fetch(this.apiURL + '/book'); //ruft API auf
    let book = await response.json(); //wandelt um
    console.log('book in service (getAll) : ', book)
    return book; //gibt Promise<Book[]> zurück
  }

  //holt ein Buch anhand id
  async getOne(id: string): Promise<Book> {
    let response = await fetch(this.apiURL + '/book/' + id);
    let book = await response.json(); //wandelt in js um
    console.log('book in service (getOne) : ', book)
    return book;
  }

  //erstellt nues buch
  async create(newData: Book): Promise<Book> {
    let response = await fetch(this.apiURL + '/book/' , {
      method: "POST",
      body: JSON.stringify(newData), //Buchdaten werden als JSOn geschickt
      headers: {
        "Content-Type": "application/json", //signalisiert JSon format
      },
    });
    let book = await response.json();
    console.log('book in service (create) : ', book)
    return book; //neu erstelltes Buch mit is
  }

//updatet Buch anahdn id
  async update(id: string, updateData: Book): Promise<Book> {
    let response = await fetch(this.apiURL + '/book/' + id, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let book = await response.json();
    console.log('book in service (update) : ', book)
    return book;
  }

  //löscht Buch anhand id
  async deleteOne(id: string): Promise<{message: string}> {
    let response = await fetch(this.apiURL + '/book/' + id, {
      method: "DELETE"
    });
    let message = await response.json();
    console.log('message in service (deleteOne) : ', message)
    return message;
  }



}

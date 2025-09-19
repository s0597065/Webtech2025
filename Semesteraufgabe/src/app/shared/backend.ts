import { Injectable } from '@angular/core';
import { Book } from './book'

@Injectable({
  providedIn: 'root'
})
export class Backend {
  apiURL = 'http://localhost:3000/api'

  constructor() { }

  async getAll(): Promise<Book[]> {
    let response = await fetch(this.apiURL + '/book');
    let book = await response.json();
    console.log('book in service (getAll) : ', book)
    return book;
  }

  async getOne(id: string): Promise<Book> {
    let response = await fetch(this.apiURL + '/book/' + id);
    let book = await response.json();
    console.log('book in service (getOne) : ', book)
    return book;
  }

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

  async deleteOne(id: string): Promise<{message: string}> {
    let response = await fetch(this.apiURL + '/book/' + id, {
      method: "DELETE"
    });
    let message = await response.json();
    console.log('message in service (deleteOne) : ', message)
    return message;
  }

  async create(newData: Book): Promise<Book> {
    let response = await fetch(this.apiURL + '/book/' , {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let book = await response.json();
    console.log('book in service (create) : ', book)
    return book;
  }


}

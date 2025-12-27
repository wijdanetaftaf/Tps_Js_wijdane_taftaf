import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookService } from './services/book';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],   // ✅ IMPORTANT
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      console.log('Books:', data);
    });
  }
}

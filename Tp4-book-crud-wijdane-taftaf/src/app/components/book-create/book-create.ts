import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-create.html',
  styleUrls: ['./book-create.css']
})
export class BookCreateComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.bookService.addBook(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

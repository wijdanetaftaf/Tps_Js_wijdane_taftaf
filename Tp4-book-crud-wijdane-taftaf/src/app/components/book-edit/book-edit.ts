import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-edit.html',
  styleUrls: ['./book-edit.css']
})
export class BookEditComponent implements OnInit {

  form!: FormGroup;
  id!: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });

    this.bookService.getBookById(this.id).subscribe(book => {
      this.form.patchValue(book);
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.bookService.updateBook(this.id, this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

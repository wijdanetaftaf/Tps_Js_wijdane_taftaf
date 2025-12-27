import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEdit } from './book-edit';

describe('BookEdit', () => {
  let component: BookEdit;
  let fixture: ComponentFixture<BookEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

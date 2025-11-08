import { Schema, model, Document } from 'mongoose';

export enum Status {
  Read = 'Read',
  Reread = 'Re-read',
  DNF = 'DNF',
  CurrentlyReading = 'Currently reading',
  ReturnedUnread = 'Returned Unread',
  WantToRead = 'Want to read'
}

export enum Format {
  Print = 'Print',
  PDF = 'PDF',
  Ebook = 'Ebook',
  AudioBook = 'AudioBook'
}

export interface IBook extends Document {
  title: string;
  author: string;
  pages: number;
  status: Status;
  price: number;
  pagesRead: number;
  format: Format;
  suggestedBy: string;
  finished: boolean;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  status: { type: String, enum: Object.values(Status), required: true },
  price: { type: Number, required: true },
  pagesRead: { type: Number, required: true },
  format: { type: String, enum: Object.values(Format), required: true },
  suggestedBy: { type: String, required: true },
  finished: { type: Boolean, default: false }
});

// Met finished = true si pagesRead >= pages
bookSchema.pre('save', function (next) {
  this.finished = this.pagesRead >= this.pages;
  next();
});

export const BookModel = model<IBook>('Book', bookSchema);

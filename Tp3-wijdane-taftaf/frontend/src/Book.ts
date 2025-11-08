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

export class Book {
  constructor(
    public _id: string | null,
    public title: string,
    public author: string,
    public pages: number,
    public status: Status,
    public price: number,
    public pagesRead: number,
    public format: Format,
    public suggestedBy: string,
    public finished: boolean = false
  ) {
    this.updateFinished();
  }

  updateFinished(): void {
    this.finished = this.pagesRead >= this.pages;
  }

  currentlyAt(): string {
    const pct = (this.pagesRead / this.pages) * 100;
    return `${pct.toFixed(1)}%`;
  }

  async deleteBook(): Promise<void> {
    if (!this._id) return;
    await fetch(`http://localhost:3000/api/books/${this._id}`, {
      method: 'DELETE'
    });
  }
}

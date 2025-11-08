var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var Status;
(function (Status) {
    Status["Read"] = "Read";
    Status["Reread"] = "Re-read";
    Status["DNF"] = "DNF";
    Status["CurrentlyReading"] = "Currently reading";
    Status["ReturnedUnread"] = "Returned Unread";
    Status["WantToRead"] = "Want to read";
})(Status || (Status = {}));
export var Format;
(function (Format) {
    Format["Print"] = "Print";
    Format["PDF"] = "PDF";
    Format["Ebook"] = "Ebook";
    Format["AudioBook"] = "AudioBook";
})(Format || (Format = {}));
export class Book {
    constructor(_id, title, author, pages, status, price, pagesRead, format, suggestedBy, finished = false) {
        this._id = _id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = finished;
        this.updateFinished();
    }
    updateFinished() {
        this.finished = this.pagesRead >= this.pages;
    }
    currentlyAt() {
        const pct = (this.pagesRead / this.pages) * 100;
        return `${pct.toFixed(1)}%`;
    }
    deleteBook() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._id)
                return;
            yield fetch(`http://localhost:3000/api/books/${this._id}`, {
                method: 'DELETE'
            });
        });
    }
}

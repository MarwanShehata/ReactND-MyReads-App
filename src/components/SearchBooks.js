import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "../Book";

class SearchBooks extends Component {
  state = {
    books: [],
    query: "",
    shelvedBooks: this.props.location.state
  };

  searchBooks = query => {
    if (query !== "") {
      BooksAPI.search(query).then(response => {
        if (!response.error) {
          this.setState({ books: response });
        } else {
          this.setState({ books: [] });
        }
      });
    } else {
      this.setState({ books: [] });
    }
  };

  handleChange = newQuery => {
    this.setState({ query: newQuery });
    this.searchBooks(newQuery);
  };

  getShelfName = book => {
    const result = this.state.shelvedBooks.filter(
      shelvedBook => shelvedBook.id === book.id
    );
    return result.length !== 0 ? result[0].shelf : "none";
  };
  render() {
    const { books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length !== 0 &&
              books.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  title={book.title}
                  authors={book.authors}
                  thumbnail={book.imageLinks.thumbnail}
                  shelf={this.getShelfName(book)}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

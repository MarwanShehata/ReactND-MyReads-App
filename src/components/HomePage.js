import React, { Component } from "react";
import Book from "../Book";
import { Link } from "react-router-dom";
import { getAll } from "../BooksAPI";
import { bookShelfTitle } from "../common/common";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelvedBooks: [],
      error: false,
    };

    getAll()
      .then((response) =>
        this.setState({ shelvedBooks: response, error: false })
      )
      .catch((error) => this.setState({ error: true }));
  }

  refreshShelves = () => {
    getAll()
      .then((response) =>
        this.setState({ shelvedBooks: response, error: false })
      )
      .catch((error) => this.setState({ error: true }));
  };
  render() {
    const { shelvedBooks, error } = this.state;
    const shelvesForSearch = Object.keys(shelvedBooks).map((book) => {
      return { id: shelvedBooks[book].id, shelf: shelvedBooks[book].shelf };
    });
    if (error) {
      return <div>Please try again later.</div>;
    }
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {Object.keys(bookShelfTitle)
            .filter((shelf) => shelf !== "none")
            .map(
              (shelfName) => (
                <div className="bookshelf" key={shelfName}>
                  {/* just before the BookList component */}
                  <h2 className="bookshelf-title">
                    {bookShelfTitle[shelfName]}
                  </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {shelvedBooks
                        .filter((book) => book.shelf === shelfName)
                        .map(
                          (book) => (
                            <li key={book.id}>
                              <Book
                                book={book}
                                title={book.title}
                                authors={book.authors}
                                thumbnail={book.imageLinks.thumbnail}
                                refreshShelves={this.refreshShelves}
                                shelf={book.shelf}
                              />
                            </li>
                          ) //end of JSX
                        ) //end of map
                      }
                      {/*end of inner block*/}
                    </ol>
                  </div>
                </div>
                //  main div closed
              ) // end of outer JSX block
            ) // end of outer map
          }
        </div>
        <Link
          to={{ pathname: "/search", state: shelvesForSearch }}
          className="open-search"
        >
          <button>Search Books</button>
        </Link>
      </div>
    );
  }
}

export default HomePage;

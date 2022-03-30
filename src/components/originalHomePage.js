import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };

  render() {
    return (
      // ////////////////////////
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {Object.keys(bookShelfTitle)
            .filter((shelfTitle) => shelfTitle !== "none")
            .map(
              (shelfMapped) => (
                <div className="bookshelf" key={shelfMapped}>
                  {/* just before the BookList component */}
                  <h2 className="bookshelf-title">
                    {bookShelfTitle[shelfMapped]}
                  </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {// This iterates through the bookShelfTitle object and renders a BooksList component for each shelf while filtering out the "none" shelf
                      Object.keys(bookShelfTitle)
                        .filter((shelf) => shelf !== "none")
                        .map((bookShelfName) => (
                          <div key={bookShelfName}>
                            <div className="bookshelf" key={bookShelfName}>
                              <h2 className="bookshelf-title">
                                {bookShelfTitle[bookShelfName]}
                              </h2>
                              <div className="bookshelf-books">
                                <ol className="books-grid">
                                  {books
                                    .filter(
                                      (bookName) =>
                                        bookName.shelf === bookShelfName
                                    )
                                    .map((bookName) => (
                                      <li key={bookName.id}>
                                        <div className="book">
                                          <div className="book-top">
                                            <a href={bookName.previewLink}>
                                              <div
                                                className="book-cover"
                                                style={{
                                                  width: 128,
                                                  height: 193,
                                                  backgroundImage:
                                                    bookName.imageLinks &&
                                                    bookName.imageLinks
                                                      .thumbnail
                                                      ? `url(${
                                                          bookName.imageLinks
                                                            .thumbnail
                                                        })`
                                                      : `url("https://loremflickr.com/128/193")`, // Or we can use a placeholder image from the web app's server
                                                }}
                                              />
                                            </a>
                                            <div className="book-shelf-changer">
                                              <select
                                                value={bookName.shelf}
                                                onChange={(event) =>
                                                  changeShelf(
                                                    bookName,
                                                    event.target.value
                                                  )
                                                }
                                              >
                                                <option value="move" disabled>
                                                  Move to...
                                                </option>
                                                <option value="currentlyReading">
                                                  Currently Reading
                                                </option>
                                                <option value="wantToRead">
                                                  Want to Read
                                                </option>
                                                <option value="read">
                                                  Read
                                                </option>
                                                <option value="none">
                                                  None
                                                </option>
                                              </select>
                                            </div>
                                          </div>
                                          <div className="book-title">
                                            {bookName.title || ""}
                                          </div>
                                          <div className="book-authors">
                                            {(bookName.authors &&
                                              bookName.authors.join(", ")) ||
                                              ""}
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                </ol>
                              </div>
                            </div>
                          </div>
                        ))}
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

export default BooksApp;

import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import { bookShelfTitle } from "../common/constants";

class HomePage extends React.Component {
  state = {
    shelvedBooks: [],
    error: false,
    books: [],
  };

  // getAll() method returns a promise, so we can use async/await
  async componentDidMount() {
    // I tried to add the update function to the componentDidMount method, but it didn't work.
    // Can't figure out why.
    // Isn't all promises and async functions must be handled in the componentDidMount method?
    // So instead I broke it into separate methods outside of the componentDidMount method (changeShelf)
    try {
      const books = await BooksAPI.getAll();
      // the metadata is already converted to JSON, so we don't need to convert it again
      // I downloaded the response using postman and saved it as a JSON file called "response.json" just to visualize it
      this.setState({ books, error: false });
    } catch (error) {
      this.setState({ error: true });
      // handling errors from the API call here
    }
  }
  changeShelf = (book, shelf) => {
    if (this.state.error !== true) {
      BooksAPI.update({ id: book.id, shelf: book.shelf }, shelf).then(
        (metaData) => {
          if (metaData) {
            this.setState((state) => ({
              books: state.books.map((mappedBook) => {
                if (mappedBook.id === book.id) {
                  mappedBook.shelf = shelf;
                }
                // we can instead use Object.assign({}, mappedBook, { shelf: shelf })
                // or filter the books array and chaining it with concat
                return mappedBook;
              }),
            }));
          }
        }
      );
    }
  };

  render() {
    const { shelvedBooks, error, books } = this.state;
    const { changeShelf } = this;
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
              (bookShelfName) => (
                <div className="bookshelf" key={bookShelfName}>
                  <h2 className="bookshelf-title">
                    {bookShelfTitle[bookShelfName]}
                  </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books
                        .filter((bookName) => bookName.shelf === bookShelfName)
                        .map(
                          (bookName) => (
                            <li key={bookName.id}>
                              {/* /// Book component is 👇 */}
                              <div className="book">
                                <div className="book-top">
                                  <a href={bookName.previewLink}>
                                    <div
                                      className="book-cover"
                                      style={{
                                        width: 128,
                                        height: 193,
                                        backgroundImage: bookName.imageLinks
                                          .thumbnail
                                          ? `url(${
                                              bookName.imageLinks.thumbnail
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
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
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
                              {/* Book Component is ☝☝ */}
                            </li>
                          ) //end of JSX
                        ) //end of map
                      }
                      {/*end of inner block*/}
                    </ol>
                  </div>
                </div>
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
      // ////////////////////////
      // <div className="list-books">
      //   <div className="list-books-title">
      //     <h1>MyReads</h1>
      //   </div>
      //   <div className="list-books-content">
      //     {Object.keys(bookShelfTitle)
      //       .filter((shelfTitle) => shelfTitle !== "none")
      //       .map(
      //         (shelfMapped) => (
      //           <div className="bookshelf" key={shelfMapped}>
      //             {/* just before the BookList component */}
      //             <h2 className="bookshelf-title">
      //               {bookShelfTitle[shelfMapped]}
      //             </h2>
      //             <div className="bookshelf-books">
      //               <ol className="books-grid">
      //                 {// This iterates through the bookShelfTitle object and renders a BooksList component for each shelf while filtering out the "none" shelf
      //                 Object.keys(bookShelfTitle)
      //                   .filter((shelf) => shelf !== "none")
      //                   .map((bookShelfName) => (
      //                     <div key={bookShelfName}>
      //                       <div className="bookshelf" key={bookShelfName}>
      //                         <h2 className="bookshelf-title">
      //                           {bookShelfTitle[bookShelfName]}
      //                         </h2>
      //                         <div className="bookshelf-books">
      //                           <ol className="books-grid">
      //                             {books
      //                               .filter(
      //                                 (bookName) =>
      //                                   bookName.shelf === bookShelfName
      //                               )
      //                               .map((bookName) => (
      //                                 <li key={bookName.id}>
      //                                   <div className="book">
      //                                     <div className="book-top">
      //                                       <a href={bookName.previewLink}>
      //                                         <div
      //                                           className="book-cover"
      //                                           style={{
      //                                             width: 128,
      //                                             height: 193,
      //                                             backgroundImage:
      //                                               bookName.imageLinks &&
      //                                               bookName.imageLinks
      //                                                 .thumbnail
      //                                                 ? `url(${
      //                                                     bookName.imageLinks
      //                                                       .thumbnail
      //                                                   })`
      //                                                 : `url("https://loremflickr.com/128/193")`, // Or we can use a placeholder image from the web app's server
      //                                           }}
      //                                         />
      //                                       </a>
      //                                       <div className="book-shelf-changer">
      //                                         <select
      //                                           value={bookName.shelf}
      //                                           onChange={(event) =>
      //                                             changeShelf(
      //                                               bookName,
      //                                               event.target.value
      //                                             )
      //                                           }
      //                                         >
      //                                           <option value="move" disabled>
      //                                             Move to...
      //                                           </option>
      //                                           <option value="currentlyReading">
      //                                             Currently Reading
      //                                           </option>
      //                                           <option value="wantToRead">
      //                                             Want to Read
      //                                           </option>
      //                                           <option value="read">
      //                                             Read
      //                                           </option>
      //                                           <option value="none">
      //                                             None
      //                                           </option>
      //                                         </select>
      //                                       </div>
      //                                     </div>
      //                                     <div className="book-title">
      //                                       {bookName.title || ""}
      //                                     </div>
      //                                     <div className="book-authors">
      //                                       {(bookName.authors &&
      //                                         bookName.authors.join(", ")) ||
      //                                         ""}
      //                                     </div>
      //                                   </div>
      //                                 </li>
      //                               ))}
      //                           </ol>
      //                         </div>
      //                       </div>
      //                     </div>
      //                   ))}
      //                 {/*end of inner block*/}
      //               </ol>
      //             </div>
      //           </div>
      //           //  main div closed
      //         ) // end of outer JSX block
      //       ) // end of outer map
      //     }
      //   </div>
      //   <Link
      //     to={{ pathname: "/search", state: shelvesForSearch }}
      //     className="open-search"
      //   >
      //     <button>Search Books</button>
      //   </Link>
      // </div>
    );
  }
}

export default HomePage;

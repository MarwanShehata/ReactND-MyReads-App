import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "../Book";

class SearchBooks extends Component {
  state = {
    queryInput: "",
    books: [], //shelvedBooks
    query: "" /* this should be remove */,
    searchedBooks: [],
  };
  searchMethods = {
    async userInput(input) {
      // searchQuery(){}
      if (input.length > 0) {
        try {
          const books = await BooksAPI.search(input);
          if (books.id === (null || undefined)) {
            this.setState({ searchedBooks: [] });
          } else {
            this.setState({ searchedBooks: books });
          }
        } catch (error) {
          console.log(
            "error retriving searched data. Please check your API request. Source: Search.js",
            error
          );
        }
      } else {
        this.setState({ searchedBooks: [] });
      } // if I make changeInputQuery an arrow function, it won't work
    },

    changeInputQuery(event) {
      // handleChange(){}
      //  https://stackoverflow.com/questions/67014481/what-is-event-target-value-in-react-exactly
      //  event here is is SynthenticEvent that is a wrapper around the native event
      //  https://reactjs.org/docs/events.html
      // console.log("clg event before", event);
      // console.log("clg event.target before", event.target);
      // console.log("clg event.target.value before", event.target.value);
      // console.log("clg event.target.queryInput before", event.target.queryInput);

      const queryInput = event.target.queryInput; // or event.target.value is the value of the input
      // console.log("clg event after", event);
      // console.log("clg event.target after", event.target);
      // console.log("clg event.target.value after", event.target.value);
      // console.log("clg event.target.queryInput after", event.target.queryInput);
      this.setState({ queryInput: queryInput }, () => {
        this.userInput(queryInput);
      }); // if I make changeInputQuery an arrow function, it won't work
    },
    removeResults() {
      this.setState({ searchedBooks: [] });
    },
  };

  changeShelf = (book, shelf) => {
    if (this.state.error !== true) {
      BooksAPI.update({ id: book.id }, shelf).then((metaData) => {
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
      });
    }
  };

  ///////////////////////////////////////////////////////

  searchBooks = (query) => {
    if (query !== "") {
      BooksAPI.search(query).then((response) => {
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

  handleChange = (newQuery) => {
    this.setState({ query: newQuery });
    this.searchBooks(newQuery);
  };

  getShelfName = (book) => {
    const result = this.state.searchedBooks.filter(
      (shelvedBook) => shelvedBook.id === book.id
    );
    return result.length !== 0 ? result[0].shelf : "none";
  };
  render() {
    const { books, queryInput, searchedBooks } = this.state; // added queryInput and searchedBooks
    const { changeShelf } = this;
    const { booksStateUpdate } = this.props;
    const { changeInputQuery, userInput, removeResults } = this.searchMethods;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            {/* className didnt work on Link for some reason so I added a button instead */}
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.handleChange(event.target.value)}
            />
            {/* The input autofocus attribute specifies that an input field
                should automatically get focus when the page loads. "autoFocus"
                instead of autofocus in HTML */}
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length !== 0 &&
              books.map((book) => {
                let setShelf;
                books.map((b) =>
                  b.id === book.id ? (setShelf = b.shelf) : " "
                );
                return (
                  <Book
                    key={book.id}
                    book={book}
                    title={book.title}
                    authors={book.authors}
                    thumbnail={
                      book.imageLinks && book.imageLinks.thumbnail
                        ? `url(${book.imageLinks.thumbnail})`
                        : `url("https://loremflickr.com/128/193")`
                    }
                    shelf={
                      // setShelf || this.getShelfName(book) || "none"

                      // book.shelf ? book.shelf : this.getShelfName(book)

                      // this.getShelfName(book) ? this.getShelfName(book) : "none"

                      this.getShelfName(book)
                      // book.shelf
                    }
                    booksStateUpdate={booksStateUpdate}
                  />
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import * as BooksAPI from "../BooksAPI";
// import Book from "../Book";

// class SearchBooks extends Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     query: "",
//   //     books: [],
//   //     queryInput: "",
//   //     searchedBooks: [],
//   //   };
//   // }
//   state = {
//     query: "",
//     searchedBooks: [],
//     queryInput: "",
//     books: [],
//   };
//   // state = {
//   //   queryInput: "",
//   //   books: [], //shelvedBooks
//   //   query: "" /* this should be remove */,
//   //   searchedBooks: [],
//   // };

//   searchMethods = {
//     async userInput(input) {
//       // searchQuery(){}
//       // searchBooks(){}
//       if (input.length > 0) {
//         try {
//           const books = await BooksAPI.search(input);
//           if (books.id === (null || undefined)) {
//             this.setState({ searchedBooks: [] });
//           } else {
//             this.setState({ searchedBooks: input }); //searchedBooks: books
//           }
//         } catch (error) {
//           console.log(
//             "error retriving searched data. Please check your API request. Source: Search.js",
//             error
//           );
//         }
//       } else {
//         this.setState({ searchedBooks: [] });
//       } // if I make changeInputQuery an arrow function, it won't work
//     },

//     changeInputQuery(event) {
//       // handleChange(){}
//       //  https://stackoverflow.com/questions/67014481/what-is-event-target-value-in-react-exactly
//       //  event here is is SynthenticEvent that is a wrapper around the native event
//       //  https://reactjs.org/docs/events.html

//       const queryInput = event.target.queryInput; // or event.target.value is the value of the input
//       this.setState({ queryInput: queryInput }, () => {
//         this.userInput(queryInput);
//       }); // if I make changeInputQuery an arrow function, it won't work
//     },
//     removeResults() {
//       this.setState({ searchedBooks: [] });
//     },
//   };

//   changeShelf = (book, shelf) => {
//     if (this.state.error !== true) {
//       BooksAPI.update({ id: book.id }, shelf).then((metaData) => {
//         if (metaData) {
//           this.setState((state) => ({
//             books: state.books.map((mappedBook) => {
//               if (mappedBook.id === book.id) {
//                 mappedBook.shelf = shelf;
//               }
//               // we can instead use Object.assign({}, mappedBook, { shelf: shelf })
//               // or filter the books array and chaining it with concat
//               return mappedBook;
//             }),
//           }));
//         }
//       });
//     }
//   };

//   ///////////////////////////////////////////////////////

//   searchBooks = (query) => {
//     if (query !== "") {
//       BooksAPI.search(query).then((response) => {
//         if (!response.error) {
//           this.setState({ books: response });
//         } else {
//           this.setState({ books: [] });
//         }
//       });
//     } else {
//       this.setState({ books: [] });
//     }
//   };

//   handleChange = (newQuery) => {
//     this.setState({ query: newQuery.trim() });
//     this.searchBooks(newQuery);
//   };

//   getShelfName = (book) => {
//     const result = this.state.searchedBooks.filter(
//       (shelvedBook) => shelvedBook.id === book.id
//     );
//     return result.length !== 0 ? result[0].shelf : "none";
//   };

//   render() {
//     const { query, searchedBooks } = this.state; // added queryInput and searchedBooks
//     const { changeShelf } = this;
//     const { changeInputQuery, userInput, removeResults } = this.searchMethods;
//     const { books, updateShelf, booksStateUpdate } = this.props;

//     return (
//       <div className="search-books">
//         <div className="search-books-bar">
//           <Link to="/">
//             {/* className didnt work on Link for some reason so I added a button instead */}
//             <button className="close-search">Close</button>
//           </Link>
//           <div className="search-books-input-wrapper">
//             <input
//               type="text"
//               placeholder="Search by title or author"
//               value={query}
//               onChange={(event) => this.handleChange(event.target.value)}
//             />
//             {/* The input autofocus attribute specifies that an input field
//                 should automatically get focus when the page loads. "autoFocus"
//                 instead of autofocus in HTML */}
//           </div>
//         </div>
//         <div className="search-books-results">
//           <ol className="books-grid">
//             {books.length !== 0 &&
//               books.map((book) => {
//                 let setShelf;
//                 books.map((b) =>
//                   b.id === book.id ? (setShelf = b.shelf) : " "
//                 );
//                 return (
//                   <Book
//                     books={books}
//                     key={book.id}
//                     book={book}
//                     title={book.title}
//                     authors={book.authors}
//                     thumbnail={
//                       book.imageLinks && book.imageLinks.thumbnail
//                         ? `url(${book.imageLinks.thumbnail})`
//                         : `url("https://loremflickr.com/128/193")`
//                     }
//                     shelf={setShelf || this.getShelfName(book) || "none"}
//                     booksStateUpdate={booksStateUpdate}
//                   />
//                 );
//               })}
//           </ol>
//         </div>
//       </div>
//     );
//   }
// }

// export default SearchBooks;

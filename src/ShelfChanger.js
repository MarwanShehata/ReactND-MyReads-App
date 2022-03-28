import React, { Component } from "react";
import { update } from "../src/BooksAPI";

// import React, { Component } from 'react'

// export default class ShelfChanger extends Component {
//     const { book, shelf, changeShelf } = this.props;
//   render() {
//     return (
//       <div>

//       </div>
//     )
//   }
// }

class ShelfChanger extends Component {
  state = {
    shelves: {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read",
      none: "None",
    },
  };

  handleChange = (book, option) => {
    this.setState({ shelf: option });
    update(book, option).then(() => {
      if (this.props.refreshShelves) {
        this.props.refreshShelves();
      }
    });
  };

  render() {
    const { shelves } = this.state;
    const { book, shelf } = this.props;
    return (
      <div className="book-shelf-changer">
        <select
          onChange={(event) => this.handleChange(book, event.target.value)}
          value={shelf}
        >
          <option value="move" disabled>
            Move to...
          </option>
          {Object.keys(shelves).map((value) => (
            <option key={value} value={value}>
              {shelves[value]}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ShelfChanger;

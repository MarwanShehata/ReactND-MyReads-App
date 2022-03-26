import React, { Component } from "react";
import { update } from "./BooksAPI";

class ShelfChanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readingOptions: {
        currentlyReading: "Currently Reading",
        wantToRead: "Want to Read",
        read: "Read",
        none: "None"
      },
      book: props.book,
      shelf: props.shelf
    };
  }

  handleChange = (book, option) => {
    this.setState({ shelf: option });
    update(book, option).then(() => {
      if (this.props.refreshShelves) {
        this.props.refreshShelves();
      }
    });
  };

  render() {
    const { book, readingOptions, shelf } = this.state;
    return (
      <div className="book-shelf-changer">
        <select
          onChange={event => this.handleChange(book, event.target.value)}
          value={shelf}
        >
          <option value="move" disabled>
            Move to...
          </option>
          {Object.keys(readingOptions).map(optionValue => (
            <option key={optionValue} value={optionValue}>
              {readingOptions[optionValue]}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default ShelfChanger;

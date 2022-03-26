import React from "react";
import ShelfChanger from "./ShelfChanger";

const Book = ({ book, title, authors, thumbnail, refreshShelves, shelf }) => {
  const authorList = authors ? authors : ["Author Unknown"];
  const thumb = thumbnail
    ? thumbnail
    : "https://via.placeholder.com/128x193?text=No%Cover";

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${thumb})`,
          }}
        />
        {refreshShelves ? (
          <ShelfChanger
            book={book}
            refreshShelves={refreshShelves}
            shelf={shelf}
          />
        ) : (
          <ShelfChanger book={book} shelf={shelf} />
        )}
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authorList.join(", ")}</div>
    </div>
  );
};

export default Book;

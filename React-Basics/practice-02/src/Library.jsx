// src/Library.js
import React, { useState } from "react";

const LibraryComponent = () => {
  const [books, setBooks] = useState([
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "1984", author: "George Orwell" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  // Filter books based on search input
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add a new book
  const handleAddBook = (e) => {
    e.preventDefault();
    if (newBook.title && newBook.author) {
      setBooks([...books, newBook]);
      setNewBook({ title: "", author: "" });
    }
  };

  // Remove a book by index
  const handleRemoveBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Library Management</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Add Book Form */}
      <form onSubmit={handleAddBook} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Book Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          style={{ padding: "10px", marginRight: "10px", width: "45%" }}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          style={{ padding: "10px", marginRight: "10px", width: "45%" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Book
        </button>
      </form>

      {/* Book List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredBooks.map((book, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <button
              onClick={() => handleRemoveBook(index)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryComponent;

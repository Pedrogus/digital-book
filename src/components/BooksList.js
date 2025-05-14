const BooksList = ({ books }) => {
    return (
        <div className="books-list">
           {books.map((book) => (
            <div className="book-container" key={book.id}> 
                {book.formats["image/jpeg"] ? (
                   <img 
                            src={book.formats["image/jpeg"]} 
                            alt={book.title} 
                        />
                    ) : (
                        <div className="no-image">
                            <p>No Image Available</p>
                        </div> )}

                    <h3>{book.title}</h3>
                    <p>{book.authors.map((author) => author.name).join(", ") || "Unknown"}</p>
            </div>
           ))}
        </div>);
};

export default BooksList;
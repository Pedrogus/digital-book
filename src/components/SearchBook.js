import { cache, useEffect, useState } from "react";
import BooksList from "./BooksList";

 const SearchBook = () => {

     const [books, Setbooks] = useState([]);
     const [input, setInput] = useState('');
     const [searchQuery, setSearchQuery] = useState('');
     const [loading, setLoading] = useState(false);
     const [cache, setCache] = useState({});

     useEffect(() => {
        if(input) 
            { 
                const timeoutId = setTimeout(() => getBooks(input),50);
                return () => clearTimeout(timeoutId);
            }
    }, [input]);

        const getBooks = async (query) => {
            try {
            setLoading(true);
                if(cache[query]) {
                    Setbooks(cache[query]);
                    setLoading(false);
                    return;
                }

            const res = await fetch(`https://gutendex.com/books?search=${query}&page=1`);
            const data = await res.json();
                console.log(data.results);

            if(data.results) {
                const results = data.results.slice(0,10);
                Setbooks(results);
                setCache((prevCache) => ({...prevCache, [query]: results }));
             }
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setSearchQuery(input);
        getBooks(input);
    }


        return (
            <>
                <h1>Search Book</h1>

                <div className="input-container">
                    <input type="text" value={input} 
                    placeholder="Search for a book: Moby Dick; Or, The Whale" 
                    onChange={(e) => setInput(e.target.value)} />

                    <button onClick={handleSearch}>Search</button>
                </div>

                {loading ? <p>Loading...</p> : <BooksList books={books} />}
                
              
            </>
        );

   }

export default SearchBook;
    
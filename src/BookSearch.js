import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf.js'
class BookSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
            myBooks: [],
            isLoading: false
        };
    }

    state = {
        query: '',
    results: [],
        isLoading: false
    }

    componentDidMount() {
        this.fetchMyBooks();
    }
   
    fetchMyBooks = () => BooksAPI.getAll().then((books) => {
        this.setState({myBooks: books, isLoading: false});
    });

    searchBooks = (query) => {
        if (query) {
            this.setState({
                query: query.trim()
            });
            this.setState({isLoading: true})
            BooksAPI
                .search(this.state.query, 20)
                .then((searchedBooks) => {
                    if(searchedBooks) {
                        if(searchedBooks.error) {
                            searchedBooks = [];
                        }
                        this.setState({results: searchedBooks.map((bookResult) => {
                            const myBook = this.state.myBooks.find((myBook) => (myBook.id === bookResult.id));
                            if(myBook) {
                                bookResult.shelf = myBook.shelf;
                            }
                            return bookResult;
                        }), isLoading: false})
                    }
                });
            } else {
                this.setState({
                results: [],
                query: ''
            });
        }
    }

    updateAndRefresh = (book, newShelf) => {
        this.setState({isLoading: true})
        BooksAPI
            .update(book, newShelf)
            .then(() => {
                this.fetchMyBooks();
                this.searchBooks(this.state.query);
            })
    };

    render() {
        return (this.state.query === '')
            ? (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to='/' className="close-search">Close</Link>
                        <div className="search-books-input-wrapper">
                            {/* NOTES: The search from BooksAPI is limited to a particular set of search terms. You can find these search terms here: https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if you don't find a specific author or title. Every search is limited by search terms. */}
                            <input
                                type="text"
                                value={this.state.query}
                                placeholder="Search by title or author"
                                onChange={(e) => this.searchBooks(e.target.value)}/>
                        </div>
                    </div>

                </div>
            )
            : (this.state.isLoading)
                ? (

                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link to='/' className="close-search">Close</Link>
                            <div className="search-books-input-wrapper">
                                {/* NOTES: The search from BooksAPI is limited to a particular set of search terms. You can find these search terms here: https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if you don't find a specific author or title. Every search is limited by search terms. */}
                                <input
                                    type="text"
                                    value={this.state.query}
                                    placeholder="Search by title or author"
                                    onChange={(e) => this.searchBooks(e.target.value)}/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <div className='loader-margin-top'/>
                            <div className="loader"/></div>
                    </div>
                )
                : (this.state.results) ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link to='/' className="close-search">Close</Link>
                            <div className="search-books-input-wrapper">
                                {/* NOTES: The search from BooksAPI is limited to a particular set of search terms. You can find these search terms here: https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if you don't find a specific author or title. Every search is limited by search terms. */}
                                <input
                                    type="text"
                                    value={this.state.query}
                                    placeholder="Search by title or author"
                                    onChange={(e) => this.searchBooks(e.target.value)}/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <div className="list-books-content">
                                <BookShelf
                                    title='Currently Reading'
                                    updateShelf={this.updateAndRefresh}
                                    allBooks={this.state.results}
                                    shelfType='currentlyReading'/>
                                <BookShelf
                                    title='Want to Read'
                                    updateShelf={this.updateAndRefresh}
                                    allBooks={this.state.results}
                                    shelfType='wantToRead'/>
                                <BookShelf
                                    title='Read'
                                    updateShelf={this.updateAndRefresh}
                                    allBooks={this.state.results}
                                    shelfType='read'/>
                                <BookShelf
                                    title='All books'
                                    updateShelf={this.updateAndRefresh}
                                    allBooks={this.state.results}
                                    shelfType='none'/>
                            </div>
                        </div>}
                    </div>
                ) : (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link to='/' className="close-search">Close</Link>
                            <div className="search-books-input-wrapper">
                                 {/* NOTES: The search from BooksAPI is limited to a particular set of search terms. You can find these search terms here: https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if you don't find a specific author or title. Every search is limited by search terms. */}
                                <input
                                    type="text"
                                    value={this.state.query}
                                    placeholder="Search by title or author"
                                    onChange={(e) => this.searchBooks(e.target.value)}/>
                            </div>
                        </div>
    
                    </div>
                )
    }
}
export default BookSearch
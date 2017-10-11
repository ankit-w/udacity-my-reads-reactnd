import React, { Component } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf.js'
import * as BooksAPI from './BooksAPI'

class MainPage extends Component {
    state = {
        bookList: [],
        isLoading: true
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ bookList: books, isLoading: false });
        })
    }
    fetchAllBooks = () => BooksAPI.getAll().then((books) => {
        this.setState({ bookList: books, isLoading: false });
    })
    updateAndRefresh = (book, newShelf) => BooksAPI.update(book, newShelf).then(() => {
        this.fetchAllBooks();
    })
    render() {
        return this.state.isLoading ?
            (
                <div>
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className='loader-margin-top'/>
                    <div className="loader"/>
                </div>
            ) :
            (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <BookShelf
                            title='Currently Reading'
                            updateShelf={this.updateAndRefresh}
                            allBooks={this.state.bookList}
                            shelfType='currentlyReading'/>
                        <BookShelf
                            title='Want to Read'
                            updateShelf={this.updateAndRefresh}
                            allBooks={this.state.bookList}
                            shelfType='wantToRead'/>
                        <BookShelf
                            title='Read'
                            updateShelf={this.updateAndRefresh}
                            allBooks={this.state.bookList}
                            shelfType='read'/>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
                </div>
            )
    }
}
export default MainPage

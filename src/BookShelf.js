import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'
class BookShelf extends Component {
    static propTypes = {
        allBooks: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        shelfType: PropTypes.string.isRequired
    }
    render() {
        let currentShelfList = this.props.allBooks ?
            this
            .props
            .allBooks
            .filter((book) => (book.shelf) ?
                book.shelf === this.props.shelfType :
                'none' === this.props.shelfType) :
            [];
        if (!currentShelfList[0]) {
            return <div/>
        } else
            return <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {currentShelfList.map((book) => {
                            return book ? <li key={book.id}>
                                <Book updateShelf={this.props.updateShelf} book={book}/>
                            </li> : <li> Corrupted Data</li>
                        })}
                    </ol>
                </div>
            </div>
    }
}
export default BookShelf

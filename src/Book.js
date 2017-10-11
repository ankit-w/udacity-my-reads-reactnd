import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    state = {
        shelf: this.props.book.shelf
    }
    static propTypes = {
        updateShelf: PropTypes.func.isRequired,
        book: PropTypes.object
    }

    onUpdateShelf = (book, newShelf) => {
        this.setState({shelf: newShelf});
        this.props.updateShelf(book, newShelf)
    };

    render() {
        const placeholder = "http://via.placeholder.com/128x193?text="+this.props.book.title;
        
        return <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : placeholder})`
                }}></div>
                <div className="book-shelf-changer">
                    <select onChange={e => this.onUpdateShelf(this.props.book, e.target.value)} defaultValue={this.props.book.shelf ? this.props.book.shelf : 'none'}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{this.props.book ? this.props.book.title : null}</div>
            <div className="book-authors">{this.props.book ? this.props.book.authors: null}</div>
        </div>
    }
}
export default Book
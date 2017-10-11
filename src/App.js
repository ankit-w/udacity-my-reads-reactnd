import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import MainPage from './MainPage'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path='/search' component={BookSearch}/>
        <Route exact path='/' component={MainPage}/>
      </div>
    )
  }
}

export default BooksApp

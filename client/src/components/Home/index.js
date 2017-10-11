import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div className="jumbotron">
    <h1 className="display-3">Hello!</h1>
    <p className="lead">Ready to make a survey?</p>
    <p className="lead">
      <Link to="/surveys/new" className="btn btn-primary btn-lg">
        Make a new survey!
      </Link>
    </p>
  </div>
)

export default Home

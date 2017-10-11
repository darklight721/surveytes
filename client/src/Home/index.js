import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div>
    <p>Welcome!</p>
    <Link to="/surveys/new">Make new survey!</Link>
  </div>
)

export default Home

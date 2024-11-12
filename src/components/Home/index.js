import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <div className="home-con">
      <div className="home-content">
        <h1 className="h-head">Find The Job That Fits Your Life</h1>
        <p className="h-desc">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="shop-now-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home

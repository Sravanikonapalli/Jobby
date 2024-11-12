import {Link} from 'react-router-dom'

import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'

import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="logo-title-loc-con">
          <div className="logo-title-con">
            <img src={companyLogoUrl} alt="company logo" className="com-logo" />
            <div className="title-rating-con">
              <h1>{title}</h1>
              <div className="rat-con">
                <BsStarFill className="rating-icon" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="loc-pack-con">
            <div className="loc-empl-con">
              <div className="loaction-con">
                <MdLocationOn className="location-icon" />
                <p>{location}</p>
              </div>
              <div className="employee-con">
                <BsFillBriefcaseFill className="brief-icon" />
                <p>{employmentType}</p>
              </div>
            </div>
            <div className="package-heading">{packagePerAnnum}</div>
          </div>
        </div>
        <hr className="line" />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard

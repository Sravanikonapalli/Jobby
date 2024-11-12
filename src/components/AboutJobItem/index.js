import {Component} from 'react'
import Cookies from 'js-cookie'

import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobItem extends Component {
  state = {
    jobDataDetails: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async props => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: ` Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updateJobDetailsData = fetchedData.job_details.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        skills: eachItem.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: eachItem.title,
      }))

      const updatedSimilarJobDataDetails = fetchedData.similar_jobs.map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          employmentType: eachItem.employment_type,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        }),
      )
      this.setState({
        jobDataDetails: updateJobDetailsData,
        similarJobsData: updatedSimilarJobDataDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessViewOfJobDetails = () => {
    const {jobDataDetails, similarJobsData} = this.state
    if (jobDataDetails >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        id,
        jobDescription,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        skills,
        title,
      } = jobDataDetails[0]

      return (
        <>
          <div className="job-item-con">
            <div className="first-part">
              <div className="img-title-con">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="com-logo"
                />
                <div className="title-rating">
                  <h1 className="heading">{title}</h1>
                  <div className="star-rating-con">
                    <AiFillStar className="star-icon" />
                    <p className="rating-text">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="loc-pack-con">
                <div className="loc-job-type-con">
                  <div className="loc-icon-loc-con">
                    <MdLocationOn className="loc-icon" />
                    <p>{location}</p>
                  </div>
                  <div>
                    <p>{employmentType}</p>
                  </div>
                </div>
                <div className="pac-con">
                  <p>{packagePerAnnum}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="second-part">
              <div className="desc-visit-link">
                <h1>Description</h1>
                <a className="visit-link" href={companyWebsiteUrl}>
                  Visit <BiLinkExternal />
                </a>
              </div>
              <p>{jobDescription}</p>
            </div>
            <h1>Skills</h1>
            <ul className="ul-con">
              {skills.map(eachItem => (
                <li className="li-con" key={eachItem.name}>
                  <img
                    className="skills-img"
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                  />
                  <p>{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <div className="life-at-company-con">
              <div className="life-at-com-head-para">
                <h1>Life at Company</h1>
                <p>{lifeAtCompany.description}</p>
              </div>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
          <h1>Similar Jobs</h1>
          <ul className="similar-jobs-ul-cn">
            {similarJobsData.map(eachItem => (
              <SimilarJobItem
                key={eachItem.id}
                jobDetails={eachItem}
                employmentType={employmentType}
              />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  renderJobFailureView = () => (
    <div className="job-details-fail-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <div className="btn-fail">
        <button
          className="fail-retry-btn"
          type="button"
          onClick={this.getJobData}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessViewOfJobDetails()

      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-con">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default AboutJobItem

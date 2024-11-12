import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import SkillsCard from '../SkillsCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormateddata = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateData = this.getFormateddata(data.job_details)
      const updatedSmilarData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarData(eachSimilarJob),
      )
      console.log(updateData)
      console.log(updatedSmilarData)
      this.setState({
        jobData: updateData,
        similarJobsData: updatedSmilarData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className="job-details-fail-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>we cannot seem to find the page you are looking for.</p>

        <button
          className="fail-retry-btn"
          id="button"
          type="button"
          onClick={this.getJobData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
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
    } = jobData
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="job-item-details-con">
        <div className="job-item">
          <div className="logo-title-loc-con">
            <div className="logo-title-con">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-rating-con">
                <h1>{title}</h1>
                <div className="rating-con">
                  <BsStarFill className="icon" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="loc-package-con">
              <div className="loc-emplo-con">
                <div className="loc-con">
                  <MdLocationOn className="loc-icon" />
                  <p>{location}</p>
                </div>
                <div>
                  <BsFillBriefcaseFill className="loc-icon" />
                  <p>{employmentType}</p>
                </div>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="desc-visit-link">
            <h1>Description</h1>
            <div>
              <a href={companyWebsiteUrl} className="visit-head">
                Visit
              </a>
              <BiLinkExternal className="visit-link" />
            </div>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="ul-con">
            {skills.map(eachSkill => (
              <SkillsCard skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div>
            <p>{description}</p>
            <img src={imageUrl} alt="life at company" className="skills-img" />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="ul-con">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobItem
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
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
        <div className="job-item-details-con">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails

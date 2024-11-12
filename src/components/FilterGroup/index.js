import {BsSearch} from 'react-icons/bs'

import ProfileDetails from '../ProfileDetails'
import './index.css'

const FilterGroup = props => {
  const onchangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onenterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props
    return (
      <div className="search-input-con">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onchangeSearchInput}
          onKeyDown={onenterSearchInput}
        />
        <button
          type="button"
          id="searchButton"
          className="search-btn-con"
          onClick={getJobs}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div className="emplo-type-con">
        <h1>Type of Employment</h1>
        <ul className="emplo-type-lst-con">
          {employmentTypesList.map(eachemployee => {
            const {changeEmployeeList} = props
            const onSelectEmployeeType = event => {
              changeEmployeeList(event.target.value)
            }
            return (
              <li
                className="emplo-item"
                key={eachemployee.employmentTypeId}
                onChange={onSelectEmployeeType}
              >
                <input
                  type="checkbox"
                  id={eachemployee.employmentTypeId}
                  className="check-input"
                  value={eachemployee.employmentTypeId}
                />
                <label
                  htmlFor={eachemployee.employmentTypeId}
                  className="check-label"
                >
                  {eachemployee.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div className="sal-range-con">
        <h1>Salary Range</h1>
        <ul className="sal-range-lst-con">
          {salaryRangesList.map(eachSalary => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(eachSalary.salaryRangeId)
            }
            return (
              <li
                className="sal-item"
                key={eachSalary.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  id={eachSalary.salaryRangeId}
                  name="salary"
                  className="check-input"
                />
                <label
                  htmlFor={eachSalary.salaryRangeId}
                  className="check-label"
                >
                  {eachSalary.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="filter-grp-con">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="hr-line" />
      {renderTypeOfEmployment()}
      <hr className="hr-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FilterGroup

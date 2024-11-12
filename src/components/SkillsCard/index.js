const SkillsCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li className="skill-con">
      <div className="skill-img-name">
        <img src={imageUrl} alt={name} className="skills-img" />
        <p className="name">{name}</p>
      </div>
    </li>
  )
}

export default SkillsCard

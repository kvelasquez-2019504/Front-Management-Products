
export const TagLink = ({link,description, styles}) => {
  return (
    <>
        <a href={link} className={`tag-link `+{...styles}}>{description}</a>
    </>
  )
}

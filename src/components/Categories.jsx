import React from "react"


function Categories() {

  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегатерианськие', 'Гриль', 'Острые', 'Закрытие']

  const onClickCategory = (id) => {
    setActiveIndex(id)
  }

  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, id) => <li key={id} onClick={() => onClickCategory(id)} className={activeIndex === id ? 'active' : ''} >{item}</li>)
        }
      </ul>
    </div>
  )
}

export default Categories
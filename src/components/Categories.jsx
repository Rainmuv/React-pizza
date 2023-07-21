import React from "react"


function Categories({value, onClickCategory}) {


  const categories = ['Все', 'Мясные', 'Вегатерианськие', 'Гриль', 'Острые', 'Закрытие']

  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, id) => <li key={id} onClick={() => onClickCategory(id)} className={value === id ? 'active' : ''} >{item}</li>)
        }
      </ul>
    </div>
  )
}

export default Categories
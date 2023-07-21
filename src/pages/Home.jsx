import React from 'react'
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearContext } from '../App';
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setPageCount } from '../redux/slices/filterSlice';
import axios from 'axios';


const Home = () => {


  const { searchValue } = React.useContext(SearContext)
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);
  const {categoriesId, sort, pageCount} = useSelector(state => state.filter);
  const dispatch = useDispatch()
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  }

console.log(categoriesId);

  const onChangePage = number => {
    dispatch(setPageCount(number))
  }


  React.useEffect(() => {
    setIsloading(true)
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoriesId > 0 ? `category=${categoriesId}`: ''
    const search = searchValue ? `&search=${searchValue}`: ''

    axios.get(
      `https://6467fd09e99f0ba0a81c0007.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setPizzas(res.data)
        setIsloading(false)
      })

      window.scrollTo(0, 0)
  }, [categoriesId, sort, searchValue, pageCount]);

  const pizz = pizzas.map(obj => <PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index}/>)

  

  return (
    <div className="container">
    <div className="content__top">
      <Categories value={categoriesId} onClickCategory={onClickCategory}/>
      <Sort/>
    </div>
    <h2 className="content__title">Все пиццы</h2>
    <div className="content__items">
      {
        isLoading ? skeletons
        : pizz
      }
    </div>
    <Pagination value={pageCount} onChangePage={onChangePage} />
    </div>
    
  )
}

export default Home
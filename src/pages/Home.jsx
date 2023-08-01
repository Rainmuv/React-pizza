import React from 'react'
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setPageCount, setFilter, selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzaSlice';
import qs from 'qs'
import { Link, useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)


  const {categoriesId, sort, pageCount, searchValue} = useSelector(selectFilter);
  const  { pizItems, status }  = useSelector(selectPizzas);
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = number => {
    dispatch(setPageCount(number))
  }

  const getPizzas = async () => {

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoriesId > 0 ? `category=${categoriesId}`: ''
    const search = searchValue ? `&search=${searchValue}`: ''

    try {
      dispatch(fetchPizzas({
        order, sortBy, category, search, pageCount
      }))
    } catch (error) {
      alert('Произошла ошибка')
    }
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(setFilter({...params, sort}));
      isSearch.current = true
    }
  }, [dispatch])

  React.useEffect(() => {
    window.scrollTo(0, 0)

    if(!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false

  }, [categoriesId, sort, searchValue, pageCount]);

  React.useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoriesId,
        pageCount
      });
  
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoriesId, sort.sortProperty, pageCount, navigate]);

  const pizz = pizItems.map(obj => <Link  key={obj.id} to={`/pizza/${obj.id}`} ><PizzaBlock {...obj}/></Link> );
  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index}/>)

  

  return (
    <div className="container">
    <div className="content__top">
      <Categories value={categoriesId} onClickCategory={onClickCategory}/>
      <Sort/>
    </div>
    <h2 className="content__title">Все пиццы</h2>
    {
      status === 'error' ? <div className='content__error-info'> <h2>Произошла ошибка😕</h2>
      <p>К сожалению нам не удалось получить питсы. Попробуйте повторить позже</p></div> :
      <div className="content__items">
      {
        status === 'loading'  ? skeletons
        : pizz
      }
    </div>
    }
    
    <Pagination value={pageCount} onChangePage={onChangePage} />
    </div>
    
  )
}

export default Home
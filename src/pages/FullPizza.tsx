import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const FullPizza: React.FC = () => {
  const [data, setData] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>()
  const { id } = useParams()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get(`https://6467fd09e99f0ba0a81c0007.mockapi.io/items/${id}`)
        setData(data)
      } catch (error) {
        alert('mom die:(('); 
      }
    }

    fetchPizza()
  }, [id])

  if (!data) {
    return <>Загрузка...</>
  }

  return (
    <div className='container'>
      <img src={data.imageUrl} alt='img' />
      <h2>{data.title}</h2>
      <h2>{data.price}$</h2>
    </div>
 )
}

export default FullPizza


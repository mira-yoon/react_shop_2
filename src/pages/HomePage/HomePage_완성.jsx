import { useState, useEffect} from 'react';
//import {data} from '../../database/data';
import './homePage.css';
import ProductCard from '../../components/ProductCard/ProductCard'

export default function Homepage() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const getData = async()=>{
      try {
        const res = await fetch('http://test.api.weniv.co.kr/mall');
        const result = await res.json();
        setItems(result);
        setIsLoaded(true);
      } catch(error) {
        setIsLoaded(true);
        setError(error);
      }
    }
    getData()
  },[])

  if(error) {
    return <div>에러입니다! {error.message}</div>
  } else if(!isLoaded) { // isLoaded의 초기값이 false이기 때문에 !을 붙여서 true로 만들어 준 것
    return <div>로딩중!</div>
  } else {
    return (
      <main className='product'>
        <ul className='product-list'>
          {items.map(item => 
            <ProductCard
              key = {item.id}
              productName = {item.productName}
              price = {item.price}
              thumbnailImg = {item.thumbnailImg}
            />
          )}
        </ul>
        <a className='link-btn cart-link' href='#'></a>
      </main>
    )
  }
}

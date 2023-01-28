import { useState, useEffect, useContext} from 'react';
import { Data } from '../../database/data';
import './homePage.css';
import ProductCard from '../../components/ProductCard/ProductCard'

export default function Homepage() {

  const [loadData, setLoadData] = useState(null);

  useEffect(()=>{
    console.log('로딩중')
  },[])

  useEffect(()=>{
    if(loadData == null) {
      return
    } else {
      console.log('로딩완료')
      console.log(loadData)
    }
  },[loadData]) 

  // data.js에서 createContext()를 통해 넘겨준 데이터가 async 함수의 리턴값이므로 프로미스 객체이다. 그래서 then을 사용하는 것이다.
  useContext(Data).then(d => {
    console.log(d)
    setLoadData(d)
  })

  return (
    <main className='product'>
      <ul className='product-list'>
        {loadData !== null ? 
          loadData.map(item => 
            <ProductCard
              key = {item.id}
              productName = {item.productName}
              price = {item.price}
              thumbnailImg = {item.thumbnailImg}
            />
          ) : <h2>로딩 중입니다.</h2>
        }  
      </ul>
      <a className='link-btn cart-link' href='#'></a>
    </main>
  )
  
}


import Card from 'react-bootstrap/Card';
import axios from 'axios';
import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom';

const URL = "https://api.tvmaze.com/search/shows?q=all"

const TvCards = () => {
   
    const[getShow, setShow] = useState([])
  
    useEffect(() => {
        axios.get(URL).then(res=>{
          setShow(res.data)
        }).catch(err=>console.log(err))
      }, [])
    
  return (
    
    <div className='mt-5 mx-auto'>    
    <div className='container d-flex d-flex justify-content-center  flex-wrap gap-5'>
    {getShow.map(x=>(  
   <div className=' '>     
    <Card  style={{ width: '15rem' }}>
    <Card.Img key={x.show.id} variant="top" src={x.show.image.medium} />  
    <Card.Body>
      <Card.Title className='hover-underline-animation'>{x.show.name}</Card.Title>
      <Link to={`details/${x.show.id}`} className="btn  btn-primary">Know More</Link>    
    </Card.Body>
  </Card>
  </div>  
))}
   </div>
   </div>
  )
}

export default TvCards
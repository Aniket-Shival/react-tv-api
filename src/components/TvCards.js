
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const URL = "https://api.tvmaze.com/search/shows?q=all"

const TvCards = () => {
   
    const[getShow, setShow] = useState([])
  
    useEffect(() => {
        axios.get(URL).then(res=>{
          setShow(res.data)
        }).catch(err=>console.log(err))
      }, [])
      console.log(getShow)
    
  return (
    
    <div className='mt-5 mx-auto'>    
    <div className='container d-flex d-flex justify-content-center  flex-wrap gap-5'>
    {getShow.map(x=>(  
   <div key={x.show.id} className=' '>     
    <Card key={x.show.id} style={{ width: '18rem' , backgroundColor:'#060608' }}>
    <Card.Img style={{ height:'20rem', width:'18rem',color:'#fad3cf', borderRadius:'10px' } }  className='px-1 py-2' variant="top" src={x.show.image?.medium} alt={x.show.name} />  
    
    <Card.Body>
      <Card.Title style={{ fontSize:'2rem', color:'#fad3cf' }} className=' mb-3'>{x.show.name}</Card.Title>
      <Link to={`details/${x.show.id}`} ><Button variant="outline-warning">Details</Button></Link>    
    </Card.Body>
  </Card>
  </div>  
))}
   </div>
   </div>
  )
}

export default TvCards
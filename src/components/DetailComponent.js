import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//eslint-disable-next-line
import { Cookies, useCookies } from 'react-cookie';

const DetailComponent = () => {

  const { id } = useParams()

  const [getDetail, setDetail] = useState([])
  const [form, setForm] = useState('false')
  const [getEmail, setEmail] = useState('')
  const [getName, setName] = useState('')
  const [getPhone, setPhone] = useState('')
  //eslint-disable-next-line
  const [getCookie, setCookie] = useCookies(['user'])

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}`).then(res => {
      setDetail(res.data)
    }).catch(err => console.log(err))
    //eslint-disable-next-line
  }, [])

  const changeform = () => {
    setForm(current => !current)
    console.log(form)
  }

  const Submission = () => {

    setCookie('Name', getName, { path: '/' })
    setCookie('Email', getEmail, { path: '/' })
    setCookie('Phone', getPhone, { path: '/' })
  }



  return (
    <div className='container'>

      <div className=' mt-5 d-lg-flex d-block  justify-content-center'>
        <h1 className='display-1 font-weight-bold'>{getDetail.name}</h1>
      </div>
      <div className='mt-5 d-lg-flex d-block justify-content-around '>
        <img className='rounded-3' src={getDetail.image?.original} alt='loading...' style={{ maxWidth: '400px', maxHeight: '400px' }} />
        <div>
          <h3 className="my-5">Rating: {getDetail.rating?.average}</h3>
          <h3 className="my-5">Genre: {getDetail.genres?.map((x, index) => {
            return <span key={index}> {x} </span>
          })}</h3>
          <h3 className="my-5">Language: {getDetail.language}</h3>
          <h5 className='mt-5'>Buy tickets</h5>
          <button onClick={changeform}>Tickets</button>
        </div>
      </div>


      <h1 className="my-5">Summary</h1>
      <h2 className="my-3">{getDetail.summary?.replace(/<[^>]*>/g, '')}</h2>


      {form ? '' :
        <Modal show={1} onHide={changeform}>
          <Modal.Header closeButton>
            <Modal.Title>Buy Tickets for "{getDetail.name}"</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className='container my-5'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={getEmail} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={getName} onChange={(e) => setName(e.target.value)} placeholder="Text" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" value={getPhone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
              </Form.Group>

              <Button onClick={Submission} variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      }
    </div>
  )
}

export default DetailComponent
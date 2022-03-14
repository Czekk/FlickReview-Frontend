import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const navigate= useNavigate()

    const [name, setName] = useState('')
    const [id, setId] = useState('')

    const onChangeName= e =>{
        const name = e.target.value
        setName(name)
    }

    const onChangeId= e=>{
        const id= e.target.value
        setId(id)
    }

    const login = ()=>{
        props.login({name: name, id: id})
        navigate('/movies')
    }
  return (
    <div>
        <Form>
            <Form.Group className='m-2'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter username'
                    value={name}
                    onChange={onChangeName}
                />
            </Form.Group>
            <Form.Group className='m-2'>
                <Form.Label>ID</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter id'
                    value={id}
                    onChange={onChangeId}
                />
            </Form.Group>
            <Button variant='primary' className='m-2' size='sm' onClick={login}>
                Submit
            </Button> 
        </Form>
    </div>
  )
}

export default Login
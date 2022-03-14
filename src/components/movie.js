import React, { useEffect, useState} from 'react'
import { Card, Container, Col, Row, Image, Button} from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import MovieDataService from '../services/movies'
import moment from 'moment'

const Movie = (props) => {

    let params= useParams();
    const [movie, setMovie] = useState({
        id:null,
        title:"",
        rated:"",
        reviews:[]
    })

    const getMovie= id=>{
        MovieDataService.get(id)
        .then(response=>{
            setMovie(response.data)
        })
        .catch(e=>{
            console.log(e)
        })
    }

    useEffect(()=>{
        getMovie(params.id)
    },[params.id])

    const deleteReview= (reviewId, index)=>{
        MovieDataService.deleteReview(reviewId, props.user.id)
        .then(response=>{
            let currState= {...movie}
            currState.reviews.splice(index, 1)
            setMovie(currState)
        })
        .catch(e =>{
            console.log(e)
        })
    }
  return (
    <div>
        <Container>
            <Row>
                <Col>
                    <Image src={movie.poster+'/100px250'} fluid/>
                </Col>
                <Col>
                    <Card>
                        <Card.Header as='h5'>{movie.title}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {movie.plot}
                            </Card.Text>
                            {props.user?
                            <Link to={"/movies/" +params.id + "/review"}>
                                Add Review
                            </Link>:null}
                        </Card.Body>
                    </Card>
                    <h2>Reviews</h2>
                    <br></br>
                    {movie.reviews.map((review, index)=>{
                        return(
                            <Card key={index}>
                                <Card.Body>
                                    <h5>{review.name+" reviewed on "+ moment(review.date).format("Do MMMM YYYY")}</h5>
                                    <p>{review.review}</p>
                                    {props.user?.id === review.user_id? 
                                    <Row>
                                        <Col>
                                        <Link to={{
                                            pathname: "/movies/" + params.id+"/review"
                                        }} state= {{currentReview: review}}>Edit</Link>
                                        </Col>
                                        <Col><Button variant='link' onClick={()=>deleteReview(review._id, index)}>Delete</Button></Col>
                                    </Row>:null
                                    }
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Movie
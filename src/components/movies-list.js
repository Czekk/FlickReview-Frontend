import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, FormControl, FormGroup, Row, Col, Container, Card, CardImg } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MovieDataService from '../services/movies'

const MoviesList = (probs) => {

    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Ratings"])

    const [currentPage, setCurrentpage]= useState(0)
    const [entriesPerPage, setEntriesPerPage] = useState(0)
    const [currentSearchMode, setCurrentSearchMode] = useState('')

    const retrieveMovies=useCallback(()=>{
        setCurrentSearchMode('')
        MovieDataService.getAll(currentPage)
        .then(response=>{
            setMovies(response.data.movies)
            setCurrentpage(response.data.page)
            setEntriesPerPage(response.data.entries_per_page)
        })
        .catch(e=>{
            console.log(e)
        })
    }, [currentPage])

    const find= useCallback((query, by)=>{
        MovieDataService.find(query, by, currentPage)
        .then(response=>{
            setMovies(response.data.movies)
        })
        .catch(e=>
            console.log(e))
    },[currentPage])

    const findByTitle= useCallback(()=>{
        setCurrentSearchMode('findByTitle')
        find(searchTitle, 'title')
    }, [find, searchTitle])

    const findByRating= useCallback(()=>{
        setCurrentSearchMode('findByRating')
        if(searchRating === "All Ratings"){
            retrieveMovies()
        }
        else{
            find(searchRating, 'rated')
        }
    }, [find, retrieveMovies, searchRating])

    const retrieveNextPage = useCallback(()=>{
        if(currentSearchMode === "findByTitle"){
            findByTitle()
        }
        else if(currentSearchMode === 'findByRating'){
            findByRating()
        }
        else{
            retrieveMovies()
        }
    }, [currentSearchMode, findByRating, findByTitle, retrieveMovies])

    useEffect(()=>{
        setCurrentpage(0)
    }, [currentSearchMode])

    useEffect(()=>{
       retrieveMovies()
       retrieveRatings()
       return(
        ()=>{setMovies([])}
       )
    }, [retrieveMovies])

    useEffect(()=>{
        // retrieveMovies()
        retrieveNextPage()
    }, [currentPage, retrieveNextPage])

    const retrieveRatings=()=>{
        MovieDataService.getRatings()
        .then(response=>{
            //start with 'All Ratings' is user doesn't specify any ratings
            setRatings(['All Ratings'].concat(response.data))
        })
        .catch(e=>{
            console.log(e)
        })
    }

    const onChangeSearchTitle=e=>{
        const searchTitle=e.target.value
        setSearchTitle(searchTitle)
    }

    const onChangeSearchRating=e=>{
        const searchRating = e.target.value
        setSearchRating(searchRating)
    }
   
  return (
    <div className='App'>
        <Container>
            <Form>
                <Row>
                    <Col>
                    <FormGroup className='m-1'>
                        <FormControl type='text'
                        placeholder='Search by title'
                        value={searchTitle}
                        onChange={onChangeSearchTitle}/>
                    </FormGroup>
                    <Button
                    variant='primary'
                    type='button'
                    onClick={findByTitle}
                    className='m-1 shadow-none'
                    size='sm'
                    >Search</Button>
                    </Col>
                    <Col>
                    <FormGroup className='m-1'>
                        <FormControl
                            as="select" onChange={onChangeSearchRating}>
                                {ratings.map((rating, index)=>{
                                    return(
                                        <option key={index} value={rating}>{rating}</option>
                                    )
                                })}
                            </FormControl>
                    </FormGroup>
                    <Button
                    variant='primary'
                    type='button'
                    onClick={findByRating}
                    className='m-1 shadow-none'
                    size='sm'
                    >Search</Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                {movies.map((movie, index)=>{
                    return(
                        <Col key={index}>
                            <Card style={{width: '18rem'}}>
                                <CardImg src={movie.poster+'/100px180'}/>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                        Rating: {movie.rated}
                                    </Card.Text>
                                    <Card.Text>{movie.plot}</Card.Text>
                                    <Link to={"/movies/"+movie._id}>View Reviews</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <br/>
            Showing Page: (currentPage)
            <Button variant= 'link'
            onClick={()=> {setCurrentpage(currentPage + 1)}}
            >
                Get next {entriesPerPage} results</Button>
        </Container>
    </div>
  )
}

export default MoviesList
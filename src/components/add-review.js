import React, {useState} from 'react'
import MovieDataService from '../services/movies'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'


const AddReview = (props) => {
  
  const {state} = useLocation()
  let params = useParams()
  let editing = false
  let initialReviewState = ''

  if( state?.currentReview){
    editing =true
    initialReviewState = state.currentReview.review
  }

  const [review, setReview] = useState(initialReviewState)
  const [submitted, setSubmitted] = useState(false)

  const onChangeReview = e=>{
    const review = e.target.value
    setReview(review)
  }

  const saveReview=()=>{
    var data = {
      review: review,
      name: props.user.name,
      user_id: props.user.id,
      movie_id: params.id
    }

    if(editing){
      data.review_id = state.currentReview._id
      MovieDataService.updateReview(data)
      .then(response=>{
        setSubmitted(true)
      })
      .catch(e=>{
        console.log(e)
      })
    }
    else{
      MovieDataService.createReview(data)
    .then(response=>{
      setSubmitted(true)
    })
    .catch(e=>{
      console.log(e)
    })
    }
  }

  return (
    <div>
        {
          submitted?(
            <div>
              <h4>
                Review submitted successfully
              </h4>
              <Link to={'/movies/'+ params.id}>
                Back to Movie
              </Link>
            </div>
          ):(
            <Form>
              <Form.Group>
                <Form.Label>
                  {editing?'Edit':'Create'} Review
                </Form.Label>
                <Form.Control
                  type='text'
                  required
                  value={review}
                  onChange={onChangeReview}
                  />
              </Form.Group>
              <Button variant='primary' onClick={saveReview}>
                Submit
              </Button>
            </Form>
          )
        }
    </div>
  )

}

export default AddReview
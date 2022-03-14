import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

const Home = () => {
  return (
    <div>
        <Col>
        <Row>
            <Card className=''>
                <Card.Header>
                    <Card.Title className='text-center'>
                        Flick Review Movie Database
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle>
                        About
                    </Card.Subtitle>
                    <Card.Text>
                        Flick Review is a movie review database project with 23,000+ movies of different genres. Project is built with MongoDB, ExpressJS, ReactJS, Bootstrap5 and NodeJS.
                        Project enables users to search the database by title and rating. Also allows users to review movies, edit reviews and delete reviews if logged in.
                    </Card.Text>
                    <Card.Subtitle>
                        Navigate:
                    </Card.Subtitle>
                    <Card.Text>
                        <li>To view list of movies click on "Movies" tab on the top nav bar.</li>
                        <li>To loggin and review movies click on the "Login" tab on the top nav bar.</li>
                       <li>Note: Use any remembarable id and user name for login credentials, which will enable edit and delete your own reviews.</li>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Row>
        </Col>
    </div>
  )
}

export default Home
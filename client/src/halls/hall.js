import React from 'react'
import PostsList from './posts/postsList.js'
import HallSidebar from './hallSidebar.js'
import { Row, Col } from 'react-bootstrap'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Post from './posts/post.js'

class Hall extends React.Component {
  constructor(props) {
   super(props)
   this.state = {hall: null}
  }

  getHallInfo = () => {
    fetch(`/api/halls/${this.props.match.params.id.toLowerCase()}`)
    .then(response => response.json())
    .then(hall => {
      document.title = hall.name + ' - oddit'
      this.setState({hall: hall})
    })
    .catch(error => console.log(error))
  }

  componentDidMount () {
    this.getHallInfo()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props !== prevProps) {
      this.getHallInfo()
    }
  }

  render () {
    if (!this.state.hall) return null
    if (this.state.hall.status === 404) return <Redirect to="/404"/>
    return(
      <Row className='feed-row'>
        <Col className='posts-list-col' md='9'>
        <Switch>
          <Route path={`${this.props.match.url}/posts/:id`}>
            <Post />
          </Route>
          <Route exact path={this.props.match.url}>
            <PostsList hall={this.state.hall.name}/>
          </Route>
          </Switch>
        </Col>
        <Col className='sidebar-col'>
          <HallSidebar hall={this.state.hall}/>
        </Col>
      </Row>
    )
  }

}

export default withRouter(Hall)

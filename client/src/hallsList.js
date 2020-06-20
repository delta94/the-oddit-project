import React from 'react'
import { Container } from 'react-bootstrap'
import HallCard from './hallCard.js'

export default class HallsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {halls: []}
  }

  getHallData = () => {
    fetch(`/api/halls`)
    .then(response => response.json())
    .then(halls => this.setState({halls: halls}))
    .catch(error => console.log(error))
  }

  componentDidMount () {
    this.getHallData()
  }

  renderHalls = () => {
    const halls = []
    this.state.halls.forEach(hall => {
        halls.push(<HallCard hall={hall}/>)
      }
    )
    return halls
  }

  render () {
    if (!this.state.halls) return null
    console.log('rendering halls')
    console.log(this.state)
    return(
      <Container className='mt-2'>
        {this.renderHalls()}
      </Container>
    )
  }
}
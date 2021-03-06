import React, { Component } from "react";
import { Row, Col } from "../../components/Grid"
import GameContainer from '../../components/GameContainer/'
import API from '../../utils/API'
import "./Profile.css";
var moment = require('moment')

class Profile extends Component
{
  state = {
    id: undefined,
    postBanner: "",
    username: "",
    createdAt: undefined,
    bio: "",
    games: [], // TODO: this shouldn't be random, it should be their uploads
  }
  componentDidMount()
  {
    // userID shouldn't change
    const userId = this.props.match.params.id;
    API.getUser(userId)
      .then(user =>
      {
        // setting state to user info
        this.setState({
          id: user.data.id,
          username: user.data.username,
          postBanner: user.data.postBanner,
          createdAt: user.data.createdAt,
          bio: user.data.bio
        })
      })
      .catch(err =>
      {
        console.log(err)
      })

    this.getGames(userId);
  }

  getGames(userId)
  {
    API.getUserGames(userId)
      .then((res) =>
      {
        this.setState({ games: res.data })
      })
      .catch((err) =>
      {
        console.log(err)
      })
  }

  render()
  {
    return (
      <div>
        <div>
          <Row>
            <Col size="md-4">
              <Row>
                <div className='d-inline-block'>
                  <div className="avatar">
                    <img id="profile-image-porthole" className="bg-light rounded-circle p-2 mr-3" src={`/assets/userThumbnails/${this.state.id}`} alt={`pic-${this.state.id}`} />
                  </div>
                </div>
              </Row>
            </Col>
            <Col size="md-7">
              <div className="mx-1 mt-4">
                <div>
                  <span className="bigger">{this.state.username}</span>
                  <div className='smaller'>Joined: {moment(this.state.createdAt).fromNow()}</div>
                </div>
                <hr className='bg-white' />
                <p id='bio' className="">
                  {this.state.bio}
                </p>
                <div className='text-secondary display-5 mt-3 float-left'><em> "{this.state.postBanner}" </em></div>
              </div>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Row>
            <div className="mx-auto h-10 mt-4">
              <GameContainer games={this.state.games} header={'User Uploads'} className="fullWidth p-5" />
            </div>
          </Row>
        </div>
      </div>);
  }
}
export default Profile;
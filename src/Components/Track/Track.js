import React from 'react';
import './Track.css';

class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this)

  }

  addTrack = trackAdd => {
    this.props.onAdd(this.props.track);
  }

  renderAction(){
    if (this.props.isRemoval) {
      return ' - '
    } else {
      return ' + '
    }
  }

  render(){

    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        <a className="Track-action" onClick={this.addTrack}>{this.renderAction()}</a>
      </div>

    );
  }
}

export default Track;

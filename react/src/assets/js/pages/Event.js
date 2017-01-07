import React from "react";

export default class Event extends React.Component {
  render() {
  	
  	const { params } = this.props;
  	console.log(params);

    return (
      <h1>Event ({this.props.params.article})</h1>
    );
  }
}

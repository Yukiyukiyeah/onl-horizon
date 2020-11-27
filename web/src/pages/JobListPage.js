import React from "react";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  render() {
    return (
      <div>
        job list page
      </div>
    )
  }
}

export default HomePage;

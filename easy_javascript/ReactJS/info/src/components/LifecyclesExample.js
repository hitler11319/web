import React from "react";

class LifecycleExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    console.log("LifecycleExample: constructor()");
  }

  componentDidMount() {
    fetch("https://5db91ed6177b350014ac8050.mockapi.io/api/users")
      .then(res => res.json())
      .then(data => this.setState({ data }));
    console.log("LifecycleExample: componentDidMount()");
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps !== this.props)
      console.log("LifecycleExample: componentDidUpdate() Props changed");
    if (prevState !== this.state)
      console.log("LifecycleExample: componentDidUpdate() State changed");
  }

  componentWillUnmount() {
    console.log("LifecycleExample: componentWillUnmount()");
  }

  render() {
    console.log("LifecycleExample: render()");
    return (
      <div>
        <p>this.props.count: {this.props.count}</p>
        <pre>
          <code>{JSON.stringify(this.state.data, null, 2)}</code>
        </pre>
        {this.state.data.map((p, i) => {
          return (
            <div key={p.id}>
              {p.createAt}
              <br />
              {p.name}
              <br />
              <img src={p.avatar} alt={p.name} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default LifecycleExample;

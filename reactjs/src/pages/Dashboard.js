import React from 'react';

class Dashboard extends React.Component {
  componentDidMount() {
    document.title = 'Dashboard';
  }

  render() {
    return (
      <>
        <h1>This is dashboard page</h1>
      </>
    );
  }
}

export default Dashboard;

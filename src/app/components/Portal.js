import React from 'react';
import newsStore from '../stores/NewsStore';
import * as NewsAction from '../actions/NewsAction';

export default class Portal extends React.Component {
  constructor() {
    super();
    this.state = {
      sources: [],
      loading: true,
    };
    NewsAction.getSources();
    this.getSources = this.getSources.bind(this);
  }

  componentDidMount() {
    newsStore.on('change', this.getSources);
  }

  getSources() {
    this.setState({
      sources: newsStore.getSources(),
      loading: false,
    });
  }

  componentWillUnMount() {
    newsStore.removeListener('change', this.getSources);
  }

  render() {
    let Display = (
      <p> Hello </p>
    );
    if (this.state.loading) {
      Display = (
        <h2>Please Wait .....</h2>
      );
    } else {
      Display = this.state.sources.map(source => (
        <li key={source.name}>{source.name}</li>
      ));
    }
    return (
      <div className="col s12">
        <div />

      </div>
    );
  }
}

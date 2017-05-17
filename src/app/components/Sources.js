import React from 'react';
import SourceStore from '../stores/SourceStore';
import * as NewsAction from '../actions/NewsAction';

export default class Sources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: {},
      loading: true,
    };
    this.getSources = this.getSources.bind(this);
  }

  componentWillMount() {
    NewsAction.getAllSources();
  }

  componentDidMount() {
    const source = localStorage.defaultNews ? localStorage.defaultNews : 'bbc-news';
    SourceStore.on('change', this.getSources);
  }

  componentWillUnmount() {
    SourceStore.removeListener('change', this.getSources);
  }

  /**
   * gets the news sources and set the state
   * @method getSources
   */
  getSources() {
    const rawSources = SourceStore.getSources();
    if (rawSources) {
      this.setState({
        sources: rawSources,
        loading: false,
      });
    }
  }

  render() {
    const processClick = this.props.processClick;
    let AllSources;
    if (this.state.loading) {
      AllSources = (
        <option> Loading.... </option>
      );
    } else {
      AllSources = this.state.sources.map(source => (
        <option key={Math.random + source.name} value={source.id}>{source.name}</option>
      ));
    }
    return (
      <select name="sources" onChange={processClick}>
        <option value=""> Select News Source </option>
        { AllSources }
      </select>
    );
  }
}

import React from 'react';
import _ from 'lodash';
import SourceStore from '../stores/SourceStore';
import * as NewsAction from '../actions/NewsAction';

export default class SortBy extends React.Component {
  constructor(props) {
    super(props);
    this.source = localStorage.defaultNews ? localStorage.defaultNews : 'bbc-news';
    this.state = {
      sources: undefined,
      currentSource: this.source,
      loading: true,
    };
    this.getSources = this.getSources.bind(this);
  }

  componentWillMount() {
    NewsAction.getAllSources();
  }

  componentDidMount() {
    SourceStore.on('change', this.getSources);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentSource: nextProps.currentSource,
      loading: false,
    });
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
      });
    }
  }

  render() {
    const processSort = this.props.processSort;
    let sortBys;
    if (this.state.loading) {
      sortBys = (
        <option> Loading.... </option>
      );
    } else {
      let sortBysAvailable;
      if (this.state.sources === undefined) {
        sortBysAvailable = ['top'];
      } else {
        sortBysAvailable = _.filter(this.state.sources, ['id', this.state.currentSource])[0].sortBysAvailable;
      }
      sortBys = sortBysAvailable.map(sort => (
        <option key={Math.random + sort}>{sort}</option>
      ));
    }

    return (
      <select name="sort" onChange={processSort}>
        <option value="">Sort Articles</option>
        {sortBys}
      </select>
    );
  }
}

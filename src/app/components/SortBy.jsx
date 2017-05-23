import React from 'react';
import _ from 'lodash';
import { SimpleSelect } from 'react-selectize';
import PropTypes from 'prop-types';
import SourceStore from '../stores/SourceStore';
import * as NewsAction from '../actions/NewsAction';

/**
 * Create a react component
 * @class Portal
 */
export default class SortBy extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   */
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

  /**
   * Calls NewsAction when the component is about to mount
   * @method componentWilMount
   * @returns {function} - calls news action and dispatch an action
   */
  componentWillMount() {
    NewsAction.getAllSources();
  }

  /**
   * Add event Listener to the Sources Store and fires when the component is fully mounted
   * @method componentDidMount
   * @returns {event} - register event
   */
  componentDidMount() {
    SourceStore.on('change', this.getSources);
  }

  /**
   * Set state when a new prop is received
   * @method componentWilReceiveProps
   * @param {object} nextProps - New props
   * @return {state} - Set states
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentSource: nextProps.currentSource,
      loading: false,
    });
  }

  /**
   * Remove event listener from the Sources store
   * @method componentWilUnMount
   * @return {event} - removes event
   */
  componentWillUnmount() {
    SourceStore.removeListener('change', this.getSources);
  }

  /**
   * gets the news sources and set the state
   * @method getSources
   * @return {state} - Set the sources to the state
   */
  getSources() {
    const rawSources = SourceStore.getSources();
    if (rawSources) {
      this.setState({
        sources: rawSources,
      });
    }
  }

  /**
   * Render react component
   * @method render
   * @return {function} react-component
   */
  render() {
    const handlesArticleSorting = this.props.handlesArticleSorting;
    let availableSortingParam;
    if (this.state.loading) {
      availableSortingParam = (
        <option> Loading.... </option>
      );
    } else {
      let getAvailableSorting;
      if (this.state.sources === undefined) {
        getAvailableSorting = ['top'];
      } else {
        getAvailableSorting = _.filter(this.state.sources, ['id', this.state.currentSource])[0].sortBysAvailable;
      }
      availableSortingParam = getAvailableSorting.map(sort => (
        <option key={Math.random + sort}>{sort}</option>
      ));
    }

    return (
      <SimpleSelect placeholder="Sort Articles" onValueChange={handlesArticleSorting}>
        {availableSortingParam}
      </SimpleSelect>
    );
  }
}

SortBy.propTypes = {
  currentSource: PropTypes.string,
  handlesArticleSorting: PropTypes.func,
};

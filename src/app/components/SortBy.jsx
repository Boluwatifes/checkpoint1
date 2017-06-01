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
    this.currentSource = this.props.currentSource;
    // check the localstorage for defaultNews and
    this.source = localStorage.getItem('defaultNews') ?
      localStorage.getItem('defaultNews') : '';
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
   * @returns {void} - calls news action and dispatch an action
   */
  componentWillMount() {
    NewsAction.getAllSources();
  }

  /**
   * Add event Listener to the Sources Store and
   * fires when the component is fully mounted
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
    this.setState({
      sources: rawSources,
    });
  }

  /**
   * Render react component
   * @method render
   * @return {function} react-component
   */
  render() {
    // uses function from the prop
    const handlesArticleSorting = this.props.handlesArticleSorting;
    let availableSortingParam;
    if (this.state.loading) {
      // displays to the user when state.loading is true
      availableSortingParam = (
        <option> Loading.... </option>
      );
    } else {
      let getAvailableSorting;
      // set default sorting param to top
      // it changes as soon as the page loads
      if (this.state.sources === undefined) {
        getAvailableSorting = ['top'];
      } else {
        // gets the current sorting param
        // available and save it
        getAvailableSorting = _.filter(this.state.sources,
        ['id', this.state.currentSource])[0].sortBysAvailable;
      }
      // displays the sorting params in a select box
      availableSortingParam = getAvailableSorting.map(sort => (
        <option key={Math.random + sort}>{sort}</option>
      ));
    }

    return (
      <SimpleSelect
        placeholder="Sort Articles"
        onValueChange={handlesArticleSorting}
      >
        {availableSortingParam}
      </SimpleSelect>
    );
  }
}

// props validation
SortBy.propTypes = {
  currentSource: PropTypes.string,
  handlesArticleSorting: PropTypes.func,
};

// default props
SortBy.defaultProps = {
  currentSource: 'bbc-news',
  handlesArticleSorting: () => {
    //
  }
};

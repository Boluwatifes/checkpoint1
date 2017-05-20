import { SimpleSelect } from 'react-selectize';
import React from 'react';
import { getFirstName } from '../utils/helpers';
import SourceStore from '../stores/SourceStore';
import * as NewsAction from '../actions/NewsAction';

/**
 * Create a react component
 * @class Sources
 */
export default class Sources extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      sources: {},
      loading: true,
    };
    this.getSources = this.getSources.bind(this);
    this.setDefaultNews = this.setDefaultNews.bind(this);
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
   * @return {state} - Set sources to the state
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

  setDefaultNews(e) {
    localStorage.setItem('defaultNews', e.value);
    location.reload();
  }

  /**
   * Render react component
   * @method render
   * @return {function} react-component
   */
  render() {
    let AllSources;
    // set sources to loading if the `this.state.loading` is true
    if (this.state.loading) {
      AllSources = (
        <option> Loading.... </option>
      );
    } else {
      // map the sources to `AllSources`
      AllSources = this.state.sources.map(source => (
        <option key={Math.random + source.name} value={source.id}>{source.name}</option>
      ));
    }
    const user = JSON.parse(localStorage.user);
    return (
      <div className="col s12 home-inner" >
        <div className="inner-content center m-auto">
          <span className="center"><img alt="loading" src="imgs/welcome.gif" height="100" width="100"/></span>
          <h5 className="center">Welcome <span style={{ 'fontSize': '32px', 'color': 'green' }}>{getFirstName(user.name)}</span>,</h5>
          <p className="center"> Please Select A News Source to continue </p>
          <div>
            <span className="center">
              <SimpleSelect placeholder="Search for news source" onValueChange={this.setDefaultNews}>
                {AllSources}
              </SimpleSelect>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

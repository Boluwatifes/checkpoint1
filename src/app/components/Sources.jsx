import { SimpleSelect } from 'react-selectize';
import React from 'react';
import PropTypes from 'prop-types';
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
   * Add event Listener to the Sources Store and
   * fires when the component is fully mounted
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
    this.setState({
      sources: rawSources,
      loading: false,
    });
  }

  /**
   * Render react component
   * @method render
   * @return {function} react-component
   */
  render() {
    // gets method from props
    const handlesSourceChange = this.props.handlesSourceChange;
    let AllSources;
    // set sources to loading if the `this.state.loading` is true
    if (this.state.loading) {
      AllSources = (
        <option> Loading.... </option>
      );
    } else {
      // map the sources to `AllSources`
      AllSources = this.state.sources.map(source => (
        <option
          key={Math.random + source.name}
          value={source.id}
        >
          {source.name}
        </option>
      ));
    }
    return (
      <SimpleSelect
        placeholder="Change News Source"
        onValueChange={handlesSourceChange}
      >
        {AllSources}
      </SimpleSelect>
    );
  }
}

// props validation
Sources.propTypes = {
  handlesSourceChange: PropTypes.func,
};

// default props
Sources.defaultProps = {
  handlesSourceChange: () => {
    //
  }
};


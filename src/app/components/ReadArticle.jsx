import React from 'react';
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';
import PropTypes from 'prop-types';
import ScrapeArticleStore from '../stores/ScrapeArticleStore';
import * as NewsAction from '../actions/NewsAction';
import { sanitizeUrl, stripUrl } from '../utils/helpers';

/**
 * Create a react component
 * @class ReadArticle
 */
export default class ReadArticle extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      loading: true,
    };
    this.processScrappedArticle = this.processScrappedArticle.bind(this);
    this.currentUrl = window.location.href;
  }

  /**
   * Call action on initial page load
   * @method componentWillMount
   * @memberof FReadArticle
   * @return {null} -
   */
  componentWillMount() {
    NewsAction.getSrappedArticle(sanitizeUrl(this.props.location.search));
  }

  /**
   * Attach an event listener to scrapeArticle store
   * @method componentDidMount
   * @memberof ReadArticle
   * @return {null} -
   */
  componentDidMount() {
    ScrapeArticleStore.on('change', this.processScrappedArticle);
  }

  /**
   * Remove event listener from scrapeArticle store
   * @method componentWillUnount
   * @memberof ReadArticle
   * @return {null} -
   */
  componentWillUnmount() {
    ScrapeArticleStore.removeListener('change', this.proccessScrappedArticle);
  }

  /**
   * Get scrapped article from the store and update the state
   * @method processScrappedArticle
   * @memberof ReadArticle
   * @return {null} -
   */
  processScrappedArticle() {
    const scrappedArticle = ScrapeArticleStore.getSrappedArticle();
    this.setState({
      article: scrappedArticle,
      loading: false,
    });
  }

  /**
   * Render to the dom
   * @method render
   * @memberof ReadArticle
   * @returns {any} -
   */
  render() {
    let DisplayArticle;
    const {
      FacebookShareButton,
      GooglePlusShareButton,
      LinkedinShareButton,
      TwitterShareButton,
      WhatsappShareButton,
      PinterestShareButton,
    } = ShareButtons;
    const FacebookIcon = generateShareIcon('facebook');
    const TwitterIcon = generateShareIcon('twitter');
    const GooglePlusIcon = generateShareIcon('google');
    const LinkedinIcon = generateShareIcon('linkedin');
    const PinterestIcon = generateShareIcon('pinterest');
    const WhatsappIcon = generateShareIcon('whatsapp');
    if (this.state.loading) {
      DisplayArticle = (
        <div id="article">
          <span className="center"><img alt="loading" src="imgs/loading.gif" /></span>
          <p className="center">Please Wait .....</p>
        </div>
      );
    } else if (this.state.article === 'error') {
      DisplayArticle = (
        <div id="article">
          <h4>An error occur! Please try again later&nbsp;
          or click the button below to read from source</h4>
          <span>
            <a
              href={sanitizeUrl(this.props.location.search)}
              className="waves-effect waves-light btn"
              target="blank"
            >Click Here To Read</a>
          </span>
        </div>
      );
    } else {
      const article = this.state.article;
      DisplayArticle = (
        <div className="article-body" style={{ 'textAlign': 'left' }}>
          <div className="article-source">
            <h3>{stripUrl(article.url)} NEWS</h3>
          </div>
          <div className="article-img">
            <img src={article.image} alt={article.title} className="responsive-img" />
          </div>
          <div className="share">
            <span className="myIcons"><span><i className="material-icons">share</i></span></span>
            <span className="myIcons" title="Share to Facebook">
              <FacebookShareButton
                url={this.currentUrl}
                title={article.title}
                picture={article.image}
              >
                <FacebookIcon
                  size={32}
                  round
                />
              </FacebookShareButton>
            </span>

            <span className="myIcons" title="Share to Twitter">
              <TwitterShareButton
                url={this.currentUrl}
                title={article.title}
              >
                <TwitterIcon
                  size={32}
                  round
                />
              </TwitterShareButton>
            </span>

            <span className="myIcons" title="Share to Twitter">
              <GooglePlusShareButton
                url={this.currentUrl}
              >
                <GooglePlusIcon
                  size={32}
                  round
                />
              </GooglePlusShareButton>
            </span>
            <span className="myIcons" title="Share to Twitter">
              <LinkedinShareButton
                url={this.currentUrl}
                title={article.title}
                windowWidth={750}
                windowHeight={600}
              >
                <LinkedinIcon
                  size={32}
                  round
                />
              </LinkedinShareButton>
            </span>

            <span className="myIcons" title="Share to Twitter">
              <PinterestShareButton
                url={this.currentUrl}
                title={article.title}
                windowWidth={1000}
                windowHeight={730}
                media={article.image}
              >
                <PinterestIcon
                  size={32}
                  round
                />
              </PinterestShareButton>
            </span>

            <span className="myIcons" title="Share to Twitter">
              <WhatsappShareButton
                url={this.currentUrl}
                title={article.title}
                separator=":: "
              >
                <WhatsappIcon
                  size={32}
                  round
                />
              </WhatsappShareButton>
            </span>
            <div className="clear" />
          </div>
          <div className="article-title">
            <h4 style={{ 'fontSize': '2rem' }}>{article.title}</h4>
          </div>
          <div className="article-desc">
            <h6 style={{ 'fontSize': '22px', 'fontWeight': '300' }}>{article.description}</h6>
          </div>
          <div className="article-body">
            <p style={{ 'fontSize': '18px', 'lineHeight': '35px', 'wordSpacing': '5px' }}>{article.body}</p>
          </div>
          <div className="clear" />
        </div>
      );
    }
    return (
      <div className="portal">
        <div className="col s12 home-inner">
          <a
            className="btn-floating btn-large waves-effect waves-light red"
            id="floating-button" href="/"
          >
            <i className="material-icons">keyboard_arrow_left</i>
          </a>
          <div className="inner-content left-align m-auto article-scrapper">
            {DisplayArticle}
          </div>
        </div>
      </div>
    );
  }
}

ReadArticle.propTypes = {
  location: {
    search: PropTypes.any,
  }
};



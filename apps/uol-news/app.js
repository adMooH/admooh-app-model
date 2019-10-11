import React from 'react';
import * as layout from './app.css';
import { AppComponent } from '@admooh-app/core';

import {feedColors, getLinkCode} from './utils';
import uolLogo from './images/uolLogo.png';
import adMooHLogo from './images/adMoohLogo.png';

import posed from "react-pose";

const Box = posed.div({
  hidden: {
    opacity: 0,
    width: 0,
    height: 0
  },
  visible: {
    opacity: 1,
    width: "100%",
    height: "100%"
  }
});

export default class UolNews extends AppComponent {
  constructor(props) {
    super(props);
    const feedType = props.data.feedType;
    this.increaseBarInterval = null;

    console.log('Get feed items', feedType);

    props.context.getData('feedItems_' + feedType).then(feed => {
      console.log('Feed items', feed);

      const items = JSON.parse(feed);
      const news = this._getNewsWithThumbnail(items);
      if(news !== undefined) {
          const fileCode = getLinkCode(news.linkfoto);
          props.context.getData(fileCode).then(path => {
            news.linkfoto = path;
            this.setState({ news });
          });
      }
    });

    this.state = {
      feedType,
      news: undefined,
      color: feedColors[feedType],
      showSplash: true,
      barWidth: 10
    };
  }

  willShow(){
    this.setState({showSplash: false});
    this.increaseBarInterval  = setInterval(this.increaseBar.bind(this), 100);

  }

  increaseBar(){
    const { barWidth } = this.state;
    const nbarWidth = barWidth + 1;
    if(nbarWidth >= 95)
    {
      clearInterval(this.increaseBarInterval);
    }
    else
    {
      this.setState({barWidth: nbarWidth});
    }
  }

  componentWillUnmount() {
    clearInterval(this.increaseBarInterval);
  }

  render() {

    const { news, color, showSplash, barWidth } = this.state;
    if (news === undefined) {
      return <div>{this.state.feedType}</div>;
    } else {

      const type = news.title;
      const description = news.description;
      const picture = news.linkfoto;


      return (
        <>
          <Box key="splash" style={layout.splash} className="box" pose={showSplash ? 'visible' : 'hidden'} >
            <img style={layout.splash___img} src={uolLogo} />
          </Box>
          <div key="news" style={{ ...layout.template_uol_view }} hidden={showSplash}>
            <div style={{ ...layout.content, backgroundImage: 'url('+picture+')' }}>
              <header style={layout.header_bar}>
                <div style={layout.header_bar__logo_uol}>
                  <img style={layout.header_bar__logo_uol___img} src={uolLogo} />
                </div>
                <div style={{ ...layout.header_bar__title, backgroundColor: "rgba("+color + ", 0.8)"}}>
                    <div style={layout.header_bar__title__text}>
                      {type}
                    </div>
                </div>
              </header>
              <div style={{...layout.new, backgroundImage: "linear-gradient(to top, rgba("+ color +", 0.5) 20%, rgba(255, 0, 0, 0) 70%)"}}>
                <div style={{...layout.new__bar, width: barWidth+"%" ,backgroundColor: "rgb("+color+")"}}></div>
                <div style={layout.new__text}>{description}</div>
              </div>
              <footer>
                <div style={layout.footer_admooh}>
                  <img style={layout.footer_admooh___img} src={adMooHLogo} />
                </div>
              </footer>
            </div>
          </div>
        </>
      );
    }
  }

  _getNewsWithThumbnail(items) {
    const itemsWithFoto = items.filter(i => i.linkfoto !== '');
    return itemsWithFoto[this._getRandomIndex(itemsWithFoto.length)];
  }
  _getRandomIndex(arrayLength) {
    const itemsLenght = arrayLength - 1;
    return Math.floor(Math.random() * (itemsLenght - 0) + 0);
  }
}

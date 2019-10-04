import React from 'react';
import * as layout from './app.css';
import { AppComponent } from '@admooh-app/core';

import {daysOfWeek, getLinkCode} from './utils';
import uolLogo from './images/uolLogo.png';
import adMooHLogo from './images/adMoohLogo.png';
import posed from 'react-pose';

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
});

export default class UolNews extends AppComponent {
  constructor(props) {
    super(props);
    const feedType = props.data.feedType;

    props.context.getData('feedItems_' + feedType).then(feed => {
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
      dateNow: new Date(),
      feedType,
      news: undefined,
      rollUp: false
    };
  }

  willShow(){
		this.setState({rollUp: !this.state.rollUp});
	}

  render() {
    const { news, dateNow } = this.state;

    if (news === undefined) {
      return <>{this.state.feedType}</>;
    } else {


      const hour = dateNow.getHours();
      const minute = dateNow.getMinutes();
      const day = daysOfWeek[dateNow.getDay()];
      const date = dateNow.getDate();
      const month = dateNow.getMonth() + 1;

      const type = news.title;
      const description = news.description;
      const picture = news.linkfoto;

      return (
        <div style={{ ...layout.template_uol_view }}>
          <div style={{ ...layout.content, backgroundImage: `url(${picture})` }}>
            <header style={layout.logos}>
              <div>
                <img style={{ ...layout.logos__uol }} src={uolLogo} />
                <Box pose={this.state.rollUp ? 'visible' : 'hidden'}>
                  <img style={{ ...layout.logos__admooh }} src={adMooHLogo} />
                </Box>
              </div>
            </header>
            <footer style={{ ...layout.news }}>
              <div key="bola" style={layout.news__news_content}>
                <h2 style={layout.type}>{type}</h2>
                <h3 style={layout.title}>{description}</h3>
              </div>
              <div style={layout.date}>
                <div>
                  <h2 style={layout.date_h2}>
                    {('0' + hour).slice(-2)}h{('0' + minute).slice(-2)}
                  </h2>
                  <h3 style={layout.date_h3}>
                    {day}, {('0' + date).slice(-2)}/{('0' + month).slice(-2)}
                  </h3>
                </div>
              </div>
            </footer>
          </div>
        </div>
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

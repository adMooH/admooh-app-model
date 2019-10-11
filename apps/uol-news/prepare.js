import { AppRssSource } from '@admooh-app/tools';
import { getLinkCode, feedUrls } from './utils';

export default function Prepare(props) {
  const context = props.context;
  const data = props.data;

  return new Promise(async (resolve, _) => {
    const feedType = data.feedType;
    if (feedType === undefined) resolve(false);

    const feedCode = 'feedItems_' + feedType;
    const feedItems = await context.getData(feedCode);
    if (feedItems === undefined || feedItems === null || feedItems.length === 0) {
      const feedUrl = feedUrls[feedType];

      const rssSource = new AppRssSource(feedUrl);
      const items = await rssSource.getItems(false);

      if (items === undefined || items === null || items.length === 0) resolve(false);

      await context.setData(feedCode, JSON.stringify(items));

      items.forEach(async feedItem => {
        var fotoCode = getLinkCode(feedItem.linkfoto);
        const localPath = await context.download(feedItem.linkfoto);
        await context.setData(fotoCode, localPath);
      });
    }

    resolve(true);
  });
}

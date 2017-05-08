import { FlickrBrowserPage } from './app.po';

describe('flickr-browser App', () => {
  let page: FlickrBrowserPage;

  beforeEach(() => {
    page = new FlickrBrowserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

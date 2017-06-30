import { MPGTrackerPage } from './app.po';

describe('mpgtracker App', () => {
  let page: MPGTrackerPage;

  beforeEach(() => {
    page = new MPGTrackerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

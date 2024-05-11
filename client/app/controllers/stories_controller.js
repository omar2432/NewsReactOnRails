import { Controller } from '@hotwired/stimulus';
import * as ActionCable from '@rails/actioncable';
import * as marked from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { mangle } from 'marked-mangle';

marked.use(gfmHeadingId());
marked.use(mangle());

export default class extends Controller {
  static targets = ['storyList', 'storyAuthor', 'storyText', 'storyRefresh', 'alertDiv', 'errorList'];

  /*
  resetText() {
    const inputAuthor = this.storyAuthorTarget;
    const inputText = this.storyTextTarget;
    const alertDiv = this.alertDivTarget;
    const errorList = this.errorListTarget;

    const errors = [];

    if (!inputAuthor.value || !inputText.value) {
      errorList.innerHTML = '';
      if (!inputAuthor.value) {
        errors.push('Author');
      } else if (!inputText.value) {
        errors.push('Text');
      } else {
        errors.push('Author');
        errors.push('Text');
      }
      errors.forEach((error) => {
        const errorString = `<li>${error}: can't be blank</li>`;
        errorList.insertAdjacentHTML('afterbegin', errorString);
      });
      alertDiv.classList.remove('hidden');
    } else {
      alertDiv.classList.add('hidden');
      errorList.innerHTML = '';
      inputText.value = '';
    }
  }
*/
  refreshStoryList() {
    const refreshBtn = this.storyRefreshTarget;
    refreshBtn.click();
  }

  connect() {
    console.log('connected to Stimulus stories_controller');

    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const cableUrl = `${protocol}${window.location.hostname}:${window.location.port}/cable`;

    this.cable = ActionCable.createConsumer(cableUrl);

    this.cable.subscriptions.create('StoriesChannel', {
      connected: () => {
        console.log('connected to Stories channel using Stimulus controller');
      },
      disconnected: () => {
        console.log('disconnected from Stories channel via Stimulus');
      },
      received: (story) => {
        const htmlText = marked.parse(story.title);
        const htmlStory = `<div><h2>${story.description}</h2><span>${htmlText}</span></div>`;
        this.storyListTarget.insertAdjacentHTML('afterbegin', htmlStory);
      },
    });
  }
}

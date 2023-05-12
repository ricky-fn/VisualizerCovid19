import BaseView from './BaseView'

const icon = require('../assets/close.svg').default

export default class PopupView extends BaseView<{}> {
  wrapper: HTMLElement

  closeButton: HTMLElement

  render() {
    return `
      <div class="popup-wrapper" data-mark="wrapper">
        <div class="popup-header">
          <h2>More Information</h2>
          <div class="popup-close" data-mark="close" data-cy="popup_close">
            <img src="${icon}" alt="close">
          </div>
        </div>
        <div class="popup-content">
          <p>This website is made by <a href="https://www.linkedin.com/in/ricky-jiang/">Ricky Jiang(Linkedin
            Profile)</a>.</p><br>
          <p>I referred the style from <a href="https://www.covidvisualizer.com">covidvisualizer</a>. The goal of this
            project is practicing a complex chart UI with Serverless technology</p><br>
          <p>If you like this project please press star button through <a href="https://github.com/rickysna/VisualizerCovid19">Github page</a></p><br>
          <p>tags:</p>
          <p style="font-size: 12px; color: #5d5d5d;">AWS CloudFront, AMCHATS, Node.js, Webpack, TypeScript, Git</p>
        </div>
      </div>
    `
  }

  registerHooks() {
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.hide(), false)
    }
    // this.viewNode.addEventListener("mousedown", (ev) => {
    //   if (ev.currentTarget === this.viewNode) this.hide();
    // }, false);

    document
      .querySelector('#bottomBar')
      .addEventListener('click', () => this.show(), false)
  }

  onViewReady() {
    this.closeButton = this.viewNode.querySelector('[data-mark="close"]')
    this.wrapper = this.viewNode.querySelector('[data-mark="wrapper"]')
  }

  show() {
    this.viewNode.style.display = 'block'
    setTimeout(() => {
      this.viewNode.style.opacity = '1'
    }, 200)
  }

  hide() {
    this.viewNode.style.opacity = '0'
    setTimeout(() => {
      this.viewNode.style.display = 'none'
    }, 200)
  }
}

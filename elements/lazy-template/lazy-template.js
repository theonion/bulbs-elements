import { registerElement } from 'bulbs-elements/register';
import { InViewMonitor } from 'bulbs-elements/util';
import invariant from 'invariant';
import './lazy-template.scss';

class LazyTemplate extends HTMLScriptElement {
  get loadOn () {
    return this.getAttribute('load-on');
  }

  connectedCallback () {
    invariant(this.hasAttribute('load-on'),
      '<script is="lazy-template"> MUST specify a "load-on" attribute (either "page-load" or "in-view").');

    invariant(this.getAttribute('type') === 'text/html',
      '<script is="lazy-template"> MUST set the attribute type="text/html".');

    if (this.loadOn === 'page-load') {
      this.setupLoadOnPageLoad();
    }
    else if (this.loadOn === 'in-view') {
      this.setUpLoadOnInView();
    }

    this.replaceWithContents = this.replaceWithContents.bind(this);
    this.handleEnterViewport = this.handleEnterViewport.bind(this);
  }

  disconnectedCallback () {
    if (this.loadOn === 'in-view') {
      this.tearDownLoadOnInView();
    }
  }

  setupLoadOnPageLoad () {
    if (document.readyState === 'complete') {
      this.replaceWithContents();
    }
    else {
      window.addEventListener('load', () => this.replaceWithContents());
    }
  }

  setUpLoadOnInView () {
    InViewMonitor.add(this);
    this.addEventListener('enterviewport', this.handleEnterViewport);
  }

  handleEnterViewport () {
    InViewMonitor.remove(this);
    this.replaceWithContents();
  }

  tearDownLoadOnInView () {
    InViewMonitor.remove(this);
  }

  replaceWithContents () {
    this.outerHTML = this.textContent;
  }
}

registerElement('lazy-template', LazyTemplate, { extends: 'script' });

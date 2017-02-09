import React from 'react';
import BulbsArticleBody from './bulbs-article-body';

describe('<bulbs-article-body>', () => {
  let subject;

  beforeEach(() => {
    subject = document.createElement('div', 'bulbs-article-body');
  });

  afterEach(() => {
    document.body.removeChild(subject);
  })

  describe('addDingbat', () => {

    it('should append a dingbat to the last element with text', (done) => {
      subject.innerHTML = `
        <p>this is some text</p>
        <p></p>
      `;
      let p1 = subject.querySelector('p');

      document.body.appendChild(subject);

      setImmediate(() => {
        expect(p1.querySelector('span.site-dingbat')).not.to.be.null;
        done();
      });
    });

    it('should append a dingbat to the last li of a ul', (done) => {
      subject.innerHTML = `
        <ul>
          <li>item one</li>
          <li>item two</li>
        </ul>
      `;
      let li2 = subject.querySelector('li:last-of-type');

      document.body.appendChild(subject);

      setImmediate(() => {
        expect(li2.querySelector('span.site-dingbat')).not.to.be.null;

        done();
      });
    });

    it('should append a dingbat to the last p tag in a div', (done) => {
      subject.innerHTML = `
        <div>
          <p>paragraph one</p>
          <p>paragraph two</p>
        </div>
      `;
      let p2 = subject.querySelector('p:last-of-type');

      document.body.appendChild(subject);

      setImmediate(() => {
        expect(p2.querySelector('span.site-dingbat')).not.to.be.null;

        done();
      });
    });

    it('should append a dingbat to the last tag in a div if the last element is not a p tag', (done) => {
      subject.innerHTML = `
        <div>
          <p>paragraph one</p>
          <footer>not a paragraph</footer>
        </div>
      `;
      let footer = subject.querySelector('div:last-child');

      document.body.appendChild(subject);

      setImmediate(() => {
        expect(footer.querySelector('span.site-dingbat')).not.to.be.null;

        done();
      });
    });

    it('should append a dingbat to end of a p tag before br tags', (done) => {
      subject.innerHTML = `
        <p>
          paragraph one
          <br>
        </p>
      `;
      let p = subject.querySelector('p');

      document.body.appendChild(subject);


      setImmediate(() => {
        expect(p.children[0].tagName).to.equal('SPAN');
        expect(Array.prototype.slice.call(p.children[0].classList)).to.contain('site-dingbat');
        expect(p.children[1].tagName).to.equal('BR');

        done();
      });
    });

    it('should append a dingbat to the end of a p tag if it is the last tag', (done) => {
      subject.innerHTML = `
        <p>one</p>
        <p>two</p>
      `;
      let p = subject.querySelector('p:last-of-type');

      document.body.appendChild(subject);

      setImmediate(() => {
        expect(p.querySelector('span.site-dingbat')).not.to.be.null;
      });
    });
  });
});

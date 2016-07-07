import invariant from 'invariant';

const HTMLCollection = document.body.children.constructor;

export default class BulbsCarouselState {
  constructor (props) {
    invariant(
      typeof props.currentIndex !== 'undefined',
      'BulbsCarouselState requires a currentIndex property'
    );

    invariant(
      props.carouselItems && props.carouselItems.constructor === HTMLCollection,
      'BulbsCarouselState requires a carouselItems property (must be a NodeList)'
    );

    invariant(
      props.carousel && props.carousel.tagName === 'BULBS-CAROUSEL',
      'BulbsCarouselState requires access to a <bulbs-carousel> for width calculations'
    );

    this.props = props;
  }

  get firstItem () {
    return this.props.carouselItems[0];
  }

  getActiveCarouselItem () {
    return Array.prototype.find.call(this.props.carouselItems, (item) => {
      return item.getAttribute('href') === window.location.pathname;
    });
  }

  getGridRatio () {
    if (this.firstItem) {
      return (this.getItemWidth() / this.props.carousel.offsetWidth) || 0;
    }
    return 0;
  }

  getItemMargin () {
    if (this.firstItem) {
      let style = getComputedStyle(this.firstItem);
      return (parseInt(style.marginLeft, 10) || 0) + (parseInt(style.marginRight, 10) || 0);
    }
    return 0;
  }

  getItemWidth () {
    if (this.firstItem) {
      return this.getItemMargin() + this.firstItem.offsetWidth;
    }
    return 0;
  }

  getChildrenPerPage () {
    if (this.firstItem) {
      return Math.round(1 / this.getGridRatio());
    }
    return 0;
  }

  getCurrentPage () {
    if (this.firstItem) {
      let perPage = this.getChildrenPerPage();
      let page = Math.floor(this.props.currentIndex / perPage);
      if (this.props.currentIndex === this.props.carouselItems.length && this.props.currentIndex % perPage === 0) {
        return page - 1;
      }
      return page;
    }
    return 0;
  }

  updateCurrentIndex (magnitude) {
    let perPage = this.getChildrenPerPage();
    let maxPage = parseInt(this.props.carouselItems.length / perPage, 10) - 1;
    this.props.currentIndex = Math.max(0, this.props.currentIndex + parseInt(magnitude, 10));
    if (this.props.currentIndex >= this.props.carouselItems.length) {
      this.props.currentIndex -= perPage;
    }
    if(this.getCurrentPage() > maxPage) {
      this.props.currentIndex = maxPage * perPage;
    }
  }

  pageToCarouselItem (item) {
    let index = Array.prototype.indexOf.call(this.props.carouselItems, item);

    if (index > -1) {
      this.props.currentIndex = index;
    }
  }

  slideToNext () {
    this.updateCurrentIndex(this.getChildrenPerPage());
  }

  slideToPrevious () {
    this.updateCurrentIndex(-this.getChildrenPerPage());
  }

  isOnfirstPage () {
    return this.props.currentIndex === 0;
  }

  isOnLastPage () {
    return this.props.currentIndex + this.getChildrenPerPage() >= this.props.carouselItems.length;
  }
}

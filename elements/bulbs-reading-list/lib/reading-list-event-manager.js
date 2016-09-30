import invariant from 'invariant';
import ReadingList from './reading-list';
import { getScrollOffset, getWindowDimensions } from 'bulbs-elements/util';
import { isUndefined } from 'lodash';

export default class ReadingListEventManager {
  constructor (element, options) {
    invariant(element, 'new ReadingListEventManager(element, stickyNavTetherSelector): element is undefined');
    this.stickyNavTether = document.querySelector(options.stickyNavTetherSelector);
    invariant(this.stickyNavTether,
      `ReadingListEventManager(element, stickyNavTetherSelector): nav tether element with selector "${options.stickyNavTetherSelector}" is not in the DOM`);

    this.element = element;
    this.menuElement = element.getElementsByTagName('bulbs-reading-list-menu')[0];
    this.articlesElement = element.getElementsByTagName('bulbs-reading-list-articles')[0];
    this.initializePinnedContainer(options);
    this.scrollCalculationIsIdle = true;
    this.lastKnownScrollPosition = 0;
    this.readingList = new ReadingList(this.menuElement, this.articlesElement);
  }

  initializePinnedContainer (options) {
    if (options.pinnedContainerSelector) {
      this.pinnedContainer = document.querySelector(options.pinnedContainerSelector);
      this.pinnedTether = document.querySelector(options.pinnedTetherSelector);
      this.pinnedContainerMinWidth = options.pinnedContainerMinWidth;
      this.positionPinnedContainer();
    }
  }

  handleMenuItemClick (evnt) {
    if (this.elementIsInsideMenu(evnt.target)) {
      evnt.preventDefault();
      let item = this.getClickedMenuItem(evnt.target);

      if (item.isLoaded) {
        this.readingList.navigateToItem(item);
      }
      else if (this.readingList.isNextItem(item)) {
        if (this.readingList.shouldLoadNextItem(item)) {
          this.readingList.loadNextItem()
            .then(this.handleLoadNextItemComplete.bind(this));
        }
      }
      else if (this.readingList.isMoreThanOneAhead(item)) {
        this.readingList.redirectToItem(item);
      }
    }
  }

  handleLoadNextItemComplete (item) {
    this.readingList.navigateToItem(item);
  }

  elementIsInsideMenu (element) {
    invariant(element, 'BulbsReadingList.elementIsInsideMenu(element): element is undefined');
    return !!element.closest('bulbs-reading-list-menu');
  }

  getClickedMenuItem (element) {
    let id = element.closest('bulbs-reading-list-item').dataset.id;
    return this.readingList.getListItemById(id);
  }

  isScrollingUp (lastOffset, currentOffset) {
    invariant(!isUndefined(lastOffset), 'ReadingListEventManager.isScrollingUp(lastOffset, currentOffset): lastOffset is undefined');
    invariant(!isUndefined(currentOffset), 'ReadingListEventManager.isScrollingUp(lastOffset, currentOffset): currentOffset is undefined');

    return lastOffset > currentOffset;
  }

  isScrollingDown (lastOffset, currentOffset) {
    invariant(!isUndefined(lastOffset), 'ReadingListEventManager.isScrollingDown(lastOffset, currentOffset): lastOffset is undefined');
    invariant(!isUndefined(currentOffset), 'ReadingListEventManager.isScrollingDown(lastOffset, currentOffset): currentOffset is undefined');

    return lastOffset < currentOffset;
  }

  handleDocumentScrolled () {
    window.requestAnimationFrame(this.processScrollPosition.bind(this));
  }

  stickyNavTetherIsInvisible () {
    let dimensions = this.stickyNavTether.getBoundingClientRect();
    let scrollOffset = getScrollOffset();

    return scrollOffset.y > dimensions.height;
  }

  setNavButtonVisibility () {
    let openMenuButton = document.querySelector('.reading-list-menu-toggle-on');
    let method = this.stickyNavTetherIsInvisible() ? 'add' : 'remove';
    openMenuButton.classList[method]('visible');
  }

  positionPinnedContainer () {
    if (getWindowDimensions().width >= this.pinnedContainerMinWidth) {
      let tetherDimensions = this.pinnedTether.getBoundingClientRect();
      let pinnedDimensions = this.pinnedContainer.getBoundingClientRect();
      let leftOffset = tetherDimensions.right - pinnedDimensions.width;

      this.pinnedContainer.style.left = `${leftOffset}px`;
      let top = tetherDimensions.top < 0 ? 0 : tetherDimensions.top;
      this.pinnedContainer.style.top = `${top}px`;
    }
    else {
      this.pinnedContainer.style.bottom = '';
      this.pinnedContainer.style.left = '';
      this.pinnedContainer.style.right = '';
      this.pinnedContainer.style.top = '';
    }
  }

  processScrollPosition () {
    let offset = getScrollOffset();

    this.setNavButtonVisibility();

    if (this.pinnedContainer) {
      this.positionPinnedContainer();
    }

    if (this.isScrollingDown(this.lastKnownScrollPosition, offset.y)) {
      this.readingList.scrollDown();
    }

    if (this.isScrollingUp(this.lastKnownScrollPosition, offset.y)) {
      this.readingList.scrollUp();
    }

    this.lastKnownScrollPosition = offset.y;
  }
}

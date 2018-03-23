let examples = {
  element: 'bulbs-splitpic',
  examples: {
    'Basic Example': {
      render () {
        return `
          <bulbs-splitpic class="splitpic splitpic-horizontal" orientation="horizontal">
            <div class="splitpic-images size-big" data-start-percent="0">
                <div class="splitpic-image inline splitpic-right-image image crop-original" data-crop="original">
                    <img src="https://images2.onionstatic.com/clickhole/3165/1/original/600.jpg">
                </div>
                <div class="splitpic-image inline splitpic-left-image image crop-original" data-crop="original">
                    <img src="https://images2.onionstatic.com/clickhole/3165/0/original/600.jpg">
                </div>
                <div class="splitpic-bar"></div>
                <div class="splitpic-info">
                    <span class="fa fa-arrow-left"></span> Slide
                    <span class="fa fa-arrow-right"></span>
                </div>
            </div>
            <p class="figcaption">
            </p>
        </bulbs-splitpic>
        `;
      },
    },
    'with attributes': {
      render () {
        return `
          <bulbs-splitpic class="splitpic splitpic-horizontal" orientation="horizontal" bs-image-size="big" bs-start-percent="0" bs-right-image="https://images2.onionstatic.com/clickhole/3165/3/original/600.jpg" bs-left-image="https://images2.onionstatic.com/clickhole/3165/2/original/600.jpg">
            <div class="splitpic-images">
                <div class="splitpic-image inline splitpic-right-image image crop-original" data-crop="original">
                    <img src="">
                </div>
                <div class="splitpic-image inline splitpic-left-image image crop-original" data-crop="original">
                    <img src="">
                </div>
                <div class="splitpic-bar"></div>
                <div class="splitpic-info">
                    <span class="fa fa-arrow-left"></span> Slide
                    <span class="fa fa-arrow-right"></span>
                </div>
            </div>
        </bulbs-splitpic>
        `;
      },
    },
    'with attributes, medium': {
      render () {
        return `
          <bulbs-splitpic class="splitpic splitpic-horizontal" orientation="horizontal" bs-image-size="medium" bs-start-percent="0" bs-right-image="https://images2.onionstatic.com/clickhole/3165/3/original/600.jpg" bs-left-image="https://images2.onionstatic.com/clickhole/3165/2/original/600.jpg">
            <div class="splitpic-images">
                <div class="splitpic-image inline splitpic-right-image image crop-original" data-crop="original">
                    <img src="">
                </div>
                <div class="splitpic-image inline splitpic-left-image image crop-original" data-crop="original">
                    <img src="">
                </div>
                <div class="splitpic-bar"></div>
                <div class="splitpic-info">
                    <span class="fa fa-arrow-left"></span> Slide
                    <span class="fa fa-arrow-right"></span>
                </div>
            </div>
        </bulbs-splitpic>
        `;
      },
    },
    'with attributes, small': {
      render () {
        return `
          <bulbs-splitpic class="splitpic splitpic-horizontal" orientation="horizontal" bs-image-size="small" bs-start-percent="0" bs-right-image="https://images2.onionstatic.com/clickhole/3165/3/original/600.jpg" bs-left-image="https://images2.onionstatic.com/clickhole/3165/2/original/600.jpg">
            <div class="splitpic-images">
                <div class="splitpic-image inline splitpic-right-image image crop-original" data-crop="original">
                    <img src="">
                </div>
                <div class="splitpic-image inline splitpic-left-image image crop-original" data-crop="original">
                    <img src="">
                </div>
                <div class="splitpic-bar"></div>
                <div class="splitpic-info">
                    <span class="fa fa-arrow-left"></span> Slide
                    <span class="fa fa-arrow-right"></span>
                </div>
            </div>
        </bulbs-splitpic>
        `;
      },
    },
    'with attributes, tiny': {
      render () {
        return `
          <bulbs-splitpic class="splitpic splitpic-horizontal" orientation="horizontal" bs-image-size="tiny" bs-start-percent="0" bs-right-image="https://images2.onionstatic.com/clickhole/3165/3/original/600.jpg" bs-left-image="https://images2.onionstatic.com/clickhole/3165/2/original/600.jpg">
            <div class="splitpic-images">
                <div class="splitpic-image inline splitpic-right-image image crop-original" data-crop="original">
                    <img src="">
                </div>
                <div class="splitpic-image inline splitpic-left-image image crop-original" data-crop="original">
                    <img src="">
                </div>
                <div class="splitpic-bar"></div>
                <div class="splitpic-info">
                    <span class="fa fa-arrow-left"></span> Slide
                    <span class="fa fa-arrow-right"></span>
                </div>
            </div>
        </bulbs-splitpic>
        `;
      },
    },
    'with attributes, start at 50': {
      render () {
        return `
          <bulbs-splitpic class="splitpic splitpic-horizontal" orientation="horizontal" bs-image-size="big" bs-start-percent="50" bs-right-image="https://images2.onionstatic.com/clickhole/3165/3/original/600.jpg" bs-left-image="https://images2.onionstatic.com/clickhole/3165/2/original/600.jpg">
            <div class="splitpic-images">
                <div class="splitpic-image inline splitpic-right-image image crop-original" data-crop="original">
                    <img src="">
                </div>
                <div class="splitpic-image inline splitpic-left-image image crop-original" data-crop="original">
                    <img src="">
                </div>
                <div class="splitpic-bar"></div>
                <div class="splitpic-info">
                    <span class="fa fa-arrow-left"></span> Slide
                    <span class="fa fa-arrow-right"></span>
                </div>
            </div>
        </bulbs-splitpic>
        `;
      },
    }
  },
};

export default examples;

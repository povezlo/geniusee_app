class StickyHeadingsService {
  constructor() {
    this.headings = document.querySelectorAll('legend');
    this.sections = document.querySelectorAll('fieldset');
    this.headerHeight = 64; // Height of the header in pixels
  }

  init() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    this.sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < this.headerHeight && rect.bottom > this.headerHeight) {
        this.headings[index].classList.add('sticky');
      } else {
        this.headings[index].classList.remove('sticky');
      }
    });
  }
}

export default StickyHeadingsService;

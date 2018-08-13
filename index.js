(function(window, document) {
  const converterDefaults = {
    inlineClassName: '.inline-js-widget',
    styleLink: 'https://codepen.io/samuherek/pen/355369db7e54bfaaaf4d68e2f12451e8.css' // COMMENT: demo purpose for now only
  };

  const Widget = {
    create(el) {
      const instance = Object.create(Widget);
      return instance.init(el);
    },
    init(el) {
      this.wrap = el;
      this.text = this.createText();
      this.renderWidget();
      // COMMENT: Trigger any event handlers attachment here;
      return this;
    },
    createText() {
      const el = document.createElement('span');
      el.className = 'inline-js-widget-text';
      el.innerText = 'loading...';
      return el;
    },
    renderWidget() {
      this.wrap.appendChild(this.text);
    },
    updateWidget(nextData, nextRate) {
      this.text.innerHTML = `1 ${nextData.base} is ${nextData.rates[nextRate]} ${nextRate}`;
    },
    destroyWidget() {
      // COMMENT: Get rid of any event handlers here;
      this.el.innerHTML = '';
    }
  };

  const Converter = {
    create(options) {
      const instance = Object.create(Converter);
      instance.init(options);
    },
    init(options) {
      this.options = Object.assign({}, converterDefaults, options);
      this.els = [];
      this.addStylesheet(); // COMMENT: only for demo purpose for now
      this.createWidgets();
      this.getConversionData();
    },
    // COMMENT: This method is mainly for demo purpose only for now
    addStylesheet() {
      const head = document.head;
      const link = document.createElement('link');

      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = this.options.styleLink;

      head.appendChild(link);
    },
    createWidgets() {
      document.querySelectorAll(this.options.inlineClassName).forEach(el => {
        this.els.push(Widget.create(el));
      });
    },
    updateWidgets(nextData) {
      this.els.forEach(el => {
        el.updateWidget(nextData, this.options.rate);
      });
    },
    getConversionData() {
      fetch('https://exchangeratesapi.io/api/latest')
        .then(res => res.json())
        .then(res => {
          this.updateWidgets(res);
        })
        .catch(err => {
          console.error('Wrong fetch request', err);
        });
    }
  };

  Converter.create({ rate: 'USD' });
})(window, document);

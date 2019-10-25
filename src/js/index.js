import '../scss/common.scss';
import { Header } from '../components/header';

class Index {
    constructor() {
        this.$app = $('<div id="app">');

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        new Header(this.$app).init();

        $('body').prepend(this.$app);
    }
}

new Index(jQuery);
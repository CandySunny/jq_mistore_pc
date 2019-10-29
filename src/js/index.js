import { Header } from '../components/header';
import { App } from './App';

class Index extends App {
    constructor($) {
        super($, {
            swiper: true,
            phone: true,
            field: true
        });
    }

    render() {
        new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init();

        $('body').prepend(this.$app);
    }
}

new Index(jQuery);
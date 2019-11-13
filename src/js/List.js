import {App} from './App';
import {Header} from '../components/header';
import { Footer } from '../components/footer';
import { Tab } from '../components/tab';
import { ShowBoard } from '../components/show_borad';

import tools from '../utils/tools';

class List extends App {
    constructor($){
        super($, {
            swiper: false,
            phone: true,
            field: true
        });

        this.keyword = tools.getUrlQueryValue('keyword');

        console.log(this.keyword);
    }

    render() {
        const oTab = new Tab(this.$app, this.cache.phoneDatas, this.cache.fieldDatas);
        new Header(this.$app, this.cache.fieldDatas, this.cache.phoneDatas).init();
        oTab.init();
        new ShowBoard(this.$app, oTab.filterDatas(this.cache.phoneDatas, 'all', this.keyword)).init();
        new Footer(this.$app).init();

        $('body').prepend(this.$app);
    }
}

new List(jQuery);
import { App } from './App';
import { Header } from '../components/header';
import { Carousel } from '../components/carousel';
import { BoardTitle } from '../components/board_title';
import { ShowBoard } from '../components/show_borad';
import { Footer } from '../components/footer';

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
        new Carousel(this.$app, this.cache.swiperDatas).init();
        new BoardTitle(this.$app, '手机上新').init();
        new ShowBoard(this.$app, this.filterDatas('new')).init();
        new BoardTitle(this.$app, '超值手机').init();
        new ShowBoard(this.$app, this.filterDatas('valuable')).init();
        new BoardTitle(this.$app, '官方推荐').init();
        new ShowBoard(this.$app, this.filterDatas('recom')).init();
        new Footer(this.$app).init();

        $('body').prepend(this.$app);
    }

    filterDatas (field){
        return this.cache.phoneDatas.filter((item, index)=>{
            switch (field){
                case 'recom':
                    return item.recom ==1;
                    break;
                case 'new':
                    return item.new ==1;
                    break;
                case 'valuable':
                   return item.most_value ==1;
                    break;
                default:
                    break;
            }
        });
    }
}

new Index(jQuery);
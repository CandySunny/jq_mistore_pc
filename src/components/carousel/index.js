import tpl from './tpl/wrapper.tpl';
import itemTpl from './tpl/item.tpl';
import indicatorTpl from './tpl/indicator.tpl';
import controlTpl from './tpl/control.tpl';
import './index.scss';
import tools from '../../utils/tools';

class Carousel {
    constructor (el, data){
        this.name = 'carousel';
        this.$el = el;
        this.data = data;
        this.dataLen = this.data.length;
        this.curIndex = 0;
    }

    async init() {
        await this.render();

        this.autoPlay();
        this.bindEvent();
    }

    async render () {
        await this.$el.append(tools.tplReplace(tpl(), {
            list: this.setList(),
            control: controlTpl(),
            indicatorW: 18 * this.dataLen,
            indicator: this.setIndicator()
        }));

        this.$carousel = $('.J_carousel');
        this.$carItems = this.$carousel.find('.car-item');
        this.$carIndicators = this.$carousel.find('.indicator-item');
    }

    bindEvent() {
        this.$carousel.on('click', $.proxy(this.carouselClick, this));
        this.$carousel.on('mouseenter', $.proxy(this.mouseInOut, this));
        this.$carousel.on('mouseleave', $.proxy(this.mouseInOut, this));
    }

    autoPlay() {
        Carousel.timer = setInterval(this.run.bind(this, 'next'), 2000);
    }

    run(dir) {
        switch(dir) {
            case 'next':
                if (this.curIndex >= this.dataLen){
                    this.curIndex = 0;
                } else {
                    this.curIndex++;
                }
                break;
            case 'prev':
                if (this.curIndex === 0){
                    this.curIndex = this.dataLen - 1;
                } else {
                    this.curIndex--;
                }
                break;
            default:
                break;
        }

        this.fadeAction(this.curIndex);
    }

    fadeAction(index) {
        this.$carItems.eq(index).fadeIn().siblings().fadeOut();
        this.$carIndicators.eq(index).addClass('current').siblings().removeClass('current');

    }

    setList() {
        let list = '';

        this.data.forEach((item, index) => {
            list += tools.tplReplace(itemTpl(), {
                id: item.phone_id,
                swiper_img: item.pic,
                alt: item.alt,
                isActive: index === 0 ? 'active' : ''
            });
        });
        
        return list;
    }

    setIndicator() {
        let list = '';

        for(var i = 0; i < this.dataLen; i++){
            list += tools.tplReplace(indicatorTpl(), {
                isCurrent: i === 0 ? 'current' : ''
            });
        }

        return list;
    }

    mouseInOut(e) {
        const eType = e.type;

        switch(eType){
            case 'mouseenter':
                clearInterval(Carousel.timer);
                break;
            case 'mouseleave':
                this.autoPlay();
                break;
            default:
                break;
        }
    }

    carouselClick(e) {
        const tar = e.target,
              className = tar.className,
              $tar = $(tar);

        switch(className){
            case 'indicator-item':
                this.curIndex = $tar.index();
                this.fadeAction(this.curIndex);
                break;
            case 'car-control':
                const dir = $tar.attr('data-dir');
                this.run(dir);
                break;
            default:
                break;
        }
    }
}

export { Carousel };
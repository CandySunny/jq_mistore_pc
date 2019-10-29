import tpl from './index.tpl';
import './index.scss';

import { Logo } from './logo';
import { Nav } from './nav';
import tools from '../../utils/tools';

class Header {
    constructor(el, fieldDatas, phoneDatas) {
        this.name = 'header';
        this.$el = el;

        this.fieldDatas = fieldDatas;
        this.phoneDatas = phoneDatas;

        this.logo = new Logo();
        this.nav = new Nav();
    }

    async init() {
        await this.render();
        this.bindEvent();
    }

    async render() {
        await this.$el.append(tools.tplReplace(tpl(), {
            logo: this.logo.tpl(),
            nav: this.nav.tpl(this.fieldDatas)
        }));
    }

    bindEvent () {
        const $nav = $('.J_nav');
        $nav.on('mouseenter', '.nav-item', {phoneDatas: this.phoneDatas, oNav: this.nav}, this.nav.navMouseIn);
    }
}

export { Header };
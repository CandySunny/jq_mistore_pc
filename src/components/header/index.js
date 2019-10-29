import tpl from './index.tpl';
import './index.scss';

import { Logo } from './logo';
import { Nav } from './nav';
import tools from '../../utils/tools';
import { Search } from './search';

class Header {
    constructor(el, fieldDatas, phoneDatas) {
        this.name = 'header';
        this.$el = el;

        this.fieldDatas = fieldDatas;
        this.phoneDatas = phoneDatas;

        this.logo = new Logo();
        this.nav = new Nav();
        this.search = new Search();
    }

    async init() {
        await this.render();
        this.bindEvent();
    }

    async render() {
        await this.$el.append(tools.tplReplace(tpl(), {
            logo: this.logo.tpl(),
            nav: this.nav.tpl(this.fieldDatas),
            search: this.search.tpl()
        }));
    }

    bindEvent () {
        const $nav = $('.J_nav'),
              $searchBtn = $('.J_searchBtn');

        $nav.on('mouseenter', '.nav-item', {phoneDatas: this.phoneDatas, oNav: this.nav}, this.nav.navMouseIn);
        $searchBtn.on('click', this.search.searchPhone);
    }
}

export { Header };
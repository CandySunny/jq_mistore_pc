import tpl from './tpl/wrapper.tpl';
import itemTpl from './tpl/item.tpl';
import { ShowBoard } from '../show_borad';
import './index.scss';

import { NoDataTip } from '../no_data_tip';

import tools from '../../utils/tools';

class Tab {
    constructor(el, phoneDatas, fieldDatas) {
        this.name = 'tab';
        this.$el = el;
        this.phoneDatas = phoneDatas;
        this.fieldDatas = fieldDatas;

        this.noDataTip = new NoDataTip();

        this.cache = {};
    }

    async init (){
        await this.render();
        this.bindEvent();
    }

    async render() {
        let list = '';

        this.fieldDatas.forEach((item, index) => {
            list += tools.tplReplace(itemTpl(), {
                field: item.field,
                series_name: item.series_name
            });
        });

        await this.$el.append(tools.tplReplace(tpl(), {
            list
        }));
    }

    bindEvent () {
        const $tab = $('.J_tab'),
              $board = $('.J_board'),
              $searchInput = $('#J_search'),
              oShowBoard = new ShowBoard();

        $tab.on('click', '.tab-item', {$board, oShowBoard}, $.proxy(this.tabClick, this));
        $searchInput.on('input', {$board, oShowBoard, $tab}, tools.throttle($.proxy(this.inputSearch, this), 1000));
    }

    tabClick(e) {
        const tar = e.target,
              $tar = $(tar),
              tagName = tar.tagName.toLowerCase();

        const data = e.data,
              $board = data.$board,
              oShowBoard = data.oShowBoard;

        if (tagName === 'a'){
            const field = $tar.attr('data-field');

            this.tabChange($tar);
            this.appendList(field, $board, oShowBoard);
        }
    }

    inputSearch(e){
        const data = e.data,
              $board = data.$board,
              $tab = data.$tab,
              oShowBoard = data.oShowBoard;
        
        const tar = e.target,
              $tar = $(tar),
              value = tools.trimSpaces($tar.val()),
              vallen = value.length;

        this.tabChange($tab.find('.all'));

        if (vallen <= 0 ){
            this.appendList('all', $board, oShowBoard);
        }else{
            this.appendList('all', $board, oShowBoard, value);
        }
    }

    tabChange($target){
        $target.parent().addClass('current').siblings().removeClass('current');
    }

    appendList(field, $board, oShowBoard, keyword){
        if (keyword){
            let data = this.filterDatas(this.phoneDatas, field, keyword),
                datalen = data.length;

            if (datalen === 0){
                $board.html(this.noDataTip.tpl());
            }else{
                $board.html(oShowBoard.setList(data));
            }
        } else {
            if (!this.cache[field]){
                this.cache[field] = oShowBoard.setList(this.filterDatas(this.phoneDatas, field));
            }
            $board.html(this.cache[field]);
        }
    }

    filterDatas(datas, field, keyword){
        return datas.filter((item, index) => {
            if (keyword) {
                const phone_name = item.phone_name.toLowerCase(),
                      slogan = item.slogan.toLowerCase();
      
                keyword = keyword.toLowerCase();
      
                return phone_name.includes(keyword) || slogan.includes(keyword);
            } else {
                switch (field) {
                    case 'all':
                      return true;
                      break;
                    default:
                      return item.field === field;
                      break;
                }
            }            
        });
    }
}

export { Tab };

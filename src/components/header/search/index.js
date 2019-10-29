import tpl from './index.tpl';
import './index.scss';
import tools from '../../../utils/tools';

class Search {
    constructor (){
        this.name = 'search';
        this.tpl = tpl;
    }

    searchPhone(e) {
        const $searchForm = $('#J_searchForm'),
              $searchInput = $('#J_keyword');

        const keyword = tools.trimSpaces($searchInput.val()),
              action = $searchForm.prop('action'),
              keywordlen = keyword.length;

        if (keywordlen > 0){
            window.open(action + '?keyword=' + keyword);
        }
    }
}

export { Search };
import tpl from './tpl/board.tpl';
import itemTpl from './tpl/item.tpl';
import './index.scss';

import { NoDataTip } from '../no_data_tip';

import tools from '../../utils/tools';

class ShowBoard {
    constructor(el, phoneDatas){
        this.name = 'showboard';
        this.$el = el;
        this.phoneDatas = phoneDatas;
    }

    init (){
        this.render();
    }

    render() {
        this.$el.append(tools.tplReplace(tpl(), {
            list: this.setList(this.phoneDatas) ||new NoDataTip().tpl
        }));
    }

    setList (datas){
        let list = '';

        datas.forEach((item, index)=>{
            list += tools.tplReplace(itemTpl(), {
                id: item.id,
                isFirst: index % 5 === 0 ? 'first' : '',
                pic: $.parseJSON(item.pics)[0][0][0],
                phone_name: item.phone_name,
                slogan: item.slogan.substr(0, 10),
                default_price: item.default_price
            })
        });

        return list;
    }

}

export { ShowBoard }
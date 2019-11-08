import tpl from './index.tpl';
import './index.scss';

import { DetailTitle } from './detaile_title';
import { ContentItem } from './content_item';

import tools from '../../utils/tools';

class DetailBoard {
    constructor(el, phoneData) {
        this.name = 'detailBoard';
        this.$el = el;
        this.phoneData = phoneData;
    }

    init(){
        this.render();
    }

    render(){
        const detailTitle = new DetailTitle(),
              contentItem = new ContentItem(),
              phoneData = this.phoneData,
              colors = $.parseJSON(phoneData.color),
              versions = $.parseJSON(phoneData.version_info);

        let versionList = '',
            colorList = '';

        colors.forEach((item, index) => {
            colorList += contentItem.tpl(item, null, index);
        });
        versions.forEach((item, index) => {
            versionList += contentItem.tpl(item.version, item.price, index);
        })

        this.$el.append(tools.tplReplace(tpl(), {
            pic_url: $.parseJSON(phoneData.pics)[0][0][0],
            phone_name: phoneData.phone_name,
            slogan: phoneData.slogan,
            default_price: phoneData.default_price,
            title1: detailTitle.tpl('手机版本'),
            title2: detailTitle.tpl('手机颜色'),
            versions: versionList,
            colors: colorList
        }));
    }
}

export { DetailBoard };
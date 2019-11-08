import tpl from './index.tpl';
import './index.scss';

import tools from '../../../utils/tools';

class ContentItem {
    constructor() {
        this.name = 'contentItem';
    }

    tpl(content, price, index) {
        return tools.tplReplace(tpl(), {
            isFirst: index === 0 ? 'first' : '',
            content,
            price: price ? price + '元' : ''
        });
    }
}

export { ContentItem };
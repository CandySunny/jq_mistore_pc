import config from '../utils/config';

class IndexModel {
    getDatas(options) {
        const url = `getDatas?swiper=${options.swiper}&phone=${options.phone}&field=${options.field}`;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: config.API.base_url + url,
                type: 'GET',
                dataType: 'JSONP',
                jsonp: 'cb',
                success (data) {
                    resolve(data);
                }
            });
        });
    }
}

export { IndexModel };
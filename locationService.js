// JavaScript source code

function geolocationGet(id) {
    let mapObj = new AMap.Map(id, {})
    let geolocation;
    mapObj.plugin(['AMap.Geolocation'], function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //  �Ƿ�ʹ�ø߾��ȶ�λ��Ĭ��:true
            timeout: 10000, //  ����10���ֹͣ��λ��Ĭ�ϣ������
            maximumAge: 100000, // ��λ�������0���룬Ĭ�ϣ�0
            convert: true, // �Զ�ƫ�����꣬ƫ�ƺ������Ϊ�ߵ����꣬Ĭ�ϣ�true
            showButton: false, //  ��ʾ��λ��ť��Ĭ�ϣ�true
            buttonPosition: 'LB',  // ��λ��ťͣ��λ�ã�Ĭ�ϣ�'LB'�����½�
            buttonOffset: new AMap.Pixel(10, 20), //  ��λ��ť�����õ�ͣ��λ�õ�ƫ������Ĭ�ϣ�Pixel(10, 20)
            showMarker: false, //  ��λ�ɹ����ڶ�λ����λ����ʾ���ǣ�Ĭ�ϣ�true
            showCircle: false, //  ��λ�ɹ�����ԲȦ��ʾ��λ���ȷ�Χ��Ĭ�ϣ�true
            panToLocation: false,  //  ��λ�ɹ��󽫶�λ����λ����Ϊ��ͼ���ĵ㣬Ĭ�ϣ�true
            zoomToAccuracy: false  //  ��λ�ɹ��������ͼ��Ұ��Χʹ��λλ�ü����ȷ�Χ��Ұ�ڿɼ���Ĭ�ϣ�false
        })
        mapObj.addControl(geolocation)
        geolocation.getCurrentPosition()
    })
    return geolocation;
}

/**��ȡ��ͼ��λ*/
window.getLocation = function (id,contenter,callback) {
    let _that = this;
    let geolocation = geolocationGet(id); //��λ
    let contenterElement = document.getElementById(contenter);
    AMap.event.addListener(geolocation, "complete", result => {
        _that.lat = result.position.lat;
        _that.lng = result.position.lng;
        _that.province = result.addressComponent.province;
        _that.adcode = result.addressComponent.adcode;

        _that.city = result.addressComponent.city;
        _that.cityCode = result.addressComponent.citycode;
        _that.district = result.addressComponent.district;
        _that.locationV = _that.province + ' ' + _that.city + ' ' + _that.district;
        if (contenterElement)
            contenterElement.innerHTML = _that.locationV;
        callback(_that.adcode ? _that.adcode : 110101);
    });
};
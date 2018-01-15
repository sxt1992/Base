'use strict';

module.exports = {
    dev: {
        shopUrl: '//shop.sqaproxy.souche.com',
        iframePrefix: 'http://shop.sqaproxy.souche.com/pages/admin/dashboard.html?url=',
        crm: '//cupid.sqaproxy.souche.com',
        f2e: 'http://f2e.souche.com',
        order: '//oms-dev.sqaproxy.souche.com',
        erp: '//erp-dev2.sqaproxy.souche.com'
    },
    prepub: {
        shopUrl: '//shop.prepub.souche.com',
        iframePrefix: '//shop.prepub.souche.com/pages/admin/dashboard.html?url=',
        crm: '//cupid.prepub.souche.com',
        f2e: '//f2e.prepub.souche.com',
        order: '//oms.prepub.souche.com',
        erp: '//erp.prepub.souche.com'
    },
    prod: {
        shopUrl: '//shop.souche.com',
        iframePrefix: '//shop.souche.com/pages/admin/dashboard.html?url=',
        crm: '//cupid.souche.com',
        f2e: '//f2e-assets.souche.com',
        order: '//oms.souche.com',
        erp: '//erp.souche.com'
    }
};

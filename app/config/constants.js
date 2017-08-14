const prodHost = 'http://miyapay.com';
const betaHost = 'http://121.43.110.242';
const testHost = 'http://qtest.miyapay.com';

const prodHosts = 'http://101.37.14.5:81';
const betaHosts = 'http://121.43.110.242:81';
const testHosts = 'http://101.37.14.5:81';

// const prodHost = 'http://miyapay.com';
// const betaHost = 'http://121.43.110.242';
// const testHost = 'http://qtest.miyapay.com';

// const prodHosts = 'http://101.37.14.5:81';
// const betaHosts = 'http://121.43.110.242:81';
// const testHosts = 'http://116.62.53.12:81';


let devHost;
let devHosts;
if (process.env.NODE_ENV === 'debug') {
    devHost = 'http://localhost:8080';
    devHosts = 'http://localhost:8080';
} else {
    devHost = 'http://qtest.miyapay.com';
    devHosts = 'http://101.37.14.5:81';
}

export let host = devHost;
switch (window.env) {
    case 'prod':
        host = prodHost;
        break;
    case 'beta':
        host = betaHost;
        break;
    case 'test':
        host = testHost;
        break;
}

export let hosts = devHosts;
switch (window.env) {
    case 'prod':
        hosts = prodHosts;
        break;
    case 'beta':
        hosts = betaHosts;
        break;
    case 'test':
        hosts = testHosts;
        break;
}

export const SIGN_KEY = 'b881d1c582b5bc357f8b87fcb13dfe72';
// export const PUBLICKEY = 'miyaGXPT';
// export const PRIVATEKEY = 'miyaGXPTpassword';
export const PUBLICKEY = 'miyacrm';
export const PRIVATEKEY = 'miyacrmpassword';

export const USER_TYPE = {
    BRANDLER: {
        text: '品牌商',
        value: 1
    },
    RETAILER: {
        text: '零售商',
        value: 2
    },
    MIYA: {
        text: '米雅运营人员',
        value: 4
    }
};

export const PRODUCT_STATUS = {
    STOP: {
        text: '停用',
        value: 0
    },
    START: {
        text: '启用',
        value: 1
    },
    ALL: {
        text: '全部',
        value: 2
    }
}

export const MARKET_STATUS = PRODUCT_STATUS;

export const COUPON_TYPE = {
    SINGLE: {
        text: '单品券',
        value: 1
    },
    BRAND: {
        text: '品牌满减券',
        value: 2
    },
    VOUCHER: {
        text: '全场券',
        value: 3
    },
    FRESH: {
        text: '生鲜券',
        value: 4
    },
    REBATECOUPON: {
        text: '返券',
        value: 5
    },
    SINGLERATE: {
        text: '单品折扣券',
        value: 6
    },
    VOUCHERRATE: {
        text: '全场折扣券',
        value: 7
    }
}

export const WX_TYPE = {
    SINGLES: {
        text: '单品券',
        value: 1
    },
}

export const COUPON_STATUS = {
    VERIFING: {
        text: '待审核',
        value: 0
    },
    VERIFIED: {
        text: '审核通过',
        value: 1
    },
    VERIFIED_FAIL: {
        text: '审核未通过',
        value: 2
    },
    NOT_START: {
        text: '未开始',
        value: 3
    },
    ONGOING: {
        text: '进行中',
        value: 4
    },
    OVER: {
        text: '已结束',
        value: 5
    },
    OFF: {
        text: '已下架',
        value: 6
    },
    ALL: {
        text: '全部',
        value: 7
    }
};

export const COUPON_USAGE_STATUS = {
    PUBLISH_SUCEESS: {
        text: '发行成功',
        value: 2
    },
    RECEIVED: {
        text: '已领取',
        value: 3
    },
    USED: {
        text: '已核销',
        value: 4
    },
    RETURNED: {
        text: '已退货',
        value: 5
    },
    EXPIRED: {
        text: '已过期',
        value: 7
    }
};

export const COUPON_USAGE_TIME = {
    ALL: {
        text: '全部',
        value: 0
    },
    TODAY: {
        text: '今天',
        value: 1
    },
    WEEK: {
        text: '最近一周',
        value: 2
    },
    MONTH: {
        text: '最近15天',
        value: 3
    }
};

/*zhangdingyong 城市查询 类型定义*/
export const COUPON_CITY_QUERY = {
    PROVINCE: {
        text: "查询省列表",
        value: 1
    },
    CITY: {
        text: "查询市列表",
        value: 2
    }
}

export const FORM_MODE = {
    NEW: {
        text: '新增',
        value: 0
    },
    EDIT: {
        text: '修改',
        value: 1
    }
};

// 报表布局相关参数
export const FORM_ITEM_LAYOUT = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 16
    },
    style: {
        marginTop: '2px',
        marginBottom: '2px'
    }
};

export const MARGIN_STYLE = {
    marginTop: '2px',
    marginBottom: '2px'
};

export const NAV = {
    main: [
        {
            name: '首页',
            key: 'home',
            hash: 'homeData',
            clKey: 'home'
        },
        {
            name: '粉丝洞察',
            key: 'fans',
            hash: 'fansData',
            clKey: 'fansOverData'
        },
        {
            name: '发起活动',
            key: 'activity',
            hash: 'activityData',
            clKey: 'activity'
        },
        {
            name: '活动监测',
            key: 'monitor',
            hash: 'monitorData',
            clKey: 'monitor'
        },
        {
            name: '活动分析',
            key: 'analysis',
            hash: 'reportData',
            clKey: 'select',
        },
        {
            name: '管理中心',
            key: 'management',
            hash: 'goodsData',
            clKey: 'goods'
        },
    ],
    home: {
        name: '首页',
        key: 'home',
        child: [
            [{
                moudle: '首页',
                name: '首页',
                path: '/admin',
                key: 'homeData',
                hash: 'home'
            }]
        ]
    },
    activity: {
        name: '发起活动',
        key: 'activity',
        child: [
            [{
                moudle: '发起活动',
                name: '发起活动',
                path: '/admin/activity/activity',
                key: 'activityData',
                hash: 'activity',
                icon: require('images/m_0.png')
            }
            // , {
            //     moudle: '发起活动',
            //     name: '活动预测方案',
            //     path: '/admin/activity/forecast',
            //     key: 'activityData',
            //     hash: 'forecast',
            //     icon: require('images/m_0.png')
            // }
            ],
            [{
                moudle: '活动列表',
                name: '活动列表',
                path: '/admin/activity/list',
                key: 'listData',
                hash: 'list',
                icon: require('images/m_1.png')
            }]
        ]
    },
    monitor: {
        name: '活动监测',
        key: 'monitor',
        child: [
            [{
                moudle: '活动监测',
                name: '活动监测',
                path: '/admin/monitor/monitor',
                key: 'monitorData',
                hash: 'monitor',
                icon: require('images/m_0.png')
            }]
        ]
    },
    analysis: {
        name: '活动分析',
        key: 'analysis',
        child: [
            [{
                moudle: '活动分析报告',
                name: '活动信息及数据表现',
                path: '/admin/analysis/expression',
                key: 'reportData',
                hash: 'expression',
                icon: require('images/m_0.png')
            }, {
                moudle: '活动分析报告',
                name: '粉丝积累沉淀',
                path: '/admin/analysis/precipitation',
                key: 'reportData',
                hash: 'precipitation',
                icon: require('images/m_0.png')
            }, {
                moudle: '活动分析报告',
                name: '渠道资源布局',
                path: '/admin/analysis/layout',
                key: 'reportData',
                hash: 'layout',
                icon: require('images/m_0.png')
            }, {
                moudle: '活动分析报告',
                name: '用券习惯分析',
                path: '/admin/analysis/habits',
                key: 'reportData',
                hash: 'habits',
                icon: require('images/m_0.png')
            }, {
                moudle: '活动分析报告',
                name: '券种评估优化',
                path: '/admin/analysis/optimization',
                key: 'reportData',
                hash: 'optimization',
                icon: require('images/m_0.png')
            }],
            [{
                moudle: '活动对比分析',
                name: '活动效果对比',
                path: '/admin/analysis/totalFlow',
                key: 'contrastData',
                hash: 'totalFlow',
                icon: require('images/m_1.png')
            }, {
                moudle: '活动对比分析',
                name: '活动粉丝对比',
                path: '/admin/analysis/contrasts',
                key: 'contrastData',
                hash: 'contrasts',
                icon: require('images/m_1.png')
            }]
        ],
    },
    management: {
        name: '管理中心',
        key: 'management',
        child: [
            [{
                moudle: '商品管理',
                name: '商品管理',
                path: '/admin/management/goods',
                key: 'goodsData',
                hash: 'goods',
                icon: require('images/m_0.png')
            }],
            [{
                moudle: '门店类型管理',
                name: '门店类型管理',
                path: '/admin/management/markets',
                key: 'marketsData',
                hash: 'markets',
                icon: require('images/m_1.png')
            }]
            // [{
            //     moudle: '账单管理',
            //     name: '账单管理',
            //     path: '/admin/management/bill',
            //     key: 'billData',
            //     hash: 'bill'
            // }],
            // [{
            //     moudle: '账单详情',
            //     name: '账单详情',
            //     path: '/admin/management/details',
            //     key: 'detailsData',
            //     hash: 'details'
            // }]
        ]
    },
    fans: {
        name: '粉丝洞察',
        key: 'fans',
        child: [
            [{
                moudle: '粉丝总览',
                name: '粉丝总览',
                path: '/admin/fans/fansOverData',
                key: 'fansData',
                hash: 'fansOverData',
                icon: require('images/m_0.png')
            }],
            [{
                moudle: 'Fans Profile模型',
                name: '购物者相似度',
                path: '/admin/fans/buyerSimilar',
                key: 'similar',
                hash: 'buyerSimilar',
                icon: require('images/m_0.png')
            },{
                moudle: 'Fans Profile模型',
                name: '商品品类相似度',
                path: '/admin/fans/classSimilar',
                key: 'similar',
                hash: 'classSimilar',
                icon: require('images/m_0.png')
            }],
            [{
                moudle: '粉丝分类',
                name: '粉丝分类',
                path: '/admin/fans/fanstype',
                key: 'fansTypeData',
                hash: 'fanstype',
                icon: require('images/m_1.png')
            }],
            [{
                moudle: '粉丝标签',
                name: '粉丝标签',
                path: '/admin/fans/fanstag',
                key: 'fansTagData',
                hash: 'fanstag',
                icon: require('images/m_1.png')
            }],

        ]
    }

};

// 高德地图key
export const AMAP_KEY = 'a04b0079cc54c36d41d861a0cfe2d239';

export const IMAGE_TYPE = {
    USER_INFO: {
        text: '商户资质图片',
        value: 1
    },
    LOGO: {
        text: '商户、品牌logo',
        value: 2
    },
    PRODUCT: {
        text: '商品图片',
        value: 3
    }
};

export const TYPEARR = ['','单品券','品牌满减券','全场券','生鲜券','返券','单品折扣券','全场折扣券'];

// 设置可选时间范围
export const DATE_INTERVAL = {
    BEFORE: 0,
    AFTER: 1
};

// 品牌上分析的维度
export const DIMENSIONS = {
    SAAS: '1',
    REGION: '2',
    MARKET: '3',
    TREND: '4',
    GOOD: '5',
    REAL_TIME: '6'
};

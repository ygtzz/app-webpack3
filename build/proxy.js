var target = 'http://t1.vlicai.yinker.net/wb/app/h5';

module.exports = {
    '/index/requestIndexData': {
        target: target,
        changeOrigin: true,
        pathRewrite: { '^/index/requestIndexData': '/index/requestIndexData'}
    },
    '/mine/getUserInfo':{
        target: target,
        changeOrigin: true,
        pathRewrite: { '^/mine/getUserInfo': '/mine/getUserInfo'}
    },
    '/investLoan/getFinanceListData':{
        target: target,
        changeOrigin: true,
        pathRewrite: { '^/investLoan/getFinanceListData': '/investLoan/getFinanceListData'}
    },
}
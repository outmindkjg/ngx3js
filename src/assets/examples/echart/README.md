JSON.stringify(echarts.getInstanceByDom($('.chart-container').get(0)).getOption(), (key, value) => { return key.startsWith('_') || ['storage'].includes(key) ? undefined : value;}, 2)




var config = {
    //头部
    LineName: ['访问者习惯分析'],
    LineData: [[200, 30, 40,50, 60, 210,300]],
    newData: {
        data:[{name: '访问者', value: '75'}],
        text: '1000', 
        subtext: '访问者'
    },
    oldData: {
        data:[{name: '回头客', value: '35'}],
        text: '10100', 
        subtext: '回头客'
    },
    goodsData: {
        data:[{name: '有消费', value: '25'}],
        text: '100', 
        subtext: '有消费'
    },
    //底部
    oldActive: 0,
    sexData: [[50,40,30,20,10,60,70],[50,60,70,80,90,40,30]],
    sexName: ['男','女'],
    sexy: ['周一','周二','周三','周四','周五','周六','周日']
};
var commonData = {
    LintOption: function(dom){
        var dom = dom||{};
        dom.smooth = dom.smooth||true;
        var name = dom.name||config.LineName;
        var series = [];
        for(var i = 0; i < name.length; i++){
            series.push({
                name: name[i],
                symbolSize: 4,
                type: 'line',
                smooth: dom.smooth,
                areaStyle: {
                    normal: {
                        color: dom.background?dom.background[i]:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(40, 98, 152, 0.8)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(40, 98, 152, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.4)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: dom.color?dom.color[i]:'#2193ED'
                    }
                },
                data: dom.data?dom.data[i]:config.LineData[i]
            })
        }
        // 指定图表的配置项和数据
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#2195F2'
                    }
                }
            },
            legend: {
                show: dom.legend||false,
                left:"center",
                data:name,
                y:"5%",
                itemWidth:18,
                itemHeight:12,
                textStyle:{color:"#fff",fontSize:14},
            },
            grid: {
                left: '1%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel:{
                    color:'#eeeef0',
                    textAlign: 'center'
                },
                axisLine: {
                    lineStyle: {
                        color: 'transparent'
                    }
                },
                data: dom.y||['周一','周二','周三','周四','周五','周六','周日']
            }],
            yAxis: [{
                show: false
            }],
            series: series
        }
    },
    chart:function(d){
        var data = d.data;
        var seriesObjs = [];
        var r = 25;
        var color = ['#2196F3'];
        var placeHolderStyle = {
            normal: {
                label: {
                    show: true
                },
                labelLine: {
                    show: false
                },
                color: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0
            }
        }
        for (var i = 0; i < data.length; i++) {
            var seriesObj = {
                name: data[i].name,
                type: 'pie',
                center: [30,28],
                clockWise: false,
                radius: [r - 1 - i * 2, r - i * 2],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: '{c}%',
                            position: 'center',
                            verticalAlign: 'top'
                        },
                        labelLine: {
                            show: false
                        },
                        borderWidth: 3,
                        shadowBlur: 8,
                        borderColor: color[i],
                        shadowColor: 'rgba(32,150,224, 0.6)'
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: data[i].value,
                    label:{
                        show: true,
                        color: '#218FE8',
                        fontFamily: 'Times New Roman',
                        fontWeight: 600
                    }
                }, {
                    value: data[0].value * 4 / 3 - data[i].value,
                    name: 'invisible',
                    itemStyle: placeHolderStyle,
                    label: {
                        show: false
                    }
                }]
            }
            seriesObjs.push(seriesObj)
        }
        return {
            title: {
                text: d.text,
                subtext: d.subtext,
                textStyle: {
                    color: '#eeeef0',
                    fontSize: 14,
                },
                left: 60,
                top: 3
            },
            tooltip: {
                show: false,
                formatter: '{a} : {c}'
            },
            legend: {
                show: false
            },
            toolbox: {
                show: false
            },
            label:{
                show: true
            },
            series: seriesObjs
        }
    }
};
var methods = {
    lint: function(){//折线图初始化
        utils.echart('anayyzeRatio').setOption(commonData.LintOption({
            smooth: false,
            name: config.sexName,
            data: config.sexData,
            color: ['#1D7F78','#E5395F'],
            legend: true,
            y: config.sexy,
            background: [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(121, 232, 208, 0.8)'
            }, {
                offset: 0.8,
                color: 'rgba(121, 232, 208, 0)'
            }], false),new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 184, 184, 0.8)'
            }, {
                offset: 0.8,
                color: 'rgba(255, 184, 184, 0)'
            }], false)]
        }))
    },
    chart: function(){
        console.log(config.LineData)
        utils.setLint(commonData.LintOption())
        utils.echart('statisNew').setOption(commonData.chart(config.newData))
        utils.echart('statisOld').setOption(commonData.chart(config.oldData))
        utils.echart('statisGoods').setOption(commonData.chart(config.goodsData))
    },
    mounted: function(){
        $(function(){
            setTimeout(function(){
                $('.allLoading').remove();
            },200);
            layui.use(['form','flow','element'], function(){
                var form = layui.form, element = layui.element;
                var flow = layui.flow;
                form.on('select(seek)',function(e){
                    utils.getSexData(e.value)
                });
                flow.load({
                    elem: '#collapse'
                    ,scrollElem: '#collapse'
                    ,done: function(page, next){
                        setTimeout(function(){
                            var lis = [];
                            for(var i = 0; i < 8; i++){
                                lis.push('<div class="layui-colla-item">\
                                    <h2 class="layui-colla-title">2018/8/12 儿童数据分析</h2>\
                                    <div class="layui-colla-content">\
                                    <p>儿童数据同比增长20%;</p>\
                                    </div>\
                                    </div>')
                            }
                            next(lis.join(''), page < 10);
                            element.init();
                        }, 500);
                    }
                })
            });
            $('.analyze-tab .analyze-item').off().on('click',function(){
                if(config.oldActive === $(this).index()){
                    return
                };
                config.oldActive = $(this).index();
                $(this).addClass('active').siblings('.active').removeClass('active');
                utils.getData();

                //remove start
                config.LineData = [];
                var arr = []
                for(var i = 0; i < 7; i++){
                    arr.push(Math.floor(Math.random()*1000))
                }
                config.LineData.push(arr);
                //remove end
                methods.chart();
                switch($(this).index()){
                    case 0:

                    break;
                    case 1:
                    break;
                    case 2:
                    break;
                    case 3:
                    break;
                }
            })
        })
    }
};
var utils = {
    echart: function(dom){//生成echart对象
        return echarts.init(document.getElementById(dom))
    },
    lint: function(){//折线对象
        return utils.echart('analyzeLine')
    },
    setLint:function(dom){//设置折线属性
        utils.lint().setOption(dom)
    },
    getData: function(){
        //初始化
        utils.getSexData(0);
        $("select[name=select]").val(0);
        layui.form.render('select')
    },
    getSexData:function(e){//一周男女比例数据请求
        var d = [];
        var d2 = [];
        switch(e*1){
            case 0:
            case 1:
            for(var i = 0; i < 7; i++){
                d.push(Math.floor(Math.random()*100));
                d2.push(100 - d[i]);
            }
            config.sexy = ['周一','周二','周三','周四','周五','周六','周日']
            break;
            case 2:
            case 3:
            config.sexy = [];
            for(var i = 0; i < 30; i++){
                d.push(Math.floor(Math.random()*100));
                d2.push(100 - d[i]);
                config.sexy.push(i+1)
            }
            break;
        }
        config.sexData = [d,d2];
        methods.lint();
    }
};
;(function(){
    for(var i in methods){
        methods[i]()
    }
})();
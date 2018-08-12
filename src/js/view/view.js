 /**
 * Created by isoftstone on 2018/8/2.
 */

var config = {
        videoImgClass: 'layui-col-xs12 layui-col-sm6 layui-col-md4',
        newVideoImgClass: 'layui-col-xs12 layui-col-md4 layui-col-sm4',
        itemImgClass: 'layui-col-xs12 layui-col-sm6 layui-col-md4',
        newItemImgClass: 'layui-col-md12 layui-col-sm12',
        VideoFlag: false,
        imgBox: [],//用来存储后台获取到的图片   搜索'删除'删除家属
        video: {name: 'demo001', date: "2018/1/1", src:'/src/image/demo.mp4'},//点击视频数据
    }
    //imgbox  格式 [{name: xxx,src:xxx}]  name名字   src  路径
    //video   格式 {name: xxx, src: xxx, date: xxx}
var utils = {
    height: function(){
        $('.videoImg').height($('.videoImg').width()*3/4);
    },
    video: function(){
        $('#view').remove();
        $(this).closest('.videoWrapper').removeClass(config.videoImgClass).addClass(config.newVideoImgClass).before('<div id="view" class="layui-col-xs12 layui-col-sm8 layui-col-md8">\
                    <div id="list_Myview" style="display: none;">\
                        <div class="sl_top">\
                            <p><span>'+config.video.name+'</span>'+config.video.date+'</p>\
                        </div>\
                        <video id="sl_name" controls="controls" pause() src="'+config.video.src+'" autoplay="autoplay" play() controlsList="nodownload" preload="autoplay" autoplay="autoplay" controls="false" load()>\
                            <source src="'+config.video.src+'"  type="video/ogg" />\
                            <source src="'+config.video.src+'"  type="video/mp4" />\
                            <embed src="'+config.video.src+'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true"></embed>\
                        </video>\
                    </div>\
                    <div id="list_view">\
                        <ul>\
                        </ul>\
                    </div>\
                </div>');
        $('.videopadding').removeClass(config.itemImgClass).addClass(config.newItemImgClass);
        config.VideoFlag = true;
        $("#list_Myview").show();
        
        setTimeout(function(){
            utils.height();
        },100)
    }
}
    var methods = {
        seek: function(){
            $('.seek').on('blur',function(){
                //搜索完成后找到对应元素   插入
                utils.video.call($('.videopadding').eq(0))
            }).on('keyup',function(e){
                if(e.keyCode === 13){
                    utils.video.call($('.videopadding').eq(0))
                }
            })
        },
        click: function(){//图片点击事件
            $('.videoWrapper').on('click', '.videopadding',function(){
                utils.video.call(this)
            });
        }, 
        flow: function(){//流加载
            layui.use('flow', function(){
                var flow = layui.flow;
                flow.load({
                    elem: '#VideoImgs .videoWrapper', //流加载容器
                    scrollElem: '#VideoImgs .videoWrapper',
                    done: function(page, next){ //执行下一页的回调

                        //模拟数据插入
                        setTimeout(function(){
                            var lis = [];
                            //删除start
                            config.imgBox = [];
                            for(var i = 0; i < 10; i++){
                                config.imgBox.push({name: 'canm00'+Math.floor(Math.random()*100),src:'/src/image/p1.png'})
                            }
                            //删除end
                            for(var i = 0; i < config.imgBox.length; i++){
                                lis.push('<li class="'+(config.VideoFlag?config.newItemImgClass:config.itemImgClass)+' videopadding">\
                                    <div class="videoImg" style="background-image: url('+config.imgBox[i].src+')">\
                                    </div>\
                                    <p class="videoText"><i class="icon icon-cameraName"></i><span>'+config.imgBox[i].name+'</span></p>\
                                    </li>')
                            }
                            next(lis.join(''), page < 10); //假设总页数为 10
                            utils.height();
                        }, 500);
                    }
                });  
            });
        }
    }
    utils.height();
    ;(function(){
        for(var i in methods){
            methods[i]();
        }
    })();
	

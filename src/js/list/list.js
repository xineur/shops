var config = {
	listTemplate: '{{each data.records}}<tr>\
				<td class="border_first">\
					<div class="man_span commen">\
					</div>\
				男性</td>\
				<td>在商场内</td>\
				<td>{{$value.date}}<p class="time">02:32PM</p></td>\
				<td>{{$value.per_time}}分钟</td>\
				<td>\
					<div class="pro">\
						<p class="item"><span class="icon t1"></span>白色</p>\
						<p class="item"><span class="icon t2"></span>白色</p>\
						<p class="item"><span class="icon t3"></span>白色</p>\
					</div>\
				</td>\
				<td>首次</td>\
				<td>是</td>\
				<td class="details"><span class="dot"></span>\
					<span id="details-1">查看详情</span>\
				</td>\
			</tr>{{/each}}',

};
var utils = {
	template:function(data){
		return template.render(config.listTemplate,{data:data});
	},
	getData: function(n,f,fun){
		var that = this;
		
	},
};

var methods = {
	engine: function(){
		for(var i in methods){
			if(i != 'engine'){
				this[i]();
			}
		}
	},
	init: function(){
		$('.common-input').remove();
	},
	scroll: function(res){
		var that = this;
		var flag = true;
		layui.flow.load({
		    elem: '#content_body' //流加载容器
		    ,scrollElem: '.table_content' //滚动条所在元素，一般不用填，此处只是演示需要。
		    ,done: function(page, next){ //执行下一页的回调
				$.get('/face/openFaceList/1?pageSize=15',{page: page},function(res){
		    		next(that.template(res.pageData), page < res.pageData.pages);
		    		if(flag){
		    			flag = false
						setTimeout(function(){
							$('.allLoading').remove()
						},200);
		    		}
				});
		    }
		});
	},
	datails: function(){//点击他弹出详情事件
		$('#content_body').on('click', '.details',function (event) {
		    event.stopPropagation();//阻止事件冒泡
		    $(this).find("#details-1").toggle();
		    $(this).parent().siblings().find(".details").find("#details-1").hide();
		    $(this).find("#details-1").click(function(){
		     	location.href="/src/page/list_macth.html";
		    })
		    var tag = $(this).find("#details-1");
		    var flag = true;
		    $(document).bind("click",function(e){
		     	var target = $(e.target);
		     	if(target.closest(tag).length == 0 && flag == true){
		     		$(tag).hide();
		     		flag = false;
		     	}
		    });
  		});
	},
	upload: function(){//点击弹出上传事件
		$(".portrait").on("click",function(){
		    layer_a=layer.open({
			  	type: 2, 
			  	closeBtn: 1,
			  	title: false,
			  	scrollbar: false,
			  	shade: [0.8, '#393D49'],
			  	area: ['100%', '100%'],
			  	content:'/src/page/list_pop.html',
			});
	  	});
	}
}

var goodsList = {};
for(var i in config){
	goodsList[i] = config[i];
}
for(var i in utils){
	goodsList[i] = utils[i];
}
for(var i in methods){
	goodsList[i] = methods[i];
}
$(function(){
	goodsList.engine();
})
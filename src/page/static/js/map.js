	var config = {
		ratio: 0,//控制当前缩放比例
		heightRatio: $('#mapWrapper').width() / $('#mapWrapper').height(),//获取屏幕的宽高比
		scale: $('#mapWrapper').width() / $('.mapWrapper').width(),//大框比例
		minscale: 0,
		activeMap: 0,
		oldratio: 0,//yu 当前缩放比例对比
		ox: 0,
		oy: 0,
		nx: 0,
		ny: 0,
	};
	var methods = {
		keyup: function(){//鍵盤事件
			$(document).on('keyup',function(e){
				switch(e.keyCode){
					case 38://up
					utils.mapMousewheel('up');
					break;
					case 40://down
					utils.mapMousewheel('down');
					break;
				}
				if(e.ctrlKey&&e.keyCode === 48){//ctrl+0還原事件
					config.ratio = 0;
					$('.mapWrapper').css({transform:'scale(1)',marginLeft: 0, marginTop: 0});
					$('.frame').css({transform:'scale(1)',left: 0, top: 0});
				}
			})
		},
		mousemove:function(){//拖动事件
			$('#mapWrapper').on('mousedown',function(e){
				var ml = parseInt($(this).find('.mapWrapper').css('margin-left'));
				var mt = parseInt($(this).find('.mapWrapper').css('margin-top'));
				var ox = e.clientX - ml;
				var oy = e.clientY - mt;
				var $t = $(this).find('.mapWrapper');
				var oldx = 0;
				var oldy = 0;
				$(document).on('mousemove',function(e){
					var nx = e.clientX - ox;
					var ny = e.clientY - oy;
					ml = parseInt($(this).find('.mapWrapper').css('margin-left'));
					mt = parseInt($(this).find('.mapWrapper').css('margin-top'));
					if($('#mapWrapper').width() >= $('.mapWrapper').width()*(1+config.ratio*0.01)){//缩小
						if(nx >= -$('.mapWrapper').width()*(config.ratio*0.01/2)){
							if(oldx > nx){//left
								ox = e.clientX - ml;
							};
							setTimeout(function(){
								oldx = nx;
							},50);
						}else
						if(nx <= -($('#mapWrapper').width() - $('.mapWrapper').width()*(1+config.ratio*0.01))){
							if(oldx < nx){//right
								ox = e.clientX - ml;
							};
							setTimeout(function(){
								oldx = nx;
							},50);
						}else {
							$t.css({'margin-left': nx});
							$('.frame').css({left: -nx/config.minscale});
						}
						if(ny >= -$('.mapWrapper').height()*(config.ratio*0.01/2)){
							if(oldy > ny){//left
								oy = e.clientY - mt;
							}
							setTimeout(function(){
								oldy = ny;
							},50);
						}else if(ny <= -($('#mapWrapper').height() - $('.mapWrapper').height()*(1+config.ratio*0.01))){
							if(oldy < ny){//right
								oy = e.clientY - mt;
							}
							setTimeout(function(){
								oldy = ny;
							},50)
						}else{
							$t.css({'margin-top': ny});
							$('.frame').css({top: -ny/config.minscale});
						}
					}else{//放大
						if(nx >= Math.floor($('.mapWrapper').width()*(config.ratio*0.01/2))){
							if(oldx > nx){//left
								ox = e.clientX - ml;
							};
							setTimeout(function(){
								oldx = nx;
							},50);
						}else if(nx <= $('#mapWrapper').width() - $('.mapWrapper').width()*(1+config.ratio*0.01/2)){
							if(oldx < nx){//right
								ox = e.clientX - ml;
							};
							setTimeout(function(){
								oldx = nx;
							},50);
						}else {
							$t.css({'margin-left': nx});

							$('.frame').css({left: -nx/config.minscale});
						}
						if(ny >= $('.mapWrapper').height()*(config.ratio*0.01/2)){
							if(oldy > ny){//left
								oy = e.clientY - mt;
							}
							setTimeout(function(){
								oldy = ny;
							},50);
						}else if(ny <= $('#mapWrapper').height() - $('.mapWrapper').height()*(1+config.ratio*0.01/2)){
							if(oldy < ny){//right
								oy = e.clientY - mt;
							}
							setTimeout(function(){
								oldy = ny;
							},50)
						}else{
							$t.css({'margin-top': ny});
							$('.frame').css({top: -ny/config.minscale});
						}
					}
				})
			});
			$(document).off('mouseup').on('mouseup',function(){
				$(this).off('mousemove');
			})
		},
		mapWheel: function(){//滚轮事件
			$('#mapWrapper').on('mousewheel',function(e){
				if(e.wheelDelta > 0){//上划事件
					utils.mapMousewheel('up');
				}else{//下滑事件
					utils.mapMousewheel('down');
				}
			})
		},
		hover: function(){//鼠标移入事件
			$('.imghover').hover(function(){
				utils.mapActive.call(this)
			},function(){
				utils.mapUnactive.call(this)
			})
		},
		setheight: function(){//初始化高度
			$('.mapWrapper').height($('.mapWrapper').width() / config.heightRatio);
			$('.minMap').height($('.minMap').width() / config.heightRatio);
			$('.frame').width($('.minMap').width() * config.scale).height($('.minMap').height()*config.scale);
			utils.updateRatio();
		},
		click: function(){//地图点击事件
			$('.imgwrapper').on('click',function(){
				utils.mapActive.call(this);
				$(this).data({'img': true}).siblings('.imgwrapper').each(function(){
					if($(this).data('img')){
						$(this).data({'img': false});
						utils.mapUnactive.call(this)
					}
				})
			})
		},
		framemosemove:function(){//小框拖動事件
			$('.frame').off().on('mousedown',function(e){
				e.stopPropagation();
				var ml = parseInt($(this).css('left'));
				var mt = parseInt($(this).css('top'));
				var ox = e.clientX - ml;
				var oy = e.clientY - mt;
				var $t = $(this);
				var oldx = 0;
				var oldy = 0;
				$(document).on('mousemove',function(e){
					var nx = e.clientX - ox;
					var ny = e.clientY - oy;
					ml = parseInt($t.css('left'));
					mt = parseInt($t.css('top'));

					if(nx <= 0){
						if(oldx < nx){//left
							ox = e.clientX - ml;
						};
						setTimeout(function(){
							oldx = nx;
						},50);
					}else if(nx + $t.width() >= $t.parent('.minMap').width()-5){
						if(oldx < nx){//right
							ox = e.clientX - ml;
						};
						setTimeout(function(){
							oldx = nx;
						},50);
					}else{
						$t.css({'left': nx-1});
						$('.mapWrapper').css({marginLeft: (-nx)*config.minscale})
					}

					if(ny <= 0){
						if(oldy < ny){//left
							oy = e.clientY - mt;
						};
						setTimeout(function(){
							oldy = ny;
						},50);
					}else if(ny + $t.height() >= $t.parent('.minMap').height()-5){
						if(oldy < ny){//right
							oy = e.clientY - mt;
						};
						setTimeout(function(){
							oldy = ny;
						},50);
					}else{
						$t.css({'top': ny-1});
						$('.mapWrapper').css({marginTop: (-ny-1)*config.minscale});
					}	
				})
			})
		}
	};
	var utils = {
		mapMousewheel: function(type){//页面缩放事件
			var nx = 0;
			var top = $('.mapWrapper').css('margin-top').split('p')[0]*1;
			var left = $('.mapWrapper').css('margin-left').split('p')[0]*1;
			switch(type){
				case 'up':
				if(config.ratio >= 60){
					return
				};
				config.ratio++;
				nx = (config.oldratio - config.ratio)*0.01;
				$('.mapWrapper').css({"transform":'scale('+(1+config.ratio*0.01)+')', 'margin-top': top + top*nx, 'margin-left': left + left*nx});
				break;
				case 'down':
				if(config.ratio <= -60){
					return
				};
				config.ratio--;
				nx = (config.oldratio - config.ratio)*0.01;
				$('.mapWrapper').css({"transform":'scale('+(1+config.ratio*0.01)+')', 'margin-top': top - top*nx, 'margin-left': left - left*nx});
				break;
			}
			$('.frame').css({'transform':'scale('+(1-config.ratio*0.01)+')'})
			config.oldratio = config.ratio;
		},
		mapActive: function(){//鼠标移入  点击
			var name = '',dom = $(this).closest('.imgwrapper').attr('class').split(' ');
			for(var i = 0; i < dom.length; i++){
				if(dom[i].indexOf('Area') != -1){
					name = dom[i]
				}
			}
			var img = $('#'+name);
			img.attr('src','./static/img/'+img.data('src')).css({transform: 'scale(1.05)'}).siblings('.imgShade').css({'box-shadow': '0 0 90px 0 #222',background: '#26272F'}).parent('.imgbox').css({zIndex: 1});
			img.siblings('.Camera').show()
		},
		mapUnactive: function(){//鼠标移出  点击
			if($(this).closest('.imgwrapper').data('img')){
				return
			}
			var name = '',dom = $(this).closest('.imgwrapper').attr('class').split(' ');
			for(var i = 0; i < dom.length; i++){
				if(dom[i].indexOf('Area') != -1){
					name = dom[i]
				}
			}
			var img = $('#'+name);
			img.attr('src','./static/img/shade'+img.data('src')).css({transform: 'scale(1)'}).siblings('.imgShade').css({'box-shadow': 'none',background: 'transparent'}).parent('.imgbox').css({zIndex: 0});
			img.siblings('.Camera').hide();
		},
		updateRatio: function(){//更新比例
			config.heightRatio = $('#mapWrapper').width() / $('#mapWrapper').height();
			config.scale = $('#mapWrapper').width() / $('.mapWrapper').width();
			config.minscale = $('.mapWrapper').width()/$('.frame').width();
		}
	};
	;(function(){
		for(var i in methods){
			methods[i]()
		}
		layui.use(['form'], function(){
			
		})
	})()
	var config = {
		ratio: 0,//控制当前缩放比例
		heightRatio: $('#mapWrapper').width() / $('#mapWrapper').height(),//获取屏幕的宽高比
		scale: $('#mapWrapper').width() / $('.mapWrapper').width(),//大框比例
		camera: true,//摄像头
		cameraName: true,//摄像头名字
		minscale: 0,
		activeMap: 0,
		oldratio: 0,//yu 当前缩放比例对比
		ox: 0,
		oy: 0,
		nx: 0,
		ny: 0,
		imgs:['/src/image/12.png','/src/image/11.png','/src/image/10.png','/src/image/9.png','/src/image/6.png']
	};
	var methods = {
		keyup: function(){//鍵盤事件   右侧工具栏事件   缩放事件
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
			});
			$('.icon-zoom').on('click',function(){
				utils.mapMousewheel('up');
			});
			$('.icon-shrink').on('click',function(){
				utils.mapMousewheel('down');
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
			});
		},
		hover: function(){//鼠标移入事件    高亮
			$('.imghover').hover(function(){
				utils.mapActive.call(this)
			},function(){
				utils.mapUnactive.call(this)
			})
		},
		click: function(){//地图点击事件    高亮
			$('.imgwrapper').on('click',function(){
				utils.mapActive.call(this);
				$(this).addClass('active').siblings('.active').removeClass('active');
				$(this).data({'img': true}).siblings('.imgwrapper').each(function(){
					if($(this).data('img')){
						$(this).data({'img': false});
						utils.mapUnactive.call(this)
					}
				})
			})
		},
		select: function(){//下拉框切换事件    高亮 初始
			utils.mapActive.call($('.imgwrapper').eq(0));
            $('.imgwrapper').eq(0).addClass('active').siblings('.active').removeClass('active');
			$('.imgwrapper').eq(0).data({'img': true}).siblings('.imgwrapper').each(function(){
				if($(this).data('img')){
					$(this).data({'img': false});
					utils.mapUnactive.call(this)
				}
			})
		    layui.use(['form'], function(){
		        layui.form.on('select(select)', function(d){
		            var text = '';
		            switch(d.value){
		                case '1':
		                    text = 'A区摄像头(10/10)';
		                break;
		                case '2':
		                    text = 'B区摄像头(0/0)';
		                break;
		                case '3':
		                    text = 'C区摄像头(0/0)';
		                break;
		                case '4':
		                    text = 'D区摄像头(0/0)';
		                break;
		                case '5':
		                    text = 'E区摄像头(0/0)';
		                break;
		            }
		            $('.tit').text(text);
		            utils.mapActive.call($('.imgwrapper').eq(d.value-1));
		            $('.imgwrapper').eq(d.value-1).addClass('active').siblings('.active').removeClass('active');
					$('.imgwrapper').eq(d.value-1).data({'img': true}).siblings('.imgwrapper').each(function(){
						if($(this).data('img')){
							$(this).data({'img': false});
							utils.mapUnactive.call(this)
						}
					})
		        });
		    })
		},
		setheight: function(){//初始化事件
			console.log($('.common-input,.portrait').remove())
			$('.mapWrapper').height($('.mapWrapper').width() / config.heightRatio);
			$('.minMap').height($('.minMap').width() / config.heightRatio);
			$('.frame').width($('.minMap').width() * config.scale).height($('.minMap').height()*config.scale);
			utils.updateRatio();
			for(var i = 0; i < config.imgs.length; i++){
				$('body').append($('<img>').addClass('loadImgRemove').attr({'src':config.imgs[i]}))
			}

			var loadFlage = true,time = '';

			function load(){
				$('img').each(function(){
					if($(this).width() === 0){
						loadFlage = false;
            			return false;
					}
				});
				if(loadFlage){
					clearTimeout(time);
					$('.allLoading').remove();
					$('.loadImgRemove').remove();
				}else{
					loadFlage = true;
			        time = setTimeout(function(){
			            load();
			        },500);
				}
			}
			load();
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
		},
		checkbox: function(){//左侧工具栏事件
			$('.layui-form-switch').on('click',function(){
				$(this).toggleClass('layui-form-onswitch');
				if($(this).hasClass('layui-form-onswitch')){
					switch($(this).attr('filter')){
						case 'camera':
							config.camera = true;
							$('.active').prev('.imgbox').find('.Camera[filter="camera"]').show();
						break;
						case 'cameraName':
							config.cameraName = true;
							$('.active').prev('.imgbox').find('.Camera[filter="cameraName"]').show();
						break;
					}
				}else{
					switch($(this).attr('filter')){
						case 'camera':
							config.camera = false;
							config.cameraName = false;
							$('.layui-form-switch[filter="cameraName"]').removeClass('layui-form-onswitch');
							$('.Camera').hide();
						break;
						case 'cameraName':
							config.cameraName = false;
							$('.Camera[filter="cameraName"]').hide();
						break;
					}
				}
			})
		},
		stop:function(){//防止冒泡事件
			$('.tool .icon,.layui-unselect').on('mousedown',function(e){
				e.stopPropagation();
			});
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
			img.attr('src','/src/image/'+img.data('src')).css({transform: 'scale(1.05)'}).siblings('.imgShade').css({'box-shadow': '0 0 90px 0 #222',background: '#26272F'}).parent('.imgbox').css({zIndex: 1});
			if(config.camera){
				img.siblings('.Camera[filter="camera"]').show()
			}if(config.cameraName){
				img.siblings('.Camera[filter="cameraName"]').show()
			}
			
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
			img.attr('src','/src/image/shade'+img.data('src')).css({transform: 'scale(1)'}).siblings('.imgShade').css({'box-shadow': 'none',background: 'transparent'}).parent('.imgbox').css({zIndex: 0});
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
	})()
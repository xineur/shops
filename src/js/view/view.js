 /**
 * Created by isoftstone on 2018/8/2.
 */
var config = {
    src: '/src/image/demo.mp4'
};
$(function(){
    model.onDeviceReady()
})
var model ={
    onDeviceReady:function(){
        var url = '';
        model.loadingView(url);
        model.bindEvent();
        var myVideo = document.getElementById("sl_name");
        myVideo.pause();
        $("#list_view").on("click","li a",function(){
        	
        	
            $("#list_Myview").show();
            $("#list_view").addClass("sl_left");
            if(!url){
            	//动画
	           	$("#list_view li").removeClass("sl_hide");
	            $(this).parent("li").addClass("sl_hide");
            }
           	//视频
            
            model.playView(myVideo);
        })
    },
    playView:function(myVideo){
        myVideo.pause();
        myVideo.src = config.src;
        myVideo.autoplay = "autoplay"
        myVideo.play();
    },
    loadingView:function(url){
        model.data = [{"index":"1","src":"1",text:"canm001"},{"index":"2","src":"1",text:"canm002"},{"index":"3","src":"1",text:"canm003"},{"index":"4","src":"1",text:"canm004"}];
        var li = "";
        $.each(model.data,function(){
            if(model.data.length > 0){
                if(url){
                	if(url == this.index){
                		 li += '<li><a><input class="state" type="hidden" value="'+ this.index +'" name="001" />'+
                        '<div><img onerror="srcthis.=\'/src/image/image-placeholder.png\'" src="/src/image/p1.png" alt="title"/></div>'+
                        '<div><p><i class="icon-img"></i>'+ this.text +'</p></div></a></li>'
                	}else{
                		li += ''
                	}
                }else{
                    li += '<li><a><input class="state" type="hidden" value="'+ this.index +'" name="001" />'+
                        '<div><img onerror="srcthis.=\'/src/image/image-placeholder.png\'" src="/src/image/p1.png" alt="title"/></div>'+
                        '<div><p><i class="icon-img"></i>'+ this.text +'</p></div></a></li>'
                }
            }else{
                li = ''
            }
        })
        $("#list_view ul").html(li);
    },
    bindEvent:function(){
        var state = $("#list_view .state").val();
    }
}

	

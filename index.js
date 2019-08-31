//轮播图效果
$(function(){
//鼠标移入，停止自动轮播，鼠标移出，继续自动轮播
var i=0;//正在显示第几张图片，从0开始
var liwidth=1100;//每张图片宽度
var duration=1000;//每次轮播动画持续时间
var licount=6;//li总个数，比实际图片少1，最后一张不计算在内
//要移动的ul
var $ulimgs=$("#ul-imgs");
//包含小圆点列表的ul
var $ulidxs=$("#ul-idxs");
//小圆点的元素列表
var $lis=$ulidxs.children();
//封装函数，使轮播图片从当前位置移动到任意位置
function moveTo(to){
  //如果没输入要跳到第几张，默认跳到下一张
  if(to==undefined){
    to=i+1;
  }
  //如果滚动从头开始，重新加上transition
  if(i==0){
    //如果要看到当前位置右边的图片,正常轮播
    if(to>i){
      $ulimgs.addClass("transition");
    }else{
    //否则，只有i=0在来头，且还要看左边的图片，才会出问题
    //为了避免用户看到偷梁换柱效果，先把tansition class去掉
      $ulimgs.removeClass("transition");
    //将ulimgs拉取到最左侧
      $ulimgs.css("margin-left",-licount*liwidth);
    //定时器是为了将偷梁换柱操作和加回transition属性的操作分隔开
      setTimeout(function(){
        moveTo(licount-1);
      },100);
      return;
    }
  }
  //如果输入了to，先将表示第几张图片的变量i变为目标位置
  i=to;
  //再用i计算ulimgs的margin-left距离，轮播图的原理就是通过margin-left的变换来实现图片轮播
  $ulimgs.css("marginLeft",-i*liwidth);
  //先删除所有小圆点的class
  $lis.removeClass("active");
  //到达最后一张图片时
  if(i==licount){
    i=0;
    //当transition动画播放完后，清除掉transition属性，将ulimgs拉回0位置
    setTimeout(function(){
    $ulimgs.removeClass("transition");
    $ulimgs.css("margin-left",0);
    },duration)
  }
  //给当前位置的小圆点添加class active
  $lis.each(function(j,elem){
    if(j==i){
      $(elem).addClass("active");
    } 
  })
}
//左右箭头
var $btnleft=$("#btn-left");
var $btnright=$("#btn-right");
//用开关控制，场次动画没播完，下次动画不能开始
var canClick=true;
function move(n){
  if(canClick){//只有可以单击时
    moveTo(i+n);//才调用移动ulimgs的方法
    canClick=false;//马上把开关关上，禁止再次吊机
    //只有本地transition播放完，才能自动打开开关，点击按钮才有反应
    setTimeout(function(){
      canClick=true;
    },duration+500);
  }
}
$btnleft.click(function(){
  move(-1);
})
$btnright.click(function(){
  move(1);
})
//自动播放
var interval=3000;//每次轮播间隔3s
var timer=setInterval(function(){
  moveTo();
},interval);
var $banner=$("#banner");
$banner.mouseenter(function(){
  clearInterval(timer);
})
.mouseleave(function(){
  setInterval(function(){
    moveTo();
  },interval);
});
//轮播指示器
//事件委托，在小圆点父元素上绑定单击事件
$ulidxs.on("click","li",function(){
  var $li=$(this);//当前li
  var i=$lis.index(this);//当前li所在位置
  if(canClick){//如果当前处于可点击状态
    if($li.is(":not(:active)")){//当前小圆点没有avtive属性
      moveTo(i);//移动到当前小圆点对应页面
      setTimeout(function(){ //动画播放完毕后打开开关
        canClick=true;
      },druction)
    }
  }
})
})
//最新上架界面
$(function(){
  $.ajax({
    url:"http://localhost:3000/details/newpro",
    type:"get",
    dataType:"json",
    success:function(result){
      console.log(result[0])
      new Vue({
        el:"section #product",
        data:{
          p1:result[0]
        }
      })
    }
  })
})
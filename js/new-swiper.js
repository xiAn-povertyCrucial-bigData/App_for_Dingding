var mySwiper = new Swiper('.swiper-container',{
    pagination: '.pagination',  //分页器
    loop:true,   //循环轮播
    grabCursor: true,
    paginationClickable: true, //点击分页器会控制swiper切换
    autoplayDisableOnInteraction:false,
    autoplay:3000,  //自动切换时间
    speed:500,
 }) 
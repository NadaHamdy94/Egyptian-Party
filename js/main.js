
 
$(document).ready(function(){
    let sideBarLeft=$('.side-bar').css('left');
    let sideNavWidth=$('.side-nav').width();
    let scrollTopWindow;
    /*fadeout loading and remove from DOM */
    $('#loading').fadeOut(1000);
    $('body').css('overflowY','auto');
    $('#loading').remove();
    /*hide sidebar when page loading  */
    if(sideBarLeft == '0px')
    {
       $('.side-bar').animate({left:`-${sideNavWidth}px`},500);
    }
    /*hide the bar-icon of the sidebar in the second section of the page */
    $(window).scroll(function (){

        let detailsOffset=$('#details').offset().top;
        scrollTopWindow=$(window).scrollTop();
        if(scrollTopWindow > detailsOffset-50)
        {
            $('.bar-icon').fadeOut();
        }
        else
        {
            $('.bar-icon').fadeIn();
        }
    })
    /*slideToggle the sidebar by click on bar-icon */
   $('.bar-icon').click(function(){
    sideBarLeft=$('.side-bar').css('left');
    sideNavWidth=$('.side-nav').width();
    if(sideBarLeft == '0px')
    {
        $('.side-bar').animate({left:`-${sideNavWidth}px`},1000);
    }
    else
    {
        $('.side-bar').animate({left:`0px`},1000);
    }
   })

   /*when  click the link on the sidebar go to it's position smoothly */
   $('a[href^="#"]').click(function(e){
    let linkHref=$(e.target).attr('href');
    let offset=$(linkHref).offset().top;
    $(e.target).css('color','#E68184');
    $(e.target).parent().siblings().children().css('color','white');
    $('body,html').animate({scrollTop:offset},1500);
   })

   /*hide sidebar by x mark */
   $('.x-mark').click(function(){
    sideNavWidth=$('.side-nav').width();
    $('.side-bar').animate({left:`-${sideNavWidth}px`},1000);
    $('body,html').animate({scrollTop:scrollTopWindow});
   })

   /*slide toggle section of details */
   $('.singer h3').click(function(e){
    let parentId=$(e.target).parent().attr('id');

    let arrSiblings=  $(e.target).parent().siblings();
    let elementDisplay;
    let siblingId;
    for(let i=0 ; i<arrSiblings.length ; i++)
    {
        elementDisplay=$(arrSiblings[i]).children().next().css('display');
        if(elementDisplay == 'block')
        {
            siblingId=$(arrSiblings[i]).attr('id');
            break;
        }
    }
    $(`#${parentId} p`).slideToggle(500);
    $(`#${siblingId}`).children().next().slideToggle(500);
    // $(this).next().slideToggle('slow');
   })

   /*calculate remain days of the event */
   function calRemainOfDate()
   {
    let currentDate=new Date();
    let eventDate=new Date ("july 30, 2022")
    let diffrence=eventDate.getTime()- currentDate.getTime() ;
    $('#dayNumber').html(parseInt(diffrence / (1000*60*60*24)) +' '+'D');
    $('#hours').html(parseInt(diffrence / (1000*60*60) % 24) +' '+'H');
    $('#minutes').html(parseInt(diffrence / (1000*60) % 60) +' '+'M');
    $('#seconds').html(parseInt(diffrence / (1000) % 60) +' '+'S');
   }
   setInterval(calRemainOfDate,1000);
   /*set max number of characters in textarea */

   $('#textAreaInput').on('input',function(){
    let remainCharacters=100 - ($(this).val().length);
    if(remainCharacters <= 0)
    {
        $('#characterNum').html('your available character finished Characyer Reamining');
        $('#characterNum').css({color:'#D62E33' ,fontWeight:'bold'});
    }
    else
    {
        $('#characterNum').html(remainCharacters);
    }
   })
 
})
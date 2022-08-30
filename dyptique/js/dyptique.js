
<script src="js/jquery-3.6.0.min.js"></script>
<script src="js/dino-common.js"></script>




<script>
'use strict';

// header left link
$('ul.left-link li.lang').on('click', function() {
  $('ul.left-link li.lang').toggleClass('on');
});
$('ul.left-link li.shipment').on('click', function() {
  $('ul.left-link li.shipment').toggleClass('on');
});

// gnb
$('#gnb > ul > li > a').on('mouseenter', function() {
  $('#gnb > ul > li div.sub-container').removeClass('on');
  $('#gnb > ul > li div.sub-gnb-container').removeClass('on');
  $(this).siblings('div.sub-gnb-container').addClass('on');
  $(this).siblings('div.sub-container').addClass('on');  
});

$('#gnb').on('mouseleave', function() {
  $('div.sub-gnb-container').removeClass('on');
  $('div.sub-container').removeClass('on');
});


// footer
$('div.pc-bottom-lang > ul > li > em').on('click', function() {
  let index = $('div.pc-bottom-lang > ul > li').index($(this).parent());
  $(this).siblings('div.pc-bottom-lang ul.drop-menu').toggleClass('on');

});

</script>
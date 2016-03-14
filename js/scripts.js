(function ($, root, undefined) {

	$(function () {

		'use strict';

		// DOM ready, take it away

		var $body =  $('html, body'),
			$btnNav = $('.btn-nav'),
			$this = $(this),
			$gridItem = $('.work');


	function skill() {
		var $skill = $('.skill-bar');
		$skill.each(function() {
			var $number = $(this).data('skill');
			$(this).append("<span class='number'/>");
			$(this).append('<div class="bar"/>');
			$(this).find('.number').text($number).css('left', $number);
			$(this).children('.bar').css('width', $number);
		});
	}

	function articleTada(){
	  var randNum = Math.floor(Math.random() * $('.article-thumb').length);
	  $('.article-thumb').eq(randNum).addClass('is-animate')
	    .siblings().removeClass('is-animate');
	}

	function smoothScroll (duration) {
		$('a[href^="#"]').on('click', function(event) {

		    var target = $( $(this).attr('href') );

		    if( target.length ) {
		        event.preventDefault();
		        $('html, body').animate({
		            scrollTop: target.offset().top
		        }, duration);
		    }
		});
	}

	function work() {
		var workHeight = $('.works').offset().top;
		$gridItem.each(function() {
			var spinner = "<div class='loader'></div>";
			$(this).on('click' , function(event) {
				event.preventDefault();
				/* Act on the event */
				var nameWork = $(this).attr('href');
				// console.log(nameWork);
				$('.detail-work')
					// .css('display', 'block')
					.css('height', 'inherit')
					.children('.inner-detail-work')
						.addClass('visible')
						.html(spinner)
						.load('works/'+ nameWork +'.html');
				// $(this).parents('.works').prepend('<div class="detail-work"/>');



				$('html, body').animate({
	          scrollTop: workHeight
	      }, 1000);

	      $('.gray').css('display', 'block');

			});
		});
	}

	function close_work() {
		$('.gray, .close-work').click(function() {
			$('.gray')
				.css('display', 'none');

			$('.detail-work')
				// .hide();
				.css('height', 0)
				.children('.inner-detail-work')
					.removeClass('visible');
		});
	}

	function clickBtn() {
		var element, circle, d, x, y;
		$(".btn span").hover(function(e){
			element = $(this);

			if(element.find(".circle").length === 0)
				element.prepend("<span class='circle'></span>");

			circle = element.find(".circle");
			circle.removeClass("animate");

		if(!circle.height() && !circle.width())
		  {
				d = Math.max(element.outerWidth(), element.outerHeight());
				circle.css({height: d, width: d});
			}

			x = e.pageX - element.offset().left - circle.width()/2;
			y = e.pageY - element.offset().top - circle.height()/2;

			circle.css({top: y+'px', left: x+'px'}).addClass("animate");
		},
		function() {
			circle.removeClass("animate");
		});
	}

	setInterval(function() {
			articleTada();
		}, 4000);

		skill();
		smoothScroll(300);
		// $body.niceScroll();
		work();
		clickBtn();
		close_work();

		$btnNav.click(function() {
			$('.main-nav').toggle();
		});

	});


	$(window).scroll(function() {
	  startArticles();
	});

	function startArticles(){
	  var wScroll = $(window).scrollTop();

	  if($('#blog').offset().top - 200< wScroll) {
	    $('.article-thumb').each(function(i){
	      setTimeout(function(){
	        $('.article-thumb').eq(i).addClass('is-visible');
	      }, 100 * i);
	    });
	  }
	}

	

	// canvas
	var Canvas = document.getElementById('canvas');
var ctx = Canvas.getContext('2d');

var resize = function() {
    Canvas.width = Canvas.clientWidth;
    Canvas.height = Canvas.clientHeight;
};
window.addEventListener('resize', resize);
resize();

var elements = [];
var presets = {};

presets.o = function (x, y, s, dx, dy) {
    return {
        x: x,
        y: y,
        r: 12 * s,
        w: 5 * s,
        dx: dx,
        dy: dy,
        draw: function(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            
            ctx.beginPath();
            ctx.arc(this.x + + Math.sin((50 + x + (t / 10)) / 100) * 3, this.y + + Math.sin((45 + x + (t / 10)) / 100) * 4, this.r, 0, 2 * Math.PI, false);
            ctx.lineWidth = this.w;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
        }
    }
};

presets.x = function (x, y, s, dx, dy, dr, r) {
    r = r || 0;
    return {
        x: x,
        y: y,
        s: 20 * s,
        w: 5 * s,
        r: r,
        dx: dx,
        dy: dy,
        dr: dr,
        draw: function(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            this.r += this.dr;
            
            var _this = this;
            var line = function(x, y, tx, ty, c, o) {
                o = o || 0;
                ctx.beginPath();
                ctx.moveTo(-o + ((_this.s / 2) * x), o + ((_this.s / 2) * y));
                ctx.lineTo(-o + ((_this.s / 2) * tx), o + ((_this.s / 2) * ty));
                ctx.lineWidth = _this.w;
                ctx.strokeStyle = c;
                ctx.stroke();
            };
            
            ctx.save();
            
            ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) * 2);
            ctx.rotate(this.r * Math.PI / 180);
            
            line(-1, -1, 1, 1, '#fff');
            line(1, -1, -1, 1, '#fff');
            
            ctx.restore();
        }
    }
};

for(var x = 0; x < Canvas.width; x++) {
    for(var y = 0; y < Canvas.height; y++) {
        if(Math.round(Math.random() * 8000) == 1) {
            var s = ((Math.random() * 5) + 1) / 10;
            if(Math.round(Math.random()) == 1)
                elements.push(presets.o(x, y, s, 0, 0));
            else
                elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        }
    }
}

setInterval(function() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    var time = new Date().getTime();
    for (var e in elements)
		elements[e].draw(ctx, time);
}, 10);

})(jQuery, this);

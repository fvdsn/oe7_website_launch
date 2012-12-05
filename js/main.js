window.onload = function(){
    
    /* ------- Detecting old IE version ------- */
    window.IE = $('html').hasClass('ieOld');

    /* ------- Release Date Countdown -------- */

    var releasedate = new Date('18 December 2012 14:07:00 GMT');     // TODO put the real release date

    var countdown = function(){
        var now = new Date();
        var dt  = Math.max(0, (releasedate.getTime() - now.getTime()) / 1000.0);
        var days = Math.floor(dt/(60*60*24));
        dt -= days * 60 * 60 * 24;
        var hours = Math.floor( dt / (60*60) );
        dt -= hours * 60 * 60;
        var minutes = Math.floor(dt / 60);
        dt -= minutes * 60;
        var seconds = Math.floor(dt);

        if(days > 0){
            return 'in <b>'+ (days+1) +' days</b>';
        }else if(hours > 0){
            return 'in <b>'+ (hours+1) +' hours</b>';
        }else if(minutes > 0){
            return 'in <b>'+ (minutes+1) +' minutes</b>';
        }else if(seconds === 1){
            return 'in <b>1 second ...</b>';
        }else if(seconds > 0){
            return 'in <b>'+seconds+' seconds ...</b>';
        }else{
            return '<b>now!</b>'
        }
    };

    var lastcd = "";
    setInterval(function(){
        var cd = countdown();
        if(cd !== lastcd){
            lastcd = cd;
            $('.countdown').html(countdown());
        }
    },100);
	
	
	// we prevent the animations from running in the background

	var active = true;
	$(window).focus(function(){ active = true; });
	$(window).blur(function(){ active = false; });

    
    $('.footer').css({
    	opacity: 0
    }).delay(500).animate({
    	opacity: 1
    });



    $('.main').css({
    	opacity: 0
    }).delay(300).animate({
    	opacity: 1
    });

    $('.main-shadow').css({
    	opacity: 0
    }).delay(300).animate({
    	opacity: 0.25
    },1000);

    $('.slideshow').css({
        opacity: 0
    }).delay(300).animate({
        opacity: 1
    },500);

    var mchilds = $('.main > *');

    for(var i = 0; i < mchilds.length; i++){
    	mchilds.eq(i).css({
    		'margin-left':'+=100px',
    		'opacity':0
    	}).delay(300+200*i).animate({
    		'margin-left':'+=-100px',
    		'opacity':1
    	},800,'easeOutBack');
    }

    /* ---------- Slideshow ---------- */

    var pictures = $('.slideshow .frame img');
    var pictures_count = pictures.length;
    var current = -1;
    var prev    = pictures_count - 1;
    var width   = pictures.eq(current).width();
    var height  = pictures.eq(current).height();
    var transitionTimeoutId = null;
    var clicks  = 0;

    if(IE){
        pictures.css({'display':'none'});
    }else{
        pictures.css({'opacity':0});
    }

    function transition(time){
        time = ( typeof time === 'undefined' ? 2000 : time);
        if(active){
            prev = current;
            if(clicks > 3){
                current = pictures_count - 1;
            }else{
                current = (current + 1) % (pictures_count - 1);
            }
            if(IE){
                var pic = pictures.eq(current)[0];
                //alert(pic.src);
                pictures.eq(current).css({'display':'block'});
                if(prev !== current){
                   pictures.eq(prev).css({'display':'none'});
                }
            }else{
                pictures.eq(current).animate({
                    'opacity': 1
                },time,'linear');
                if(prev !== current){
                    pictures.eq(prev).animate({
                        'opacity':0
                    },time,'linear');
                }
            }
        }
        clearTimeout(transitionTimeoutId);
        transitionTimeoutId = setTimeout(function(){
            clicks = 0;
            transition();
        }, 6000);
    }
    
    transition(0);
    if(!IE){
        $('.slideshow .frame img, .slideshow .fog, .slideshow .overlay').click(function(){
            clicks++;
            transition(250);
        });
    }

    /* --------- Hiding the Slideshow ---------- */

      function slideshowVisible(){
        return $(window).width() >= 850;
    }

};

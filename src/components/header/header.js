jQuery(document).ready(function() {

	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = jQuery('#header').outerHeight();
	
	jQuery(window).scroll(function(event){
	    didScroll = true;
	});
	
	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 250);
	
	function hasScrolled() {
	    var st = jQuery(document).scrollTop();

	    if(Math.abs(lastScrollTop - st) <= delta)
	        return;

	    if (st > lastScrollTop && st > navbarHeight){
	        jQuery('#header').removeClass('_down').addClass('_up');
	    } else {
	        if(st + jQuery(window).height() < jQuery(document).height()) {
	            jQuery('#header').removeClass('_up').addClass('_down');
	        }
	    }
	  
	    lastScrollTop = st;
	}

})
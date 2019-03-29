jQuery(function() {

	const event = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? 'touchend' : 'click';
	var scrolled = false;

	jQuery('.anchor').bind('touchmove', function() {
		scrolled = true;
	})

	jQuery('.anchor').bind(event, function(e) {
		e.preventDefault();
	
		if (scrolled) {
			scrolled = false;
			return 0;
		}

		const anchor = jQuery(this).attr('href');

		if (!jQuery(anchor).length) return 0;

		const top = jQuery(anchor).offset().top;

		jQuery('body, html').stop().animate({
			scrollTop: top
		}, 700)
	})

})
jQuery(window).on('scroll', function() {
	const winTop = jQuery(window).scrollTop();
	const winHeight = jQuery(window).height();
	jQuery('.list').each(function(index, element) {
		if (winTop > (jQuery(element).offset().top - winHeight)) {
			jQuery(element).addClass('_animated')
		}
	})
})
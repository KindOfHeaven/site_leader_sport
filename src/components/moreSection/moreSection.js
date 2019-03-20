jQuery(document).ready(function() {
	
	const interior = jQuery('#interior');
	
	if (interior.length) {
		jQuery(window).on('scroll', function() {
			if (jQuery(window).scrollTop() > (interior.offset().top - jQuery(window).height())) {
				interior.addClass('_animated')
			}	
		})	
	}
	
	title()

	jQuery(window).on('scroll', function() {
		title()
	})
	function title() {
		const winTop = jQuery(window).scrollTop();
		const winHeight = jQuery(window).height();
		jQuery('.title').each(function(index, element) {
			if (winTop > (jQuery(element).offset().top - winHeight)) {
				jQuery(element).addClass('_animated')
			}
		})
	}
})
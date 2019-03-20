jQuery(document).ready(function() {
	const event = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? 'touchstart' : 'click';
	jQuery('.modal__open').bind(event, function() {
			
		const id = jQuery(this).attr('id');
		const modal__id = id.substr(0, id.indexOf('__open'));

		const modal = jQuery(`#${modal__id}`);
		
		if (!modal.length) {
			return 0
		}

		jQuery('body').attr('remember_position', jQuery(window).scrollTop())
		jQuery(window).scrollTop(0);
		modal.parent().fadeIn(500);
		jQuery('html').addClass('modalOpened')

	})
	jQuery('.modal__closer, .modal__wrapper').bind(event, function(e) {
		if (e.target !== this && !jQuery(this).hasClass('modal__closer'))
    		return;

		const modal = jQuery(this).closest('.modal__wrapper');
		const scroll = jQuery('body').attr('remember_position');

		jQuery('html').removeClass('modalOpened')
		jQuery(window).scrollTop(scroll);
		modal.fadeOut(500)

	})
})
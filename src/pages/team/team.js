jQuery(document).ready(function() {
	const  event = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? 'touchstart' : 'click';
	jQuery('#teamDropdown').bind(event, function() {
		jQuery(this).parent().toggleClass('_opened')
	})

	const teamTabs = jQuery('#team__tabs'),
		teamTables = jQuery('#team__tables');

	teamTabs.find('.team__tab').bind(event, function() {
		
		if (jQuery(this).hasClass('_active') || jQuery('.team-section._showing').length || jQuery('.team-section._hidding').length) return true;
		if (jQuery('#teamDropdown').parent().hasClass('_opened')) {
			jQuery('#teamDropdown').parent().removeClass('_opened')
		}
		const name = jQuery(this).attr('data-tab');

		const activeTable = jQuery(`.team-section._active`);
		const nextTable = jQuery(`.team-section[data-index="${name}"]`);
		
		activeTable.addClass('_hidding');
		nextTable.addClass('_waiting _active');
		setTimeout(function() {
			nextTable.addClass('_showing');
			teamTabs.find(`.team__tab._active`).removeClass('_active');
			teamTabs.find(`.team__tab[data-tab="${name}"]`).addClass('_active');
		}, 500);
		setTimeout(function() {
			activeTable.removeClass('_hidding').removeClass('_active');
			nextTable.removeClass('_waiting _showing');
		}, 1250) 
	})
	
})
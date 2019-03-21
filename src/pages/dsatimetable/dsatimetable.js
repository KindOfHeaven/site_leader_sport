jQuery(document).ready(function() {

	const timetableTabs = jQuery('#timetable__tabs'),
		timetableTables = jQuery('#timetable__tables'),
				  event = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? 'touchstart' : 'click';

	timetableTabs.find('.timetable__tab').bind(event, function() {
		
		if (jQuery(this).hasClass('_active') || jQuery('.timetable__table._showing').length || jQuery('.timetable__table._hidding').length) return true;
		if (jQuery('#timetableDropdown').parent().hasClass('_opened')) {
			jQuery('#timetableDropdown').parent().removeClass('_opened')
		}
		const name = jQuery(this).attr('data-tab');

		const activeTable = jQuery(`.timetable__table._active`);
		const nextTable = jQuery(`.timetable__table[data-table="${name}"]`);
		
		activeTable.addClass('_hidding');
		nextTable.addClass('_waiting _active');
		setTimeout(function() {
			nextTable.addClass('_showing');
			timetableTabs.find(`.timetable__tab._active`).removeClass('_active');
			timetableTabs.find(`.timetable__tab[data-tab="${name}"]`).addClass('_active');
		}, 1000);
		setTimeout(function() {
			activeTable.removeClass('_hidding').removeClass('_active');
			nextTable.removeClass('_waiting _showing');
		}, 2000) 
	})
	

	jQuery('#timetableDropdown').bind(event, function() {
		jQuery(this).parent().toggleClass('_opened')
	})
})


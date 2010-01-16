/**
 * Cascade jQuery plugin
 *
 * Gracefully degradable cascading <select> lists
 *
 * Originally inspired by:
 *  - http://devlicio.us/blogs/mike_nichols/archive/2008/05/25/jquery-cascade-cascading-values-from-forms.aspx
 *  - http://www.ajaxray.com/blog/2007/11/08/jquery-controlled-dependent-or-cascading-select-list-2/
 *
 * @copyright (c)2005-2010, WDT Media Corp (http://wdtmedia.net)
 * @license http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link http://github.com/jadb/cascade
 * @author jadb
 */
(function($){
	$.fn.cascade = function(args) {
		var defaults = {
			child: this.attr('id') + '_child',
			classes: {
				other: 'other',
				selected: 'selected',
			},
			callbacks: {
				child: function(on){},
				parent: function(on){},
				other: function() {
					$('.' + parent + '_other').show();
					$('#' + parent + '_other').focus();
				},
			},
	  	};
	 	var opts = $.extend(true, defaults, args);
		var parent = this.attr('id');
		var parentClass = $('#' + parent + ' option:selected').attr('class');
		var _clone = '_' + opts.child;

		// hide all `other` text fields
		$('.' + parent + '_' + opts.classes.other).hide();

		// clone original child list
		$('body').append('<select style="display:none" id="' + _clone + '"></select>');
		$('#' + _clone).html($('#' + opts.child + ' option'));

		// attach behavior to parents' `onChange` event
		$('#' + parent).change(function() {

			opts.callbacks.parent.call(this, 'before');

			// rebuild child list from cloned list options
			// that are associated to new parent option
			parentClass = $('#' + parent + ' option:selected').attr('class');
			if (parentClass == '') parentClass = $('#' + parent + ' option:first').attr('class');
			chain = parentClass.split(' ');
			if (chain.shift() != parentClass) {
				parentClass = chain.shift();
			}
			$('#' + opts.child).html($('#' + _clone + ' .' + parentClass).clone());

			// `other` option
			if (!$('#' + opts.child + ' option').hasClass(opts.classes.other)) {
				$('#' + opts.child).append($('#' + _clone + ' option[class=' + opts.classes.other + ']').clone());
			}

			// apply `selected="selected"` to options with `selected` class
			$('#' + opts.child + ' option:.' + opts.classes.selected + ':first').attr('selected', 'selected');

			// force grandchild to update
			$('#' + opts.child).trigger('change');
			// switch focus to child
			$('#' + opts.child).focus();

			opts.callbacks.parent.call(this, 'after');

		});

		// attach behavior to child `onChange` event
		$('#' + opts.child).change(function() {
			opts.callbacks.child.call(this, 'before');
			// run `other` callback if `other` child option is selected
			if ($('#' + opts.child).val() == opts.classes.other) opts.callbacks.other.call(this);
			opts.callbacks.child.call(this, 'after');
		});

		// force child to update
		$('#' + parent).trigger('change');

	}
})(jQuery);
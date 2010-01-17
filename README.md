# Cascade (jQuery plugin)

Enabling, gracefully degradable cascading `<select>` lists

## Requirements

* jQuery 1.3.2 (or above)

## Installation

Copy/paste the following in the `<head>` part of your HTML:

	<script src="/path/to/cascade/cascade.js" type="text/javascript"></script>
   <script type="text/javascript" charset="utf-8">
      $(document).ready(function() {
         $('#parent_id').cascade();
      });
   </script>

## Configuration

Options can be passed to cascade():

	{
		child: '', // id of child <select> (default: parent_id_child)
		classes: {
			// class name to use for <option>s that take an extra text
			// field for example (default: other)
			other: '',
			// class name to use for child <option>s to be "selected" by
			// default when their parent is "selected" (default: selected)
			selected: '',
		},
		callbacks {
			// triggered 'before' and 'after' a child <select> <option>
			// is changed (default: none)
			child: function(on){},
			// triggered 'before' and 'after' a parent <select> <option>
			// is changed (default: none)
			parent: function(on){},
			// triggered when an `other` child <option> is selected
			// (default: show() div#other, focus() input#other)
			other: function(){},
		}
	}

## Patches & Features

* Fork
* Mod, fix
* Test - this is important, so it's not unintentionally broken
* Commit - do not mess with license, todo, version, etc. (if you do change any, bump them into commits of their own that I can ignore when I pull)
* Pull request - bonus point for topic branches

## Bugs & Feedback

http://github.com/jadb/cascade
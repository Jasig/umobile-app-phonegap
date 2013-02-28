/*global fluid:true, jQuery:true, _:true, umobile:true, config:true */
(function ($, _, umobile, config) {
	'use strict';

	fluid.defaults('umobile.view.AppHomeView', {
		gradeNames: ['fluid.rendererComponent', 'autoInit'],
		renderOnInit: true,
		selectors: {
			module: '.module-item',
			moduleIcon: '.module-icon',
			moduleTitle: '.module-title',
			moduleBadge: '.badge'
		},
		repeatingSelectors: [ 'module' ],
		// renderer proto-tree defining how data should be bound
		protoTree: {
			expander: {
				type: 'fluid.renderer.repeat',
				repeatID: 'module',
				controlledBy: 'modules',
				pathAs: 'module',
				valueAs: 'moduleValue',
				tree: {
					moduleIcon: { decorators: [ { type: 'attrs', attributes: { src: '{moduleValue}.iconUrl' } } ] },
					moduleTitle: { value: '${{module}.title}' },
					moduleBadge: {
						value: '${{module}.newItemCount}',
						decorators: [ { type: 'addClass', classes: '{moduleValue}.itemCountClass' } ]
					}
				}
			}
		},
		finalInitFunction: function (that) {
			$('.module-link').live('click', function () {
				var link, moduleDiv, moduleIndex, module;

				link = $(this);
				moduleDiv = $(link.parents(that.options.selectors.module).get(0));
				moduleIndex = moduleDiv.index(that.options.selectors.module);
				module = that.model.modules[moduleIndex];
				//$.publish('module.selected', module);
			});

			that.update = function (model) {
				that.model.modules = model.modules;
				that.refreshView();
				$('.module-link').live('click', function () {
					var link, moduleDiv, moduleIndex, module;

					link = $(this);
					moduleDiv = $(link.parents(that.options.selectors.module).get(0));
					moduleIndex = moduleDiv.index(that.options.selectors.module);
					module = that.model.modules[moduleIndex];
					//$.publish('module.selected', module);
				});
			};
		}
	});

})(jQuery, _, umobile, config);
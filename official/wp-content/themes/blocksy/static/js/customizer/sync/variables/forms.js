export const getFormsVariablesFor = () => ({
	
	// general
	formTextColor: [
		{
			selector: ':root',
			variable: 'formTextInitialColor',
			type: 'color:default'
		},

		{
			selector: ':root',
			variable: 'formTextFocusColor',
			type: 'color:focus'
		}
	],

	formFontSize: {
		selector: ':root',
		variable: 'formFontSize',
		unit: 'px'
	},

	formBackgroundColor: [
		{
			selector: ':root',
			variable: 'formBackgroundInitialColor',
			type: 'color:default'
		},

		{
			selector: ':root',
			variable: 'formBackgroundFocusColor',
			type: 'color:focus'
		}
	],

	formInputHeight: {
		selector: ':root',
		variable: 'formInputHeight',
		unit: 'px'
	},

	formTextAreaHeight: {
		selector: 'form textarea',
		variable: 'formInputHeight',
		unit: 'px'
	},

	formBorderColor: [
		{
			selector: ':root',
			variable: 'formBorderInitialColor',
			type: 'color:default'
		},

		{
			selector: ':root',
			variable: 'formBorderFocusColor',
			type: 'color:focus'
		}
	],

	formBorderSize: {
		selector: ':root',
		variable: 'formBorderSize',
		unit: 'px'
	},


	// select box
	selectDropdownTextColor: [
		{
			selector: '.selectr-container',
			variable: 'color',
			type: 'color:default'
		},

		{
			selector: '.selectr-container',
			variable: 'colorHover',
			type: 'color:hover'
		},

		{
			selector: '.selectr-container',
			variable: 'colorActive',
			type: 'color:active'
		}
	],

	selectDropdownItemColor: [
		{
			selector: '.selectr-container',
			variable: 'selectDropdownItemHoverColor',
			type: 'color:hover'
		},

		{
			selector: '.selectr-container',
			variable: 'selectDropdownItemActiveColor',
			type: 'color:active'
		}
	],

	selectDropdownBackground: {
		selector: '.selectr-container',
		variable: 'selectDropdownBackground',
		type: 'color'
	},

	// radio & checkbox
	radioCheckboxColor: [
		{
			selector: '[type="radio"], [type="checkbox"]',
			variable: 'radioCheckboxInitialColor',
			type: 'color:default'
		},

		{
			selector: '[type="radio"], [type="checkbox"]',
			variable: 'radioCheckboxAccentColor',
			type: 'color:accent'
		}
	],

})
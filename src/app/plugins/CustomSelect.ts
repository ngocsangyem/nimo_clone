export interface CustomSelectOptions {
	container?: string; // custom container class
	wrapper?: string; // wrap fake select into a div
}

export class CustomSelect {
	trigger!: HTMLElement;
	dropdown!: HTMLElement;
	customOptions!: NodeListOf<HTMLElement>;
	optionIndex = 0;

	element: HTMLElement;
	select: HTMLSelectElement;
	optGroups: NodeListOf<HTMLOptGroupElement>;
	options: NodeListOf<HTMLOptionElement>;
	selectId: string;
	arrowIcon: NodeListOf<SVGSVGElement>;
	label: HTMLLabelElement;
	selectedOption: string;
	
	setting: CustomSelectOptions = {
		container: '',
		wrapper: ''
	};
	private container: HTMLDivElement;

	constructor(element: HTMLElement, setting?: CustomSelectOptions) {
		this.element = element;
		this.select = <HTMLSelectElement>this.element.querySelectorAll('select')[0];
		this.optGroups = this.select.querySelectorAll('optgroup');
		this.options = this.select.querySelectorAll('option');
		this.selectedOption = this.getSelectedOptionText();
		this.selectId = <string>this.select.getAttribute('id');
		this.arrowIcon = this.element.querySelectorAll('svg.arrow-icon');
		this.label = <HTMLLabelElement>document.querySelector('[for="' + this.selectId + '"]');
		
		if (setting) {
			this.setting = {...setting};
		}

		this.initCustomSelect();
		this.initCustomSelectEvents();
		this.createWrapper();
	}

	initCustomSelect() {
		this.select.insertAdjacentHTML(
			'afterend',
			this.initButtonSelect() + this.initListSelect()
		);

		this.dropdown = <HTMLElement>this.element.querySelector(
			'.js-select__dropdown'
		);
		this.trigger = <HTMLElement>this.element.querySelector(
			'.js-select__button'
		);
		
		this.customOptions = this.dropdown.querySelectorAll(
			'.js-select__item'
		);

		// hide default select
		this.select.classList.add('is-hidden');
		if (this.arrowIcon.length > 0) {
			this.arrowIcon[0].style.display = 'none';
		}

		// place dropdown
		this.placeDropdown();
	}

	initCustomSelectEvents() {
		// option selection in dropdown
		this.initSelection();

		this.trigger.addEventListener('click', () => {
			this.toggleCustomSelect(false);
		});

		if (this.label) {
			this.label.addEventListener('click', () => {
				this.moveFocus(this.trigger);
			});
		}

		this.dropdown.addEventListener('keydown', (event) => {
			if (
				(event.keyCode && event.keyCode == 38) ||
				(event.key && event.key.toLowerCase() == 'arrowup')
			) {
				this.keyboardCustomSelect('prev', event);
			} else if (
				(event.keyCode && event.keyCode == 40) ||
				(event.key && event.key.toLowerCase() == 'arrowdown')
			) {
				this.keyboardCustomSelect('next', event);
			}
		});

		// native <select> element has been updated -> update custom select as well
		this.element.addEventListener('select-updated', (event) => {
			this.resetCustomSelect();
		});
	}

	toggleCustomSelect(bool: string | boolean) {
		let ariaExpanded;

		if (bool) {
			ariaExpanded = bool;
		} else {
			ariaExpanded =
				this.trigger.getAttribute('aria-expanded') === 'true'
					? 'false'
					: 'true';
		}
		this.trigger.setAttribute('aria-expanded', <string>ariaExpanded);

		if (ariaExpanded === 'true') {
			const selectedOption = this.getSelectedOption();
			this.moveFocus(selectedOption); // fallback if transition is not supported
			this.dropdown.addEventListener('transitionend', (cb) => {
				this.moveFocus(selectedOption);
				this.dropdown.removeEventListener('transitionend', () => {});
			});
			this.placeDropdown(); // place dropdown based on available space
			this.container.parentElement?.classList.add('is-open');
		} else {
			this.container.parentElement?.classList.remove('is-open');
		}
	}

	placeDropdown() {
		this.dropdown.classList.remove('select__dropdown--right');
		this.dropdown.classList.remove('select__dropdown--up');
		const triggerBoundingRect = this.trigger.getBoundingClientRect();

		if (
			document.documentElement.clientWidth - 5 <
			triggerBoundingRect.left + this.dropdown.offsetWidth
		) {
			this.dropdown.classList.add('select__dropdown--right');
		} else {
			this.dropdown.classList.remove('select__dropdown--right');
		}

		const moveUp =
			window.innerHeight - triggerBoundingRect.bottom - 5 <
			triggerBoundingRect.top;

		if (moveUp) {
			this.dropdown.classList.add('select__dropdown--up');
		} else {
			this.dropdown.classList.remove('select__dropdown--up');
		}

		const maxHeight = moveUp
			? triggerBoundingRect.top - 20
			: window.innerHeight - triggerBoundingRect.bottom - 20;

		this.dropdown.setAttribute('style', `max-height: ${maxHeight}px; width: ${triggerBoundingRect.width}px`)
	}

	keyboardCustomSelect(direction: string, event: Event) {
		event.preventDefault();
		const customOptions = Array.from(this.customOptions);
		let index = customOptions.indexOf(<HTMLElement>document.activeElement);
		index = direction == 'next' ? index + 1 : index - 1;

		if (index < 0) {
			index = customOptions.length - 1;
		}

		if (index >= customOptions.length) {
			index = 0;
		}

		this.moveFocus(customOptions[index]);
	}

	moveFocus(element: HTMLElement) {
		if (!element) {
			element = <HTMLElement>document.querySelector('body');
		}
		element.focus();
		if (document.activeElement !== element) {
			element.setAttribute('tabindex', '-1');
			element.focus();
		}
	}

	initSelection() {
		// option selection
		this.dropdown.addEventListener('click', (event: Event) => {
			const { target } = event;
			const option = <HTMLElement>(target as HTMLElement).closest('.js-select__item');
			if (!option) return;
			this.selectOption(option);
		});
	}

	selectOption(option: HTMLElement) {
		if (
			option.hasAttribute('aria-selected') &&
			option.getAttribute('aria-selected') == 'true'
		) {
			// selecting the same option
			this.trigger.setAttribute('aria-expanded', 'false'); // hide dropdown
		} else {
			const selectedOption = this.dropdown.querySelector(
				'[aria-selected="true"]'
			);
			if (selectedOption) {
				selectedOption.setAttribute('aria-selected', 'false');
			}
			option.setAttribute('aria-selected', 'true');
			this.trigger.querySelectorAll(
				'.js-select__label'
			)[0].textContent = option.textContent;
			this.trigger.setAttribute('aria-expanded', 'false');
			// new option has been selected -> update native <select> element _ arai-label of trigger <button>
			this.updateNativeSelect(parseInt(<string>option.getAttribute('data-index')));
			this.updateTriggerAria();
			this.container.parentElement?.classList.remove('is-open');
		}
		// move focus back to trigger
		this.trigger.focus();
	}

	updateNativeSelect(index: number) {
		this.select.selectedIndex = index;
		this.select.dispatchEvent(new CustomEvent('change', { bubbles: true }));
	}

	updateTriggerAria() {
		this.trigger.setAttribute(
			'aria-label',`${this.options[this.select.selectedIndex].innerHTML},${this.label.textContent}`
		);
	}

	getSelectedOptionText(): string {
		let option = '';
		if ('selectedIndex' in this.select) {
			option = <string>this.options[this.select.selectedIndex].text;
		} else {
			const selectedOption = <HTMLOptionElement>this.select.querySelector('option[selected]');
			option = selectedOption.text;
		}
		return option;
	}

	initButtonSelect(): string {
		const dataTriggerClass = this.element.getAttribute('data-trigger-class');
		const customClasses = dataTriggerClass ? ` ${dataTriggerClass}` : '';
		const optionHtml = this.options[this.select.selectedIndex].innerHTML;
		const label = `${optionHtml}, ${this.label.textContent}`;
		let button = `
			<button type="button" class="js-select__button reset select__button ${customClasses}" aria-label="${label}" aria-expanded="false" aria-controls="${this.selectId}-dropdown">
				<span aria-hidden="true" class="js-select__label select__label">
					${this.selectedOption}
				</span>
			`;

		if (this.arrowIcon.length > 0 && this.arrowIcon[0].outerHTML) {
			const clone = <SVGSVGElement>this.arrowIcon[0].cloneNode(true);
			clone.classList.remove('select__icon');
			button = button + clone.outerHTML;
		}

		return `${button}</button>`;
	}

	initListSelect(): string {
		let list = `<div class="js-select__dropdown select__dropdown" aria-describedby="${this.selectId}-description" id="${this.selectId}-dropdown">`;
		list = list + this.getSelectLabelSR();

		if (this.optGroups.length > 0) {
			for (let index = 0; index < this.optGroups.length; index++) {
				const optGroupList = this.optGroups[index].querySelectorAll('option');
				const optGroupLabel = `
				<li>
					<span class="select__item select__item--optgroup">
						${this.optGroups[index].getAttribute('label')}
					</span>
				</li>`;

				list = list + `
					<ul class="select__list" role="listbox">
						${optGroupLabel}
						${this.getOptionsList(optGroupList)}
					</ul>
				`;
			}
		} else {
			list = list + `
				<ul class="select__list" role="listbox">
					${this.getOptionsList(this.options)}
				</ul>
			`;
		}

		return `${list}</div>`;
	}

	getSelectLabelSR(): HTMLParagraphElement | string {
		if (this.label) {
			return <HTMLParagraphElement><unknown> `
				<p class="sr-only" id="${this.selectId}-description">
					${this.label.textContent}
				</p>
			`
		} else {
			return '';
		}
	}

	resetCustomSelect() {
		const selectedOption = this.dropdown.querySelector(
			'[aria-selected="true"]'
		);

		if (selectedOption) {
			selectedOption.setAttribute('aria-selected', 'false');
		}

		const option = <HTMLElement>this.dropdown.querySelector(
			'.js-select__item[data-index="' + this.select.selectedIndex + '"]'
		);
		option.setAttribute('aria-selected', 'true');
		this.trigger.querySelectorAll('.js-select__label')[0].textContent =
			option.textContent;
		this.trigger.setAttribute('aria-expanded', 'false');
		this.updateTriggerAria();
	}

	getOptionsList(options: NodeListOf<HTMLOptionElement>): HTMLLIElement {
		let list = '';

		for (let index = 0; index < options.length; index++) {
			const selected = options[index].hasAttribute('selected')
				? ' aria-selected="true"'
				: ' aria-selected="false"';

			list = list + `
				<li>
					<button type="button" class="reset js-select__item select__item select__item--option" role="option" data-value="${options[index].value}" ${selected} data-index="${this.optionIndex}">
						${options[index].text}
					</button>
				</li>
			`;
			this.optionIndex = this.optionIndex + 1;
		}

		return <HTMLLIElement><unknown>list;
	}

	getSelectedOption(): HTMLElement {
		const option = <HTMLElement>this.dropdown.querySelector('[aria-selected="true"]');

		if (option) {
			return option;
		} else {
			return <HTMLElement>this.dropdown.querySelectorAll('.js-select__item')[0];
		}
	}

	moveFocusToSelectTrigger() {
		if (!(document.activeElement as HTMLElement).closest('.js-select')) {
			return;
		}
		this.trigger.focus();
	}

	checkCustomSelectClick(target: HTMLElement) {
		if (!this.element.contains(target)) {
			this.toggleCustomSelect('false');
		}
	}

	createWrapper() {
		if (!this.setting.wrapper) return;
		
		const wrapper = document.createElement('div');
		wrapper.className = `custom-wrapper ${this.setting.wrapper}`;

		this.wrap(this.trigger, wrapper);
		this.wrap(this.dropdown, wrapper);
		this.container = wrapper;
	}

	wrap(el: HTMLElement, wrapper: HTMLElement) {
		(el.parentNode as HTMLElement).insertBefore(wrapper, el);
		wrapper.appendChild(el);
	}
}

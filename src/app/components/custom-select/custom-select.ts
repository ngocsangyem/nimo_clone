import { CustomSelect, CustomSelectOptions } from '@/plugins/CustomSelect';

export class FormItemSelect {
	target: string;
	customSelect!: CustomSelect;
	setting: CustomSelectOptions = {
		container: '',
		wrapper: ''
	};

	constructor(target: string, setting?: CustomSelectOptions) {
		this.target = target;

		if (setting) {
			this.setting = {...setting};
		}

		this.initSelect();
	}

	initSelect() {
		const customSelect = document.querySelectorAll(this.target);
		// listen for key events
		if (customSelect.length > 0) {
			const selectArray: CustomSelect[] = [];

			for (let i = 0; i < customSelect.length; i++) {
				this.customSelect = new CustomSelect(<HTMLElement>customSelect[i], this.setting);
				selectArray.push(this.customSelect);
			}

			window.addEventListener('keyup', (event) => {
				if (
					(event.keyCode && event.keyCode == 27) ||
					(event.key && event.key.toLowerCase() == 'escape')
				) {
					// close custom select on 'Esc'
					selectArray.forEach((element) => {
						element.moveFocusToSelectTrigger(); // if focus is within dropdown, move it to dropdown trigger
						element.toggleCustomSelect('false'); // close dropdown
					});
				}
			});
			// close custom select when clicking outside it
			window.addEventListener('click', (event) => {
				selectArray.forEach((element) => {
					element.checkCustomSelectClick((event.target as HTMLElement));
				});
			});
		}
	}
}

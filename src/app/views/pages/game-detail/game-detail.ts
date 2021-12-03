import { Header } from '@/components/header/header';
import { SideBar } from '@/components/sidebar/sidebar';
import { FormItemSelect } from '@/components/custom-select/custom-select';



export class GameDetailComponent {
	formCustomSelect!: FormItemSelect;
	constructor() {
		Header();
		SideBar();
		this.handleCustomSelect();
	}

	handleCustomSelect() {
		this.formCustomSelect = new FormItemSelect('.form-item__select .js-select', {wrapper: 'custom-select-wrapper'});
	}

	static init() {
		const dameDetail = new GameDetailComponent();
		return dameDetail;
	}
}
(function () {
	GameDetailComponent.init();
})();

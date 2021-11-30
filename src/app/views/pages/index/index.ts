import { Header } from '@/components/header/header';

export class IndexComponent {
	constructor() {
		Header();
	}

	static init() {
		const index = new IndexComponent();
		return index;
	}
}
(function () {
	IndexComponent.init();
})();

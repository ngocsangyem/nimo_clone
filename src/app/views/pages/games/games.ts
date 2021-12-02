import { Header } from '@/components/header/header';
import { SideBar } from '@/components/sidebar/sidebar';



export class GamesComponent {
	constructor() {
		Header();
		SideBar();
	}

	static init() {
		const games = new GamesComponent();
		return games;
	}
}
(function () {
	GamesComponent.init();
})();

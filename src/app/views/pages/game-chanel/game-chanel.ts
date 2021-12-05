import { Header } from '@/components/header/header';
import { SideBar } from '@/components/sidebar/sidebar';

export class GameChanelComponent {
	constructor() {
		Header();
		SideBar();
	}

	static init() {
		const gameChanel = new GameChanelComponent();
		return gameChanel;
	}
}
(function () {
	GameChanelComponent.init();
})();

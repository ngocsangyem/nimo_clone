import { Header } from '@/components/header/header';
import { SideBar } from '@/components/sidebar/sidebar';
import { FormItemSelect } from '@/components/custom-select/custom-select';
import { ProTeam } from '@/components/pro-team/pro-team';
import { SportEvents } from '@/components/sport-events/sport-events';
import { StreamingBanner } from '@/components/streaming-banner/streaming-banner';
import { TopGames } from '@/components/top-game/top-game';
import { StreamerGallery } from '@/components/streamer-gallery/streamer-gallery';



export class App {
	formCustomSelect!: FormItemSelect;
	constructor() {
		try {
			Header();
			SideBar();
			this.handleCustomSelect();
			StreamingBanner();
			TopGames();
			SportEvents();
			ProTeam();
			StreamerGallery();
		} catch (error) {
			console.log(error);
		}
	}

	handleCustomSelect() {
		this.formCustomSelect = new FormItemSelect('.form-item__select .js-select', {wrapper: 'custom-select-wrapper'});
	}

	static init() {
		const app = new App();
		return app;
	}
}
(function () {
	App.init();
})();

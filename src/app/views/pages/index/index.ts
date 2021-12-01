import { Header } from '@/components/header/header';
import { SportEvents } from '@/components/sport-events/sport-events';
import { StreamingBanner } from '@/components/streaming-banner/streaming-banner';
import { TopGames } from '@/components/top-game/top-game';

export class IndexComponent {
	constructor() {
		Header();
		StreamingBanner();
		TopGames();
		SportEvents();
	}

	static init() {
		const index = new IndexComponent();
		return index;
	}
}
(function () {
	IndexComponent.init();
})();

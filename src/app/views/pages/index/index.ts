import { Header } from '@/components/header/header';
import { StreamingBanner } from '@/components/streaming-banner/streaming-banner';

export class IndexComponent {
	constructor() {
		Header();
		StreamingBanner();
	}

	static init() {
		const index = new IndexComponent();
		return index;
	}
}
(function () {
	IndexComponent.init();
})();

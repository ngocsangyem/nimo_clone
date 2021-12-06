import { Header } from '@/components/header/header';
import { StreamerGallery } from '@/components/streamer-gallery/streamer-gallery';



export class AlbumComponent {
	constructor() {
		Header();
		StreamerGallery();
	}

	static init() {
		const album = new AlbumComponent();
		return album;
	}
}
(function () {
	AlbumComponent.init();
})();

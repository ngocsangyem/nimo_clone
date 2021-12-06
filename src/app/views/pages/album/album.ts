import { Header } from '@/components/header/header';
import { SideBar } from '@/components/sidebar/sidebar';



export class AlbumComponent {
	constructor() {
		Header();
	}

	static init() {
		const album = new AlbumComponent();
		return album;
	}
}
(function () {
	AlbumComponent.init();
})();

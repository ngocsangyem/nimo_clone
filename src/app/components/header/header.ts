import { debounce } from '@/helpers/debounce';
import { createPopper } from '@popperjs/core';

const settingPanel = document.querySelector('.setting-panel');
const panelList = settingPanel?.querySelector('.panel-list');
const settingPanelBtn = document.querySelector('.header-btn-setting');
const panelContentItems = document.querySelectorAll(
	'.panel-content .panel-content-item[data-panel]'
);
const settingMask = document.querySelector('.setting-mask');
const submenus = document.querySelectorAll('.has-submenu');

const handleSearch = () => {
	const headerSearchBox = document.querySelector('.header-search-box');
	const searchInput = <HTMLInputElement>headerSearchBox?.querySelector('.search-input');
	const searchForm = <HTMLElement>headerSearchBox?.querySelector('.header-search-form');
	const headerSearchList = <HTMLElement>headerSearchBox?.querySelector('.header-search-list');
	const popperInstance = createPopper(searchForm, headerSearchList, {
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 10],
				},
			},
		],
		placement: 'bottom',
		strategy: 'fixed',
	})

	searchInput?.addEventListener('focus', () => {
		headerSearchBox?.classList.add('is-focus');
		headerSearchList?.classList.add('is-active');
	});
	searchInput?.addEventListener('blur', () => {
		headerSearchBox?.classList.remove('is-focus');
		headerSearchList?.classList.remove('is-active');
	});

	const onInput = () => {
		if (searchInput?.value) {
			popperInstance.update();
			headerSearchList?.classList.add('show-result');
		} else {
			popperInstance.update();
			headerSearchList?.classList.remove('show-result');
		}
	}

	searchInput?.addEventListener('input', debounce(onInput, 400))
}

const toggleMobileHeader = () => {
	const hamburgerBtn = document.querySelector('.header-hamburger');
	const nav = document.querySelector('.header-navigation');
	const headerMask = document.querySelector('.header-mask');

	hamburgerBtn?.addEventListener('click', () => {
		hamburgerBtn.classList.toggle('is-active');
		nav?.classList.toggle('is-active');
		headerMask?.classList.toggle('is-active');
	});
	headerMask?.addEventListener('click', () => {
		hamburgerBtn?.classList.remove('is-active');
		nav?.classList.remove('is-active');
		headerMask?.classList.remove('is-active');
	});


}

const toggleSettingPanel = () => {
	const handleToggle = () => {
		settingPanel?.classList.toggle('is-active');
		settingMask?.classList.toggle('is-active');
		togglePanelList();
		Array.from(panelContentItems).forEach((panel) =>
			panel?.classList.remove('is-active')
		);
	};
	settingPanelBtn?.addEventListener('click', handleToggle);
	settingMask?.addEventListener('click', handleToggle);
};

const closePanelList = () => {
	if (!panelList?.classList.contains('is-hidden')) {
		panelList.classList.add('is-hidden');
	}
};

const togglePanelList = () => {
	if (panelList?.classList.contains('is-hidden')) {
		panelList?.classList.remove('is-hidden');
	}
};

const handleCountryOptionsDesktop = () => {
	const triggerBtn = <Element>document.querySelector('.header-country-options .trigger-btn');
	const optionsList = <HTMLElement>document.querySelector('.header-country-options .country-options');

	const popperInstance = createPopper(triggerBtn, optionsList, {
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 15],
				},
			},
		],
		placement: 'bottom-end',
		strategy: 'fixed',
	});

	triggerBtn?.addEventListener('click', () => {
		if (!optionsList?.hasAttribute('show-popper')) {
			optionsList?.setAttribute('show-popper', '');
		} else {
			optionsList?.removeAttribute('show-popper');
		}
	})
}

const handleSubmenu = () => {
	Array.from(submenus).forEach((submenu) => {
		const submenuContent = <HTMLElement>submenu.querySelector('.submenu');
		const popperInstance = createPopper(submenu, submenuContent, {
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 8],
					},
				},
			],
			placement: 'bottom',
			strategy: 'fixed',
		});

		function show() {
			// Make the tooltip visible
			submenuContent.setAttribute('data-show', '');
	
			popperInstance.setOptions((options) => ({
				...options,
				modifiers: [
					...options.modifiers,
					{ name: 'eventListeners', enabled: true },
				],
			}))
	
			// Update its position
			popperInstance.update();
		}

		function hide() {
			// Hide the tooltip
			submenuContent.removeAttribute('data-show');
	
			// Disable the event listeners
			popperInstance.setOptions((options) => ({
				...options,
				modifiers: [
				...options.modifiers,
				{ name: 'eventListeners', enabled: false },
				],
			}));
		}

		const showEvents = ['mouseenter', 'focus'];
		const hideEvents = ['mouseleave', 'blur'];

		showEvents.forEach((event) => {
			submenu?.addEventListener(event, show);
		});

		hideEvents.forEach((event) => {
			submenu?.addEventListener(event, hide);
		});
	});
};

const openPanelContent = () => {
	Array.from(panelContentItems).forEach((panel) => {
		const panelButton = document?.querySelector(
			`.panel-item[data-panel='${panel.getAttribute('data-panel')}']`
		);
		const panelTrigger = panel?.querySelector('.panel-trigger');

		panelButton?.addEventListener('click', () => {
			closePanelList();
			panel?.classList.add('is-active');
		});

		panelTrigger?.addEventListener('click', () => {
			panel?.classList.remove('is-active');
			togglePanelList();
		});
	});
};

const Header = () => {
	toggleSettingPanel();
	openPanelContent();
	handleSubmenu();
	handleCountryOptionsDesktop();
	toggleMobileHeader();
	handleSearch();
};

export { Header };

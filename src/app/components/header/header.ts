import { createPopper } from '@popperjs/core';

const settingPanel = document.querySelector('.setting-panel');
const panelList = settingPanel?.querySelector('.panel-list');
const settingPanelBtn = document.querySelector('.header-btn-setting');
const panelContentItems = document.querySelectorAll(
	'.panel-content .panel-content-item[data-panel]'
);
const settingMask = document.querySelector('.setting-mask');
const submenus = document.querySelectorAll('.has-submenu');

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
		panelList?.classList.add('is-hidden');
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

	triggerBtn.addEventListener('click', () => {
		if (!optionsList.hasAttribute('show-popper')) {
			optionsList.setAttribute('show-popper', '');
		} else {
			optionsList.removeAttribute('show-popper');
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
			submenu.addEventListener(event, show);
		});

		hideEvents.forEach((event) => {
			submenu.addEventListener(event, hide);
		});
	});
};

const openPanelContent = () => {
	Array.from(panelContentItems).forEach((panel) => {
		const panelButton = document.querySelector(
			`.panel-item[data-panel='${panel.getAttribute('data-panel')}']`
		);
		const panelTrigger = panel.querySelector('.panel-trigger');

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
};

export { Header };

const dashboardControlBtn = document.querySelectorAll('.dashboard__control');
const dailyBtn = document.getElementById('daily-btn');

let dataObj;

async function fetchData() {
	const response = await fetch('data.json');
	if (!response.ok) throw new Error(`${response.status}`);
	dataObj = await response.json();

	displayCard('daily');
}

fetchData();

function displayCard(timeframe = 'daily') {
	const previousLabels = {
		daily: 'Yesterday',
		weekly: 'Last Week',
		monthly: 'Last Month',
	};

	const formatHours = (hours) => (hours === 1 ? '1hr' : `${hours}hrs`);

	dataObj.forEach((item) => {
		const cardId = item.title.toLowerCase().replace(' ', '-') + '-card';
		const card = document.getElementById(cardId);

		if (card) {
			const titleElement = card.querySelector('.card__title');
			if (titleElement) {
				titleElement.textContent = item.title;
			}

			const currentValue = item.timeframes[timeframe].current;
			const previousValue = item.timeframes[timeframe].previous;

			const currentContainer = card.querySelector('.time-frame__current');
			if (currentContainer) {
				currentContainer.innerHTML = `${formatHours(currentValue)}`;
			}

			const previousContainer = card.querySelector('.time-frame__previous');
			if (previousContainer) {
				previousContainer.innerHTML = `${previousLabels[timeframe]} - <span>${formatHours(previousValue)}</span>`;
			}
		}
	});
}

function handleControlBtn() {
	dailyBtn.classList.add('active');

	dashboardControlBtn.forEach((btn) => {
		btn.addEventListener('click', () => {
			dashboardControlBtn.forEach((button) => {
				button.classList.remove('active');
			});
			btn.classList.add('active');

			const timeframe = btn.id.replace('-btn', '');
			displayCard(timeframe);
		});
	});
}

handleControlBtn();

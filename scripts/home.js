// API URL
const allCardsUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// Loading Spinner Container
const loadingSpinner = document.getElementById("loading_spinner");

// No Search Result Found Container
const noSearchResult = document.getElementById("no_search_result");

// 3 Tab Buttons
const allTabBtn = document.getElementById("all_tab_btn");
const openTabBtn = document.getElementById("open_tab_btn");
const closeTabBtn = document.getElementById("close_tab_btn");

// Issue Count Container
const issuesCount = document.getElementById("issue_count");
// Cards Container
const cardsContainer = document.getElementById("card_container");

// Modal Container
const modalContainer = document.getElementById("modal_container");

/* This async function fetch data through API and run condition to collect open or closed status cards and send the cards by calling open or close render function*/
async function loadAllCards() {
	loadingSpinner.classList.remove("hidden");
	const response = await fetch(allCardsUrl);
	const allCards = await response.json();
	issuesCount.innerText = allCards.data.length;

	allCards.data.forEach((card) => {
		if (card.status == "open") {
			renderOpenCard(card);
		} else if (card.status == "closed") {
			renderCloseCard(card);
		}
	});
	loadingSpinner.classList.add("hidden");
}

/* This function catch 3 button and by default remove btn-primary class and, when function call they recive parameter and add btn-primary class, also clear previous conatiner html */
function activeButton(id) {
	allTabBtn.classList.remove("btn-primary");
	openTabBtn.classList.remove("btn-primary");
	closeTabBtn.classList.remove("btn-primary");

	document.getElementById(id).classList.add("btn-primary");
	if (id == "all_tab_btn") {
		cardsContainer.innerHTML = "";
		loadAllCards();
		noSearchResult.classList.add("hidden");
	} else if (id == "open_tab_btn") {
		cardsContainer.innerHTML = "";
		filterTabsCards(id);
		noSearchResult.classList.add("hidden");
	} else if (id == "close_tab_btn") {
		cardsContainer.innerHTML = "";
		filterTabsCards(id);
		noSearchResult.classList.add("hidden");
	}
}

/* This async function fetch cards from API and Filter cards based Open & Closed status, send the cards by calling open or close render function */
async function filterTabsCards(id) {
	loadingSpinner.classList.remove("hidden");
	const response = await fetch(allCardsUrl);
	const cards = await response.json();

	const openTab = cards.data.filter((card) => card.status === "open");
	const closeTab = cards.data.filter((card) => card.status === "closed");

	openTab.forEach((card) => {
		if (id === "open_tab_btn") {
			issuesCount.innerText = openTab.length;
			renderOpenCard(card);
		}
	});

	closeTab.forEach((card) => {
		if (id === "close_tab_btn") {
			issuesCount.innerText = closeTab.length;
			renderCloseCard(card);
		}
	});
	loadingSpinner.classList.add("hidden");
}

/* This function render open status card, when call this function they recive loop cards (parameter/arguments) and render in cardsContainer on open status based style */
function renderOpenCard(card) {
	const cardDiv = document.createElement("div");
	cardDiv.classList.add(
		"rounded-lg",
		"border-t-3",
		"border-green-500",
		"bg-white",
		"shadow-lg",
	);
	cardDiv.innerHTML = `
		<!-- This is card ${card.id} -->
		<div onclick="openModalAndRender(${card.id})">
			<!-- Card Start -->
			<div class="space-y-4 p-5">
				<div class="flex justify-between">
					<div>
						<img
							src="./assets/Open-Status.png"
							alt=""
							class=""
						/>
					</div>
					<span
						class="${
							card.priority === "high"
								? "bg-red-100 text-red-500 rounded-full uppercase badge px-5 py-3 font-medium"
								: card.priority === "medium"
									? "bg-yellow-100 text-yellow-500 rounded-full uppercase badge px-5 py-3 font-medium"
									: "bg-slate-100 text-slate-500 rounded-full uppercase badge px-5 py-3 font-medium"
						}"
						>${card.priority}
               	</span>
				</div>

				<h2 class="font-semibold capitalize line-clamp-1">${card.title}</h2>
				<p class="line-clamp-2">${card.description}</p>

				<div class="flex gap-2">
					${card.labels
						.map(
							(lebel) => `<span 
               	class="badge bg-slate-100 line-clamp-1 text-yellow-500  font-medium rounded-full uppercase">
                  	${lebel}
               	</span>
            	`,
						)
						.join("")}
				</div>
			</div>

			<!-- Card End -->
			<div class="border-t-2 p-5 border-[#E4E4E7]">
				<p class="normalColor"><span>#${card.id}</span> by ${card.author}</p>
				<p class="normalColor">${new Date(card.createdAt).toLocaleString("en-US", {
					month: "numeric",
					day: "numeric",
					year: "numeric",
				})}</p>
			</div>
		</div>
   `;
	cardsContainer.appendChild(cardDiv);
}

/* This function render close status card, when call this function they recive loop cards parameter/arguments and render in cardsContainer on close status based style */
function renderCloseCard(card) {
	const cardDiv = document.createElement("div");
	cardDiv.classList.add(
		"rounded-lg",
		"border-t-3",
		"border-purple-500",
		"bg-white",
		"shadow-lg",
	);
	cardDiv.innerHTML = `
		<!-- This is card ${card.id} -->
		<div onclick="openModalAndRender(${card.id})">
			<!-- Card Start -->
			<div class="space-y-4 p-5">
				<div class="flex justify-between">
					<div>
						<img
							src="./assets/Closed- Status .png"
							alt=""
							class=""
						/>
					</div>
					<span
						class="${
							card.priority === "high"
								? "bg-red-100 text-red-500 rounded-full uppercase badge px-5 py-3 font-medium"
								: card.priority === "medium"
									? "bg-yellow-100 text-yellow-500 rounded-full uppercase badge px-5 py-3 font-medium"
									: "bg-slate-100 text-slate-500 rounded-full uppercase badge px-5 py-3 font-medium"
						}"
						>${card.priority}
		         </span>
				</div>

				<h2 class="font-semibold capitalize line-clamp-1">${card.title}</h2>
				<p class="line-clamp-2">${card.description}</p>

				<div class="flex gap-2">
					${card.labels
						.map(
							(lebel) => `<span
		         	class="badge bg-slate-100 text-yellow-500  font-medium rounded-full uppercase">
		            	${lebel}
		         	</span>
		      	`,
						)
						.join("")}
				</div>
			</div>

			<!-- Card End -->
		   <div class="border-t-2 p-5 border-[#E4E4E7]">
				<p class="normalColor"><span>#${card.id}</span> by ${card.author}</p>
				<p class="normalColor">${new Date(card.createdAt).toLocaleString("en-US", {
					month: "numeric",
					day: "numeric",
					year: "numeric",
				})}</p>
			</div>
		</div>
	`;
	cardsContainer.appendChild(cardDiv);
}

/* This async function catch id and fetch mathed id card from API and call modal function and render in modal, also modal shows dynamic data with diffrent colour or style except lebels*/
async function openModalAndRender(id) {
	const response = await fetch(
		`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
	);
	const card = await response.json();
	const cardData = card.data;

	const contentDiv = document.createElement("div");
	contentDiv.classList.add("space-y-7");
	contentDiv.innerHTML = `
		<!-- *Title -->
		<h1 class="text-2xl font-bold capitalize">
			${cardData.title}
		</h1>

		<!-- *Status, who assignee, created time-->
		<div class="flex gap-1.5 items-center">

			<span
				class="${cardData.status == "closed" ? "badge bg-purple-600 text-white rounded-full badge-lg capitalize text-xs" : cardData.status === "open" ? "badge bg-green-600 text-white rounded-full badge-lg capitalize text-xs" : ""}"
				>${cardData.status}</span
			>

			<span
				class="w-1.5 h-1.5 rounded-full bg-[#64748B]"
			></span>

			<span class="text-xs normalColor"
				>Opened by ${cardData.author}</span
			>

			<span
				class="w-1.5 h-1.5 rounded-full bg-[#64748B]"
			></span>

			<span class="text-xs normalColor">${new Date(cardData.createdAt).toLocaleString(
				"en-US",
				{ month: "numeric", day: "numeric", year: "numeric" },
			)}</span>
		</div>

		<!--* Lebels -->
		<div class="flex gap-3">
			${cardData.labels.map((lebel) => `<span class="badge bg-slate-100 text-yellow-500 font-medium rounded-full uppercase line-clamp-1">${lebel}</span>`).join("")}
		</div>

		<!-- *Description -->
		<div>
			<p>${cardData.description}</p>
		</div>

		<!-- *Assign & Priority -->
		<div class="bgColor rounded-lg p-5 grid grid-cols-2">

			<!-- *Left Side -->
			<div>
				<span class="normalColor">Assignee:</span>
				<p class="font-semibold capitalize">${cardData.assignee}</p>
			</div>

			<!-- *Right Side -->
			<div>
				<p class="normalColor">Priority:</p>
				<p class="${cardData.priority === "high" ? "badge badge-lg bg-red-500 text-white uppercase rounded-full" : cardData.priority === "medium" ? "badge badge-lg bg-yellow-500 text-white uppercase rounded-full" : "badge badge-lg bg-slate-500 text-white uppercase rounded-full"}"
				>${cardData.priority}</p>
			</div>
		</div>

		<!-- Modal Close Button -->
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
					<button class="btn btn-primary">Close</button>
			</form>
		</div>
	`;

	modalContainer.innerHTML = "";
	modalContainer.appendChild(contentDiv);
	my_modal_1.showModal();
}

/* This Event listener catch user search input and give related cards, if no card matched then show error massage, while searching time show spinner */
document.getElementById("search_btn").addEventListener("click", () => {
	loadingSpinner.classList.remove("hidden");
	noSearchResult.classList.add("hidden");

	const searchInput = document.getElementById("search_input");
	const searchValue = searchInput.value.toLowerCase();

	if (searchValue.length > 0) {
		cardsContainer.innerHTML = "";
	} else {
		loadingSpinner.classList.add("hidden");
		return;
	}

	fetch(
		`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
	)
		.then((res) => res.json())
		.then((cards) => {
			const searchFilterCards = cards.data.filter((card) =>
				card.title.toLowerCase().includes(searchValue),
			);

			issuesCount.innerText = searchFilterCards.length;

			if (searchFilterCards.length === 0) {
				cardsContainer.innerHTML = "";
				noSearchResult.classList.remove("hidden");
				loadingSpinner.classList.add("hidden");
				return;
			}

			searchFilterCards.forEach((card) => {
				if (card.status === "open") {
					renderOpenCard(card);
				} else if (card.status === "closed") {
					renderCloseCard(card);
				}
			});
			loadingSpinner.classList.add("hidden");
		});
});

loadAllCards();

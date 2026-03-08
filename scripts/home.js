const allCardsUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const loadingSpinner = document.getElementById("loading_spinner");
const allTabBtn = document.getElementById("all_tab_btn");
const openTabBtn = document.getElementById("open_tab_btn");
const closeTabBtn = document.getElementById("close_tab_btn");

const issuesCount = document.getElementById("issue_count");
const cardsContainer = document.getElementById("card_container");

const modalContainer = document.getElementById("modal_container");

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

function activeButton(id) {
	allTabBtn.classList.remove("btn-primary");
	openTabBtn.classList.remove("btn-primary");
	closeTabBtn.classList.remove("btn-primary");

	document.getElementById(id).classList.add("btn-primary");
	if (id == "all_tab_btn") {
		cardsContainer.innerHTML = "";
		loadAllCards();
	} else if (id == "open_tab_btn") {
		cardsContainer.innerHTML = "";
		filterTabsCards(id);
	} else if (id == "close_tab_btn") {
		cardsContainer.innerHTML = "";
		filterTabsCards(id);
	}
}

async function filterTabsCards(id) {
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
}

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
				<p class="${cardData.priority === "high" ? "badge badge-lg bg-red-500 text-white uppercase" : cardData.priority === "medium" ? "badge badge-lg bg-yellow-500 text-white uppercase" : "badge badge-lg bg-slate-500 text-white uppercase"}"
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

loadAllCards();

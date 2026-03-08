const allCardsUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const loadingSpinner = document.getElementById("loading_spinner");
const allTabBtn = document.getElementById("all_tab_btn");
const openTabBtn = document.getElementById("open_tab_btn");
const closeTabBtn = document.getElementById("close_tab_btn");

const issuesCount = document.getElementById("issue_count");
const cardsContainer = document.getElementById("card_container");

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
		<div onclick="openmoadl(${card.id})">
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
		<div onclick="openmoadl(${card.id})">
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

function openmoadl(id) {
	console.log(id);
}

loadAllCards();

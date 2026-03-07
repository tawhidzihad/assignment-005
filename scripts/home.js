const allCardsUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const openTab = [];
const closeTab = [];

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
			const cardDiv = document.createElement("div");
			cardDiv.classList.add(
				"rounded-lg",
				"border-t-3",
				"border-green-500",
				"bg-white",
				"shadow-lg",
			);
			cardDiv.innerHTML = `

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
         `;
			cardsContainer.appendChild(cardDiv);
		} else if (card.status == "closed") {
			const cardDiv = document.createElement("div");
			cardDiv.classList.add(
				"rounded-lg",
				"border-t-3",
				"border-purple-500",
				"bg-white",
				"shadow-lg",
			);
			cardDiv.innerHTML = `

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
		   `;
			cardsContainer.appendChild(cardDiv);
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
		cardsContainer.innerHTML = "Open Tab";
	} else if (id == "close_tab_btn") {
		cardsContainer.innerHTML = "Close Tab";
	}
}

loadAllCards();

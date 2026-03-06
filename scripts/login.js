document.getElementById("loginButton").addEventListener("click", () => {
	// get the admin name
	const inputName = document.getElementById("input_admin_name");
	const userName = inputName.value;

	// get the admin password
	const inputPassword = document.getElementById("input_admin_Pass");
	const userPassword = inputPassword.value;

	// if input is empty then function will be end
	if (userName.length > 0 && !userPassword.length > 0) {
		return;
	}

	// match admin name & password.
	if (userName === "admin" && userPassword === "admin123") {
		// if true than redirect to home page.
		window.location.assign("./home.html");
	} else {
		// if false show modal error massage.
		my_modal_2.showModal();
	}
});

const patterns = {
	telephone: /^\d{11}$/,
	username: /^[a-z\d]{5,12}$/i,
	password: /^[\w@-]{8,20}$/i,
	email: /^([a-z\d\.-]+)@([a-z]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
	slug: /^[a-z\d-]{8,20}$/,
};

const validate = (field, regex) => {
	const element = document.getElementById(`${field.name}-error`);
	regex.test(field.value)
		? (element.style.display = "none")
		: (element.style.display = "block");
};

const init = () => {
	// hide all validation errors
	const validationErrors = document.querySelectorAll("p");
	validationErrors.forEach((el) => (el.style.display = "none"));

	// register eventListener with validate function on all inputs
	const inputs = document.querySelectorAll("input");
	inputs.forEach((input) => {
		input.addEventListener("keyup", (e) =>
			validate(e.target, patterns[e.target.attributes.name.value])
		);
	});

	// register eventListener for toggling password
	const togglePassword = document.querySelector("#toggle-password");
	togglePassword.addEventListener("click", (e) => {
		const passwordInput = document.querySelector("#password");
		passwordInput.type =
			passwordInput.type === "password" ? "text" : "password";
	});
};

init();

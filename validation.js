/**
 * regEx patterns used to validate fields
 * @property telephone - 11 digits (follows UK format)
 * @property username - must be letters or digits, between 5-12 characters
 * @property password - must be alphanumerical 8-20 characters
 * @property email - must follow email format yourname@yourdomain.com (can have additional .uk or other)
 * @property slug - must be alphanumerical between 8-20 characters and can include "-"
 */
const patterns = {
	// starts and ends (^...$)
	// 11 digits (\d{11})
	telephone: /^\d{11}$/,
	// starts and ends ^$
	// range characters a-z and \d - all digits, between 5-12 ({5,12})
	// is not case sensitive (/i)
	username: /^[a-z\d]{5,12}$/i,
	// starts and ends ^$
	// range any word with @ and - ([\w@-])
	// between 8-20 characters ({8,20})
	// is not case sensitive (/i)
	password: /^[\w@-]{8,20}$/i,
	// starts and ends ^$
	// =====first block: range ([])=====
	// letters between a-z (a-z)
	// includes digits and dot and "-" (\d \. -)
	// secondly has "@"
	// =====second block:=====
	// range letters between a-z ([a-z]+) of any length
	// has dot (.) (\.)
	// =====third block:=====
	// range of a-z letters [a-z]
	// between 2-8 characters ({2,8})
	// =====fourth block:=====
	// starts with dot (.) (\.)
	// is a range of letters between a-z ([a-z])
	// between 2-8 characters ({2,8})
	// is optional (?)
	email: /^([a-z\d\.-]+)@([a-z]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
	// starts and ends ^$
	// range a-z letters [a-z]
	// includes digits (\d)
	// between 8 and 20 characters ({8,20})
	slug: /^[a-z\d-]{8,20}$/,
};

/**
 * validate function will use patterns to validate if the input value is correct
 * and will run appropriate logic based on the regular expression test results
 * @param field - field that was just edited by the user
 * @param regex - one of the patterns which is assigned based on the field edited by the user
 */
const validate = (field, regex) => {
	const element = document.getElementById(`${field.name}-error`);
	regex.test(field.value)
		? (element.style.display = "none")
		: (element.style.display = "block");
};

/**
 * init function is registering eventListeners and initializes all
 * validation feedback elements in our HTML to be hidden. It:
 * 1. Sets validation errors elements to display = "none"
 * 2. Registers all inputs and assigns click event to run validation check
 * 3. Registers password toggle to allow user show/hide password when clicking on button
 */
const init = () => {
	// hide all validation errors
	const validationErrors = document.querySelectorAll("p");
	validationErrors.forEach((el) => (el.style.display = "none"));

	// register eventListener with validate function on all inputs:
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

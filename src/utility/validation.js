const validate = (val, rules, connectedValue) => {
	let isValid = true;
	for (let rule in rules) {
		//loops to through all rules in JS object
		switch (rule) {
			case "isEmail":
				//could have multiple rule checks
				isValid = isValid && emailValidator(val);
				break;
			case "minLength":
				isValid = isValid && minLengthValidator(val, rules[rule]); //value for key minLength
				break;
			case "equalTo":
				isValid = isValid && equalToValidator(val, connectedValue[rule]); //value for key "equalTo"
				break;
			case "notEmpty":
				isValid = isValid && notEmptyValidator(val);
				break;
			default:
				isValid = true;
		}
	}
	return isValid;
};

const emailValidator = val => {
	return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
		val
	);
};

const minLengthValidator = (val, minLength) => {
	return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
	return val === checkValue;
};

const notEmptyValidator = val => {
	return val.trim() !== "";
};

export default validate;

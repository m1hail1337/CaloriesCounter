const COEFFS = {
    'male': 5,
    'female': -161,
    'min': 1.2,
    'low': 1.375,
    'medium': 1.55,
    'high': 1.725,
    'max': 1.9
};

const form = document.querySelector('.counter__form');
const resultWindow = document.querySelector('.counter__result');
const caloriesNorm = resultWindow.querySelector('#calories-norm');
const caloriesMinimal = resultWindow.querySelector('#calories-minimal');
const caloriesMaximal = resultWindow.querySelector('#calories-maximal');
const genderForm = form.querySelector('.switcher');
const ageForm = form.querySelector('#age');
const weightForm = form.querySelector('#weight');
const heightForm = form.querySelector('#height');
const activityForm = form.querySelector('.radios-group');
const resultButton = form.querySelector('.form__submit-button');
const resetButton = form.querySelector('.form__reset-button');

let age = '';
let weight = '';
let height = '';
let gender = 'male';
let activity = 'min';


genderForm.addEventListener('change', () => {
    gender = genderForm.querySelector('input[name="gender"]:checked').value;
});
ageForm.addEventListener('input', () => {
    age = ageForm.value;
    checkValues();
});
weightForm.addEventListener('input', () => {
    weight = weightForm.value;
    checkValues();
});
heightForm.addEventListener('input', () => {
    height = heightForm.value;
    checkValues();
});
activityForm.addEventListener('change', () => {
    activity = activityForm.querySelector('input[name="activity"]:checked').value;
})
resultButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const result = countResult(gender, age, weight, height, activity);
    caloriesNorm.textContent = Math.ceil(result);
    caloriesMinimal.textContent = Math.ceil(result * 0.85);
    caloriesMaximal.textContent = Math.ceil(result * 1.15);
    resultWindow.classList.remove('counter__result--hidden');
})
resetButton.addEventListener('click', () => {
    resultWindow.classList.add('counter__result--hidden');
});

const checkValues = () => {
    resultButton.disabled = !(age !== '' &&  weight !== '' && height !== '') 
    resetButton.disabled = !(age !== '' ||  weight !== '' || height !== '')
}

const countResult = (gender, age, weight, height, activity) =>
    COEFFS[activity] * (10 * weight + 6.25 * height - 5 * age + COEFFS[gender]);

import JustValidate from 'https://cdn.jsdelivr.net/npm/just-validate@4.2.0/dist/just-validate.es.js';
import { addEnergyLog, saveUserProfile } from './storage.js';

export function setupRegistrationValidation() {
  const validation = new JustValidate('#registration-form');

  validation
    .addField('#name', [
      { rule: 'required', errorMessage: 'Name is required' },
      { rule: 'minLength', value: 2, errorMessage: 'Name must be at least 2 characters' },
    ])
    .addField('#age', [
      { rule: 'required', errorMessage: 'Age is required' },
      { rule: 'number', errorMessage: 'Age must be a number' },
      { rule: 'minNumber', value: 10, errorMessage: 'Minimum age is 10' },
      { rule: 'maxNumber', value: 100, errorMessage: 'Maximum age is 100' },
    ])
    .addField('#gender', [
      { rule: 'required', errorMessage: 'Gender is required' },
    ])
    .onSuccess((event) => {
      event.preventDefault();

      const name = document.querySelector('#name').value.trim();
      const age = document.querySelector('#age').value.trim();
      const gender = document.querySelector('#gender').value;

      const userProfile = {
        name,
        age: Number(age),
        gender,
        energyLogs:[],
      };

      saveUserProfile(userProfile);

      document.querySelector('#registration-form').reset();
      window.location.href = 'myProfile.html';
    });
}
export function setupAddEnergyLvlValidation() {
  const validation = new JustValidate('#addEnergyLvl-form');

  validation
    .addField('#energyLevel', [
      { rule: 'required', errorMessage: 'Energy level is required' },
      { rule: 'number', errorMessage: 'Energy level must be a number' },
      { rule: 'minNumber', value: 0, errorMessage: 'Minimum energy level is 0' },
      { rule: 'maxNumber', value: 10, errorMessage: 'Maximum energy level is 10' },
    ])

    .onSuccess((event) => {
      event.preventDefault();

      const mood = document.querySelector('#mood').value;
      const lvl = document.querySelector('#energyLevel').value.trim();
      const about = document.querySelector('#about').value.trim();
      const timestamp = new Date().toJSON();

      const energyLevel = {
        id: Date.now(),
        timestamp,
        mood,
        energyLvl: Number(lvl),
        comment: about
      };

      addEnergyLog(energyLevel);

      const modal = document.querySelector("#modal");
      modal.classList.add("opacity-0");
        modal.classList.remove("opacity-100");
        setTimeout(() => {
            modal.classList.add('hidden');
          }, 300);
    });
}
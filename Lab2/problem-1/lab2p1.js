const myBtn = document.getElementById('myBtn');

myBtn.addEventListener('click', function handleClick(event) {
    event.preventDefault();

    const contactNameInput = document.getElementById('contact-name');
    const mobileNoInput = document.getElementById('mobile-no');
    const emailInput = document.getElementById('email');

    console.log(contactNameInput.value);
    console.log(mobileNoInput.value);
    console.log(emailInput.value);

    contactNameInput.value = '';
    mobileNoInput.value = '';
    emailInput.value = '';
});
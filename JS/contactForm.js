const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append('access_key', '1a4b508e-2467-4c89-83b6-4d6861acf284');

  const originalText = submitBtn.textContent;

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert('Success! Your message has been sent.');
      form.reset();
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    alert('Something went wrong. Please try again.');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

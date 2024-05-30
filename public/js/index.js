
const form = document.getElementById('login-form');
const errors = document.getElementById('errors');



form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = form.elements['username'].value;
    const password = form.elements['password'].value;

    const params = {
        username,
        password
    };

    try {
        const res = await axios.post('http://localhost:3000/login', params);
        if (res.status === 200) {
            console.log(res)
            const token = res.data;
            localStorage.setItem('token', token);
            window.location.href = '/posts';
        }
    } catch (err) {
        errors.innerText = err.response.data;
    }
});
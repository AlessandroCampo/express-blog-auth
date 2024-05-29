const postContainer = document.getElementById('posts');
const form = document.getElementById('creation-form');
const formErrorsContainer = document.getElementById('form-errors');





document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', async (event) => {
        console.log('event clicked')
        return
        event.preventDefault();
        const formData = new FormData(form);
        try {
            response = await axios.post('http://localhost:3000/posts', formData);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.list) {
                err.response.data.list.forEach(e => {
                    const li = document.createElement('li');
                    li.innerText = e;
                    formErrorsContainer.appendChild(li);
                });
            }
        }
    });
});


const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}



const printFeed = async () => {
    let response;
    try {
        response = await axios.get('http://localhost:3000/posts');
    } catch (err) {
        console.error(err);
    }
    if (response) {
        const postsHTML = response.data.map(post => `
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white mb-8">
                <a href="http://localhost:3000/posts/${post.slug}" class="block">
                    <div class="px-6 py-4">
                        <p class="text-gray-400 text-sm"><span class="font-bold me-2">${post.author}</span> ${formatDate(post.creation_date)}</p>
                    </div>
                    <img class="h-[300px] object-cover w-full" src="${post.image}" alt="${post.title}">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">${post.title}</div>
                        <p class="text-gray-300 text-base">${post.content}</p>
                    </div>
                    <div class="px-6 py-4">
                        ${post.tags.map(tag => `<span class="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">${tag}</span>`).join('')}
                    </div>
                </a>
                <form class="px-6 py-4" action="http://localhost:3000/posts/${post.slug}/comment" method="post">
                    <textarea name="comment" class="w-full bg-gray-700 text-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Leave a comment..."></textarea>
                    <input type="submit" value="Leave a comment" class="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md cursor-pointer">
                </form>
            </div>
        `).join('');

        postContainer.innerHTML += postsHTML;
    }
}

printFeed()
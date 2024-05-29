const cardHTML = document.getElementById('card');
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

const deletePost = async (slug) => {
    try {
        const response = await axios.delete(`http://localhost:3000/posts/${slug}`);
        if (response.status === 200) {
            window.location.href = "/posts";
        } else {
            console.error('Error:', response.data);
        }
    } catch (err) {
        console.error('Error:', err)
    }
};


const printCard = async () => {
    const slug = window.location.pathname.split('/').pop();
    let post;
    try {
        const response = await axios.get(`http://localhost:3000/posts/${slug}`);
        post = response.data;
        if (post) {
            const cardTemplate = `
                <div class="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden text-white">
                    <div class="px-6 py-4">
                        <p class="text-gray-400 text-sm"><span class="font-bold me-2">${post.author}</span>${formatDate(post.creation_date)}</p>
                    </div>
                    <img class="h-64 w-full object-cover" src="${post.image}" alt="${post.title}">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">${post.title}</div>
                        <p class="text-gray-300 text-base mb-6">${post.content}</p>
                        <a href="${post.image_url}" class="text-blue-400 font-bold mt-4 text-lg" target="_blank">Image Link</a>
                    </div>
                    <div class="px-6 py-4">
                        ${post.tags.map(tag => `<span class="inline-block bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">${tag}</span>`).join('')}
                    </div>
                    <div class="px-6 py-4 flex items-center gap-2">
                        <a href="http://localhost:3000/posts/${post.slug}/download" class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Download this image
                        </a>

                        <button id="delete-post-${post.slug}" class="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete this post
                    </button>
                    </div>
                
                    <div class="px-6 py-4">
                        <h3 class="text-xl font-bold mb-2">Comments</h3>
                        <ul class="list-disc list-inside">
                            ${post.comments.map(comment => `<li class="text-gray-300">${comment}</li>`).join('')}
                        </ul>
                    </div>
                </div>`;


            cardHTML.innerHTML = cardTemplate;
            const deleteButton = document.getElementById(`delete-post-${post.slug}`)
            deleteButton.addEventListener('click', function () {
                deletePost(slug)
            })
        } else {
            cardHTML.innerHTML = "<p>No post found</p>";
        }
    } catch (err) {
        console.error(err);
        cardHTML.innerHTML = "<p class='text-white'>Error fetching post</p>";
    }
};

printCard();

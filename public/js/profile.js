const newPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#postName').value.trim();
    const content = document.querySelector('#postDescription').value.trim();
    if (title && content) {
        const user = await fetch (`/api/users/user/${document.cookie}`)
        const userInfo = await user.json();
      const response = await fetch(`/api/users/posts/user/${userInfo.id}`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create new post');
      }
    }
  };
  
  document
    .querySelector('#postForm')
    .addEventListener('submit', newPostHandler);

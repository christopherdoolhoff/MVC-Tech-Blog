const newPostHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#postName').value.trim();
    const description = document.querySelector('#postDescription').value.trim();
    const website = document.querySelector('#postWebsite').value.trim();
    if (name && description && website) {
        const user = await fetch (`/api/users/user/${document.cookie}`)
        const userInfo = await user.json();
      const response = await fetch(`/api/users/submissions/user/${userInfo.id}`, {
        method: 'POST',
        body: JSON.stringify({ name, description, website }),
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

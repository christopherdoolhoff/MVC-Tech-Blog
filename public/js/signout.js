const signout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Failed to log out');
    }
};

document.querySelector('#logout').addEventListener('click', signout);

const form = document.getElementById('form_publi');

const uploadPublication = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData(form);  // FormData creado a partir del formulario 'form_publi'

    try {
        const response = await fetch('http://localhost:4000/subir', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.msg);
            window.location.href = '/index.html';
        } else {
            const errorData = await response.json();
            throw new Error(errorData.msg);
        }
    } catch (error) {
        console.error('Error al subir la publicación:', error.message);
        alert('Error al subir la publicación. Inténtalo de nuevo más tarde.');
    }
};

form.addEventListener('submit', uploadPublication);

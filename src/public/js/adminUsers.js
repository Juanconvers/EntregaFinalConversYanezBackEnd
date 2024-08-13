
async function fetchUsers() {
    const response = await fetch('/api/users');
    const users = await response.json();
    const tbody = document.querySelector('#usersTable tbody');

    tbody.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${user.first_name} ${user.last_name}</td>
      <td>${user.email}</td>
      <td>
        <button onclick="deleteUser('${user._id}')" class="btn btn-sm btn-danger">Eliminar</button>
      </td>
    `;
        tbody.appendChild(tr);
    });
}

async function deleteUser(userId) {
    const response = await fetch(`/api/users/admin/${userId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        fetchUsers();
    } else {
        alert('Error al eliminar el usuario');
    }
}

fetchUsers();
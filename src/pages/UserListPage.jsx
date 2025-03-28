import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, updateUser, deleteUser } from "../Services/Api";

function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const navigate = useNavigate();

  const loadUsers = async (page) => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);
      const response = await fetchUsers(page);

      if (!response) {
        setError("Failed to load users.");
      } else {
        setUsers(response.data);
        setTotalPages(response.total_pages);
      }
    } catch (err) {
      setError(err.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      setSuccess("User deleted successfully.");
    } catch (err) {
      setError(err.message || "Failed to delete user.");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser(editingUser, formData);
      setUsers(
        users.map((user) =>
          user.id === editingUser ? { ...user, ...formData } : user
        )
      );
      setEditingUser(null);
      setSuccess("User updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update user.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Users List</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        {loading ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-gray-50 p-4 rounded-lg shadow flex flex-col items-center space-y-2"
              >
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="w-16 h-16 rounded-full border"
                />
                <div className="truncate w-full text-center">
                  <h3 className="font-semibold">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-gray-600 text-sm truncate w-full">
                    {user.email}
                  </p>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingUser && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h3 className="text-lg font-semibold">Edit User</h3>
            <input
              className="block w-full p-2 mb-2 border rounded"
              type="text"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              placeholder="First Name"
            />
            <input
              className="block w-full p-2 mb-2 border rounded"
              type="text"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              placeholder="Last Name"
            />
            <input
              className="block w-full p-2 mb-2 border rounded"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            disabled={page === 1 || loading}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded ${
              page === 1 || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700 text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages || loading}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-4 py-2 rounded ${
              page === totalPages || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsersListPage;

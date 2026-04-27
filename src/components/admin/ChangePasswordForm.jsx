import { useState } from "react";
import API from "../../services/api";
import { toast } from "react-hot-toast"; // optional, for notifications

const ChangePasswordForm = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("New password and confirm password must match");
    }

    setLoading(true);
    try {
      const res = await API.post("/admin/change-password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      toast.success(res.data.message);
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white/10 rounded-xl">
      <h2 className="text-xl font-bold text-white mb-4">Change Password</h2>

      <input
        type="password"
        name="oldPassword"
        placeholder="Old Password"
        value={form.oldPassword}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none"
      />

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={form.newPassword}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm New Password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold"
      >
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
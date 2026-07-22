"use client";

import { useEffect, useState } from "react";
import { AdminUser } from "@/types/user";

import UserTable from "@/components/admin/UserTable";

import {
  deleteUser,
  getUsers,
} from "@/services/admin-user.service";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");

  async function loadUsers() {
    const data = await getUsers(search);
    setUsers(data);
  }

  useEffect(() => {
  const timer = setTimeout(() => {
    loadUsers();
  }, 300);

  return () => clearTimeout(timer);
}, [search]);


  async function handleDelete(id: string) {
  if (!confirm("Delete this user?")) return;

  try {
    await deleteUser(id);
    loadUsers();
  } catch (error) {
    console.error(error);
    alert("Failed to delete user.");
  }
}

  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border px-4 py-2"
        />

      </div>

      <UserTable
        users={users}
        onDelete={handleDelete}
      />

    </div>
  );
}
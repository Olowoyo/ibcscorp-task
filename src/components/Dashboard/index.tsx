import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client";
import { User, SortConfig, PaginationState } from "../../types";
import DataTable from "./DataTable";
import Filters from "./Filters";
import Pagination from "./Pagination";
import LoadingState from "./LoadingState";
import useDebounce from "../../hooks/useDebounce";
import EditForm from "../Modal/EditForm";
import CreateForm from "../Modal/CreateForm";
import ConfirmDialog from "../Modal/ConfirmDialog";
import { toast } from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const debouncedSearch = useDebounce(search, 300);
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: api.getUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: api.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
      setUserToDelete(null);
    },
    onError: (error) => {
      toast.error("Failed to delete user");
      console.error("Delete error:", error);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: api.updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
        if (!oldData) return [updatedUser];
        return oldData.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      });
      toast.success("User updated successfully");
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to update user");
      console.error("Update error:", error);
    },
  });

  const createUserMutation = useMutation({
    mutationFn: api.createUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
        if (!oldData) return [newUser];
        return [...oldData, newUser];
      });
      toast.success("User created successfully");
      setIsCreateModalOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to create user");
      console.error("Create error:", error);
    },
  });

  const filteredUsers = useMemo(() => {
    return users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = String(a[sortConfig.key]);
        const bValue = String(b[sortConfig.key]);
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
  }, [users, debouncedSearch, sortConfig]);

  const paginatedUsers = useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const end = start + pagination.itemsPerPage;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, pagination]);

  if (isLoading) return <LoadingState />;
  if (error) return <div>Error loading users</div>;

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setUserToDelete(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Filters search={search} setSearch={setSearch} />
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Create User
        </button>
      </div>

      <DataTable
        onEdit={handleEdit}
        users={paginatedUsers}
        sortConfig={sortConfig}
        onSort={setSortConfig}
        onDelete={handleDelete}
      />
      <Pagination
        totalItems={filteredUsers.length}
        pagination={pagination}
        setPagination={setPagination}
      />

      <EditForm
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={updateUserMutation.mutate}
      />

      <CreateForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={createUserMutation.mutate}
      />

      <ConfirmDialog
        isOpen={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => {
          if (userToDelete) deleteUserMutation.mutate(userToDelete);
        }}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
}

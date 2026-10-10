export const getRoleHome = (user) =>
  user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

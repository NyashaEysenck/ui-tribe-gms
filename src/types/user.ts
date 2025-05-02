
export type UserRole = "admin" | "grant_office" | "researcher";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  position?: string;
}

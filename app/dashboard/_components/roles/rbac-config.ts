  "use client"

export interface RolePermissions {
  manageSuperAdmin: boolean
  createAdmin: boolean
  createManager: boolean
  createModerator: boolean
  addProject: boolean
  editProject: boolean
  deleteProject: boolean
  addService: boolean
  editService: boolean
  deleteService: boolean
  manageUsers: boolean
  viewDashboard: boolean
  siteSettings: boolean
}

export const DEFAULT_RBAC_PERMISSIONS: Record<string, RolePermissions> = {
  superAdmin: {
    manageSuperAdmin: true,
    createAdmin: true,
    createManager: true,
    createModerator: true,
    addProject: true,
    editProject: true,
    deleteProject: true,
    addService: true,
    editService: true,
    deleteService: true,
    manageUsers: true,
    viewDashboard: true,
    siteSettings: true,
  },
  admin: {
    manageSuperAdmin: false,
    createAdmin: false,
    createManager: true,
    createModerator: true,
    addProject: true,
    editProject: true,
    deleteProject: true,
    addService: true,
    editService: true,
    deleteService: true,
    manageUsers: true,
    viewDashboard: true,
    siteSettings: true,
  },
  manager: {
    manageSuperAdmin: false,
    createAdmin: false,
    createManager: false,
    createModerator: true,
    addProject: true,
    editProject: true,
    deleteProject: false,
    addService: false,
    editService: false,
    deleteService: false,
    manageUsers: false,
    viewDashboard: true,
    siteSettings: false,
  },
  moderator: {
    manageSuperAdmin: false,
    createAdmin: false,
    createManager: false,
    createModerator: false,
    addProject: false,
    editProject: true,
    deleteProject: false,
    addService: false,
    editService: false,
    deleteService: false,
    manageUsers: false,
    viewDashboard: true,
    siteSettings: false,
  }
}

export function getRbacPermissions(): Record<string, RolePermissions> {
  if (typeof window === "undefined") return DEFAULT_RBAC_PERMISSIONS
  const stored = localStorage.getItem("arzuma_rbac_permissions")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      return DEFAULT_RBAC_PERMISSIONS
    }
  }
  return DEFAULT_RBAC_PERMISSIONS
}

export function saveRbacPermissions(permissions: Record<string, RolePermissions>) {
  if (typeof window !== "undefined") {
    localStorage.setItem("arzuma_rbac_permissions", JSON.stringify(permissions))
  }
}

export const PERMISSION_LABELS: Record<keyof RolePermissions, string> = {
  manageSuperAdmin: "Manage Super Admin",
  createAdmin: "Create Admin Accounts",
  createManager: "Create Manager Accounts",
  createModerator: "Create Moderator Accounts",
  addProject: "Add Project Items",
  editProject: "Edit Project Items",
  deleteProject: "Delete Project Items",
  addService: "Add Service Items",
  editService: "Edit Service Items",
  deleteService: "Delete Service Items",
  manageUsers: "Manage User Access",
  viewDashboard: "View Core Analytics",
  siteSettings: "Modify Site settings"
}

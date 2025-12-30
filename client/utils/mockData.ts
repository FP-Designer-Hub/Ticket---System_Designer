export interface Designer {
  id: string;
  name: string;
  role: string;
  avatar: string;
  hoursAvailable: number;
  weeklyCapacity: number;
  status: "available" | "limited" | "booked";
  activeTasks: number;
}

export interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in-progress" | "completed";
  dueDate: string;
  suggestedDesigner: Designer;
  assignedDesigner?: Designer;
  description?: string;
  createdAt?: string;
  estimatedHours?: number; // used for availability calculations
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
}

const STORAGE_KEYS = {
  tasks: "designer_ops_tasks_v1",
};

const DEFAULT_TASK_HOURS = 5;

// --- Base designers (org team) ---
const baseDesigners: Omit<Designer, "hoursAvailable" | "status" | "activeTasks">[] = [
  {
    id: "aashwin-bhadauria",
    name: "Aashwin Bhadauria",
    role: "Graphic Designer",
    avatar: "/placeholder.svg",
    weeklyCapacity: 45,
  },
  {
    id: "jitender-khanna",
    name: "Jitender Khanna",
    role: "Graphic Designer",
    avatar: "/placeholder.svg",
    weeklyCapacity: 45,
  },
  {
    id: "mridul-goswami",
    name: "Mridul Goswami",
    role: "Video Editor",
    avatar: "/placeholder.svg",
    weeklyCapacity: 45,
  },
  {
    id: "mohd-muzammil",
    name: "Mohd Muzammil",
    role: "Graphic Designer",
    avatar: "/placeholder.svg",
    weeklyCapacity: 45,
  },
];

function nowTimestamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function loadTasksFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.tasks);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Task[];
  } catch {
    return [];
  }
}

function saveTasksToStorage(tasks: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  } catch {
    // ignore storage errors (private mode, blocked, etc.)
  }
}

// --- Public APIs used across UI ---
export function getTasks(): Task[] {
  // Always read latest from storage so navigation reflects updates.
  if (typeof window === "undefined") return [];
  return loadTasksFromStorage();
}

export function getTaskById(id: string): Task | undefined {
  return getTasks().find((t) => t.id === id);
}

export function clearAllTasks(): void {
  if (typeof window === "undefined") return;
  saveTasksToStorage([]);
}

function getBookedHoursForDesigner(designerId: string, tasks: Task[]): number {
  const active = tasks.filter(
    (t) =>
      t.status !== "completed" &&
      (t.assignedDesigner?.id === designerId || t.suggestedDesigner?.id === designerId),
  );

  // If tasks have estimatedHours use that, else assume DEFAULT_TASK_HOURS
  const hours = active.reduce((sum, t) => sum + (t.estimatedHours ?? DEFAULT_TASK_HOURS), 0);
  return hours;
}

function computeStatus(weeklyCapacity: number, bookedHours: number): "available" | "limited" | "booked" {
  const pct = weeklyCapacity > 0 ? bookedHours / weeklyCapacity : 1;
  if (pct < 0.6) return "available";
  if (pct < 0.85) return "limited";
  return "booked";
}

export function getDesigners(): Designer[] {
  const tasks = typeof window === "undefined" ? [] : loadTasksFromStorage();

  return baseDesigners.map((d) => {
    const bookedHours = getBookedHoursForDesigner(d.id, tasks);
    const hoursAvailable = Math.max(0, d.weeklyCapacity - bookedHours);
    const status = computeStatus(d.weeklyCapacity, bookedHours);
    const activeTasks = tasks.filter(
      (t) => t.status !== "completed" && (t.assignedDesigner?.id === d.id || t.suggestedDesigner?.id === d.id),
    ).length;

    return {
      ...d,
      hoursAvailable,
      status,
      activeTasks,
    };
  });
}

export function getDesignerById(id: string): Designer | undefined {
  return getDesigners().find((d) => d.id === id);
}

/**
 * Create a new task and persist it to localStorage.
 * - suggestedDesigner is computed as the currently most-available designer
 * - assignedDesigner is set if preferredDesignerId is provided
 */
export function createTask(input: {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  preferredDesignerId?: string;
  estimatedHours?: number;
}): Task {
  const designers = getDesigners();

  // best available designer (highest hoursAvailable)
  const suggested = [...designers].sort((a, b) => b.hoursAvailable - a.hoursAvailable)[0] ?? designers[0];

  const preferred = input.preferredDesignerId
    ? designers.find((d) => d.id === input.preferredDesignerId) ?? undefined
    : undefined;

  const newTask: Task = {
    id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: input.title.trim(),
    priority: input.priority,
    status: "open",
    dueDate: input.dueDate,
    suggestedDesigner: suggested,
    assignedDesigner: preferred,
    description: input.description,
    createdAt: nowTimestamp(),
    estimatedHours: input.estimatedHours ?? DEFAULT_TASK_HOURS,
  };

  const current = getTasks();
  const updated = [newTask, ...current];
  saveTasksToStorage(updated);
  return newTask;
}

export function updateTaskStatus(taskId: string, status: Task["status"]): boolean {
  const current = getTasks();
  const idx = current.findIndex((t) => t.id === taskId);
  if (idx === -1) return false;
  current[idx] = { ...current[idx], status };
  saveTasksToStorage(current);
  return true;
}

export function assignTask(taskId: string, designerId: string): boolean {
  const current = getTasks();
  const idx = current.findIndex((t) => t.id === taskId);
  if (idx === -1) return false;

  const designer = getDesignerById(designerId);
  if (!designer) return false;

  current[idx] = { ...current[idx], assignedDesigner: designer };
  saveTasksToStorage(current);
  return true;
}

// --- Audit logs (kept minimal for now; can be wired later) ---
const auditLogs: AuditLog[] = [];

export function getAuditLogs(): AuditLog[] {
  return auditLogs;
}

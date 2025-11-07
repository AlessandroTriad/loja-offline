import type { User } from "./types";

const LS_KEY = "user";

export function getOrCreateUser(): User {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as User;
  } catch {
    // ignore parse/storage errors and recreate
  }
  const user: User = { id: crypto.randomUUID(), nome: "Usuário Demo" };
  localStorage.setItem(LS_KEY, JSON.stringify(user));
  return user;
}

export function renderUserBadge(el: HTMLElement, user: User): void {
  el.textContent = `${user.nome} • ${user.id.slice(0, 8)}`;
}

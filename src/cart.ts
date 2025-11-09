import type { CartItem, Product } from "./types";
import { formatBRL } from "./utils/format";

export class Cart {
  private items: CartItem[] = [];
  private listEl: HTMLElement;
  private qtyEl: HTMLElement;
  private totalEl: HTMLElement;

  constructor(listEl: HTMLElement, qtyEl: HTMLElement, totalEl: HTMLElement) {
    this.listEl = listEl;
    this.qtyEl = qtyEl;
    this.totalEl = totalEl;
  }

  add(product: Product): void {
    const existing = this.items.find((i) => i.product.id === product.id);
    if (existing) existing.qty += 1;
    else this.items.push({ product, qty: 1 });
    this.render();
  }

  remove(index: number): void {
    this.items.splice(index, 1);
    this.render();
  }

  clear(): void {
    this.items = [];
    this.render();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  toOrderItems(): Array<{
    descricao: string;
    preco: number;
    qty: number;
    codigo: string;
  }> {
    return this.items.map((i) => ({
      descricao: i.product.descricao,
      preco: i.product.preco,
      qty: i.qty,
      codigo: i.product.codigo,
    }));
  }

  total(): number {
    return this.items.reduce((sum, i) => sum + i.product.preco * i.qty, 0);
  }

  render(): void {
    this.qtyEl.textContent = String(this.items.reduce((n, i) => n + i.qty, 0));
    this.totalEl.textContent = `Total: ${formatBRL(this.total())}`;
    this.listEl.innerHTML = this.items
      .map(
        (i, idx) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>${i.product.descricao}</strong><br>
            <small>${i.product.codigo}</small>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge text-bg-secondary">${i.qty} x ${formatBRL(
          i.product.preco
        )}</span>
            <button class="btn btn-outline-secondary btn-sm" data-action="decr" data-index="${idx}">-</button>
            <button class="btn btn-outline-secondary btn-sm" data-action="incr" data-index="${idx}">+</button>
            <button class="btn btn-danger btn-sm" data-action="remove" data-index="${idx}">Remover</button>
          </div>
        </li>
      `
      )
      .join("");

    
    this.listEl.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = (btn as HTMLButtonElement).dataset.action!;
        const idx = Number((btn as HTMLButtonElement).dataset.index);
        const item = this.items[idx];
        if (!item) return;
        if (action === "incr") item.qty += 1;
        else if (action === "decr") item.qty = Math.max(1, item.qty - 1);
        else if (action === "remove") this.remove(idx);
        this.render();
      });
    });
  }
}

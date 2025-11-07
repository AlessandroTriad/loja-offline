import Dexie, { Table } from 'dexie';
import type { Product, Order } from './types';

class LojaDB extends Dexie {
  produtos!: Table<Product, number>;
  pedidos!: Table<Order, number>;

  constructor() {
    super('LojaDB');
    this.version(1).stores({
      produtos: '++id,codigo,descricao,preco',
      pedidos: '++id,userId,data'
    });
  }
}

export const db = new LojaDB();

export async function seedProdutos(): Promise<void> {
  const count = await db.produtos.count();
  if (count > 0) return;
  await db.produtos.bulkAdd([
    { codigo: 'P001', descricao: 'Camiseta', preco: 49.9 },
    { codigo: 'P002', descricao: 'Calça Jeans', preco: 99.9 },
    { codigo: 'P003', descricao: 'Tênis', preco: 199.9 },
    { codigo: 'P004', descricao: 'Boné', preco: 39.9 },
    { codigo: 'P005', descricao: 'Jaqueta', preco: 159.9 }
  ]);
}

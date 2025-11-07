export interface Product {
  id?: number;
  codigo: string;
  descricao: string;
  preco: number;
}

export interface User {
  id: string;
  nome: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Order {
  id?: number;
  userId: string;
  itens: Array<{ descricao: string; preco: number; qty: number; codigo: string }>;
  total: number;
  data: string; // ISO
}

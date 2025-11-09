import { db, seedProdutos } from './db';
import type { Product } from './types';
import { Cart } from './cart';
import { getOrCreateUser, renderUserBadge } from './user';
import { formatBRL } from './utils/format';

async function bootstrap(): Promise<void> {
  try {
    await seedProdutos();
    const user = getOrCreateUser();
    const userBadge = document.getElementById('user-badge')!;
    renderUserBadge(userBadge, user);

    const produtos = await db.produtos.toArray();
    renderProdutos(produtos);

    const cart = new Cart(
      document.getElementById('lista-carrinho')!,
      document.getElementById('qtd-carrinho')!,
      document.getElementById('total-carrinho')!
    );
    document.getElementById('btn-finalizar')!.addEventListener('click', async () => {
      if (cart.isEmpty()) {
        alert('Carrinho vazio!');
        return;
      }
      const total = cart.total();
      await db.pedidos.add({
        userId: user.id,
        itens: cart.toOrderItems(),
        total,
        data: new Date().toISOString()
      });
      cart.clear();
      alert('Pedido finalizado com sucesso!');
    });

    
    (window as any).addToCart = async (id: number) => {
      const prod = await db.produtos.get(id);
      if (prod) cart.add(prod);
    };
  } catch (err) {
    console.error(err);
    alert('Ocorreu um erro ao inicializar a aplicação.');
  }
}

function renderProdutos(produtos: Product[]): void {
  const container = document.getElementById('lista-produtos')!;
  container.innerHTML = produtos
    .map(p => `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card product-card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.descricao}</h5>
            <p class="card-text mb-4">
              <span class="badge text-bg-light">${p.codigo}</span>
            </p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <strong>${formatBRL(p.preco)}</strong>
              <button class="btn btn-primary btn-sm" onclick="addToCart(${p.id})">Adicionar</button>
            </div>
          </div>
        </div>
      </div>
    `)
    .join('');
}

bootstrap();

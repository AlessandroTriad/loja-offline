import { db } from './db';
import { getOrCreateUser, renderUserBadge } from './user';
import { formatBRL } from './utils/format';

async function listarPedidos(): Promise<void> {
  const user = getOrCreateUser();
  const userBadge = document.getElementById('user-badge')!;
  renderUserBadge(userBadge, user);

  const pedidos = await db.pedidos.where('userId').equals(user.id).reverse().sortBy('data');
  const container = document.getElementById('lista-pedidos')!;

  if (!pedidos.length) {
    container.innerHTML = '<div class="alert alert-info">Nenhum pedido encontrado.</div>';
    return;
  }

  container.innerHTML = pedidos
    .map(
      p => `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Pedido #${p.id}</h5>
          <p class="card-subtitle text-muted mb-2">Data: ${new Date(p.data).toLocaleString('pt-BR')}</p>
          <ul class="list-unstyled mb-2">
            ${p.itens
              .map(i => `<li>• ${i.qty}× ${i.descricao} — ${formatBRL(i.preco)}</li>`)
              .join('')}
          </ul>
          <strong>Total: ${formatBRL(p.total)}</strong>
        </div>
      </div>
    `
    )
    .join('');
}

listarPedidos();

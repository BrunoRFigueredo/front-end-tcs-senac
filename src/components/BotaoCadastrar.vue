<template>
    <button class="btn-cadastrar">
      <i class="fas fa-plus"></i>
      Novo
    </button>
</template>

<style>
    .btn-cadastrar {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: var(--primary);
      color: var(--white);
      border: none;
      border-radius: var(--radius);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
      box-shadow: var(--shadow-sm);
    }

    .btn-cadastrar:hover {
      background: var(--primary-dark);
      box-shadow: var(--shadow-md);
      transform: translateY(-1px);
    }

    .btn-cadastrar:active {
      transform: translateY(0);
    }
</style>

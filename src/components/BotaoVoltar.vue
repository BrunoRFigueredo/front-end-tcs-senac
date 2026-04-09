<template>
    <button class="btn-voltar">
      <i class="fas fa-arrow-left"></i>
      Voltar
    </button>
</template>

<style>
    .btn-voltar {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: var(--white);
      color: var(--gray-700);
      border: 1.5px solid var(--gray-300);
      border-radius: var(--radius);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }

    .btn-voltar:hover {
      background: var(--gray-50);
      border-color: var(--gray-400);
    }

    .btn-voltar:active {
      background: var(--gray-100);
    }
</style>

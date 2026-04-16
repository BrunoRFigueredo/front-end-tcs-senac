<template>
    <button class="btn-salvar">
      <i class="fas fa-check"></i>
      Salvar
    </button>
</template>

<style>
    .btn-salvar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 12px 24px;
      background: var(--secondary);
      color: var(--white);
      border: none;
      border-radius: var(--radius);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
      box-shadow: var(--shadow-sm);
    }

    .btn-salvar:hover {
      background: var(--secondary-dark);
      box-shadow: var(--shadow-md);
      transform: translateY(-1px);
    }

    .btn-salvar:active {
      transform: translateY(0);
    }

    .btn-salvar:disabled {
      background: var(--gray-300);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
</style>

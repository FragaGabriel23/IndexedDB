# Estudo sobre IndexedDB

## Descrição

Este repositório contém um código de estudo em JavaScript que utiliza o IndexedDB para criar um banco de dados local no navegador. O código fornece uma aplicação simples de gerenciamento de clientes, onde é possível adicionar, remover e buscar clientes utilizando o IndexedDB.

## Estrutura do Código

- **Criação e Atualização do Banco de Dados (`creatDB`):**
  - Verifica se o navegador suporta o IndexedDB.
  - Abre ou cria um banco de dados chamado "Teste" com a versão 4.
  - Durante a criação ou atualização do banco, são definidos um objectStore chamado "Clientes" e dois índices para buscar clientes por nome e email.
  - Popula o banco de dados com dados de clientes de teste.

- **Adição de Dados (`addData`):**
  - Ao enviar o formulário de adição, os dados são coletados dos campos do formulário.
  - Inicia uma transação de leitura/escrita no objectStore "Clientes" e adiciona os dados do cliente.
  - Após a conclusão da transação, a lista de clientes é renderizada novamente.

- **Remoção de Dados (`dellData`):**
  - Ao enviar o formulário de remoção, o CPF do cliente a ser removido é coletado.
  - Inicia uma transação de leitura/escrita e remove o cliente correspondente do objectStore "Clientes".
  - Após a conclusão da transação, a lista de clientes é renderizada novamente.

- **Busca de Dados (`getData`):**
  - Ao enviar o formulário de busca, o CPF é coletado.
  - Inicia uma transação de leitura e exibe os dados do cliente correspondente.

- **Renderização da Lista (`renderList`):**
  - Abre um cursor no objectStore "Clientes" e percorre todos os clientes, exibindo suas informações na lista.

- **Limpar Inputs (`clearInput`):**
  - Limpa os campos dos formulários.

- **Inicialização e Exibição Inicial (`document.addEventListener`):**
  - Inicializa o código após o carregamento do DOM.
  - Define os formulários e elementos HTML necessários.
  - Chama a função `creatDB` para criar ou abrir o banco de dados.

## Executando o Código

1. Abra o arquivo HTML em um navegador.
2. Preencha os formulários para adicionar, deletar ou buscar clientes.
3. Observe os resultados na lista ou na área de exibição.

## Suporte do Navegador

Verifique se o navegador suporta IndexedDB. Caso contrário, algumas funcionalidades podem não estar disponíveis.

## Notas Finais

Este código pode servir como um ponto de partida para projetos que requerem armazenamento de dados no lado do cliente. Aprender sobre o IndexedDB é útil para construir aplicações web que precisam de armazenamento local robusto.

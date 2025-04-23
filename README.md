# 💍 Casamento Ítalo & Daniely - Frontend

Este é o frontend do projeto de casamento de Ítalo & Daniely, desenvolvido com **React + Vite**, **TypeScript**, **Material UI**, e diversas funcionalidades modernas para gerenciamento de convidados, controle de despesas e confirmação de presença.

## 🚀 Funcionalidades

- ✅ Confirmação de presença com acompanhante
- ✅ Painel de convidados com filtro e resumo
- ✅ Dashboard com gráfico de despesas (Pagas x A pagar)
- ✅ Cadastro, edição e exclusão de convidados
- ✅ Importação e exportação de convidados via CSV
- ✅ Controle de despesas com tipo, valor total e pago
- ✅ Cadastro de tipos de despesa reutilizáveis
- ✅ Autenticação com controle de acesso (admin/user)

---

## 📦 Tecnologias Utilizadas

- **React** + **Vite**
- **TypeScript**
- **Material UI (MUI v5)**
- **Context API** + Custom Hooks
- **Recharts** para gráficos
- **React Router DOM**
- **Sonner/AlertMessage** para feedback visual
- **Papaparse** e **FileSaver** para importação/exportação

---
## 📁 Estrutura de Pastas

```bash
├── src
│   ├── api/                    # Integração com APIs (guests, expenses, etc)
│   ├── assets/                 # Imagens e ícones
│   ├── components/
│   │   ├── basics/             # Componentes reutilizáveis (Input, Modal, Alert)
│   │   ├── compositives/       # Componentes compostos (Resumo, Gráficos, etc)
│   ├── context/                # Contextos globais (Dashboard, Expenses, Auth)
│   ├── hooks/                  # Hooks customizados (useDashboardActions, etc)
│   ├── pages/                  # Páginas principais (Dashboard, Guests, Login)
│   ├── styles/                 # Variáveis, globais e temas
│   ├── utils/                  # Helpers (formatadores, máscaras, CSV)
│   └── App.tsx / main.tsx      # Inicialização da aplicação
```

## 🛠️ Instalação e Execução

```bash

# Clone o repositório
git clone https://github.com/seu-usuario/nome-do-repo.git

# Acesse a pasta
cd nome-do-repo

# Instale as dependências
npm install

# Crie um arquivo .env com a URL da API
cp .env.example .env
# edite o arquivo .env com a URL correta da API

# Execute o projeto localmente
npm run dev

```

## ✅ Variáveis de Ambiente

Crie um .env com a seguinte variável:

```bash
VITE_API_URL=https://example.com.br/api
```

## 🔒 Autenticação

O sistema possui login com controle de acesso. O token JWT é armazenado no localStorage e utilizado nas rotas protegidas da API via Authorization: Bearer <token>.

# 👥 Contribuição

1. Faça um fork do projeto

2. Crie uma branch com sua feature: git checkout -b minha-feature

3. Commit suas alterações: git commit -m 'feat: nova feature'

4. Push para a branch: git push origin minha-feature

5. Crie um Pull Request

## 📄 Licença

Este projeto é privado e voltado para uso pessoal e organizacional. Todos os direitos reservados aos noivos. 👰🤵


Com 💖 por Ítalo & Daniely
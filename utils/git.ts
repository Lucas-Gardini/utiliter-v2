export const prefixes = {
	"": "",
	"Configuração de Ambiente": "env",
	"Configuração de Build": "build",
	"Configuração de CI/CD": "ci",
	"Configuração de Dependência": "deps",
	"Configuração de Ferramenta": "config",
	"Correção de Bug": "fix",
	Documentação: "docs",
	"Melhoria de Performance": "perf",
	"Mensagem de Desenvolvimento": "dev",
	"Modificação de Estilo": "style",
	"Nova Funcionalidade": "feat",
	"Refatoração de Código": "refact",
	Testes: "test",
};

export const suffixes = {
	feat: "Nova Funcionalidade",
	fix: "Correção de Bug",
	style: "Modificação de Estilo",
	perf: "Melhoria de Performance",
};

export const prefixKeys = Object.keys(prefixes);

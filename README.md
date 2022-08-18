# Desafio

Criar uma tela onde sera exibido um quadro e uma representação de uma minhoca, onde a minhoca
pode "cair" até "n" cm de profundidade, podendo subir "x" e cair "z" e repetir esse ciclo de subidas
a cada 1 segundo de pausa.

## Escolha das linguagens

O exigido era resolver esse desafio com React e Node, mas não encontrei a real necessidade do node para
realizar esse projeto (supondo que seria o node para fazer um backend).

A escolha do react é devido ao fato
de que é necessária uma ferramenta dinâmica e rápida para o frontend, como o ecossistema javascript tem um amplo suporte da comunidade Dev, quando se torna necessário ferramentas prontas para resolver determinados problemas, o js decepciona.

A ilusão de movimentos do canvas se da ao reset do canvas (cleanRect) e exibição de um novo elemento(fillRect) em uma coordenada diferente,

## Como rodar

É necessário a versão 16 ou superior do node e um navegador, ao clonar ou baixar o projeto, rode o seguinte comando na raiz do projeto `yarn` e depois `yarn dev`

Agora o localhost:5173 esta disponível no navegador

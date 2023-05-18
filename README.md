# Chicken-Steen (Front-End)

Restaurante especializado em Frangos, com possibilidade de agendar reservas. Este sistema foi feito de forma a ser integrado com a [API da Chicken Steen](https://github.com/micilini/api.chickensteen.com.br), e também o [Painel da Chicken Steen](https://github.com/micilini/painel.chickensteen.com.br).

O front-end da Chicken Steen foi feito exclusivamente com HTML, CSS e Javascript sem utilizar nenhuma outra linguagem de back-end.

## Como utilizar este sistema?

Faça Download deste repositório para a sua máquina local, ou use o comando ```git clone```:

```
git clone https://github.com/micilini/Chicken-Steen.git
```

> Em que local esses arquivos devem ser armazenados? 

Em qualquer local, desde a sua área de trabalho ou quem sabe dentro da pasta htdocs do Xampp (caso estiver utilizando).

## Configurações Iniciais

É importante ressaltar que o processo de reservas e envio de contatos está sendo feito por meio dos arquivos ```agendar.js``` e ```contato.js```, que estão localizados em ```assets/js/app```.

No início do arquivo existe uma variável chamada ```url_name```, que aponta para ```127.0.0.1:8000``` que nada mais é do que a URL local da ```API``` da Chicken Steen, mais detalhes de como configurar essa API [clique aqui](https://github.com/micilini/api.chickensteen.com.br).

```
let url_name = 'http://127.0.0.1:8000/';
```

Caso a sua ```API``` esteja hospedada em uma outra URL, basta apenas modificar o valor da varíavel.

## Imagens

![Tela 01](http://chickensteen.com.br/assets/images/telas/tela-01.png)

![Tela 02](http://chickensteen.com.br/assets/images/telas/tela-02.png)

![Tela 03](http://chickensteen.com.br/assets/images/telas/tela-03.png)

# Licensa

Licensed under the [MIT](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt).*


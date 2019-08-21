
<div style="text-align:center"><img src="logo.png" /></div>

# adMooH Signage App

adMooH Signage App é uma ferramenta para a construções de aplicativos que serão usados dentro da plataforma adMooH.
Os templates são construídos em javascript utilizando [React.js](https://reactjs.org/), com essa ferramenta você pode:

  - Visualizar o app.
  - Visualizar items do RSS e JSON.
  - Inserir dados customizados.
  - Excecutar funções de lifecycle*.
  - Buildar o app para publicação.

## **Utilização**

É preferível que os aplicativos fiquem na sub-pasta **apps**, e sigam a seguinte estrutura de pastas:
```
.awesome-app
├──./images
│   └── *.png, *jpeg
├── *.css
├── app.jsx
└── index.js
```
O arquivo **index.js** não deve ser alterado!\
O arquivo **app.jsx** pode ser alterado mas é necessário que o componente principal do aplicativo seja a exportação padrão do arquivo.

```javascript
export default class UolNews extends React.Component {
...
```

### **Utilizando Estilos**

Os estilos nos componentes do aplicativo serão convertidos para style in-line, existem duas formas de adicionar aplicá-los:

- Utlizando um objeto de estilo.

```javascript
import React from 'react';
import * as layout from './template.css';

const customStyle = {
    color: "blue",
    font-family: "verdana",
    font-size: "300%"
};

export default class SampleTemplate extends React.Component {
	render() {		
        return(
        <div>
            <h1 style={customStyle}>Desce um pingado meu consagrado.</h1>
        </div>
		);
    }
}
```

- Utilizando um arquivo .css

```css
.customCss {
    color: blue;
    font-family: verdana;
    font-size: 300%;
}
```
E necessário fazer a importação dele no componente.

```javascript
import * as layout from './template.css';
```

### **Utilizando Dados**

O Seu aplicativo irá receber 2 propiedades.

| Prop | Tipo | Descrição |
|:---|:---|:---|
|`data`|object[]|Um array com os objetos do feed (rss convertido ou JSON).|
|`custom`|object|Objeto com as informações customizadas do aplicativo.|

Em caso de feed RSS os items serão convertidos utilizando **[x2js](https://github.com/x2js/x2js)**.

### **Ciclo de vida**

Você pode usar como base o ciclo de vida do react.\
http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

Além disso o adMooH Signage irá executar a função **willShow()** (caso implementada) quando ele for exibir o aplicativo. 

```javascript
willShow(){
    /*sua logica*/
}
```

### **Comandos**

Para iniciar a visualização de um aplicativo execute o comando **start** e passe no argumento **-t** o caminho do arquivo **index.js** do seu app.

```sh
$ yarn start -t ./template/awesome-app/index.js 
```

Para buildar o aplicativo execute o comando **build**.

```sh
$ yarn build -t ./template/awesome-app/index.js -n {app name opcicional}
```

O arquivo final do template estará disponivel na pasta .build na raiz do projeto.

## **Exemplos**
Mais exemplos [aqui!](https://github.com/adMooH/signage-template)

## **May the force be with you!**
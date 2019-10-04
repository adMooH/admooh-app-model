
<div style="text-align:center"><img src="logo.png" /></div>

# adMooH Signage App

adMooH Signage App é uma ferramenta para a construções de aplicativos que serão usados dentro da plataforma adMooH.
Os templates são construídos em javascript utilizando **[React.js](https://reactjs.org/)**, com essa ferramenta você pode:

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
├── app.js
├── index.js
└── prepare.js
```

Utilização dos arquivos:
|Arquivo|Descrição|
|--|--|
|**prepare.js**| Aqui você irá definir a função que será executada antes que o adMooH Signage rode o **app**, normalmente utilizada para pré-configurar o ambiente como download de arquivos ou de informações... [leia mais](#Ciclo-de-vida).|
|**app.js** ¹| Aqui você irá definir os elementos que serão exibidos pelo adMooH Signage e também regras do seu aplicativo.
|**index.js** ²| Arquivo que realiza as importações de **app** e **prepare** e realiza as ações necessárias para que o aplicativo seja executado no adMooH Signage.|

¹ E recomendado que o componente principal da aplicação seja exportado como default.\
² E obrigatório que a função **buildApp** seja executada.

### **Utilizando Estilos**

Os estilos nos componentes do aplicativo serão convertidos para style in-line, existem duas formas de aplicá-los:

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

```js
import * as layout from './template.css';
```

### **Animações**

Utilize o **[pose.js](https://popmotion.io/pose/learn/popmotion-get-started/)**

```js
import posed from 'react-pose';

const FadeInBox = posed.div({
	hidden: { opacity: 0 },
	visible: { opacity: 1 }
});
/*
.
.
.
*/
<FadeInBox pose={this.state.visible ? 'visible' : 'hidden'}>
    /* seu componente */
</FadeInBox>
```

### **Dados**

O Seu aplicativo irá receber pelas propiedades 3 objetos.

| Prop | Tipo | Descrição |
|:---|:---|:---|
|`data`|object[]|Um array com os objetos do feed (rss convertido ou JSON).|
|`custom`|object|Objeto com as informações customizadas do aplicativo.|
|`context`|object|Objeto com informações e funções do dispositivo.|

Em caso de feed RSS os items serão convertidos utilizando **[x2js](https://github.com/x2js/x2js)**.\
Para desenvolvimento, você pode setar a propiedade **defaultData** no ./index.js

```js
const props = {
  getApp: window.admoohApp.get,
  prepareApp: window.admoohApp.prepare,
  defaultData: //Seus dados
};
```

### **Ciclo de vida**

#### Pré-Execução

Antes do aplicativo ser executado a função exportada no arquivo **prepare.js** será executada, essa função irá receber como paramêtro 1 objeto com 2 propiedades:

| Prop | Tipo | Descrição |
|:---|:---|:---|
|`context`|object|Objeto com informações e funções do dispositivo.|
|`data`|object|Objeto com informações do aplicativo.|

Veja [**adMooH App**](https://github.com/adMooH/admooh-app#readme) para saber mais sobre as informações e funções expostas pelo context.

#### Execução

Você pode usar como base o ciclo de vida do react.\
http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

O Aplicativo e carregado antes de ser exibido, utilize o construtor do componente para tratar as propiedades recebidas em **[Utilizando Dados](#Dados)**, o adMooH Signage irá executar a função **`willShow()`** <small>caso implementada</small> assim que ele for exibir o aplicativo, essa função pode ser usada para disparar animações de entrada por exemplo.
Quando o aplicativo for descarregado a função **`componentWillUnmount()`** será chamada.

```javascript
constructor(props) {
    super(props)
    /*sua logica*/
}

willShow(){
    /*sua logica*/
}

componentWillUnmount() {
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

O arquivo final do template estará disponivel na pasta **build** na raiz do projeto.

## **Exemplos**
Mais exemplos **[aqui!](https://github.com/adMooH/signage-template)**

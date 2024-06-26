## Pruebas básicas para Buggy Games de Evil Tester


#### instalación de nvm para gestionar node.js
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

#### Instalacion de dependencias

```
npm i
```

#### Uso de pruebas
```
npm run test
```

#### Visualización de pruebas realizadas en browser

![](./images/screen-1.png)

#### Juego a ser testeado

[The One To Nine Calculator Game](https://eviltester.github.io/TestingApp/games/buggygames/the_one_to_nine_calculator/calc1to9.html)

#### Pruebas 

* Validación de input text, deben ser 9 visibles
* Validación de restricción de caracteres admitidos, deben ser solo operadores aritméticos.
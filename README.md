mapa-emprendedores
==================

## Instalación

Teniendo en cuenta que ASI bloquea el protocolo GIT internamente, es necesario pasar los modulos necesarios a `https://`. Es posible hacer un [workaround](http://stackoverflow.com/questions/4891527/git-protocol-blocked-by-company-how-can-i-get-around-that/), utilizando el siguiente comando:

```
git config --global url."https://".insteadOf git://
```

### Dependencias

Utilizamos `grunt` para compilar SASS con `grunt-contrib-sass` y `grunt-contrib-watch`.

<<<<<<< HEAD
Utilizamos `bower` para traer Bootstrap 3 SASS usando [`bootstrap-sass-official`](https://github.com/twbs/bootstrap-sass).
=======
Utilizamos `bower` para traer Bootstrap 3 SASS usando `bootstrap-sass-official`.
>>>>>>> e4c1fce56706498a2a48f177bb459ee076330653

```
npm install
npm update -g bower
bower install
grunt serve
```
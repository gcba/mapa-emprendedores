// var jQuery =require('jquery');

// /**
//  * @class Object 
//  * Este archivo contiene extensiones al lenguaje Javascript estandar
//  * rippeadas de ExtJS 2.2.1 y adaptadas a jQuery (usa jQuery.extend en lugar de Ext.apply)
//  * 
//  * Todas las extensiones estan tal cual salvo el metodo remove agregado a los Arrays que fue
//  * renombrado por removeObject para evitar conflictos con el metodo remove de jQuery
//  */
 
// /**
//  * Copies all the properties of config to obj if they don't already exist.
//  * @param {Object} obj The receiver of the properties
//  * @param {Object} config The source of the properties
//  * @return {Object} returns obj
//  */
// jQuery.extendIf = function(o, c){
//     if(o && c){
//         for(var p in c){
//             if(typeof o[p] == "undefined"){ o[p] = c[p]; }
//         }
//     }
//     return o;
// };

// if (typeof(Ext) == "undefined") {
// /**
//  * @class Function 
// */
// jQuery.extend(Function.prototype, {
//      /**
//      * Creates a callback that passes arguments[0], arguments[1], arguments[2], ...
//      * Call directly on any function. Example: <code>myFunction.createCallback(arg1, arg2)</code>
//      * Will create a function that is bound to those 2 args. <b>If a specific scope is required in the
//      * callback, use {@link #createDelegate} instead.</b> The function returned by createCallback always
//      * executes in the global scope.
//      * <p>This method is required when you want to pass arguments to a callback function.  If no arguments
//      * are needed, you can simply pass a reference to the function as a callback (e.g., callback: myFn).
//      * However, if you tried to pass a function with arguments (e.g., callback: myFn(arg1, arg2)) the function
//      * would simply execute immediately when the code is parsed. Example usage:
//      * <pre><code>
// var sayHi = function(name){
//     alert('Hi, ' + name);
// }

// // clicking the button alerts "Hi, Fred"
// new Ext.Button({
//     text: 'Say Hi',
//     renderTo: Ext.getBody(),
//     handler: sayHi.createCallback('Fred')
// });
// </code></pre>
//      * @return {Function} The new function
//     */
//     createCallback : function(/*args...*/){
//         // make args available, in function below
//         var args = arguments;
//         var method = this;
//         return function() {
//             return method.apply(global, args);
//         };
//     },
    
//     /**
//      * Creates a delegate (callback) that sets the scope to obj.
//      * Call directly on any function. Example: <code>this.myFunction.createDelegate(this, [arg1, arg2])</code>
//      * Will create a function that is automatically scoped to obj so that the <tt>this</tt> variable inside the
//      * callback points to obj. Example usage:
//      * <pre><code>
// var sayHi = function(name){
//     // Note this use of "this.text" here.  This function expects to
//     // execute within a scope that contains a text property.  In this
//     // example, the "this" variable is pointing to the btn object that
//     // was passed in createDelegate below.
//     alert('Hi, ' + name + '. You clicked the "' + this.text + '" button.');
// }

// var btn = new Ext.Button({
//     text: 'Say Hi',
//     renderTo: Ext.getBody()
// });

// // This callback will execute in the scope of the
// // button instance. Clicking the button alerts
// // "Hi, Fred. You clicked the "Say Hi" button."
// btn.on('click', sayHi.createDelegate(btn, ['Fred']));
// </code></pre>
//      * @param {Object} obj (optional) The object for which the scope is set
//      * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
//      * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
//      *                                             if a number the args are inserted at the specified position
//      * @return {Function} The new function
//      */
//   createDelegate : function(obj, args, appendArgs){
//         var method = this;
//         return function() {
//             var callArgs = args || arguments;
//             if(appendArgs === true){
//                 callArgs = Array.prototype.slice.call(arguments, 0);
//                 callArgs = callArgs.concat(args);
//             }else if(typeof appendArgs == "number"){
//                 callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
//                 var applyArgs = [appendArgs, 0].concat(args); // create method call params
//                 Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
//             }
//             return method.apply(obj || global, callArgs);
//         };
//     },
//     /**
//      * Calls this function after the number of millseconds specified, optionally in a specific scope. Example usage:
//      * <pre><code>
// var sayHi = function(name){
//     alert('Hi, ' + name);
// }

// // executes immediately:
// sayHi('Fred');

// // executes after 2 seconds:
// sayHi.defer(2000, this, ['Fred']);

// // this syntax is sometimes useful for deferring
// // execution of an anonymous function:
// (function(){
//     alert('Anonymous');
// }).defer(100);
// </code></pre>
//      * @param {Number} millis The number of milliseconds for the setTimeout call (if 0 the function is executed immediately)
//      * @param {Object} obj (optional) The object for which the scope is set
//      * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
//      * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
//      *                                             if a number the args are inserted at the specified position
//      * @return {Number} The timeout id that can be used with clearTimeout
//      */
//     defer : function(millis, obj, args, appendArgs){
//         var fn = this.createDelegate(obj, args, appendArgs);
//         if(millis){
//             return setTimeout(fn, millis);
//         }
//         fn();
//         return 0;
//     },

//     /**
//      * Create a combined function call sequence of the original function + the passed function.
//      * The resulting function returns the results of the original function.
//      * The passed fcn is called with the parameters of the original function. Example usage:
//      * <pre><code>
// var sayHi = function(name){
//     alert('Hi, ' + name);
// }

// sayHi('Fred'); // alerts "Hi, Fred"

// var sayGoodbye = sayHi.createSequence(function(name){
//     alert('Bye, ' + name);
// });

// sayGoodbye('Fred'); // both alerts show
// </code></pre>
//      * @param {Function} fcn The function to sequence
//      * @param {Object} scope (optional) The scope of the passed fcn (Defaults to scope of original function or global)
//      * @return {Function} The new function
//      */
//     createSequence : function(fcn, scope){
//         if(typeof fcn != "function"){
//             return this;
//         }
//         var method = this;
//         return function() {
//             var retval = method.apply(this || global, arguments);
//             fcn.apply(scope || this || global, arguments);
//             return retval;
//         };
//     },

//     /**
//      * Creates an interceptor function. The passed fcn is called before the original one. If it returns false,
//      * the original one is not called. The resulting function returns the results of the original function.
//      * The passed fcn is called with the parameters of the original function. Example usage:
//      * <pre><code>
// var sayHi = function(name){
//     alert('Hi, ' + name);
// }

// sayHi('Fred'); // alerts "Hi, Fred"

// // create a new function that validates input without
// // directly modifying the original function:
// var sayHiToFriend = sayHi.createInterceptor(function(name){
//     return name == 'Brian';
// });

// sayHiToFriend('Fred');  // no alert
// sayHiToFriend('Brian'); // alerts "Hi, Brian"
// </code></pre>
//      * @param {Function} fcn The function to call before the original
//      * @param {Object} scope (optional) The scope of the passed fcn (Defaults to scope of original function or global)
//      * @return {Function} The new function
//      */
//     createInterceptor : function(fcn, scope){
//         if(typeof fcn != "function"){
//             return this;
//         }
//         var method = this;
//         return function() {
//             fcn.target = this;
//             fcn.method = method;
//             if(fcn.apply(scope || this || global, arguments) === false){
//                 return;
//             }
//             return method.apply(this || global, arguments);
//         };
//     }
    
    
    
// });

// /**
//  * @class String
//  * These functions are available as static methods on the JavaScript String object.
//  */
// jQuery.extendIf(String, {

//     /**
//      * Escapes the passed string for ' and \
//      * @param {String} string The string to escape
//      * @return {String} The escaped string
//      * @static
//      */
//     escape : function(string) {
//         return string.replace(/('|\\)/g, "\\$1");
//     },

//     /**
//      * Pads the left side of a string with a specified character.  This is especially useful
//      * for normalizing number and date strings.  Example usage:
//      * <pre><code>
// var s = String.leftPad('123', 5, '0');
// // s now contains the string: '00123'
// </code></pre>
//      * @param {String} string The original string
//      * @param {Number} size The total length of the output string
//      * @param {String} char (optional) The character with which to pad the original string (defaults to empty string " ")
//      * @return {String} The padded string
//      * @static
//      */
//     leftPad : function (val, size, ch) {
//         var result = new String(val);
//         if(!ch) {
//             ch = " ";
//         }
//         while (result.length < size) {
//             result = ch + result;
//         }
//         return result.toString();
//     },

//     /**
//      * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
//      * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
//      * <pre><code>
// var cls = 'my-class', text = 'Some text';
// var s = String.format('&lt;div class="{0}">{1}&lt;/div>', cls, text);
// // s now contains the string: '&lt;div class="my-class">Some text&lt;/div>'
// </code></pre>
//      * @param {String} string The tokenized string to be formatted
//      * @param {String} value1 The value to replace token {0}
//      * @param {String} value2 Etc...
//      * @return {String} The formatted string
//      * @static
//      */
//     format : function(format){
//         var args = Array.prototype.slice.call(arguments, 1);
//         return format.replace(/\{(\d+)\}/g, function(m, i){
//             return args[i];
//         });
//     }
// });
// }

// /**
//  * Checks whether or not the current string can be converted to an Integer.
//  * @return {Boolean} True if the string can be converted to an integer
//  */
// String.prototype.isInteger = function() {
//   return !isNaN(parseInt(this));
// };

// /**
//  * Checks whether or not the current string can be converted to a Float.
//  * @return {Boolean} True if the string can be converted to a Float
//  */
// String.prototype.isFloat = function() {
//     return !isNaN(parseFloat(this));
// };

// /**
//  * Utility function that allows you to easily switch a string between two alternating values.  The passed value
//  * is compared to the current string, and if they are equal, the other value that was passed in is returned.  If
//  * they are already different, the first value passed in is returned.  Note that this method returns the new value
//  * but does not change the current string.
//  * <pre><code>
// // alternate sort directions
// sort = sort.toggle('ASC', 'DESC');

// // instead of conditional logic:
// sort = (sort == 'ASC' ? 'DESC' : 'ASC');
// </code></pre>
//  * @param {String} value The value to compare to the current string
//  * @param {String} other The new value to use if the string already equals the first value passed in
//  * @return {String} The new value
//  */
// String.prototype.toggle = function(value, other){
//     return this == value ? other : value;
// };

// /**
//  * Trims whitespace from either end of a string, leaving spaces within the string intact.  Example:
//  * <pre><code>
// var s = '  foo bar  ';
// alert('-' + s + '-');         //alerts "- foo bar -"
// alert('-' + s.trim() + '-');  //alerts "-foo bar-"
// </code></pre>
//  * @return {String} The trimmed string
//  */
// String.prototype.trim = function(){
//     var re = /^\s+|\s+$/g;
//     return function(){ return this.replace(re, ""); };
// }();

// /**
//  * Replaces each element from the 'from' array with the corresponding one in the 'to' array.
//  * @return {String} The translated string
//  */
// String.prototype.translate = function(from, to)
// {
//     if (!(from.length && to.length) || from.length != to.length)
//         return this;
//     var str = this;
//     for (var i=0;i<from.length;i++) {
//       if (typeof(from) == "string") {
//             str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));       
//       } else {
//             str = str.replace(new RegExp(from[i], "g"), to[i]);
//       }
//     }
//     return str;
// }   

// /**
//  * Tests the string to verify that each character be a digit (0-9).
//  * @return {Boolean} True if all characters are digits
//  */
// String.prototype.isDigit = function(){ return /^\d+$/.test(this); }

// /**
//  * Utility function that allows you to easily remove certain words from a string.
//  * @param {Array} words The words you wish to remove
//  * @return {String} The new string
//  */
// String.prototype.removeWords = function(words)
// {
//     var myWords = this.split(' ');
//     var res = new Array();
//     for (var i=0; i<myWords.length; i++) {
//         res.push(myWords[i]);
//         for(var j=0; j<words.length; j++) {
//             if (res[i] == words[j]) {
//                res.pop();
//                break;
//             }
//         }
//     }
//     return res.join(' ');
// }   

// /**
//  * @class Number
//  */
// jQuery.extendIf(Number.prototype, {
//     /**
//      * Checks whether or not the current number is within a desired range.  If the number is already within the
//      * range it is returned, otherwise the min or max value is returned depending on which side of the range is
//      * exceeded.  Note that this method returns the constrained value but does not change the current number.
//      * @param {Number} min The minimum number in the range
//      * @param {Number} max The maximum number in the range
//      * @return {Number} The constrained value if outside the range, otherwise the current value
//      */
//     constrain : function(min, max){
//         return Math.min(Math.max(this, min), max);
//     },
    
//     /**
//      * Checks whether or not the current number is an Integer.
//      * @return {Boolean} True if the number is an integer
//      */
//     isInteger : function() {
//       return !isNaN(parseInt(this));
//     },
    
//     /**
//      * Checks whether or not the current number is a Float.
//      * @return {Boolean} True if the number is a float
//      */
//     isFloat : function() {
//       return !isNaN(parseFloat(this));
//     }
// });
// /**
//  * @class Array
//  */
// jQuery.extendIf(Array.prototype, {
//     /**
//      * Checks whether or not the specified object exists in the array.
//      * @param {Object} o The object to check for
//      * @return {Number} The index of o in the array (or -1 if it is not found)
//      */
//     indexOf : function(o){
//        for (var i = 0, len = this.length; i < len; i++){
//         if(this[i] == o) return i;
//        }
//      return -1;
//     },

//     /**
//      * Removes the specified object from the array.  If the object is not found nothing happens.
//      * @param {Object} o The object to remove
//      * @return {Array} this array
//      */
//     removeObject : function(o){
//        var index = this.indexOf(o);
//        if(index != -1){
//            this.splice(index, 1);
//        }
//        return this;
//     },
    
//     /**
//      * Performs a binary search in an ordered array using a comparator defined exactly like the one
//      * required by sort.
//      * @param {Object} find The object to find
//      * @param {Function} comparator The comparison function to use
//      * @return {Integer} the index of the found element or -1 if none is found
//      */
//     binarySearch : function binarySearch(find, comparator) {
//         var low = 0, high = this.length - 1, i, comparison;
//         while (low <= high) {
//             i = parseInt((low + high) / 2, 10);
//             comparison = comparator(this[i], find);
//             if (comparison < 0) { low = i + 1; continue; };
//             if (comparison > 0) { high = i - 1; continue; };
//             return i;
//         }
//         return -1;
//     },
    
//     /**
//      * Implements an injection function like the on present in functional languages or Smalltalk.
//      * @param {Object} acc The accumulator
//      * @param {Function} it The function to use during iteration
//      * @return {Object} the resulting accumulator
//      */
//     inject : function (acc, it) { 
//             for (var i=0; i< this.length; i++)
//                 acc = it(acc, this[i], i);
//             return acc;
//         },
        
//     map: function(mapper, that /*opt*/) {
//         var other= new Array(this.length);
//         for (var i= 0, n= this.length; i<n; i++)
//             if (i in this)
//                 other[i]= mapper.call(that, this[i], i, this);
//         return other;
//     },

//     /**
//      * Syntax
//      * Array Array.intersect([ Array a0 ... an ]) 
//      * Computes the intersection between the calling array and any number of arrays passed as arguments. Duplicate values are removed from the result
//      *
//      * Parameters
//      * Array a0 ... an (Optional)
//      * The arrays to intersect with.
//      *
//      * Return value
//      * A new array holding the intersection of elements
//      * 
//      * Examples
//      * To find the intersection of the arrays (0,2,4,1,8,2), (1,3,5,2,9) and (100,2,9,1)
//     <pre><code>
//     // Define array 1
//     var a1 = [0,2,4,1,8];
//     // Define array 2
//     var a2 = [1,3,5,2,9];
//     // Define array 3
//     var a3 = [100,2,9,1];
//     // Output is Array(2,1)
//     a1.intersect(a2,a3);
//     </pre></code>
//      */
//     intersect: function() {
//           if (!arguments.length)
//             return [];
//           var a1 = this;
//           var a = a2 = null;
//           var n = 0;
//           while(n < arguments.length) {
//             a = [];
//             a2 = arguments[n];
//             var l = a1.length;
//             var l2 = a2.length;
//             for(var i=0; i<l; i++) {
//               for(var j=0; j<l2; j++) {
//                 if (a1[i] === a2[j])
//                   a.push(a1[i]);
//               }
//             }
//             a1 = a;
//             n++;
//           }
//           return a.unique();
//     },
    
//    /**
//     * Method Array.unique
//   * Remove any duplicates from an array
//   * 
//   * Syntax
//     * Array Array.unique() 
//     *
//     * This function will return a new array with duplicates of the original array removed
//     * Return value
//     * A new array with no duplicates
//     * Examples
// <pre><code>
// To remove the duplicates in the array (0,2,4,2,6,4,8,6,10);
// // Define array
// var a = new Array(0,2,4,2,6,4,8,6,10);
// // Output is (0,2,4,8,6,10)
// a.unique();
// <pre><code>
//     */
//     unique: function() {
//           var a = [];
//           var l = this.length;
//           for(var i=0; i<l; i++) {
//             for(var j=i+1; j<l; j++) {
//               // If this[i] is found later in the array
//               if (this[i] === this[j])
//                 j = ++i;
//             }
//             a.push(this[i]);
//           }
//           return a;
//     }
// });
// /**
//  * @class Date
//  */

// /**
//  Returns the number of milliseconds between this date and date
//  @param {Date} date (optional) Defaults to now
//  @return {Number} The diff in milliseconds
//  @member Date getElapsed
//  */
// Date.prototype.getElapsed = function(date) {
//   return Math.abs((date || new Date()).getTime()-this.getTime());
// };

// // Definicion del namespace
// if (typeof (usig) == "undefined")
//   usig = {};

// /**
//  Shows the received object on the browser's debugging console
//  @param {Object} object
//  */
// usig.debug = function(object) { 
//   if (global.console && global.console.log)
//       global.console.log(object);
// };

// // Definicion del namespace
// if (typeof (usig) == "undefined")
//   usig = {};

// if (typeof(usig.Calle) == "undefined") {  
// /**
//  * @class Calle
//  * @namespace usig 
//  * @constructor 
//  * @param {Integer} cod Codigo de calle
//  * @param {String} nom Nombre oficial de la calle
//  * @param {Array} alturas (optional) Array conteniendo los rangos de altura validos para esta calle
//  * @param {Array} cruces (optional) Array conteniendo los id de las calles que se cruzan con esta
// */
// usig.Calle = function(cod, nom, alturas, cruces) {
//   /**
//     * @property
//     * @type Integer
//     */ 
//   this.codigo = cod;
//   /**
//     * @property
//     * @type String
//     */ 
//   this.nombre = nom;
  
//   /**
//    * Verifica si la altura es valida para esta calle. En caso de tratarse de una calle sin alturas oficiales
//    * asiganadas se lanza la excepcion <code>ErrorCalleSinAlturas</code>. 
//      * @param {Integer} alt Altura a validar
//      * @return {Boolean} True si la altura es valida para esta calle
//     */  
//   this.alturaValida = function(alt) {
//     if (Array.isArray(alturas)) {
//       if (alturas.length == 0) {
//         throw(new usig.ErrorCalleSinAlturas(this.nombre));
//         return false;
//       }
//             var valid = false;
//       for(a in alturas) {
//         valid = valid || ((parseInt(alturas[a][0]) <= parseInt(alt)) && (parseInt(alturas[a][1]) >= parseInt(alt)));
//       }
//       return valid;
//     }
//   };
  
//   /**
//    * Devuelve la lista de tramos de alturas validas para esta calle
//    * @return {Array} Listado de tramos de alturas validas para esta calle
//    */
//   this.getTramos = function() {
//     return alturas;
//   };
  
//   /**
//    * Devuelve un string con el nombre de la calle 
//      * @return {String} Nombre de la calle
//     */  
//   this.toString = function() {
//     return this.nombre;
//   };
  
//   /**
//    * Verifica si la calle (instancia de la clase usig.Calle) recibida como parametro
//    * se cruza con esta 
//      * @param {usig.Calle} calle Calle a verificar si se intersecta con esta
//      * @return {Boolean} True en caso de que exista el cruce correspondiente
//     */  
//   this.seCruzaCon = function(calle) {
//     if (cruces) {
//       return cruces.indexOf(calle.codigo) >= 0;
//     }
//   };
  
//   /**
//    * Devuelve un objeto serializable a JSON
//    * @returns {Object} Un objeto serializable a JSON 
//    */
//   this.toJson = function() {
//     return {codigo: this.codigo, nombre: this.nombre};
//   };
  
//   /**
//    * Dice si otra calle es la misma
//    * @param {usig.Calle} Calle a comparar
//    * @return {Boolean} Verdadero si tienen el mismo codigo
//    */
//   this.isEqual = function(calle) {
//     return this.codigo == calle.codigo;
//   };
  
// }

// /**
//  * Devuelve una nueva calle creada a partir de un diccionario
//  * @param {Object} obj Diccionario conteniendo los datos de la calle
//  * @return {usig.Calle} Calle creada
//  */
// usig.Calle.fromObj = function(obj) {
//   return new usig.Calle(obj.codigo, obj.nombre);
// }

// }// Definicion del namespace
// if (typeof (usig) == "undefined")
//   usig = {};

// if (typeof(usig.Direccion) == "undefined") {  
// /**
//  * @class Direccion
//  * @namespace usig
//  * @constructor 
//  * @param {usig.Calle} calle1 Instancia de la clase usig.Calle
//  * @param {usig.Calle-Integer} calle2OAltura Instancia de usig.Calle que se cruza con calle1 o altura correspondiente de calle1
// */
// usig.Direccion = (function($) { // Soporte jQuery noConflict
// return function(calle1, calle2OAltura) {
//   var calle = null;
//   var calleCruce = null;
//   var altura = 0;
//   var tipo = null;
//   var smp = '';
//   var coordenadas = null; 
  
//   if (calle1 instanceof usig.Calle) {
//     calle = calle1;
//   } else {
//     return null;
//   }
  
//   if (calle2OAltura instanceof usig.Calle) {
//     calleCruce = calle2OAltura;
//     tipo = usig.Direccion.CALLE_Y_CALLE;
//   } else {
//     if (!isNaN(parseInt(calle2OAltura))) {
//       tipo = usig.Direccion.CALLE_ALTURA;
//       altura = parseInt(calle2OAltura);
//     } else {
//       return null;
//     }
//   }
  
//   /**
//    * Devuelve la instancia de usig.Calle correspondiente 
//      * @return {usig.Calle} Calle
//     */    
//   this.getCalle = function() {
//     return calle;
//   };
  
//   /**
//    * Devuelve la instancia de usig.Calle correspondiente a la interseccion 
//      * @return {usig.Calle} Calle
//     */    
//   this.getCalleCruce = function() {
//     if (tipo == usig.Direccion.CALLE_Y_CALLE) { 
//       return calleCruce;
//     } else {
//       return null;
//     }
//   };
  
//   /**
//    * Devuelve la altura correspondiente 
//      * @return {Integer} Altura
//     */    
//   this.getAltura = function() {
//     return altura;
//   };
    
//     /**
//      * Devuelve el tipo de direccion correspondiente 
//      * @return {Integer} Tipo
//     */      
//     this.getTipo = function() {
//         return tipo;
//     };
  
//   /**
//    * Devuelve un string con la direccion escrita correctamente para mostrar 
//      * @return {String} Direccion como texto
//     */    
//   this.toString = function() {
//     if (tipo == usig.Direccion.CALLE_ALTURA) {
//       return calle.toString()+' '+(altura>0?altura:'S/N');
//     } else {
//       var nombreCruce = calleCruce.toString();
//       var separador = nombreCruce.match(/^(I|Hi|HI).*/)?' e ':' y ';
//       return calle.toString()+separador+nombreCruce;        
//     }
//   };
  
//   /**
//    * Setea las coordenadas de la geocodificacion de esta direccion
//    * @param {usig.Punto} pt Instancia de usig.Punto que contiene las coordenadas
//    */
//   this.setCoordenadas = function(pt) {
//     coordenadas = usig.Punto.fromPunto(pt);
//   };
  
//   /**
//    * Setea el codigo de seccion-manzana-parcela correspondiente a esta direccion
//    * si existiera
//    * @param {String} SMP Codigo de seccion-manzana-parcela
//    */
//   this.setSmp = function(SMP) {
//     smp = SMP;
//   };
  
//   /**
//    * Devuelve las coordenadas asociadas a esta direccion en caso de estar disponibles
//    * o null en caso contrario
//    * @return {usig.Punto} Instancia de usig.Punto con las coordenadas correspondientes
//    */
//   this.getCoordenadas = function() {
//     return coordenadas;
//   };
  
//   /**
//    * Devuelve el codigo de seccion-manzana-parcela asociado a esta direccion en caso de estar
//    * disponible o '' en caso contrario
//    * @return {String} Codigo de seccion-manzana-parcela
//    */
//   this.getSmp = function() {
//     return smp;
//   };
  
//   /**
//    * Devuelve un clon de si mismo
//    * @returns {usig.Direccion} Clon del objeto
//    */
//   this.clone = function() {
//     var dir = new usig.Direccion(calle, calle2OAltura);
//     return $.extend(true, dir, this);
//   };
  
//   /**
//    * Devuelve un objeto serializable a JSON
//    * @returns {Object} Un objeto serializable a JSON 
//    */
//   this.toJson = function() {
//     return {
//         tipo: tipo, 
//         calle: calle.toJson(), 
//         altura: altura, 
//         calle_cruce: calleCruce?calleCruce.toJson():null, 
//         smp: smp, 
//         coordenadas: coordenadas
//       };
//   };
  
//   /**
//    * Compara esta direccion con otra y determina si se refieren a la misma
//    * posicion geografica, i.e.: 'callao y corrientes' es lo mismo que 
//    * 'corrientes y callao'
//    * @param {usig.Direccion} Direccion a comparar
//    * @return {Boolean} Verdadero si hacen referencia al mismo lugar
//    */
//   this.isEqual = function(dir) {
//     var equal = (dir instanceof usig.Direccion && (tipo == dir.getTipo()) && 
//         ((tipo==usig.Direccion.CALLE_ALTURA && 
//             calle.isEqual(dir.getCalle()) &&
//             altura == dir.getAltura()) || 
//             (tipo==usig.Direccion.CALLE_Y_CALLE && 
//               ((calle.isEqual(dir.getCalle()) && calleCruce.isEqual(dir.getCalleCruce())) ||
//               (calle.isEqual(dir.getCalleCruce()) && calleCruce.isEqual(dir.getCalle())))
//               )
//           )
//         );
//     return equal;
//   };
  
// };
// //Fin jQuery noConflict support
// })(jQuery);

// usig.Direccion.CALLE_ALTURA   = 0;
// usig.Direccion.CALLE_Y_CALLE  = 1;

// /**
//  * Devuelve una nueva direccion creada a partir de un diccionario
//  * @param {Object} obj Diccionario conteniendo los datos de la direccion
//  * @return {usig.Direccion} Direccion creada
//  */
// usig.Direccion.fromObj = function(obj) {
//   var dir = null;
//   if (obj.tipo != undefined) {
//     dir = new usig.Direccion(usig.Calle.fromObj(obj.calle), 
//         (obj.tipo==usig.Direccion.CALLE_ALTURA)?obj.altura:usig.Calle.fromObj(obj.calle_cruce));
//   } else {
//     var calle = new usig.Calle(obj.cod_calle, obj.calle);
//     if (obj.cod_calle2 != null) {
//       // Direccion Calle y Calle
//       dir = new usig.Direccion(calle, new usig.Calle(obj.cod_calle2, obj.calle2));
//     } else {
//       // Direccion Calle Altura
//       dir = new usig.Direccion(calle, obj.altura);
//     }   
//   }
//   if (obj.smp != undefined && obj.smp != null) {
//     dir.setSmp(obj.smp);
//   }
//   if (obj.coordenadas != undefined && obj.coordenadas != null) {
//     if (typeof(obj.coordenadas) == 'string') {
//       dir.setCoordenadas(usig.Punto.fromWkt(obj.coordenadas));
//     } else {
//       dir.setCoordenadas(usig.Punto.fromObj(obj.coordenadas));      
//     }
//   }
//   return dir;
// }

// }/*
//     http://www.JSON.org/json2.js
//     2009-09-29

//     Public Domain.

//     NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

//     See http://www.JSON.org/js.html

//     This file creates a global JSON object containing two methods: stringify
//     and parse.

//         JSON.stringify(value, replacer, space)
//             value       any JavaScript value, usually an object or array.

//             replacer    an optional parameter that determines how object
//                         values are stringified for objects. It can be a
//                         function or an array of strings.

//             space       an optional parameter that specifies the indentation
//                         of nested structures. If it is omitted, the text will
//                         be packed without extra whitespace. If it is a number,
//                         it will specify the number of spaces to indent at each
//                         level. If it is a string (such as '\t' or '&nbsp;'),
//                         it contains the characters used to indent at each level.

//             This method produces a JSON text from a JavaScript value.

//             When an object value is found, if the object contains a toJSON
//             method, its toJSON method will be called and the result will be
//             stringified. A toJSON method does not serialize: it returns the
//             value represented by the name/value pair that should be serialized,
//             or undefined if nothing should be serialized. The toJSON method
//             will be passed the key associated with the value, and this will be
//             bound to the value

//             For example, this would serialize Dates as ISO strings.

//                 Date.prototype.toJSON = function (key) {
//                     function f(n) {
//                         // Format integers to have at least two digits.
//                         return n < 10 ? '0' + n : n;
//                     }

//                     return this.getUTCFullYear()   + '-' +
//                          f(this.getUTCMonth() + 1) + '-' +
//                          f(this.getUTCDate())      + 'T' +
//                          f(this.getUTCHours())     + ':' +
//                          f(this.getUTCMinutes())   + ':' +
//                          f(this.getUTCSeconds())   + 'Z';
//                 };

//             You can provide an optional replacer method. It will be passed the
//             key and value of each member, with this bound to the containing
//             object. The value that is returned from your method will be
//             serialized. If your method returns undefined, then the member will
//             be excluded from the serialization.

//             If the replacer parameter is an array of strings, then it will be
//             used to select the members to be serialized. It filters the results
//             such that only members with keys listed in the replacer array are
//             stringified.

//             Values that do not have JSON representations, such as undefined or
//             functions, will not be serialized. Such values in objects will be
//             dropped; in arrays they will be replaced with null. You can use
//             a replacer function to replace those with JSON values.
//             JSON.stringify(undefined) returns undefined.

//             The optional space parameter produces a stringification of the
//             value that is filled with line breaks and indentation to make it
//             easier to read.

//             If the space parameter is a non-empty string, then that string will
//             be used for indentation. If the space parameter is a number, then
//             the indentation will be that many spaces.

//             Example:

//             text = JSON.stringify(['e', {pluribus: 'unum'}]);
//             // text is '["e",{"pluribus":"unum"}]'


//             text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
//             // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//             text = JSON.stringify([new Date()], function (key, value) {
//                 return this[key] instanceof Date ?
//                     'Date(' + this[key] + ')' : value;
//             });
//             // text is '["Date(---current time---)"]'


//         JSON.parse(text, reviver)
//             This method parses a JSON text to produce an object or array.
//             It can throw a SyntaxError exception.

//             The optional reviver parameter is a function that can filter and
//             transform the results. It receives each of the keys and values,
//             and its return value is used instead of the original value.
//             If it returns what it received, then the structure is not modified.
//             If it returns undefined then the member is deleted.

//             Example:

//             // Parse the text. Values that look like ISO date strings will
//             // be converted to Date objects.

//             myData = JSON.parse(text, function (key, value) {
//                 var a;
//                 if (typeof value === 'string') {
//                     a =
// /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                     if (a) {
//                         return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                             +a[5], +a[6]));
//                     }
//                 }
//                 return value;
//             });

//             myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
//                 var d;
//                 if (typeof value === 'string' &&
//                         value.slice(0, 5) === 'Date(' &&
//                         value.slice(-1) === ')') {
//                     d = new Date(value.slice(5, -1));
//                     if (d) {
//                         return d;
//                     }
//                 }
//                 return value;
//             });


//     This is a reference implementation. You are free to copy, modify, or
//     redistribute.

//     This code should be minified before deployment.
//     See http://javascript.crockford.com/jsmin.html

//     USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//     NOT CONTROL.
// */

// /*jslint evil: true, strict: false */

// /*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
//     call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
//     getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
//     lastIndex, length, parse, prototype, push, replace, slice, stringify,
//     test, toJSON, toString, valueOf
// */


// // Create a JSON object only if one does not already exist. We create the
// // methods in a closure to avoid creating global variables.

// if (!this.JSON) {
//     this.JSON = {};
// }

// (function () {

//     function f(n) {
//         // Format integers to have at least two digits.
//         return n < 10 ? '0' + n : n;
//     }

//     if (typeof Date.prototype.toJSON !== 'function') {

//         Date.prototype.toJSON = function (key) {

//             return isFinite(this.valueOf()) ?
//                    this.getUTCFullYear()   + '-' +
//                  f(this.getUTCMonth() + 1) + '-' +
//                  f(this.getUTCDate())      + 'T' +
//                  f(this.getUTCHours())     + ':' +
//                  f(this.getUTCMinutes())   + ':' +
//                  f(this.getUTCSeconds())   + 'Z' : null;
//         };

//         String.prototype.toJSON =
//         Number.prototype.toJSON =
//         Boolean.prototype.toJSON = function (key) {
//             return this.valueOf();
//         };
//     }

//     var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
//         escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
//         gap,
//         indent,
//         meta = {    // table of character substitutions
//             '\b': '\\b',
//             '\t': '\\t',
//             '\n': '\\n',
//             '\f': '\\f',
//             '\r': '\\r',
//             '"' : '\\"',
//             '\\': '\\\\'
//         },
//         rep;


//     function quote(string) {

// // If the string contains no control characters, no quote characters, and no
// // backslash characters, then we can safely slap some quotes around it.
// // Otherwise we must also replace the offending characters with safe escape
// // sequences.

//         escapable.lastIndex = 0;
//         return escapable.test(string) ?
//             '"' + string.replace(escapable, function (a) {
//                 var c = meta[a];
//                 return typeof c === 'string' ? c :
//                     '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
//             }) + '"' :
//             '"' + string + '"';
//     }


//     function str(key, holder) {

// // Produce a string from holder[key].

//         var i,          // The loop counter.
//             k,          // The member key.
//             v,          // The member value.
//             length,
//             mind = gap,
//             partial,
//             value = holder[key];

// // If the value has a toJSON method, call it to obtain a replacement value.

//         if (value && typeof value === 'object' &&
//                 typeof value.toJSON === 'function') {
//             value = value.toJSON(key);
//         }

// // If we were called with a replacer function, then call the replacer to
// // obtain a replacement value.

//         if (typeof rep === 'function') {
//             value = rep.call(holder, key, value);
//         }

// // What happens next depends on the value's type.

//         switch (typeof value) {
//         case 'string':
//             return quote(value);

//         case 'number':

// // JSON numbers must be finite. Encode non-finite numbers as null.

//             return isFinite(value) ? String(value) : 'null';

//         case 'boolean':
//         case 'null':

// // If the value is a boolean or null, convert it to a string. Note:
// // typeof null does not produce 'null'. The case is included here in
// // the remote chance that this gets fixed someday.

//             return String(value);

// // If the type is 'object', we might be dealing with an object or an array or
// // null.

//         case 'object':

// // Due to a specification blunder in ECMAScript, typeof null is 'object',
// // so watch out for that case.

//             if (!value) {
//                 return 'null';
//             }

// // Make an array to hold the partial results of stringifying this object value.

//             gap += indent;
//             partial = [];

// // Is the value an array?

//             if (Object.prototype.toString.apply(value) === '[object Array]') {

// // The value is an array. Stringify every element. Use null as a placeholder
// // for non-JSON values.

//                 length = value.length;
//                 for (i = 0; i < length; i += 1) {
//                     partial[i] = str(i, value) || 'null';
//                 }

// // Join all of the elements together, separated with commas, and wrap them in
// // brackets.

//                 v = partial.length === 0 ? '[]' :
//                     gap ? '[\n' + gap +
//                             partial.join(',\n' + gap) + '\n' +
//                                 mind + ']' :
//                           '[' + partial.join(',') + ']';
//                 gap = mind;
//                 return v;
//             }

// // If the replacer is an array, use it to select the members to be stringified.

//             if (rep && typeof rep === 'object') {
//                 length = rep.length;
//                 for (i = 0; i < length; i += 1) {
//                     k = rep[i];
//                     if (typeof k === 'string') {
//                         v = str(k, value);
//                         if (v) {
//                             partial.push(quote(k) + (gap ? ': ' : ':') + v);
//                         }
//                     }
//                 }
//             } else {

// // Otherwise, iterate through all of the keys in the object.

//                 for (k in value) {
//                     if (Object.hasOwnProperty.call(value, k)) {
//                         v = str(k, value);
//                         if (v) {
//                             partial.push(quote(k) + (gap ? ': ' : ':') + v);
//                         }
//                     }
//                 }
//             }

// // Join all of the member texts together, separated with commas,
// // and wrap them in braces.

//             v = partial.length === 0 ? '{}' :
//                 gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
//                         mind + '}' : '{' + partial.join(',') + '}';
//             gap = mind;
//             return v;
//         }
//     }

// // If the JSON object does not yet have a stringify method, give it one.

//     if (typeof JSON.stringify !== 'function') {
//         JSON.stringify = function (value, replacer, space) {

// // The stringify method takes a value and an optional replacer, and an optional
// // space parameter, and returns a JSON text. The replacer can be a function
// // that can replace values, or an array of strings that will select the keys.
// // A default replacer method can be provided. Use of the space parameter can
// // produce text that is more easily readable.

//             var i;
//             gap = '';
//             indent = '';

// // If the space parameter is a number, make an indent string containing that
// // many spaces.

//             if (typeof space === 'number') {
//                 for (i = 0; i < space; i += 1) {
//                     indent += ' ';
//                 }

// // If the space parameter is a string, it will be used as the indent string.

//             } else if (typeof space === 'string') {
//                 indent = space;
//             }

// // If there is a replacer, it must be a function or an array.
// // Otherwise, throw an error.

//             rep = replacer;
//             if (replacer && typeof replacer !== 'function' &&
//                     (typeof replacer !== 'object' ||
//                      typeof replacer.length !== 'number')) {
//                 throw new Error('JSON.stringify');
//             }

// // Make a fake root object containing our value under the key of ''.
// // Return the result of stringifying the value.

//             return str('', {'': value});
//         };
//     }


// // If the JSON object does not yet have a parse method, give it one.

//     if (typeof JSON.parse !== 'function') {
//         JSON.parse = function (text, reviver) {

// // The parse method takes a text and an optional reviver function, and returns
// // a JavaScript value if the text is a valid JSON text.

//             var j;

//             function walk(holder, key) {

// // The walk method is used to recursively walk the resulting structure so
// // that modifications can be made.

//                 var k, v, value = holder[key];
//                 if (value && typeof value === 'object') {
//                     for (k in value) {
//                         if (Object.hasOwnProperty.call(value, k)) {
//                             v = walk(value, k);
//                             if (v !== undefined) {
//                                 value[k] = v;
//                             } else {
//                                 delete value[k];
//                             }
//                         }
//                     }
//                 }
//                 return reviver.call(holder, key, value);
//             }


// // Parsing happens in four stages. In the first stage, we replace certain
// // Unicode characters with escape sequences. JavaScript handles many characters
// // incorrectly, either silently deleting them, or treating them as line endings.

//             cx.lastIndex = 0;
//             if (cx.test(text)) {
//                 text = text.replace(cx, function (a) {
//                     return '\\u' +
//                         ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
//                 });
//             }

// // In the second stage, we run the text against regular expressions that look
// // for non-JSON patterns. We are especially concerned with '()' and 'new'
// // because they can cause invocation, and '=' because it can cause mutation.
// // But just to be safe, we want to reject all unexpected forms.

// // We split the second stage into 4 regexp operations in order to work around
// // crippling inefficiencies in IE's and Safari's regexp engines. First we
// // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// // replace all simple value tokens with ']' characters. Third, we delete all
// // open brackets that follow a colon or comma or that begin the text. Finally,
// // we look to see that the remaining characters are only whitespace or ']' or
// // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

//             if (/^[\],:{}\s]*$/.
// test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
// replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
// replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// // In the third stage we use the eval function to compile the text into a
// // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// // in JavaScript: it can begin a block or an object literal. We wrap the text
// // in parens to eliminate the ambiguity.

//                 j = eval('(' + text + ')');

// // In the optional fourth stage, we recursively walk the new structure, passing
// // each name/value pair to a reviver function for possible transformation.

//                 return typeof reviver === 'function' ?
//                     walk({'': j}, '') : j;
//             }

// // If the text is not JSON parseable, then a SyntaxError is thrown.

//             throw new SyntaxError('JSON.parse');
//         };
//     }
// }());// Definicion del namespace
// if (typeof (usig) == "undefined")
//   usig = {};
  
// if (typeof (usig.data) == "undefined")
//   usig.data = {};
  
// if (typeof (usig.defaults) == "undefined")
//   usig.defaults = {};
  
// usig.defaults.Callejero = {
//   server: 'http://servicios.usig.buenosaires.gov.ar/callejero',
//   // server: 'http://liebre/wk/Callejero/src/www/server.php',
//   lazyDataLoad: false,
//   loadFullDatabase: true,
//   callesEnMinusculas: false,
//   encoding: 'utf-8',
//   expirationTime: 10080 // una semana
// }

// /**
//  * @class Callejero
//  * Esta clase es la interfaz con el callejero de USIG. Es un singleton y todos los metodos estan accesibles
//  * a traves de usig.Callejero. El componente debe inicializarse previamente llamando al metodo init.
//  * @namespace usig
//  * @cfg {String} server URL del servidor de datos de calles. Tiene un valor por defecto.
//  * @cfg {Boolean} lazyDataLoad Determina si los datos del callejero deben cargarse al inicializar 
//  *    el componente o solo cuando se lo quiera usar por primera vez.
//  * @cfg {Function} onReady Callback que es llamada cuando ya se cargaron los datos del callejero.
//  * @singleton
// */  
// usig.Callejero = (function($) {
//   var opts = {}, 
//   myself = this,
//   initialized = false,
//   listeners = {
//     'ready': []
//   },
//   loadingData = false;
  
//   /*
//    * Busca las palabras de la direccion ingresada, en las keyword de un registro del callejero
//      * @param {Array} wordsRE Array de expresiones regulares de las palabras a buscar
//      * @param {Array} calle Array con los datos de una calle del callejero
//      * @return {Bool} true si todas las palabras de wordsRE coinciden con el comienzo de alguna palabra de las keywords de calle.
//     */
//   function matchea(wordsRE, calle) {
//     var match = true;
//     for (var w=0;w<wordsRE.length;w++) {
//       var r =  wordsRE[w];
//       r.lastIndex = 0;
//       if (!r.test(calle[2])){
//         match = false;
//         break;
//       }
//     }
//     return match;
//   }
  
//   function mergeDatosCruces(data) {
//     loadingData = false;
//     if (data.length != usig.data.Callejero.length) {
//       alert('Se produjo un error al cargar la información de cruces de calles.');
//       return;
//     }
//     for (var i=0; i<usig.data.Callejero.length; i++) {
//       usig.data.Callejero[i].push(data[i]);
//     }
//   }
  
//   function cargarCallejero(data) {
//     usig.data.Callejero = data;
//     loadingData = false;
//     eventHandler('ready');
//   }
  
//   function cargarCruces() {
//     loadingData = true;
//     $.ajax({
//       type: 'GET',
//       url: opts.server,
//       data: { full: 1, cruces: 1, encoding: opts.encoding},
//       dataType: 'jsonp',
//       success: mergeDatosCruces,
//       error: function() {
//         alert('Se produjo un error al intentar cargar la información de calles.');
//       }
//     });       
//   }
  
//   function _cargarCallejero(onSuccess) {
//     loadingData = true;
//       $.ajax({
//       type: 'GET',
//       url: opts.server,
//       data: opts.loadFullDatabase?{full: 1, encoding: opts.encoding, minusculas: opts.callesEnMinusculas?1:0}:{encoding: opts.encoding, minusculas: opts.callesEnMinusculas?1:0},
//       dataType: 'jsonp',
//       success: onSuccess, 
//       error: function() {
//         alert('Se produjo un error al intentar cargar la información de calles.');
//       }
//     });       
//   }
  
//   function cargarCalles() {
//     if (!loadingData) {
//         if (!supports_html5_storage()) {
//         _cargarCallejero(cargarCallejero);
//         }else{ // soporta HTML5
      
//         var callejeroLocalStorage;
//         try {
//             if (localStorage["callejero"]) callejeroLocalStorage = JSON.parse(localStorage["callejero"]);
//           if (callejeroLocalStorage && (new Date().getTime()<callejeroLocalStorage.expiration)) {
//             cargarCallejero(JSON.parse(callejeroLocalStorage.calles));
//           }else{
//             _cargarCallejero(function(datos){
//                 var expirationMS = opts.expirationTime * 60 * 1000;
//                 var record = {calles: JSON.stringify(datos), expiration: new Date().getTime() + expirationMS};
//                 localStorage["callejero"]= JSON.stringify(record);
//                 cargarCallejero(datos);
//               });
//           }
//         } catch(e) {
//           _cargarCallejero(cargarCallejero);
//         }
//         }
//     }
//   }
  
//   function supports_html5_storage() {
//       try {
//         return 'localStorage' in global && global['localStorage'] !== null;
//       } catch (e) {
//         return false;
//       }
//   }
  
//   function eventHandler(ev) {
//     for (var i=0; i<listeners[ev].length; i++) {
//       listeners[ev][i]();
//     }
//   }
  
//   function setHandler(ev, handler) {
//     var found = false;
//     for (var i=0; i < listeners[ev].length; i++) {
//       found = found || (listeners[ev][i] == handler); 
//     }
//     if (!found) {
//       listeners[ev].push(handler);
//     }
//   }

//   return {
//     /**
//      * Inicializa el componente previo a su primer uso.
//      * @param {Object} options (optional) Objeto conteniendo overrides para las opciones por defecto.
//      * @return {Object} Devuelve una referencia al componente. 
//      */
//       init: function(options) {
//       opts = $.extend({}, usig.defaults.Callejero, options);
//         if (typeof(opts.onReady) == "function") {
//           setHandler('ready', opts.onReady);
//         }
//         initialized = true;
//       if (!usig.data.Callejero && !opts.lazyDataLoad) {
//         /* IMPORTANTE: 
//          * Es necesario diferir la inicializacion para el caso de que el manejador del 
//          * evento onReady de quien llama a init dependa de la instancia del callejero que 
//          * devuelve init.
//          */
//         cargarCalles.defer(100); 
//       } else if (usig.data.Callejero) {
//         eventHandler('ready');
//         listeners['ready'] = [];
//       }   
//       return this;
//       },
    
//       /**
//        * Busca calle por codigo y devuelve una lista de objetos calle
//        * @param {Integer} codigo Codigo de calle a buscar
//        * @return {Array of Calle} Calles encontradas
//        */
//       buscarPorCodigo: function(codigo){
//         var calles = [];
//         if(/^[0-9]+$/.test(codigo)){
//               var index = usig.data.Callejero.binarySearch(codigo, function(a, b) { return a[0]-b; });
//               if (index > -1){
//                 var match = usig.data.Callejero[index];
//                 calles.push(new usig.Calle(match[0], match[1], match[3], match[4]));
//                 i = index + 1;
//                   while(i < usig.data.Callejero.length && usig.data.Callejero[i][0] == codigo){
//                     match = usig.data.Callejero[i];
//                     calles.push(new usig.Calle(match[0], match[1], match[3], match[4]));
//                     i++;
//                   }
//                   i = index - 1;
//                   while(i >= 0 && usig.data.Callejero[i][0] == codigo){
//                       match = usig.data.Callejero[i];
//                       calles.unshift(new usig.Calle(match[0], match[1], match[3], match[4]));
//                       i--;
//                   }
//               }
//         }
//           return calles;
//       },
    
//     /**
//      * Busca calles cuyo nombre se corresponda con str y devuelve un array con todas las instancias
//      * de usig.Calle halladas
//        * @param {String} str String a matchear
//        * @param {Integer} limit Maximo numero de respuestas a devolver
//        * @return {Array} Array de instancias de usig.Calle que matchearon str
//       */  
//     matcheaCalle: function(str, limit) {
//       var opts = [];
//       var optsLowPrior = [];
//       var input = str.replace(/"/g, "").translate('áéíóúüÁÉÍÓÚÜàèìòùÀÈÌÒÙ', 'aeiouuAEIOUUaeiouAEIOU').toUpperCase().trim();
//       var words = input.split(' ');
//       wordsRE = words.map(function(w){return new RegExp("^"+w+"| "+w, "gi")});
//       var snoRE = new RegExp("SNO|SIN NOMBRE OFICIAL|NO OFICIAL|PASAJE|PJE",'i');

//       if (this.listo()) {
//         for (var c=0;c<usig.data.Callejero.length;c++) {
//           if (matchea(wordsRE, usig.data.Callejero[c])) {
//             /** almaceno las calles que no tienen nombre oficial o altura en una lista de baja prioridad **/
//             if (!snoRE.test(usig.data.Callejero[c][1]) && usig.data.Callejero[c][3].length != 0){
//                             opts.push(new usig.Calle(usig.data.Callejero[c][0], usig.data.Callejero[c][1], usig.data.Callejero[c][3], usig.data.Callejero[c][4]));
//             } else {
//               optsLowPrior.push(new usig.Calle(usig.data.Callejero[c][0], usig.data.Callejero[c][1], usig.data.Callejero[c][3], usig.data.Callejero[c][4]));
//             }
//             if (!isNaN(parseInt(limit)) && opts.length >= parseInt(limit))
//               break;
//           }
//         }
//         /** junto las listas de resultado de alta y baja prioridad y devuelvo hasta la cantidad limit **/
//                 opts = opts.concat(optsLowPrior)
//                 if (!isNaN(parseInt(limit)) && opts.length >= parseInt(limit)){
//             opts = opts.splice(0,limit);
//                 }
//         if (usig.data.Callejero[0].length < 5 && !loadingData) {
//           cargarCruces();
//         }
//       } else {
//         cargarCalles();
//         throw(new usig.ErrorEnCargaDelCallejero());
//       }
//       return opts;
//     },
    
//       /**
//        * Determina si una calle tiene tramos como Av.
//        * @param {Calle} calle Instancia de usig.Calle
//        * @return {Boolean} Retorna True en caso de que la calle tenga tramos como Av.
//       */  
//     tieneTramosComoAv: function(calle) {
//        /* ATTENTI RAGAZZI
//         * Esto funciona estrictamente porque la base de calles viene ordenada por codigo de calles y
//         * la unica posibilidad de que una calle tenga tramos como av y calle simultaneamente es que
//         * haya un par de registros consecutivos con el mismo codigo (uno para c/caso)
//         */
//        var index = usig.data.Callejero.binarySearch(calle.codigo, function(a, b) { return a[0]-b; });
//        return calle.codigo != 0 && (usig.data.Callejero[index-1][0]==calle.codigo || usig.data.Callejero[index+1][0]==calle.codigo); 
//     },
    
//     /**
//      * Permite consultar el nombre oficial de una calle dado su codigo y una altura dada
//      * @param {Integer} codigo Codigo oficial de la calle
//      * @param {Integer} altura Altura de la calle
//      * @return {String} Retorna el nombre de la calle asociada al codigo indicado en la altura 
//      * dada o una cadena vacia en caso de error de codigo o altura.
//      */
//     getNombreCalle: function(codigo, altura) {
//       var calles = this.buscarPorCodigo(codigo);
//       for (var i=0; i<calles.length; i++) {
//         if (calles[i].alturaValida(altura)) {
//           return calles[i].nombre;          
//         }
//       }
//       return "";
//     },
    
//     /**
//      * Indica si ya se cargaron los datos del callejero.
//      * @return {Boolean} Retorna True en caso de que ya se hayan cargado los datos del callejero.
//      */
//     listo: function() {
//       return usig.data.Callejero && Array.isArray(usig.data.Callejero);
//     },
    
//     /**
//      * Indica si el componente ya ha sido inicializado.
//      * @return {Boolean} Retorna True si ya se ha llamado al metodo init.
//      */
//     inicializado: function() {
//       return initialized;
//     }
//   };
  
// })(jQuery);
// // Definicion del namespace
// if (typeof (usig) == "undefined")
//   usig = {};

// /**
//  * @class StringDireccion 
//  * Parsea un string que presuntamente representa una direccion; lo tipifica y lo separa en tokens. 
//  * Luego de instanciada la propiedad publica "tipo" puede asumir los siguientes valores:
//  * <pre><code>
//  * usig.StringDireccion.CALLE
//  * usig.StringDireccion.CALLE_ALTURA
//  * usig.StringDireccion.CALLE_Y_CALLE
//  * usig.StringDireccion.INVALIDO
//  * </code></pre>
//  * @namespace usig
//  * @constructor 
//  * @param {String} strInput String a parsear  
// */
// usig.StringDireccion = (function($) { // Soporte jQuery noConflict
// return function(strInput, aceptarCallesSinAlturas) {
//   /**
//     * @property
//     * @type Integer Constante que indica la tipificacion asignada al string de entrada 
//     */ 
//   this.tipo = usig.StringDireccion.INVALIDO;
//   /**
//     * @property
//     * @type String [Array] String que representa el presunto nombre de la calle o array de strings que representan las
//     * presuntas calles que se intersectan 
//     */ 
//   this.strCalles = '';
//   /**
//     * @property
//     * @type Integer Presunta altura de la calle 
//     */ 
//   this.strAltura = '';
// //  this.strInput = strInput.replace(/"/g, "").replace(/\./g, " ").replace(/,/g, " ").replace(/\)/g, " ").replace(/\(/g, " ").toUpperCase().trim();
//   this.strInput = strInput.replace(/"/g, "").replace(/[\.,\(\)']/g, " ").toUpperCase().trim();
//   var esAlturaSN = /[sS][/\\][nN]/;

//   function esTipoAltura(str, aceptarCallesSinAlturas){
//     return str.isDigit() || (aceptarCallesSinAlturas && esAlturaSN.test(str));
//   }

//   this.setearCalleAltura = function(){
//     palabras = this.strInput.split(" ");
//     this.maxWordLen = palabras.inject(0, function(acc, w, i) { return Math.max(w.trim().length, acc); });
//     var cantPalabras = palabras.length;
//     if (cantPalabras > 1 && esTipoAltura(palabras[cantPalabras - 1], aceptarCallesSinAlturas)) {
//       this.tipo = usig.StringDireccion.CALLE_ALTURA;
//       this.strCalles = palabras.inject("", function(acc, w, i) { return i<(cantPalabras-1)?(acc!=""?acc+" "+w:w):acc});
//       this.strAltura = palabras[cantPalabras - 1];
//     } else {
//       this.tipo = usig.StringDireccion.CALLE;
//       this.strCalles = this.strInput;       
//     }
//   }

//   if (this.strInput.length > 0) {
//     var palabras = this.strInput.split(" Y ");
//     if (palabras.length >= 2) {
//       var str = fixCallesConY(this.strInput);
//       palabras = str.split(" Y ");
//       if (palabras.length >= 2) {
//         this.tipo = usig.StringDireccion.CALLE_Y_CALLE;
//         this.strCalles = [palabras[0].replace(" & ", " Y "), palabras[1].replace(" & ", " Y ")];
//       }
//     }
//     palabras = this.strInput.split(" E ");
//     if (palabras.length >= 2) {
//       // Si la ultima palabra no es un entero...
//       if (parseInt(palabras[palabras.length-1]) != palabras[palabras.length-1]) {
//         this.tipo = usig.StringDireccion.CALLE_Y_CALLE;
//         this.strCalles = palabras;
//       }
//     }
//     if (this.tipo == usig.StringDireccion.INVALIDO) {
//       this.setearCalleAltura()
//     }
//   } else {
//     this.tipo = usig.StringDireccion.INVALIDO;    
//   }
  
//   function fixCallesConY(str) {
//     return str.translate(["GELLY Y OBES",
//         "MENENDEZ Y PELAYO",
//         "OLAGUER Y FELIU",
//         "ORTEGA Y GASSET",
//         "PAULA Y RODRIGUEZ",
//         "PAZ Y FIGUEROA",
//         "PI Y MARGALL",
//         "RAMON Y CAJAL",
//         "TORRES Y TENORIO",
//         "TREINTA Y TRES"], ["GELLY & OBES",
//       "MENENDEZ & PELAYO",
//       "OLAGUER & FELIU",
//       "ORTEGA & GASSET",
//       "PAULA & RODRIGUEZ",
//       "PAZ & FIGUEROA",
//       "PI & MARGALL",
//       "RAMON & CAJAL",
//       "TORRES & TENORIO",
//       "TREINTA & TRES"]);
//   }
  
//   this.quitarAvsCalle = function() {
//     var avs = ['AV', 'AVDA', 'AVENIDA'];
//     if (this.tipo == usig.StringDireccion.CALLE_ALTURA) {
//       this.strCalles = this.strCalles.removeWords(avs);
//     } else if (this.tipo == usig.StringDireccion.CALLE_Y_CALLE) {
//             this.strCalles[0] = this.strCalles[0].removeWords(avs);
//     }
//   }
    
//     this.quitarAvsCalleCruce = function() {
//         var avs = ['AV', 'AVDA', 'AVENIDA'];
//         if (this.tipo == usig.StringDireccion.CALLE_Y_CALLE) {
//             this.strCalles[1] = this.strCalles[1].removeWords(avs);
//         }
//     }
    
//     this.quitarPasajes = function() {
//         var avs = ['PJE', 'PSJE', 'PASAJE'];
//         if (this.tipo == usig.StringDireccion.CALLE_ALTURA) {
//             this.strCalles = this.strCalles.removeWords(avs);
//         } else if (this.tipo == usig.StringDireccion.CALLE_Y_CALLE) {
//             this.strCalles[0] = this.strCalles[0].removeWords(avs);
//             this.strCalles[1] = this.strCalles[1].removeWords(avs);
//         }
//     }
    
//     this.esAlturaSN = function(alt) { return esAlturaSN.test(alt); };
// };
// //Fin jQuery noConflict support
// })(jQuery);


// usig.StringDireccion.CALLE = 0;
// usig.StringDireccion.CALLE_ALTURA = 1;
// usig.StringDireccion.CALLE_Y_CALLE = 2;
// usig.StringDireccion.INVALIDO = -1;
// // Definicion del namespace
// if (typeof (usig) == "undefined")
//   usig = {};
  
// /**
//  * @class ErrorCalleInexistente
//  * @namespace usig 
//  * @constructor 
//  * @param {String} str Nombre oficial de la calle
// */
// usig.ErrorCalleInexistente = function (str) {
  
//     /**
//      * Devuelve un mensaje de error con el nombre de la calle 
//      * @return {String} Mensaje de error
//     */  
//   this.toString = function() {
//     return "Calle inexistente: "+str;
//   }
  
//     /**
//      * Devuelve el nombre de la calle 
//      * @return {String} Nombre de la calle
//     */  
//   this.getNombreCalle = function() {
//     return str;
//   }
  
//   /**
//    * Devuelve un mensaje de error más descriptivo y amigable
//    * @return {String} Mensaje de error
//    */
//   this.getErrorMessage = function() {
//     return usig.ErrorCalleInexistente.defaults.texts.message;
//   }
// }

// usig.ErrorCalleInexistente.defaults = {
//   texts: {
//     message: 'No pudo hallarse ninguna calle existente que coincidiera con su b&uacute;squeda. Por favor, revise el nombre ingresado y vuelva a intentarlo.'
//   }
// }// Definicion del namespace
// if (typeof (usig) == "undefined")
//   usig = {};
  
// /**
//  * @class ErrorCalleInexistenteAEsaAltura
//  * @namespace usig 
//  * @constructor 
//  * @param {String} calle Nombre oficial de la calle
//  * @param {Array} matchings Array de instancias de usig.Calle que matchean el string 'calle'
//  * @param {Integer} altura Altura invalida de la calle
// */
// usig.ErrorCalleInexistenteAEsaAltura = (function($) { // Soporte jQuery noConflict
// return function (calle, matchings, altura) {
  
//     /**
//      * Devuelve el nombre de la calle 
//      * @return {String} Nombre de la calle
//     */  
//   this.getCalle = function() {
//     return calle;
//   }
  
//     /**
//      * Devuelve el array de matchings para la calle 
//      * @return {Array} Instancias de usig.Calle que matchean 'calle'
//     */  
//   this.getMatchings = function() {
//     return matchings;
//   }
  
//     /**
//      * Devuelve la altura invalida de la calle 
//      * @return {Integer} Altura
//     */  
//   this.getAltura = function() {
//     return altura;
//   }
  
//     /**
//      * Devuelve un mensaje de error con el nombre de la calle y la altura invalida 
//      * @return {String} Mensaje de error
//     */  
//   this.toString = function() {
//     return "La calle "+calle+" no existe a la altura "+altura;
//   }
  
//   /**
//    * Devuelve un mensaje de error más descriptivo y amigable
//    * @return {String} Mensaje de error
//    */
//   this.getErrorMessage = function() {
//     var msg = usig.ErrorCalleInexistenteAEsaAltura.defaults.texts.message+'<ul>';
//     $.each(matchings, function(i, calle) {
//       var tramos = calle.getTramos();
//       $.each(tramos, function(i, tramo) {
//         msg+='<li>'+calle.nombre+' '+tramo[0]+'-'+tramo[1]+'</li>';
//       });
//     });
//     msg+='</ul>';     
//     return msg;
//   }
// };
// //Fin jQuery noConflict support
// })(jQuery);


// usig.ErrorCalleInexistenteAEsaAltura.defaults = {
//   texts: {
//     message: 'La altura indicada no es v&aacute;lida para la calle ingresada. A continuaci&oacute;n se muestran algunas opciones v&aacute;lidas halladas:'
//   }
// }// Definicion del namespace
// if (typeof (usig) == "undefined")
//     usig = {};

// /**
//  * @class ErrorCruceInexistente
//  * @namespace usig 
//  * @constructor 
//  * @param {String} calle1 Nombre oficial de la primera calle
//  * @param {Array} matchingsCalle1 Array de instancias de usig.Calle que matchean el string 'calle1'
//  * @param {String} calle2 Nombre oficial de la segunda calle
//  * @param {Array} matchingsCalle2 Array de instancias de usig.Calle que matchean el string 'calle2'
// */
// usig.ErrorCruceInexistente = (function($) { // Soporte jQuery noConflict
// return function (calle1, matchingsCalle1, calle2, matchingsCalle2) {
    
//     /**
//      * Devuelve el nombre de la primera calle 
//      * @return {String} Nombre de la primera calle
//     */  
//     this.getCalle1 = function() {
//         return calle1;
//     }
    
//     /**
//      * Devuelve el nombre de la segunda calle 
//      * @return {String} Nombre de la segunda calle
//     */  
//     this.getCalle2 = function() {
//         return calle2;
//     }
    
//     /**
//      * Devuelve el array de matchings para la primera calle 
//      * @return {Array} Instancias de usig.Calle que matchean 'calle1'
//     */  
//     this.getMatchingsCalle1 = function() {
//         return matchingsCalle1;
//     }
    
//     /**
//      * Devuelve el array de matchings para la segunda calle 
//      * @return {Array} Instancias de usig.Calle que matchean 'calle2'
//     */  
//     this.getMatchingsCalle2 = function() {
//         return matchingsCalle2;
//     }
    
//     /**
//      * Devuelve un mensaje de error con el nombre de la calles 
//      * @return {String} Mensaje de error
//     */  
//     this.toString = function() {
//         return "Cruce inexistente: "+calle1+" y "+calle2;
//     }
  
//   /**
//    * Devuelve un mensaje de error más descriptivo y amigable
//    * @return {String} Mensaje de error
//    */
//   this.getErrorMessage = function() {
//     var msg = usig.ErrorCruceInexistente.defaults.texts.message;
//     msg+='<br/>'+usig.ErrorCruceInexistente.defaults.texts.detalleCalle1+'<ul>';
//     $.each(matchingsCalle1, function(i, calle) {
//       msg+='<li>'+calle.nombre+'</li>';
//     });
//     msg+='</ul>';
//     msg+=usig.ErrorCruceInexistente.defaults.texts.detalleCalle2+'<ul>';
//     $.each(matchingsCalle2, function(i, calle) {
//       msg+='<li>'+calle.nombre+'</li>';
//     });
//     msg+='</ul>';
//     return msg;
//   }
// };
// //Fin jQuery noConflict support
// })(jQuery);


// usig.ErrorCruceInexistente.defaults = {
//   texts: {
//     message: 'El cruce de calles indicado no existe. A continuaci&oacute;n se muestran algunas calles que coinciden con su b&uacute;squeda.',
//     detalleCalle1: 'Algunas calles halladas que coinciden con la 1ra calle ingresada son:',
//     detalleCalle2: 'Algunas calles halladas que coinciden con la 2da calle ingresada son:'
//   }
// }// Definicion del namespace
// if (typeof (usig) == "undefined")
//     usig = {};
    
// /**
//  * @class ErrorCalleSinAlturas
//  * @namespace usig 
//  * @constructor 
//  * @param {String} str Nombre oficial de la calle
// */
// usig.ErrorCalleSinAlturas = function (str) {
    
//     /**
//      * Devuelve un mensaje de error con el nombre de la calle 
//      * @return {String} Mensaje de error
//     */  
//     this.toString = function() {
//     return usig.ErrorCalleSinAlturas.defaults.texts.message.replace('{calle}', str);
//     }
  
//     /**
//      * Devuelve el nombre de la calle 
//      * @return {String} Nombre de la calle
//     */  
//   this.getNombreCalle = function() {
//     return str;
//   }
  
//   /**
//    * Devuelve un mensaje de error más descriptivo y amigable
//    * @return {String} Mensaje de error
//    */
//   this.getErrorMessage = function() {
//     return usig.ErrorCalleSinAlturas.defaults.texts.message.replace('{calle}', str);
//   }
// }

// usig.ErrorCalleSinAlturas.defaults = {
//   texts: {
//     message: 'La calle {calle} no posee alturas oficiales. Utilice intersecciones para hallar direcciones v&aacute;lidas sobre esta calle o escriba S/N en lugar de la altura.'
//   }
// }// Definicion del namespace
// if (typeof (usig) == "undefined")
//     usig = {};
    
// /**
//  * @class ErrorEnCargaDelCallejero
//  * @namespace usig
//  * @constructor
// */
// usig.ErrorEnCargaDelCallejero = function () {
    
//     /**
//      * Devuelve un mensaje de error 
//      * @return {String} Mensaje de error
//     */  
//     this.toString = function() {
//     return "Callejero no disponible.";
//     }
  
//   /**
//    * Devuelve un mensaje de error más descriptivo y amigable
//    * @return {String} Mensaje de error
//    */
//   this.getErrorMessage = function() {
//     return "El callejero no se encuentra cargado aún o se produjo un error al intentar cargarlo";
//   }
// }
// // Definicion del namespace
// if (typeof (usig) == "undefined")
//   usig = {};
  
// if (typeof (usig.defaults) == "undefined")
//   usig.defaults = {};

// usig.defaults.NormalizadorDirecciones = {
//     lazyDataLoad: false,
//     loadFullDatabase: true,
//     aceptarCallesSinAlturas: false,
//     callesEnMinusculas: false,
//     maxPalabras: 7
// };

// /**
//  * @class NormalizadorDirecciones
//  * Esta clase implementa integramente en Javascript un normalizador de direcciones que utiliza
//  * el callejero de USIG para transformar un string en una direccion normalizada.<i>Requiere jQuery</i>.
//  * Ejemplo de uso:
//  * <pre><code>
//  * ...
//  * &lt;script src="http:&#47;&#47;ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js" type="text/javascript"&gt;&lt;/script&gt;
//  * &lt;script src="http:&#47;&#47;servicios.usig.buenosaires.gob.ar/nd-js/1.4/normalizadorDirecciones.min.js" type="text/javascript"&gt;&lt;/script&gt;
//  * ...
//  * var n = usig.NormalizadorDirecciones.init();
//  * try {
//  *      var opts = n.normalizar(input.value, 10);
//  * } catch (error) {
//  *      // ...
//  * }
//  * 
//  * // Show opts
//  * 
//  * </code></pre> 
//  * @namespace usig 
//  * @cfg {Boolean} lazyDataLoad Indica al normalizador si debe cargar los datos del callejero inmediatamente al
//  * inicializarse la clase o esperar a la primera llamada al metodo normalizar. Por defecto es <code>False</code>.
//  * @cfg {Boolean} aceptarCallesSinAlturas Indica al normalizador si debe permitir como altura S/N para las calles
//  * sin numero. Por defecto es <code>False</code>. Ej: de los italianos S/N  
//  * @cfg {Boolean} callesEnMinusculas Indica si se desea que los nombres de las calles normalizados sean en minúsculas (Por defecto: false)
//  * @cfg {Function} onReady Callback que es llamada cuando ya se cargaron los datos del callejero y pueden hacerse 
//  *  normalizaciones.
//  * @singleton
// */
// usig.NormalizadorDirecciones = (function($) {
//   var opts = {},
//   initialized = false,
//   listeners = {
//     'ready': []
//   },
//   c = null;
//   re = {
//     cruceCalles: /\s+y\s+/gi,
//     calleAltura: [],
//     calle: []
//   };
  
//   function normalizarCalleAltura(strDir, maxOptions, autoDesambiguarCalleAltura) {
//     var calles = c.matcheaCalle(strDir.strCalles);
//     try {
//         var opts = validarAlturas(strDir, calles, maxOptions);
//     } catch (error) {
//       throw(error);
//     }
//     if (opts.length == 0 && calles.length > 0) {
//       strDir.quitarAvsCalle();
//       calles = c.matcheaCalle(strDir.strCalles);
//       try {
//                 opts = validarAlturas(strDir, calles, maxOptions);
//       } catch (error) {
//         throw(error);
//       }
//             opts = filtrarCallesQueNoSonAv(opts);
//             if (opts.length == 0) {
//               throw(new usig.ErrorCalleInexistenteAEsaAltura(strDir.strCalles, calles, strDir.strAltura));
//             }
//     } else if (opts.length == 0 && calles.length == 0) {
//             strDir.quitarPasajes();
//             calles = c.matcheaCalle(strDir.strCalles);
//             try {
//                 opts = validarAlturas(strDir, calles, maxOptions);
//             } catch (error) {
//               throw(error);
//             }
//     }
    
//     if (autoDesambiguarCalleAltura && opts.length > 1) {
      
//       $.each(opts, function(i, opt) {
//         if (esPermutacion(strDir.strCalles, opt.getCalle().nombre)) {
//           opts = [opt];
//         } 
//         /*else {
//           usig.debug(strDir.strCalles + ' NO es permutacion de ' + opt.getCalle().nombre);
//         }*/
//       }); 
//     }
    
//     return opts;    
//   }
  
//   function esPermutacion(str1, str2) {
//     function prepararStr(str) {
//       str = str.replace(/"/g, "").translate('áéíóúüÁÉÍÓÚÜàèìòùÀÈÌÒÙ', 'aeiouuAEIOUUaeiouAEIOU').toUpperCase().trim();
//       str = str.split(" ");
//       return str;
//     }
    
//     str1 = prepararStr(str1);
//     str2 = prepararStr(str2);
    
//     if (str1.length == str2.length){
//       intersect = str1.intersect(str2)
      
//       if (str1.length == intersect.length) {
//         return true
//       }
//     }
    
//     return false;
//   }
  

//   /*
//    * 
// def esPermutacion(strIn1, strIn2):
//     def prepararString(strIn):
//         if isinstance(strIn, str):
//             strIn = unicode(strIn)
//         strIn = ''.join((c for c in unicodedata.normalize('NFD', strIn) if unicodedata.category(c) != 'Mn'))
//         strIn = re.sub('[^a-zA-Z0-9 ]', '', strIn)
//         strIn = strIn.upper().split(' ')
//         return strIn
    
//     retval = False
//     strIn1 = prepararString(strIn1)
//     strIn2 = prepararString(strIn2)
    
//     if (len(strIn1) == len(strIn2)):
//         intersec = set(strIn1) & set(strIn2)
//         if (len(strIn1) == len(intersec)):
//             retval = True

//     return retval
//    */
//   function validarAlturas(strDir, calles, maxOptions) {
//         var retval = new Array();
//         var hayCalleSN = 0;
//         if(calles.length != 0){
//           for (var i=0;i<calles.length;i++) {
//             try {
//                   if (calles[i].alturaValida(strDir.strAltura)) {
//                       retval.push(new usig.Direccion(calles[i], strDir.strAltura));
//                   }
//             } catch (error) {
//               if (error instanceof usig.ErrorCalleSinAlturas && opts.aceptarCallesSinAlturas && strDir.esAlturaSN(strDir.strAltura)){
//                   retval.push(new usig.Direccion(calles[i], 0));
//               }
//             hayCalleSN++;
//             }
//               if (!isNaN(parseInt(maxOptions)) && retval.length >= parseInt(maxOptions))
//                   break;
//           }
//           if (calles.length == hayCalleSN && retval.length == 0){
//           throw(new usig.ErrorCalleSinAlturas(calles[0].toString()));
//           }
//         }
//         return retval;
//   }

//   function filtrarCallesQueNoSonAv(dirs, getFunc) {
//     var func = getFunc?getFunc:'getCalle';
//     var opts = new Array();
//     for (var i=0;i<dirs.length;i++) {
//         if (c.tieneTramosComoAv(dirs[i][func]())) {
//           opts.push(dirs[i]);
//         }
//     }
//     return opts;
//   }
  
//   function normalizarCalleYCalle(strDir, maxOptions) {
//     var calles1 = c.matcheaCalle(strDir.strCalles[0]);
//     var calles2 = c.matcheaCalle(strDir.strCalles[1]);
//     // Armo una lista tabu para evitar agregar 2 veces una interseccion 
//     // de una calle con otra que es calle y avenida a la vez
//     // Ej. CIUDAD DE LA PAZ y MONROE y CIUDAD DE LA PAZ y MONROE AV.
//     var matches = new Array();
//     function matchCode(calle1, calle2) {
//       return Math.min(calle1.codigo, calle2.codigo)+Math.max(calle1.codigo, calle2.codigo);
//     }
//     var opts = new Array();
//     for (var i=0;i<calles1.length;i++) {
      
//       for (var j=0; j<calles2.length; j++) {
        
//         if (calles1[i].codigo != calles2[j].codigo 
//           && matches.indexOf(matchCode(calles1[i], calles2[j])) < 0 
//           && calles1[i].seCruzaCon(calles2[j]) && calles2[j].seCruzaCon(calles1[i])) {
            
//             opts.push(new usig.Direccion(calles1[i], calles2[j]));
//             matches.push(matchCode(calles1[i], calles2[j]));
//             if (!isNaN(parseInt(maxOptions)) && opts.length >= parseInt(maxOptions))
//               break;
              
//         }
//       }
      
//       if (!isNaN(parseInt(maxOptions)) && opts.length >= parseInt(maxOptions))
//         break;
//     }
//         if (opts.length == 0 && calles1.length > 0 && calles2.length > 0) {
//           var palabrasCalle1 = strDir.strCalles[0].split(' '); 
//             var palabrasCalle2 = strDir.strCalles[1].split(' '); 
//             if (palabrasCalle1.indexOf('AV') >= 0 || palabrasCalle1.indexOf('AVDA') >= 0 || palabrasCalle1.indexOf('AVENIDA') >= 0) {
//               var strDir1 = $.extend(true, {}, strDir);
//               strDir1.quitarAvsCalle();
//               try {
//                   var opts1 = normalizarCalleYCalle(strDir1, maxOptions);
//               } catch (error) {
//                     throw(new usig.ErrorCruceInexistente(strDir.strCalles[0], calles1, strDir.strCalles[1], calles2));
//               }
//               filtrarCallesQueNoSonAv(opts1);
//                 if (Array.isArray(opts1))
//                     return opts1;
//             }
//             if (palabrasCalle2.indexOf('AV') >= 0 || palabrasCalle2.indexOf('AVDA') >= 0 || palabrasCalle2.indexOf('AVENIDA') >= 0) {
//                 var strDir2 = $.extend(true, {}, strDir);
//                 strDir2.quitarAvsCalleCruce();
//                 try {
//                     var opts2 = normalizarCalleYCalle(strDir2, maxOptions);
//                 } catch (error) {
//                     throw(new usig.ErrorCruceInexistente(strDir.strCalles[0], calles1, strDir.strCalles[1], calles2));
//                 }
//                 filtrarCallesQueNoSonAv(opts2, 'getCalleCruce');
//                 if (Array.isArray(opts2))
//                     return opts2;
//             }
//         }
//     // Esto es para salvar el caso de calles con Y en el nombre pero
//     // que aun no estan escritas completas
//     // Ej. ORTEGA Y GA
//     if (opts.length < maxOptions) {
//       var calles = c.matcheaCalle(strDir.strInput);
//       var i = 0;
//       while(opts.length < maxOptions && i < calles.length) {
//         opts.push(calles[i]);
//         i++;
//       }
//     }
//     if (opts.length == 0 && calles1.length > 0 && calles2.length > 0) {
//       throw(new usig.ErrorCruceInexistente(strDir.strCalles[0], calles1, strDir.strCalles[1], calles2));
//     }
//     return opts;    
//   }
  
//   function eventHandler(ev) {
//     for (var i=0; i < listeners[ev].length; i++) {
//       listeners[ev][i]();
//     }
//     if (ev == 'ready') {
//       listeners['ready'] = [];
//     }
//   }
  
//   function setHandler(ev, handler) {
//     var found = false;
//     for (var i=0; i < listeners[ev].length; i++) {
//       found = found || (listeners[ev][i] == handler); 
//     }
//     if (!found) {
//       listeners[ev].push(handler);
//     }
//   }

//   function normalizar(str, maxOptions, autoDesambiguar){
//     if (typeof(autoDesambiguar)=='undefined') {
//       autoDesambiguar = true;
//     }
    
//     if (typeof(jQuery) == "undefined") {
//       throw('Error: Este componente requiere jQuery y no se encontro.');
//       return [];
//     }
//     var strDir = new usig.StringDireccion(str, opts.aceptarCallesSinAlturas);
//     var res = [];
//     switch(strDir.tipo) {
//       case usig.StringDireccion.CALLE:
//         res = c.matcheaCalle(strDir.strCalles, maxOptions);
//         break;
//       case usig.StringDireccion.CALLE_ALTURA:
//         res = normalizarCalleAltura(strDir, maxOptions, autoDesambiguar);
//         break;
//       case usig.StringDireccion.CALLE_Y_CALLE:
//         res = normalizarCalleYCalle(strDir, maxOptions);
//         if (res.length == 0) {
//           strDir.setearCalleAltura();
//           res = normalizarCalleAltura(strDir, maxOptions, autoDesambiguar);
//         }
//         break;
//       case usig.StringDireccion.INVALIDO:
//         res = [];
//         break;
//     }
//     if (Array.isArray(res)) {
//       if (res.length > 0) {
//         return res;
//       } else {
//         throw(new usig.ErrorCalleInexistente(str));
//       }
//     } else {
//       return res;
//     }
//   }

//   function buscarCruceCalles(texto, posConector, lenConector) {
//     /*
//      * Con texto = "Av. Callao y Av. Corrientes" quedaria:
//      * textoCruce = "Av. Corrientes"
//      * textoCalle = "oallaC .vA"
//      */
//     textoCalle = texto.substring(0, posConector).reverse();
//     textoCruce = texto.substr(posConector + lenConector);
//     conector = texto.substr(posConector, lenConector);
//     var calle = cruce = "";
//     var rCalle = rCruce = [];
    
//     try{
//       try{
//         for (var i = 1; i < opts.maxPalabras; ++i){
//           cruce = textoCruce.match(re.calle[i])[0];
//           if (textoCruce.search(re.calle[i]) != 0)
//             throw "Direccion no valida";
//           rCruce = normalizar(cruce, 2, false);
//         }
//       }catch(err){
//         cruce = textoCruce.match(re.calle[i-1])[0];
//       }
//       try{
//         for (var i = 1; i < opts.maxPalabras; ++i){
//           calle = textoCalle.match(re.calle[i])[0].reverse();
//           if (textoCalle.search(re.calle[i]) != 0)
//             throw "Direccion no valida";
//           rCalle = normalizar(calle, 2, false);
//         }
//       }catch(err){
//         calle = textoCalle.match(re.calle[i-1])[0].reverse();
//       }
      
//       resultados = normalizar(calle + conector + cruce, 2, false);
//       if(resultados.length == 1 && verificarBusquedaDireccion(resultados[0], calle + conector + cruce))
//         return {
//           "match": resultados[0],
//           "pos": texto.search(calle),
//           "len": calle.length + conector.length + cruce.length
//         };
//       else{
//         return false;
//       }
//     } catch(e) {return false;}
//     return false;
//   } 
  
//   function buscarCalleAltura(texto) {
//     textoDireccion = texto.reverse();
//     var direccion = "";
//     var rDireccion = [];
//     try{
//       try{
//         for (var i = 1; i < opts.maxPalabras; ++i){
//           direccion = textoDireccion.match(re.calleAltura[i])[0].reverse();
//           if (textoDireccion.search(re.calleAltura[i]) != 0)
//             throw "Direccion no valida";
//           rDireccion = normalizar(direccion, 2, false);
//         }
//       }catch(err){
//         direccion = textoDireccion.match(re.calleAltura[i-1])[0].reverse();
//         rDireccion = normalizar(direccion, 2, false);
//       }
//       if(verificarBusquedaDireccion(rDireccion[0], direccion)) {
//         return {
//           "match": rDireccion[0],
//           "pos": texto.search(direccion),
//           "len": direccion.length
//         };
//       }
//     } catch(e) {return false;}
//     return false;
//   }

//   function _buscarDirecciones(texto, resultadosMaximos){
//     var resultados=[];
//     var rePosiblesDirecciones = /((\s+y\s+)|(\s+\d+))/gi;
//     while (matcheo = rePosiblesDirecciones.exec(texto)){
//       if(matcheo[0].match(re.cruceCalles)){
//         res = buscarCruceCalles(texto, matcheo.index, matcheo[0].length)
//       }else{
//         res = buscarCalleAltura(texto.substring(0, matcheo.index + matcheo[0].length));
//       }
//       if(res){
//         if (resultados.length > 0){
//           if (res.pos == resultados[resultados.length-1].pos && res.match.toString() == resultados[resultados.length-1].match.toString()){
//             if (res.len > resultados[resultados.length-1].len){
//               resultados.pop();
//               resultados.push(res);
//             }
//           }else{
//             resultados.push(res);
//           }
//         }else{
//           resultados.push(res);
//         }
//       }
//       if (!(!resultadosMaximos || resultados.length < resultadosMaximos))
//         return resultados;
//     }
//     return resultados.length>0?resultados:false;
//   }
  
//   function sinAcentos(str){
//     //var rExps=[/[\xC0-\xC2]/g, /[\xC8-\xCA]/g, /[\xCC-\xCE]/g, /[\xD2-\xD4]/g, /[\xD9-\xDB]/g, /[\xD1-\xF1]/g];
//     var rExps =   ['Á','É','Í','Ó','Ú','Ü'];
//     var repChar = ['A','E','I','O','U','U'];
//     for(var i=0; i<rExps.length; ++i){
//       str=str.replace(rExps[i],repChar[i]);
//     }
//     return str;
//   }
  
//   function verificarBusquedaDireccion(posibleDireccion, matcheo){
//     var pMatcheo = sinAcentos(matcheo.toUpperCase()).split(' ')
//     var pCalle = posibleDireccion.toString().toUpperCase().replace(/[,.]/g,'').split(' ')
//     for (var i=0;i<pMatcheo.length-1;i++){
//       for (var j=0;j<pCalle.length-1;j++){
//         if (pMatcheo[i]==pCalle[j] && pMatcheo[i].length>3){
//           return true;
//         }
//       }
//     }
//     //ninguna palabra del texto coincide con el nombre de la calle.
//     return false;
//   }
  
//   function compararIndices(a,b){
//     return a.pos-b.pos;
//   }
  
//   return {
  
//        /**
//        * Intenta interpretar el string que recibe como parametro como una direccion y obtener como
//        * resultado una direccion normalizada. En cualquier caso devuelve un Array con los resultados
//        * obtenidos del intento. Dicho Array puede constar de calles (instancias de la clase usig.Calle) o
//        * direcciones (instancias de la clase usig.Direccion).
//        * En caso de que no se puedan encontrar direcciones o calles validas se pueden lanzar las siguientes <b>Excepciones</b>:
//        * <code>ErrorCalleInexistente</code>, <code>ErrorCalleInexistenteAEsaAltura</code> y <code>ErrorCruceInexistente</code> 
//        * cuyos nombres son autoexplicativos.
//        * 
//        * Todos las clases de los elementos que se devuelven implementan el metodo toString() que permite
//        * mostrar los resultados. Ejemplos de uso:
//        * <pre><code>
//   var n = new usig.NormalizadorDirecciones();
  
//   try {
//       n.normalizar('sarmiento', 10); 
//       // devuelve un array con 4 opciones (instancias de la clase usig.Calle) 
//       // correspondientes a las 4 calles cuyo nombre contiene 'sarmiento'
//   } catch (error) {
//     //...
//   } 
  
//   try {
//       n.normalizar('martinez 1500', 10);
//       // devuelve un array con 4 opciones (instancias de la clase usig.Direccion)  
//       // correspondientes a las direcciones MARTINEZ, (CASTRO/ENRIQUE/ROSAS/VICTOR) 1500
//   } catch (error) {
//       // ...
//   }
  
//   try {
//       n.normalizar('florida 550', 10);
//       // devuelve un array con una instancia de la clase usig.Direccion correspondiente 
//       // a FLORIDA 550 
//   } catch (error) {
//       // ...
//   }
  
//   try {
//       n.normalizar('callao y corrientes', 10);
//       // devuelve un array con una instancia de la clase usig.Direccion correspondiente 
//       // a CALLAO AV. y CORRIENTES AV.
//   } catch (error) {
//       // ...
//   }
  
//   </code></pre>
//        * @param {String} str La cadena a ser transformada en direccion
//        * @param {Integer} maxOptions Maximo numero de opciones a retornar
//        * @param {Boolean} (optional) autoDesambiguar Intentar desambiguar automaticamente
//        * @return {Array} Las opciones halladas que se corresponden con str
//       */
//     normalizar: normalizar,
        
//     /**
//      * Busca la primera direccion que encuentra en el texto
//      * @param {String} texto Texto donde buscar
//      * @return {Object} Retorna un objeto conteniendo la direccion (match), la posicion donde fue encontrada (pos) y la longitud del matching (len)
//      */
//     buscarDireccion: function(texto) {
//       var res = _buscarDirecciones(texto,1);
//       return res?res[0]:false;
//     },
        
//     /**
//      * Busca todas las direcciones que encuentra en el texto
//      * @param {String} texto Texto donde buscar
//      * @param {Integer} maxResultados Maxima cantidad de resultados a retornar
//      * @return {Array} Retorna un array de objetos conteniendo la direccion (match), la posicion donde fue encontrada (pos) y la longitud del matching (len)
//      */
//     buscarDirecciones: function(texto, resultadosMaximos) {
//       var res = _buscarDirecciones(texto, resultadosMaximos);
//       return res ? res : false;
//     },

//     /**
//      * Indica si ya se cargaron los datos del callejero y pueden empezar a hacerse normalizaciones.
//      * @return {Boolean} Retorna True en caso de que ya se hayan cargado los datos del callejero.
//      */ 
//     listo: function() {
//       return c?c.listo():false;
//     },
    
//       /**
//        * Permite sobreescribir opciones del componente
//        * @param {Object} options Objeto conteniendo opciones para el componente
//       */  
//     setOptions: function(options) {
//       opts = $.extend({}, opts, options);
//         if (typeof(opts.onReady) == "function") {
//           setHandler('ready', opts.onReady);
//         }
//     },
    
//     /**
//      * Inicializa el componente previo a su primer uso.
//      * @param {Object} options (optional) Objeto conteniendo overrides para las opciones por defecto. 
//      * @return {Object} Devuelve una referencia al componente. 
//      */
//     init: function(options) {
//         opts = $.extend({}, usig.defaults.NormalizadorDirecciones, options)
//         if (typeof(opts.onReady) == "function") {
//           setHandler('ready', opts.onReady);
//         }
//       c = usig.Callejero.init({ lazyDataLoad: opts.lazyDataLoad, loadFullDatabase: opts.loadFullDatabase, callesEnMinusculas: opts.callesEnMinusculas, onReady: eventHandler.createDelegate(this, ['ready']) });
//       for (var i=1; i<=opts.maxPalabras; i++) {
//         /* Atencion: Estas regular expressions estan invertidas para poder aplicarlas siempre en el mismo sentido
//          * Originales:
//          * re.calleAltura[i] = new RegExp("(((\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,)+\\s+){"+i+"}\\d+)","gi");
//          * re.cruceCalle[i] = new RegExp("y(\\s+(\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,|\\.)+){"+i+"}","gi");
//          */
//         re.calleAltura[i] = new RegExp("(\\d+(\\s+(\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,|\\.)+){"+i+"})","gi");
//         //re.calleAltura[i] = NUMERO (ESPACIO PALABRA)*i
//         re.calle[i] = new RegExp("(\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,|\\.)+(\\s+(\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,|\\.)+){"+(i-1)+"}","gi");
//         //re.cruceCalle[i] = PALABRA (ESPACIO PALABRA)*(i-1)
//       }
//       String.prototype.reverse = function () {
//         return this.split('').reverse().join('');
//         };
      
//       initialized = true;
//       return this;
//     },
//     c:c,
        
//     /**
//      * Indica si el componente ya ha sido inicializado.
//      * @return {Boolean} Retorna True si ya se ha llamado al metodo init.
//      */
//     inicializado: function() {
//       return initialized;
//     }
//   };  
// })(jQuery);
// module.exports = usig.NormalizadorDirecciones;
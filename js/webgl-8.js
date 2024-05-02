var gl;
function iniciarGL(canvas) {
    try {
        gl = canvas.getContext("webgl");
        gl.puertoVistaAncho = canvas.width;
        gl.puertoVistaAlto = canvas.height;
    } catch (e) { }
    if (!gl) {
        alert("No puede iniciarse webGL en este navegador");
    }
}
function conseguirShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }
    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3)
            str += k.textContent;
        k = k.nextSibling;
    }
    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else { return null; }
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}
var programaShader;
function iniciarShaders() {
    var fragmentoShader = conseguirShader(gl, "shader-fs");
    var verticeShader = conseguirShader(gl, "shader-vs");
    programaShader = gl.createProgram();
    gl.attachShader(programaShader, verticeShader);
    gl.attachShader(programaShader, fragmentoShader);
    gl.linkProgram(programaShader);
    if (!gl.getProgramParameter(programaShader, gl.LINK_STATUS)) {
        alert("No pueden iniciarse los shaders");
    }
    gl.useProgram(programaShader);
    programaShader.atribPosVertice = gl.getAttribLocation(programaShader, "aPosVertice");
    gl.enableVertexAttribArray(programaShader.atribPosVertice);
    //... Definimos Shaders para el color
    programaShader.vertColorAtributo = gl.getAttribLocation(programaShader, "aVerticeColor");
    gl.enableVertexAttribArray(programaShader.vertColorAtributo);
    ///... Fin de Shaders para el color
    programaShader.pMatrizUniforme = gl.getUniformLocation(programaShader, "uPMatriz");
    programaShader.mvMatrizUniforme = gl.getUniformLocation(programaShader, "umvMatriz");
}
//... se modifica puntos poligono por tratarse de 3D
function puntosPoligono(pPuntos, pArista) {
    var pol = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pol);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pPuntos), gl.STATIC_DRAW);
    pol.itemTam = 3;
    pol.numItems = pArista;
    return pol;
}
function colorPoligono(pColor, pVertice, pArista) {
    var polC = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, polC);
    var color = [];
    for (var i in pColor) {
        var c = pColor[i];
        for (var j = 0; j < pVertice; j++) {
            color = color.concat(c);
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
    polC.itemTam = 4;
    polC.numItems = pArista;
    return polC;
}


//base
var base1, base1c;
var base2, base2c;
var base3, base3c;
var base4, cua1_4c;
//primero
var primero1, primero1c;
var primero2, primero2c;
var primero3, primero3c;
var primero4, primero4c;
//segundo
var segundo1, segundo1c;
var segundo2, segundo2c;
var segundo3, segundo3c;
var segundo4, segundo4c;
//ultimo

var ultimo, ultimoC;

function iniciarBuffers() {

    //base

    base1 = puntosPoligono([




        0.0, -3.0, 0.0,
        4.0, -3.0, 0.0,
        0.0, -2.0, 0.0,
        3.0, -2.0, 0.0,

        0.0, -3.0, -4.0,
        4.0, -3.0, -4.0,
        0.0, -2.0, -3.0,
        3.0, -2.0, -3.0,

        0.0, -3.0, 0.0,
        0.0, -3.0, -4.0,
        4.0, -3.0, 0.0,
        4.0, -3.0, -4.0,

        0.0, -2.0, 0.0,
        0.0, -2.0, -3.0,
        3.0, -2.0, 0.0,
        3.0, -2.0, -3.0,

        0.0, -3.0, 0.0,
        0.0, -3.0, -4.0,
        0.0, -2.0, 0.0,
        0.0, -2.0, -3.0,

        4.0, -3.0, 0.0,
        4.0, -3.0, -4.0,
        3.0, -2.0, 0.0,
        3.0, -2.0, -3.0,
    ], 24)


    base1c = colorPoligono([
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0]
    ], 4, 24);

    base2 = puntosPoligono([
        0.0, -3.0, 0.0,
        0.0, -3.0, -4.0,
        0.0, -2.0, 0.0,
        0.0, -2.0, -3.0,

        -4.0, -3.0, 0.0,
        -4.0, -3.0, -4.0,
        -3.0, -2.0, 0.0,
        -3.0, -2.0, -3.0,

        0.0, -3.0, 0.0,
        0.0, -3.0, -4.0,
        -4.0, -3.0, 0.0,
        -4.0, -3.0, -4.0,

        0.0, -2.0, 0.0,
        0.0, -2.0, -3.0,
        -3.0, -2.0, 0.0,
        -3.0, -2.0, -3.0,

        0.0, -3.0, 0.0,
        -4.0, -3.0, 0.0,
        0.0, -2.0, 0.0,
        -3.0, -2.0, 0.0,

        0.0, -3.0, -4.0,
        -4.0, -3.0, -4.0,
        0.0, -2.0, -3.0,
        -3.0, -2.0, -3.0,



    ], 24)

    base2c = colorPoligono([
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0]
    ], 4, 24);


    base3 = puntosPoligono([


        0.0, -3.0, 0.0,
        0.0, -3.0, 4.0,
        0.0, -2.0, 0.0,
        0.0, -2.0, 3.0,

        -4.0, -3.0, 0.0,
        -4.0, -3.0, 4.0,
        -3.0, -2.0, 0.0,
        -3.0, -2.0, 3.0,

        0.0, -3.0, 0.0,
        0.0, -3.0, 4.0,
        -4.0, -3.0, 0.0,
        -4.0, -3.0, 4.0,

        0.0, -2.0, 0.0,
        0.0, -2.0, 3.0,
        -3.0, -2.0, 0.0,
        -3.0, -2.0, 3.0,

        0.0, -3.0, 0.0,
        -4.0, -3.0, 0.0,
        0.0, -2.0, 0.0,
        -3.0, -2.0, 0.0,

        0.0, -3.0, 4.0,
        -4.0, -3.0, 4.0,
        0.0, -2.0, 3.0,
        -3.0, -2.0, 3.0,


    ], 24)

    base3C = colorPoligono([
        [0.0, 1.0, 0.2, 1.0],
        [0.0, 1.0, 0.2, 1.0],
        [0.0, 1.0, 0.2, 1.0],
        [0.0, 1.0, 0.2, 1.0],
        [0.0, 1.0, 0.2, 1.0],
        [0.0, 1.0, 0.2, 1.0]
    ], 4, 24);



    base4 = puntosPoligono([


        //--------------
        0.0, -3.0, 0.0,
        4.0, -3.0, 0.0,
        0.0, -2.0, 0.0,
        3.0, -2.0, 0.0,

        0.0, -3.0, 4.0,
        4.0, -3.0, 4.0,
        0.0, -2.0, 3.0,
        3.0, -2.0, 3.0,

        0.0, -3.0, 0.0,
        0.0, -3.0, 4.0,
        4.0, -3.0, 0.0,
        4.0, -3.0, 4.0,

        0.0, -2.0, 0.0,
        0.0, -2.0, 3.0,
        3.0, -2.0, 0.0,
        3.0, -2.0, 3.0,

        0.0, -3.0, 0.0,
        0.0, -3.0, 4.0,
        0.0, -2.0, 0.0,
        0.0, -2.0, 3.0,

        4.0, -3.0, 0.0,
        4.0, -3.0, 4.0,
        3.0, -2.0, 0.0,
        3.0, -2.0, 3.0,

    ], 24)

    cua1_4C = colorPoligono([
        [0.4, 0.0, 0.2, 1.0],
        [0.4, 0.0, 0.2, 1.0],
        [0.4, 0.0, 0.2, 1.0],
        [0.4, 0.0, 0.2, 1.0],
        [0.4, 0.0, 0.2, 1.0],
        [0.4, 0.0, 0.2, 1.0]
    ], 4, 24);

    // ---primero
    primero1 = puntosPoligono([



        0.0, -2.0, 0.0,
        3.0, -2.0, 0.0,
        0.0, -1.0, 0.0,
        2.0, -1.0, 0.0,

        0.0, -2.0, -3.0,
        3.0, -2.0, -3.0,
        0.0, -1.0, -2.0,
        2.0, -1.0, -2.0,

        0.0, -2.0, 0.0,
        0.0, -2.0, -3.0,
        3.0, -2.0, 0.0,
        3.0, -2.0, -3.0,

        0.0, -1.0, 0.0,
        0.0, -1.0, -2.0,
        2.0, -1.0, 0.0,
        2.0, -1.0, -2.0,

        0.0, -2.0, 0.0,
        0.0, -2.0, -3.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, -2.0,

        3.0, -2.0, 0.0,
        3.0, -2.0, -3.0,
        2.0, -1.0, 0.0,
        2.0, -1.0, -2.0,


    ], 24)


    primero1C = colorPoligono([
        [0.4, 0.0, 0.2, 1.0],
        [0.4, 0.0, 0.2, 1.0],
        [0.4, 0.0, 0.2, 1.0],
        [0.4, 0.0, 0.2, 1.0],
        [0.4, 0.0, 0.2, 1.0],
        [0.4, 0.0, 0.2, 1.0]
    ], 4, 24);


    primero2 = puntosPoligono([

        0.0, -2.0, 0.0,
        0.0, -2.0, -3.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, -2.0,

        -3.0, -2.0, 0.0,
        -3.0, -2.0, -3.0,
        -2.0, -1.0, 0.0,
        -2.0, -1.0, -2.0,

        0.0, -2.0, 0.0,
        0.0, -2.0, -3.0,
        -3.0, -2.0, 0.0,
        -3.0, -2.0, -3.0,

        0.0, -1.0, 0.0,
        0.0, -1.0, -2.0,
        -2.0, -1.0, 0.0,
        -2.0, -1.0, -2.0,

        0.0, -2.0, 0.0,
        -3.0, -2.0, 0.0,
        0.0, -1.0, 0.0,
        -2.0, -1.0, 0.0,

        0.0, -2.0, -3.0,
        -3.0, -2.0, -3.0,
        0.0, -1.0, -2.0,
        -2.0, -1.0, -2.0,



    ], 24)

    primero2C = colorPoligono([
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0]
    ], 4, 24);


    primero3 = puntosPoligono([



        0.0, -2.0, 0.0,
        0.0, -2.0, 3.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 2.0,

        -3.0, -2.0, 0.0,
        -3.0, -2.0, 3.0,
        -2.0, -1.0, 0.0,
        -2.0, -1.0, 2.0,

        0.0, -2.0, 0.0,
        0.0, -2.0, 3.0,
        -3.0, -2.0, 0.0,
        -3.0, -2.0, 3.0,

        0.0, -1.0, 0.0,
        0.0, -1.0, 2.0,
        -2.0, -1.0, 0.0,
        -2.0, -1.0, 2.0,

        0.0, -2.0, 0.0,
        -3.0, -2.0, 0.0,
        0.0, -1.0, 0.0,
        -2.0, -1.0, 0.0,

        0.0, -2.0, 3.0,
        -3.0, -2.0, 3.0,
        0.0, -1.0, 2.0,
        -2.0, -1.0, 2.0,


    ], 24)

    primero3C = colorPoligono([
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0]
    ], 4, 24);



    primero4 = puntosPoligono([



        0.0, -2.0, 0.0,
        3.0, -2.0, 0.0,
        0.0, -1.0, 0.0,
        2.0, -1.0, 0.0,

        0.0, -2.0, 3.0,
        3.0, -2.0, 3.0,
        0.0, -1.0, 2.0,
        2.0, -1.0, 2.0,

        0.0, -2.0, 0.0,
        0.0, -2.0, 3.0,
        3.0, -2.0, 0.0,
        3.0, -2.0, 3.0,

        0.0, -1.0, 0.0,
        0.0, -1.0, 2.0,
        2.0, -1.0, 0.0,
        2.0, -1.0, 2.0,

        0.0, -2.0, 0.0,
        0.0, -2.0, 3.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 2.0,

        3.0, -2.0, 0.0,
        3.0, -2.0, 3.0,
        2.0, -1.0, 0.0,
        2.0, -1.0, 2.0,



    ], 24)



    primero4C = colorPoligono([
        [0.0, 1.0, 0.2, 1.0],
        [0.0, 1.0, 0.2, 1.0],
        [0.0, 1.0, 0.2, 1.0],
        [0.0, 1.0, 0.2, 1.0],
        [0.0, 1.0, 0.2, 1.0],
        [0.0, 1.0, 0.2, 1.0]
    ], 4, 24);

    //segundo
    segundo1 = puntosPoligono([


        0.0, -1.0, 0.0,
        2.0, -1.0, 0.0,
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,

        0.0, -1.0, -2.0,
        2.0, -1.0, -2.0,
        0.0, 0.0, -1.0,
        1.0, 0.0, -1.0,

        0.0, -1.0, 0.0,
        0.0, -1.0, -2.0,
        2.0, -1.0, 0.0,
        2.0, -1.0, -2.0,

        0.0, 0.0, 0.0,
        0.0, 0.0, -1.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, -1.0,

        0.0, -1.0, 0.0,
        0.0, -1.0, -2.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, -1.0,

        2.0, -1.0, 0.0,
        2.0, -1.0, -2.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, -1.0,


    ], 24)


    segundo1C = colorPoligono([
        [0.8, 0.6, 0.3, 1.0],
        [0.8, 0.6, 0.3, 1.0],
        [0.8, 0.6, 0.3, 1.0],
        [0.8, 0.6, 0.3, 1.0],
        [0.8, 0.6, 0.3, 1.0],
        [0.8, 0.6, 0.3, 1.0]
    ], 4, 24);


    segundo2 = puntosPoligono([


        0.0, -1.0, 0.0,
        0.0, -1.0, -2.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, -1.0,

        -2.0, -1.0, 0.0,
        -2.0, -1.0, -2.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, -1.0,

        0.0, -1.0, 0.0,
        0.0, -1.0, -2.0,
        -2.0, -1.0, 0.0,
        -2.0, -1.0, -2.0,

        0.0, 0.0, 0.0,
        0.0, 0.0, -1.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, -1.0,

        0.0, -1.0, 0.0,
        -2.0, -1.0, 0.0,
        0.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,

        0.0, -1.0, -2.0,
        -2.0, -1.0, -2.0,
        0.0, 0.0, -1.0,
        -1.0, 0.0, -1.0,


    ], 24)


    segundo2C = colorPoligono([
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0],
        [1.0, 1.0, 0.2, 1.0]
    ], 4, 24);




    segundo3 = puntosPoligono([


        0.0, -1.0, 0.0,
        0.0, -1.0, 2.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 1.0,

        -2.0, -1.0, 0.0,
        -2.0, -1.0, 2.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 1.0,

        0.0, -1.0, 0.0,
        0.0, -1.0, 2.0,
        -2.0, -1.0, 0.0,
        -2.0, -1.0, 2.0,

        0.0, 0.0, 0.0,
        0.0, 0.0, 1.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 1.0,

        0.0, -1.0, 0.0,
        -2.0, -1.0, 0.0,
        0.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,

        0.0, -1.0, 2.0,
        -2.0, -1.0, 2.0,
        0.0, 0.0, 1.0,
        -1.0, 0.0, 1.0,





    ], 24)

    segundo3C = colorPoligono([
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0],
        [1.0, 0.6, 0.3, 1.0]
    ], 4, 24);


    segundo4 = puntosPoligono([



        0.0, -1.0, 0.0,
        2.0, -1.0, 0.0,
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,

        0.0, -1.0, 2.0,
        2.0, -1.0, 2.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 1.0,

        0.0, -1.0, 0.0,
        0.0, -1.0, 2.0,
        2.0, -1.0, 0.0,
        2.0, -1.0, 2.0,

        0.0, 0.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 1.0,

        0.0, -1.0, 0.0,
        0.0, -1.0, 2.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 1.0,

        2.0, -1.0, 0.0,
        2.0, -1.0, 2.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 1.0,


    ], 24)

    segundo4C = colorPoligono([
        [0.4, 0.6, 0.3, 1.0],
        [0.4, 0.6, 0.3, 1.0],
        [0.4, 0.6, 0.3, 1.0],
        [0.4, 0.6, 0.3, 1.0],
        [0.4, 0.6, 0.3, 1.0],
        [0.4, 0.6, 0.3, 1.0]
    ], 4, 24);

    //tercero
    ultimo = puntosPoligono([
        0.0, 1.0, 0.0,
        -1.0, 0.0, 1.0,
        1.0, 0.0, 1.0,

        0.0, 1.0, 0.0,
        1.0, 0.0, 1.0,
        1.0, 0.0, -1.0,

        0.0, 1.0, 0.0,
        1.0, 0.0, -1.0,
        -1.0, 0.0, -1.0,

        0.0, 1.0, 0.0,
        -1.0, 0.0, -1.0,
        -1.0, 0.0, 1.0,

        1.0, 0.0, 1.0,
        -1.0, 0.0, -1.0,
        1.0, 0.0, -1.0,

    ], 15);

    ultimoC = colorPoligono([
        [0.5, 0.5, 0.5, 1.0],
        [0.5, 0.5, 0.5, 1.0],
        [0.5, 0.5, 0.5, 1.0],
        [0.5, 0.5, 0.5, 1.0]
    ], 3, 15);

}
var mvMatriz = mat4.create();
var pMatriz = mat4.create();
function modificarMatrizUniforme() {
    gl.uniformMatrix4fv(programaShader.pMatrizUniforme, false, pMatriz);
    gl.uniformMatrix4fv(programaShader.mvMatrizUniforme, false, mvMatriz);
}
function triangulo(pTriangulo, pTrianguloC, pTraslacion, pAngulo, pEjeRotacion, pEscala) {
    mat4.identity(mvMatriz);
    mat4.translate(mvMatriz, pTraslacion);
    mat4.rotate(mvMatriz, pAngulo, pEjeRotacion);
    mat4.scale(mvMatriz, pEscala);
    gl.bindBuffer(gl.ARRAY_BUFFER, pTriangulo);
    gl.vertexAttribPointer(programaShader.atribPosVertice, pTriangulo.itemTam, gl.FLOAT, false, 0, 0);
    //... Aplicando color
    gl.bindBuffer(gl.ARRAY_BUFFER, pTrianguloC);
    gl.vertexAttribPointer(programaShader.vertColorAtributo, pTrianguloC.itemTam, gl.FLOAT, false, 0, 0);
    //... Fin aplicando color
    modificarMatrizUniforme();
    gl.drawArrays(gl.TRIANGLES, 0, pTriangulo.numItems);
}
function poligono(pPoligono, pPoligonoC, pTraslacion, pAngulo, pEjeRotacion, pEscala) {
    mat4.identity(mvMatriz);
    mat4.translate(mvMatriz, pTraslacion);
    mat4.rotate(mvMatriz, pAngulo, pEjeRotacion);
    //mat4.scale(mvMatriz, pEscala);
    gl.bindBuffer(gl.ARRAY_BUFFER, pPoligono);
    gl.vertexAttribPointer(programaShader.atribPosVertice, pPoligono.itemTam, gl.FLOAT, false, 0, 0);
    //... Aplicando color
    gl.bindBuffer(gl.ARRAY_BUFFER, pPoligonoC);
    gl.vertexAttribPointer(programaShader.vertColorAtributo, pPoligonoC.itemTam, gl.FLOAT, false, 0, 0);
    //... Fin aplicando color
    modificarMatrizUniforme();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, pPoligono.numItems);
}
function poligonooo(pPoligono, pPoligonoC, pTraslacion, pAngulo, pEjeRotacion, pEscala) {
    mat4.identity(mvMatriz);
    mat4.translate(mvMatriz, pTraslacion);
    mat4.rotate(mvMatriz, pAngulo, pEjeRotacion);
    mat4.scale(mvMatriz, pEscala);
    gl.bindBuffer(gl.ARRAY_BUFFER, pPoligono);
    gl.vertexAttribPointer(programaShader.atribPosVertice, pPoligono.itemTam, gl.FLOAT, false, 0, 0);
    //... Aplicando color
    gl.bindBuffer(gl.ARRAY_BUFFER, pPoligonoC);
    gl.vertexAttribPointer(programaShader.vertColorAtributo, pPoligonoC.itemTam, gl.FLOAT, false, 0, 0);
    //... Fin aplicando color
    modificarMatrizUniforme();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, pPoligono.numItems);
}

var rotarTri = 0.0, rotarCua = 0.0, escalaCua = 0.1;



function dibujarEscena() {


    gl.viewport(0, 0, gl.puertoVistaAncho, gl.puertoVistaAlto);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4.perspective(45, gl.puertoVistaAncho / gl.puertoVistaAlto, 0.1, 100.0, pMatriz);


    setTimeout(uno, 10)
    setTimeout(dos, 5000)
    setTimeout(tres, 25000)
    setTimeout(cuatro, 32000)



    poligono(base1, base1c, [cuadradopx, 0, -20.0], 0, [1.0, 0.0, 0.0], [escalaCua, escalaCua, escalaCua]);
    poligono(base2, base2c, [cuadradonx, 0, -20.0], 0, [1.0, 0.0, 0.0], [escalaCua, escalaCua, escalaCua]);
    poligono(base3, base3C, [cuadradonx, 0, -20.0], 0, [1.0, 0.0, 0.0], [escalaCua, escalaCua, escalaCua]);
    poligono(base4, cua1_4C, [cuadradopx, 0, -20.0], 0, [1.0, 0.0, 0.0], [escalaCua, escalaCua, escalaCua]);

    poligono(primero1, primero1C, [0, cuadradoy, -20.0], rotarCua * Math.PI / 180, [0.0, 1.0, 0.0], [escalaCua, escalaCua, escalaCua]);
    poligono(primero2, primero2C, [0, cuadradoy, -20.0], rotarCua * Math.PI / 180, [0.0, 1.0, 0.0], [escalaCua, escalaCua, escalaCua]);
    poligono(primero3, primero3C, [0, cuadradoy, -20.0], rotarCua * Math.PI / 180, [0.0, 1.0, 0.0], [escalaCua, escalaCua, escalaCua]);
    poligono(primero4, primero4C, [0, cuadradoy, -20.0], rotarCua * Math.PI / 180, [0.0, 1.0, 0.0], [escalaCua, escalaCua, escalaCua]);


    poligonooo(segundo1, segundo1C, [0, tercero, -20.0], 0, [0.0, 0.0, 0.0], [escalaCua, escalaCua, escalaCua]);
    poligonooo(segundo2, segundo2C, [0, tercero, -20.0], 0, [0.0, 0.0, 0.0], [escalaCua, escalaCua, escalaCua]);
    poligonooo(segundo3, segundo3C, [0, tercero, -20.0], 0, [0.0, 0.0, 0.0], [escalaCua, escalaCua, escalaCua]);
    poligonooo(segundo4, segundo4C, [0, tercero, -20.0], 0, [0.0, 0.0, 0.0], [escalaCua, escalaCua, escalaCua]);

    triangulo(ultimo, ultimoC, [0.0, trianguloy, -20.0], rotarCua * Math.PI / 180, [0, 1, 0], [1.0, 1.0, 1.0]);


}

var cuadradoy = 12;
var trianguloy = -11;
var cuadradopx = 10;
var cuadradonx = -10;
var tercero = 12;



var ultimoTiempo = 0, signo = 1;
var girosCuadrado = 0;
var limiteGiros = 2;
var escalaCuadrado = 0;
var limiteEscala = 19;


function animacion() {
    var tiempoAhora = new Date().getTime();
    if (ultimoTiempo != 0) {
        var lapso = tiempoAhora - ultimoTiempo;
        rotarTri += (50 * lapso) / 5000.0;
        rotarCua += (150 * lapso) / 5000.0;
        escalaCua += signo * (0.5 * lapso) / 1000.0;
    }

    if (rotarCua >= 360) {
        rotarCua = 0;
        girosCuadrado++;
    }
    if (rotarTri >= 360)
        rotarTri = 0;

    if (rotarCua >= 360)
        rotarCua = 0;

    if (escalaCua >= 1.0 || escalaCua <= 0.1) {
        signo = signo * (-1);
        escalaCuadrado++;
    }



    if (girosCuadrado >= limiteGiros) {
        rotarCua = 359;
    }
    if (escalaCuadrado >= limiteEscala) {
        escalaCua = 1.0;
    }
    ultimoTiempo = tiempoAhora;
}

function uno() {
    if (cuadradopx >= 0) {
        cuadradopx -= 0.04;
    }
    if (cuadradonx <= 0) {
        cuadradonx += 0.04;
    }
}

function dos() {
    if (cuadradoy >= 0) {
        cuadradoy -= 0.02;
    }
}
function tres() {
    if (tercero >= 0) {
        tercero = 0
    }
}
function cuatro() {
    if (trianguloy <= 0) {
        trianguloy += 0.03;
    }
}

function mover() {
    dibujarEscena();
    animacion();
    requestAnimFrame(mover);
}


function webGLEjecutar() {
    var canvas = document.getElementById("leccion03-3D");
    iniciarGL(canvas);
    iniciarShaders();
    iniciarBuffers();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    mover();
}

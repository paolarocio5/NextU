var calculadora = {
	
	vista: document.getElementById("display"),
	valorVista: "0",
	operacion: "",
	num1: 0,
	num2: 0,
	ultimoValor: 0,
	resultado: 0,
	teclaIgual: false, // Para permitir ingreso consecutivo
	
	init: (function(){
		this.funcionFormatoBotones(".tecla");
		this.funcionEventos();
	}),
	
	
	funcionFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoAchicaBoton;
			x[i].onmouseleave = this.eventoVuelveBoton;
		};
	},

	eventoAchicaBoton: function(event){
		calculadora.AchicaBoton(event.target);
	},

	eventoVuelveBoton: function(event){
		calculadora.AumentaBoton(event.target);
	},
	
	AchicaBoton: function(elemento){
		console.log(elemento)
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},
	
	AumentaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},

	funcionEventos: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarVisor();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},
	
	borrarVisor: function(){ 

	    this.valorVista = "0";
		this.operacion = "";
		this.num1 = 0;
		this.num2 = 0;
		this.resultado = 0;
		this.Operación = "";
		this.teclaIgual = false;
		this.ultimoValor = 0;
		this.updateVista();
	},
	
	cambiarSigno: function(){
		if (this.valorVista !="0") {
			var aux;
			if (this.valorVista.charAt(0)=="-") {
				aux = this.valorVista.slice(1);
			}	else {
				aux = "-" + this.valorVista;
			}
		this.valorVista = "";
		this.valorVista = aux;
		this.updateVista();
		}
	},
	
	ingresoDecimal: function(){
		if (this.valorVista.indexOf(".")== -1) {
			if (this.valorVista == ""){
				this.valorVista = this.valorVista + "0.";
			} else {
				this.valorVista = this.valorVista + ".";
			}
			this.updateVista();
		}
	},
	
	ingresoNumero: function(valor){
		if (this.valorVista.length < 8) {
		
			if (this.valorVista=="0") {
				this.valorVista = "";
				this.valorVista = this.valorVista + valor;
			} else {
				this.valorVista = this.valorVista + valor;
			}
		this.updateVista();
		}
	},
	
	ingresoOperacion: function(oper){
		this.num1 = parseFloat(this.valorVista);
		this.valorVista = "";
		this.operacion = oper;
		this.teclaIgual = false;
		this.updateVista();
	},
	
	verResultado: function(){ 

		if(!this.teclaIgual){ 
			this.num2 = parseFloat(this.valorVista);
			this.ultimoValor = this.num2;
		
			this.realizarOperacion(this.num1, this.num2, this.operacion);
		
		} else { 
		this.realizarOperacion(this.resultado, this.ultimoValor, this.operacion);
		}
	
		this.num1 = this.resultado;
	
		this.valorVista = "";

		if (this.resultado.toString().length < 9){
			this.valorVista = this.resultado.toString();
		} else {
			this.valorVista = this.resultado.toString().slice(0,8) + "...";
		}

		this.teclaIgual = true;		
		this.updateVista();
	
	},
	
	realizarOperacion: function(num1, num2, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(num1 + num2);
			break;
			case "-": 
				this.resultado = eval(num1 - num2);
			break;
			case "*": 
				this.resultado = eval(num1 * num2);
			break;
			case "/": 
				this.resultado = eval(num1 / num2);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(num1));
		}
	},
	
	updateVista: function(){
		this.vista.innerHTML = this.valorVista;
	}
	
};

calculadora.init();
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('form-sorteador').addEventListener('submit', function(evento){
        evento.preventDefault(); //Removendo o comportamento padrão do site recarregar a página ao enviar
        let numero_maximo = document.getElementById('numero-maximo').value;
        numero_maximo = parseInt(numero_maximo);

        let numero_aleatorio = Math.random() * numero_maximo; //a função do JS que obtém um número aleatório ( o número originalmente é entre 0 e 1)
        numero_aleatorio = Math.floor(numero_aleatorio+1); //transformando o número em inteiro e colocando +1 para o número nunca ser 0 (o floor serve para arredondar o número sempre para baixo)
        document.getElementById('resultado-valor').innerText = numero_aleatorio;
        document.querySelector('.resultado').style.display='block';
    })
})
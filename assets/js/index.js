document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById('form--idade');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputData = document.getElementById('dataNascimento');
        const containerRes = document.getElementById('res');

        const dataNascimento = new Date(inputData.value + 'T00:00:00');
        const dataAtual = new Date();

        if(inputData.value == "" || dataNascimento > dataAtual) {
            containerRes.innerHTML = exibeMensagem(0, "msg--fracasso");             
            return;       
        };
        
        const resultado = calcularIdade(dataAtual, dataNascimento);
        containerRes.innerHTML = exibeMensagem(resultado, "msg--sucesso");

        const totalDeDias = totalDeDiasVividos(dataAtual, dataNascimento);
        containerRes.innerHTML += exibeMensagem(totalDeDias, "msg--vividos");

    });

    function calcularIdade(dataAtual, dataNascimento) {
        let anoNascimento = dataNascimento.getFullYear();
        let mesNascimento = dataNascimento.getMonth();
        let diaNascimento = dataNascimento.getDate();
        
        let anoAtual = dataAtual.getFullYear();
        let mesAtual = dataAtual.getMonth();
        let diaAtual = dataAtual.getDate();      
        
        if(diaAtual < diaNascimento) {
            mesAtual--;

            const diasAnteriores = new Date(anoNascimento, mesNascimento + 1, 0).getDate();
            diaAtual += diasAnteriores;
        };        

        if(mesAtual < mesNascimento) {
            anoAtual--;
            mesAtual += 12;
        }   

        let dia = diaAtual - diaNascimento;
        let mes = mesAtual - mesNascimento;        
        let ano = anoAtual - anoNascimento;

        return {ano: ano, mes: mes, dia: dia};
    }

    function totalDeDiasVividos(dataAtual, dataNascimento) {
        const diferencaEmMilissegundos = dataAtual.getTime() - dataNascimento.getTime();

        const milissigundosPorDia = 1000 * 60 * 60 * 24;

        const resultado = Math.floor(diferencaEmMilissegundos / milissigundosPorDia);

        return resultado;
    }

    function exibeMensagem(obj, tipoMensagem) {
        if(tipoMensagem === "msg--fracasso"){
            return `
                <div class="container--fracasso container--aviso">
                    <p>Por favor, insira a sua data de nascimento.</p>
                </div>
            `; 
        }
        else if(tipoMensagem === "msg--sucesso") {
            return `
                <div class="container--sucesso container--aviso">
                    <p>Você tem ${obj.ano} anos, ${obj.mes} meses e ${obj.dia} dias.</p>
                </div>
            `
        }
        else if(tipoMensagem === "msg--vividos") {
            return `
                <div class="container--sucesso container--aviso">
                    <p>Você viveu ${obj} dias até agora!</p>
                </div>
            `;
        };
    };
});

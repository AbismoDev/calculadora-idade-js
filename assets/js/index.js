document.addEventListener('DOMContentLoaded', () =>{
    console.log("Conteúdo carregado!");

    // Vamos pegar o clique do botão do form
    const form = document.getElementById('form--idade');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Temos que pegar o valor do input data;
        const inputData = document.getElementById('dataNascimento');
        const containerRes = document.getElementById('res');

        const dataNascimento = new Date(inputData.value + 'T00:00:00');
        const dataAtual = new Date();

        if(inputData.value == "" || dataNascimento > dataAtual) {
            containerRes.innerHTML = `
                <div class="container--warning container--aviso">
                    <p>Por favor, insira a sua data de nascimento.</p>
                </div>
            `;              
            return;       
        };
        
        let anoNascimento = dataNascimento.getFullYear();
        let mesNascimento = dataNascimento.getMonth();
        let diaNascimento = dataNascimento.getDate();
        
        let anoAtual = dataAtual.getFullYear();
        let mesAtual = dataAtual.getMonth();
        let diaAtual = dataAtual.getDate();      
        
        // Calculo de idade
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

        containerRes.innerHTML = `
            <div class="container--resultado container--aviso">
                <p>Você tem ${ano} anos, ${mes} meses e ${dia} dias.</p>
            </div>
        `;

        // Total Dias vividos
        const diferencaEmMilissegundos = dataAtual.getTime() - dataNascimento.getTime();

        const milissigundosPorDia = 1000 * 60 * 60 * 24;

        const totalDeDias = Math.floor(diferencaEmMilissegundos / milissigundosPorDia);

        console.log("Total de dias vividos: " + totalDeDias);

    });
});
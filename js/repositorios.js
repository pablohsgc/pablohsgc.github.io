const elSelectTopico = document.querySelector("#select-topico-repositorio");
const elListaRepositorios = document.querySelector("#lista-repositorios");

var repositorios_git;

fetch("https://api.github.com/users/pablohsgc/repos",{
    method:'GET',
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json())
.then((json) =>{
    repositorios_git = json;
    listaRepositorios(repositorios_git);
})

function listaDeTopicos(topicos){
    let lista = "";

    for(let i = 0; i < topicos.length-1; i++){
        lista += `<span class="topico-repositorio">${topicos[i]},</span>`;
    }

    lista +=  `<span class="topico-repositorio">${topicos[topicos.length-1]}.</span>`;

    return lista;
}

/*function criaElementoRepositorio(repositorio){
    return`
        <article class="repositorio">
            <header class="cabecalho-repositorio">
                <h3 class="titulo-repositorio">${repositorio.name}</h3>
            </header>
            <div class="descricao-repositorio">${repositorio.description}</div>
            <div class="lista-topicos">
                <strong>Topicos: </strong>${listaDeTopicos(repositorio.topics)}
            </div>
            <div>
                <a href="${repositorio.html_url}" class="link-repositorio">Ver repositório</a>
            </div>
        </article>
    `;
}*/

function criaElementoRepositorio(repositorio){
    return`
        <article class="repositorio">
            <header class="cabecalho-repositorio">
                <h3 class="titulo-repositorio">${repositorio.name}</h3>
            </header>
            <div class="descricao-repositorio">${repositorio.description}</div>
            <div class="topicos-e-url">
                <div class="topicos">
                <strong>Topicos: </strong>${listaDeTopicos(repositorio.topics)}
                </div>
                <div class="referencia">
                    <a href="${repositorio.html_url}">
                        <i class="fab fa-github icone-git-repositorio"></i>
                    </a>
                </div>
            </div>
        </article>
    `;
}

function listaRepositorios(repositorios){
    let lista = "";

    for(repositorio of repositorios){
        lista += criaElementoRepositorio(repositorio);
    }

    elListaRepositorios.innerHTML = lista;
}

elSelectTopico.addEventListener('change', () => {
    let topico = elSelectTopico.options[elSelectTopico.selectedIndex].value;

    if(topico === "todos"){
        listaRepositorios(repositorios_git);
    }else{
        let repositorios =  repositorios_git.filter(
                                repositorio => repositorio.topics.find(
                                    elemento => elemento === topico
                                )
                            );
        
        listaRepositorios(repositorios);
    }

})
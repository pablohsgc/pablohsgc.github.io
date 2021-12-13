fetch("https://api.github.com/users/pablohsgc/repos",{
    method:'GET',
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json())
.then((json) =>{
    console.log(json)
    lista_repositorios(json)
}).catch((erro) =>{
    console.log(erro)
})

function lista_repositorios(lista){
    let repositorios = "";
    
    for(json of lista){
        let nome = '<header class="nome-repositorio"><h3>' + json.name + '</header></div>';
        let descricao = '<div class="descricao-repositorio"><p>' + json.description + '</p></div>';
        let url = '<div class="url-repositorio">' + '<div class="btn-site"><a href='+json.html_url+'>' + 'Acesse aqui!' + '</a></div></div>';

        let repositorio = '<article class="repositorio">' + nome + descricao + url + '</article>';

        repositorios += repositorio;
    }

    document.querySelector(".catalogo-repositorios").innerHTML = repositorios;
}
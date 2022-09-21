const TAMANHO_TABELA = 5

let tabelas = []

async function carregarDados() {
    await fetch('./json/dados.json')
        .then(response => response.json())
        .then(jsonData => {
            for (item in jsonData) {
                tabelas.push(jsonData[item])
            }
        })
}

function carregarTabela(periodo) {
    let a, b
    if (periodo == '2000') {
        a = tabelas[0]
        b = tabelas[2]
    } else {
        a = tabelas[1]
        b = tabelas[3]
    }

    let tabela = document.createElement('table')
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')
    let caption = document.createElement('caption')
    let titulo = document.createElement('tr')
    
    tabela.setAttribute('class', 'table table-bordered table-dark table-hover')

    caption.innerHTML = periodo == '2000'? 'Anos 2000' : 'Todos os anos'
    tabela.appendChild(caption)

    let l1 = document.createElement('th')
    let l2 = document.createElement('th')
    let l3 = document.createElement('th')
    let l4 = document.createElement('th')
    let l5 = document.createElement('th')

    l1.innerHTML = 'Ranking Brasil'
    l2.innerHTML = 'Nome'
    l3.innerHTML = 'Frequência Brasil'
    l4.innerHTML = 'Ranking Tocantins'
    l5.innerHTML = 'Frequência Tocantins'

    titulo.appendChild(l1)
    titulo.appendChild(l2)
    titulo.appendChild(l3)
    titulo.appendChild(l4)
    titulo.appendChild(l5)
    thead.appendChild(titulo)

    for (let i = 0; i < TAMANHO_TABELA; i++) {
        let linha = document.createElement('tr')

        let l1 = document.createElement('th')
        let l2 = document.createElement('th')
        let l3 = document.createElement('th')
        let l4 = document.createElement('th')
        let l5 = document.createElement('th')

        
        l1.innerHTML = i+1
        l2.innerHTML = a[i].nome
        l3.innerHTML = a[i].frequencia
        
        for (item in b) {
            if (b[item].nome == a[i].nome) {
                l4.innerHTML = parseInt(item)+1
                l5.innerHTML = b[item].frequencia
                break
            }
        }

        linha.appendChild(l1)
        linha.appendChild(l2)
        linha.appendChild(l3)
        linha.appendChild(l4)
        linha.appendChild(l5)
        tbody.appendChild(linha)
    }
    tabela.appendChild(thead)
    tabela.appendChild(tbody)
    return tabela
}

async function init() {
    await carregarDados()

    let root = document.getElementById('root')
    let container = document.createElement('div')
    let row = document.createElement('div')
    let col = document.createElement('div')

    container.setAttribute('class', 'container')
    row.setAttribute('class', 'row')
    col.setAttribute('class', 'col-md-12')

    let tabela_todos_os_anos = carregarTabela()
    let tabela_anos_2000 = carregarTabela('2000')

    col.appendChild(tabela_todos_os_anos)
    col.appendChild(tabela_anos_2000)

    row.appendChild(col)
    container.appendChild(row)
    root.appendChild(container)
}

document.addEventListener('DOMContentLoaded', init)
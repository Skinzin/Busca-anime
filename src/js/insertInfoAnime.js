import { getAnimeKitsu, Status } from "../utils/fetch/kitsu.js";

const month = ["Janeiro", "Feveiro", "Março", "Abril", "Maior", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ]

const getParams = new URLSearchParams(window.location.search);

// window.addEventListener("load", insertInfos)

async function insertInfos() {    
    const anime = await getAnimeKitsu(getParams.get("anime"));

    if(anime == undefined) {
        return alert("Ops! Não foi possível achar nenhum anime com este nome.. Tente novamente!")
    }

    if(anime.nsfw) return alert("Para visualizar animes NSFW, você precisa primeiro logar em sua conta..")

    const hours = Math.floor(anime.totalLength / 60);

    /* Get Elements */

    const getCoverImg = document.getElementById("coverImage"),
          getCapa = document.getElementById("capa"),
          getTitle = document.getElementById("title"),
          getDescription = document.getElementById("description"),
          getSituation = document.getElementById("situation");


    getCoverImg.src = anime.coverImage.original;
    getCapa.src = anime.posterImage.original;
    getTitle.innerHTML = `${anime.titles.en || anime.titles.en_jp} ${!anime.titles.en ? "" : `(${anime.titles.en_jp})`}`;
    getDescription.innerHTML = anime.description;
    
    [anime].map(({status, startDate, endDate, episodeCount, episodeLength, totalLength}) => {
        getSituation.innerHTML = `
            <div>
                <span class="subTitle">Status:</span>
                <span class="${status == "finished" ? "ok" : "progress"}">${Status[anime.status]}</span>
            </div>

            <div>
                <span class="subTitle">Data de Inicio:</span>
                <span>${new Date(startDate).getDate() + 1} de ${month[new Date(startDate).getMonth()]}, ${new Date(startDate).getFullYear()}</span>
            </div>

            <div>
                <span class="subTitle">Data de termino:</span>
                <span ${endDate ? "" : 'class="progress"'}>${endDate ? `${new Date(endDate).getDate() + 1} de ${month[new Date(endDate).getMonth()]}, ${new Date(endDate).getFullYear()}` : "Em progresso.."}</span>
            </div>

            <div>
                <span class="subTitle">Episodios:</span>
                <span>${episodeCount}</span>
            </div>

            <div>
                <span class="subTitle">Duração:</span>
                <span>${episodeLength} Minutos p/ Episodio (Total de: ${hours} Horas, ${totalLength % 60} Minutos)</span>
            </div>
        `
    })
}
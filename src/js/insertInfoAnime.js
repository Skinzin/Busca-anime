import { getAnimeKitsu, Status } from "../utils/fetch/kitsu";

document.getElementById("btnSearch").addEventListener("click", );
// document.getElementById("btnSearch").addEventListener("sea", );


async function insertInfos() {
    const anime = await getAnimeKitsu("Spy X Family");

    if(anime == undefined) {
        return alert("Ops! Não foi possível achar nenhum anime com este nome.. Tente novamente!")
    }

    if(anime.nsfw) return alert("Para visualizar animes NSFW, você precisa primeiro logar em sua conta..")

    const hours = Math.floor(anime.totalLength / 60);
}

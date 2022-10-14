
/**
 * @param { String } anime Anime name.
 */

export const getAnimeKitsu = async (anime) => {
    const res = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${anime.replace(/" "/g, "%20")}&page[limit]=1`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "application/json",
        }
    })

    const data = await res.json();
    return data.data[0] ?.attributes || undefined;
}

export const Status = {
    "current": "Em progresso.",
    "finished": "Concluído."
}
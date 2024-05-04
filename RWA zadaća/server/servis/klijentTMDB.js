const fetch = require('node-fetch');
const Baza = require('./baza.js');

class TMDBklijent {
    bazicniURL = "http://api.themoviedb.org/3";

    constructor(apiKljuc){
       this.apiKljuc = apiKljuc;
       this.baza = new Baza("mdesanic21_baza.sqlite");
    }

    async dohvatiSeriju(id){
       let resurs = "/tv/"+id;
       let odgovor = await this.obaviZahtjev(resurs);
       console.log(odgovor);
       return odgovor;
    }

     async pretraziSerijePoNazivu(trazi,stranica){
       let resurs = "/search/tv";
       let parametri = {sort_by: "popularity.desc",
                        include_adult: false,
                        page: stranica,
                        query: trazi};

       let odgovor = await this.obaviZahtjev(resurs,parametri);
       return odgovor;
    }

    async pretraziSerijePoKljucnimRijecima(rijeci,stranica){
       let resurs = "/discover/tv";
       let parametri = {sort_by: "popularity.desc",
                        include_adult: false,
                        include_video: false,
                        page: stranica,
                        with_keywords: await this.dajKljucneRijeci(rijeci)};
      let odgovor = await this.obaviZahtjev(resurs,parametri);
       return odgovor;
    }

    async dajKljucneRijeci(rijeci){
         let resurs = "/search/keyword";
         let odgovor = "";
         if(rijeci=="") return odgovor;
         let prva = true;
         for(let rijec of rijeci.split(",")){
            let parametri = {query: rijec, page: 1}
            let o = await this.obaviZahtjev(resurs,parametri);
            let r = JSON.parse(o);
            if (r.results.length == 0) return "0";

            console.log(r)
            if(prva){
               odgovor += r.results[0].id
               prva = false;
            } else
               odgovor += ","+r.results[0].id
         }
        console.log(odgovor)

         return odgovor;
    }

    async obaviZahtjev(resurs,parametri=""){
        let zahtjev = this.bazicniURL+resurs+"?api_key="+this.apiKljuc;
        for(let p in parametri){
            zahtjev+="&"+p+"="+parametri[p];
        }
        console.log(zahtjev);
        let odgovor = await fetch(zahtjev);
        let rezultat = await odgovor.text();
        return rezultat;
    }
}

module.exports = TMDBklijent;

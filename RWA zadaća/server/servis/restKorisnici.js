const KorisnikDAO = require("./korisniciDAO.js");
const Konfiguracija = require ("../konfiguracija.js");
const jwt = require("../moduli/jwt.js");
const { kreirajSHA256 } = require("../moduli/kodovi.js");
const recaptcha = require("../moduli/recaptcha.js");
const github = require("../moduli/github.js");

exports.getKorisnici = async function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let kdao = new KorisnikDAO();
    try {
        if(!zahtjev.headers.authorization){
            console.log("Nema tokena!");
            odgovor.status(404).json({ greska: 'Nema resursa!'});
        }
        else{
            const token = zahtjev.headers.authorization;
            const korime = jwt.dajTijelo(token).Korime;
            if(korime != "admin"){
                odgovor.status(401);
                odgovor.send(JSON.stringify({ greska: "Zabranjen pristup!" }));
            }
            else{
                let korisnici = await kdao.dajSve();
                odgovor.status(200);
                odgovor.send(JSON.stringify(korisnici));
            }
        }
    } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika iz baze:', error);
        odgovor.status(500).json({ greska: 'Greška prilikom dohvaćanja korisnika iz baze' });
    }
};

exports.postKorisnici = async function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    try {
        if(!zahtjev.headers.authorization){
            console.log("Nema tokena!");
        }
        else{
        const token = zahtjev.headers.authorization;
        const korime = jwt.dajTijelo(token).Korime;
        if(korime != "admin"){
            odgovor.status(401);
            odgovor.send(JSON.stringify({ greska: "Zabranjen pristup!" }));
        }
        else{
            let konf = new Konfiguracija();
            await konf.ucitajKonfiguraciju();

            let secret = konf.dajKonf().tajniKljucCaptcha;
            let provjera = await recaptcha.provjeriRecaptchu(zahtjev.body.token, secret);

            // provjera reCaptche
            if(!provjera){
                console.log("Status reCaptche:", provjera);
                odgovor.status(401);
                odgovor.send(JSON.stringify({ greska: "ReCaptcha nije uspjela.!" }));
            }else {
                kdao.dodaj(podaci).then((poruka) => {
                odgovor.send(JSON.stringify(poruka)).status(201);
            });
        }
        }
    }
    } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika iz baze:', error);
        odgovor.status(500).json({ greska: 'Greška prilikom dohvaćanja korisnika iz baze' });
    }
}

exports.getKorisniciKorime = async function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let kdao = new KorisnikDAO();
    try {
        if(!zahtjev.headers.authorization){
            console.log("Nema tokena!");
            odgovor.status(404).json({ greska: 'Nema resursa!'});
        }
        else{
            const token = zahtjev.headers.authorization;
            if(!jwt.dajTijelo(token).Korime){
                console.log("Nema validnog tokena!");
                odgovor.status(404).json({ greska: 'Nema resursa!'});
            }
            else{
                let korisnik = await kdao.daj(zahtjev.params.korime);
                odgovor.status(200);
                odgovor.send(JSON.stringify(korisnik));
            }
        }
    } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika iz baze:', error);
        odgovor.status(500).json({ greska: 'Greška prilikom dohvaćanja korisnika iz baze' });
    }
};

exports.postKorisniciKorime = function (zahjev, odgovor){
    odgovor.type("application/json");
    odgovor.status(405).json({ status : "zabranjeno"});
};

exports.putKorisniciKorime = async function (zahtjev, odgovor){
    odgovor.type("application/json");
    odgovor.status(201);
    let podaci = zahtjev.body;
    let korime = zahtjev.params.korime;
    let kdao = new KorisnikDAO;
    try {
        if(!zahtjev.headers.authorization){
            console.log("Nema tokena!");
            odgovor.status(404).json({ greska: 'Nema resursa!'});
        }
        else{
            const token = zahtjev.headers.authorization;
            if(!jwt.dajTijelo(token).Korime){
                console.log("Nema validnog tokena!");
                odgovor.status(404).json({ greska: 'Nema resursa!'});
            }
            let konf = new Konfiguracija();
                await konf.ucitajKonfiguraciju();

                let secret = konf.dajKonf().tajniKljucCaptcha;
                let provjera = await recaptcha.provjeriRecaptchu(zahtjev.body.token, secret);

                // provjera reCaptche
            if(!provjera){
                console.log("Status reCaptche:", provjera);
                odgovor.status(401);
                odgovor.send(JSON.stringify({ greska: "ReCaptcha nije uspjela.!" }));
            }else {
                kdao.azuriraj(korime, podaci)
                .then((korisnici) => {
                console.log(korisnici);
                odgovor.send(JSON.stringify(korisnici));
                })
                .catch((greska) => {
                console.error('Došlo je do greške prilikom ažuriranja korisnika:', greska);
                odgovor.status(500).send('Došlo je do greške prilikom ažuriranja korisnika.');
                });
            }
        }
    } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika iz baze:', error);
        odgovor.status(500).json({ greska: 'Greška prilikom dohvaćanja korisnika iz baze' });
    }
};

exports.deleteKorisniciKorime = function (zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(201);
    let korime = zahtjev.params.korime;
    let kdao = new KorisnikDAO;
    try {
        if(!zahtjev.headers.authorization){
            console.log("Nema tokena!");
            odgovor.status(404).json({ greska: 'Nema resursa!'});
        }
        else{
            const token = zahtjev.headers.authorization;
            if(!jwt.dajTijelo(token).Korime){
                console.log("Nema validnog tokena!");
                odgovor.status(404).json({ greska: 'Nema resursa!'});
            }
            else{
                kdao.obrisi(korime).then((korisnici)=>{
                    console.log(korisnici);
                    odgovor.send(JSON.stringify(korisnici));
                })
            }
        }
    } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika iz baze:', error);
        odgovor.status(500).json({ greska: 'Greška prilikom dohvaćanja korisnika iz baze' });
    }
}

exports.getKorisnikPrijava = async function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let kdao = new KorisnikDAO();
    let korime = zahtjev.params.korime;
    try {

        let korisnik = await kdao.daj(korime);

        if (korisnik != null) {
            if (zahtjev.session.korisnik != null) {
                zahtjev.session.korisnik = korisnik.Ime + " " + korisnik.Prezime;
                zahtjev.session.korime = korime;

                let konf = new Konfiguracija();
                await konf.ucitajKonfiguraciju();

                const token = zahtjev.headers.authorization;

                odgovor.status(201).send(`Authorization: ${token}`);
            } else {
                odgovor.status(401).json({ greska: 'Zabranjen pristup' });
            }
        } else {
            odgovor.status(404).json({ greska: 'Korisnik nije pronađen' });
        }
    } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika iz baze:', error);
        odgovor.status(500).json({ greska: 'Greška prilikom dohvaćanja korisnika iz baze' });
    }
};

exports.postKorisnikPrijava = async function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let kdao = new KorisnikDAO();
    let korime = zahtjev.params.korime;

    try {
        let korisnik = await kdao.daj(korime);
        console.log("Podaci korisnika: ", korisnik);
        let lozinka = kreirajSHA256(zahtjev.body.lozinka);
        let konf = new Konfiguracija();
        await konf.ucitajKonfiguraciju();

        let secret = konf.dajKonf().tajniKljucCaptcha;
        let provjera = await recaptcha.provjeriRecaptchu(zahtjev.body.token, secret);

        // provjera reCaptche
        if(!provjera){
            console.log("Status reCaptche:", provjera);
            odgovor.status(401);
            odgovor.send(JSON.stringify({ greska: "ReCaptcha nije uspjela.!" }));
        }else {
        if (korisnik != null && korisnik.Lozinka == lozinka) {
            zahtjev.session.korisnik = korisnik.Ime + " " + korisnik.Prezime;
            zahtjev.session.korime = korime;
            const token = jwt.kreirajToken(korisnik, konf.dajKonf().jwtTajniKljuc);

            odgovor.setHeader('Authorization', `Bearer ${token}`);
            odgovor.status(201);
            odgovor.send({ korisnik });
        }
        else {
            odgovor.status(401);
            odgovor.send(JSON.stringify({ greska: "Krivi podaci!" }));
        }
    }
    } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika iz baze:', error);
        odgovor.status(500).json({ greska: 'Greška prilikom dohvaćanja korisnika iz baze' });
    }
};



exports.githubPrijava = async function(zahtjev,odgovor)  {
    let konf = new Konfiguracija();
    await konf.ucitajKonfiguraciju();

    let clientID = konf.dajKonf().githubClientID;

	let url = github.dajGithubAuthURL("http://localhost:12000/baza/githubPovratno", clientID);
    console.log("GitHub URL: ", url);
	odgovor.status(200).send(url.toString());
}

exports.githubPovratno = async function(zahtjev,odgovor){
    let konf = new Konfiguracija();
    await konf.ucitajKonfiguraciju();

    let clientID = konf.dajKonf().githubClientID;
    let secret = konf.dajKonf().githubTajniKljuc;

	console.log(zahtjev.query);
	let token = await github.dajAccessToken(zahtjev.query.code, clientID, secret);
    console.log("github token", token);
	zahtjev.session.githubToken = token;

    let korisnik = await github.provjeriToken(token);
    let korisnikJSON = JSON.parse(korisnik);
    let korime = korisnikJSON.login;

    const jwtToken = jwt.kreirajTokenGIT(korime, konf.dajKonf().jwtTajniKljuc);

    odgovor.setHeader('Authorization', `Bearer ${jwtToken}`);
    odgovor.status(201);
    zahtjev.session.korime = korime;
    odgovor.redirect('/');
}

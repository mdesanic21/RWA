import express from 'express';
import path from 'path';
import sesija from 'express-session'
import Konfiguracija from './konfiguracija.js';
import cors from "cors";
import restKorisnici from './servis/restKorisnici.js';
import RestTMDB from './servis/restTMDB.js';



const server = express();
const port = 12000;
const putanjaDoKonfiguracije = process.argv[2];
server.use(cors(
    {
      origin: "http://localhost:12000/",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
    );
    server.use((zahtjev, odgovor, nastavi) => {
      odgovor.setHeader("Access-Control-Allow-Origin", "http://localhost:12000");
      odgovor.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
      odgovor.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
      odgovor.setHeader("Access-Control-Expose-Headers", "Authorization");
      odgovor.setHeader("Access-Control-Allow-Credentials", true);
      nastavi();

    });
server.use(express.static("./angular"))

const angularRoutesRegex = /^(?!\/(baza)).*$/;

server.get(angularRoutesRegex, (req, res) => {
  res.sendFile('index.html', { root: "./angular" });
});


let konf = new Konfiguracija();


function pokreniServer(){
    server.use(express.urlencoded({ extended: true }));
	server.use(express.json());
    server.use(
		sesija({
			secret: konf.dajKonf().jwtTajniKljuc,
			saveUninitialized: true,
			cookie: { maxAge: 1000 * 60 * 60 * 3 },
			resave: false,
		})
	);

	pripremiPutanjeKorisnik();
	pripremiPutanjeTMDB();
	//pripremiPutanjePocetna();
	//pripremiAutentifikaciju();

	server.use((zahtjev, odgovor) => {
		odgovor.status(404);
		odgovor.json({ opis: "nema resursa" });
	});

    server.listen(port, () => {
      console.log(`Server pokrenut na portu: ${port}`);
   });
};

konf
	.ucitajKonfiguraciju()
	.then(pokreniServer)
	.catch((greska) => {
		console.log(greska);
		if (process.argv.length == 2) {
			console.error("Molim unesite naziv datoteke!");
		} else {
			console.error("Naziv datoteke nije dobar: " + greska.path);
		}
	});


	function pripremiPutanjeKorisnik() {
		server.get("/baza/korisnici", restKorisnici.getKorisnici);
		server.post("/baza/korisnici", restKorisnici.postKorisnici);
		server.get("/baza/korisnici/:korime/prijava", restKorisnici.getKorisnikPrijava);
		server.post("/baza/korisnici/:korime/prijava",restKorisnici.postKorisnikPrijava);
		server.get("/baza/korisnici/:korime", restKorisnici.getKorisniciKorime);
		server.post("/baza/korisnici/:korime", restKorisnici.postKorisniciKorime);
		server.put("/baza/korisnici/:korime", restKorisnici.putKorisniciKorime);
		server.delete("/baza/korisnici/:korime", restKorisnici.deleteKorisniciKorime);
		server.get('/baza/githubPrijava',restKorisnici.githubPrijava);
		server.get('/baza/githubPovratno',restKorisnici.githubPovratno);
		server.get('/baza/getSesija', (zahtjev, odgovor) => {
			console.log(zahtjev.session);
			const korime = zahtjev.session.korime;
			console.log("korime", korime);
			odgovor.send(korime);
		})
		server.get('/baza/odjava', (zahtjev, odgovor) =>{
			delete zahtjev.session.korime;
			delete zahtjev.session.korisnik;
			zahtjev.session.save((err) => {
				if (err) {
				  console.error('Error saving session:', err);
				  odgovor.status(500).send('Internal Server Error');
				} else {
				  console.log('Odjavljen!', zahtjev.session);
				  odgovor.status(200).send('Logged out successfully');
				}
			  });
		})
	}

	function pripremiPutanjeTMDB() {
		let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
		server.get("/baza/tmdb/serije", cors(), restTMDB.getSerije.bind(restTMDB));
		server.get("/baza/tmdb/serije/:id", cors(), restTMDB.getSerija.bind(restTMDB));
	}
	/*
	function pripremiPutanjePocetna(){
		let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
		let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);
		server.get("/", htmlUpravitelj.pocetna.bind(htmlUpravitelj));
		server.post("/",htmlUpravitelj.pocetna.bind(htmlUpravitelj));
	}

	function pripremiAutentifikaciju(){
		let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
		let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);
		server.get("/registracija", htmlUpravitelj.registracija.bind(htmlUpravitelj));
		server.post("/registracija", htmlUpravitelj.registracija.bind(htmlUpravitelj));
		server.get("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
		server.post("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
		server.get("/getJWT", fetchUpravitelj.getJWT.bind(fetchUpravitelj));
	}*/
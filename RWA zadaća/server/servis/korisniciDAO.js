const { kreirajSHA256 } = require("../moduli/kodovi.js");
const Baza = require("./baza.js");

class KorisnikDAO {

	constructor() {
		this.baza = new Baza("mdesanic21_baza.sqlite");
	}

    dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnici;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}
	dodaj = async function (korisnik) {
		console.log(korisnik)
		let sql = `INSERT INTO Korisnici (Ime,Prezime,Lozinka,Email,Kor_ime,ID_Vrsta_korisnika) VALUES (?,?,?,?,?,"2")`;
		let lozinka = kreirajSHA256(korisnik.lozinka);
        let podaci = [korisnik.ime, korisnik.prezime, lozinka, korisnik.email, korisnik.korime];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
	daj = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnici WHERE kor_ime=?;";
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else
			return null;
	}
	azuriraj = async function (korime, korisnik) {
		let sql = `UPDATE Korisnici SET Ime=?, Prezime=?, Email=? WHERE Kor_ime=?`;
        let podaci = [korisnik.ime,korisnik.prezime,korisnik.email,korime];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
	obrisi = async function (korime) {
		let sql = "DELETE FROM Korisnici WHERE Kor_ime=?";
		await this.baza.izvrsiUpit(sql,[korime]);
		return true;
	}
}

module.exports = KorisnikDAO;

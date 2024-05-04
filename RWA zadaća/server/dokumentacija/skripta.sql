-- Creator:       MySQL Workbench 8.0.34/ExportSQLite Plugin 0.1.0
-- Author:        Geoff
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2023-11-15 11:22
-- Created:       2023-10-21 18:51

BEGIN;
CREATE TABLE "Serije"(
  "ID_Serije" INTEGER PRIMARY KEY NOT NULL,
  "Opis" TEXT,
  "Naziv" VARCHAR(60) NOT NULL,
  "BrojSezona" INTEGER,
  "BrojEpizoda" INTEGER,
  "Slika" VARCHAR(45),
  "Popularnost" DECIMAL
);
CREATE TABLE "Vrsta_korisnika"(
  "ID_Vrsta_korisnika" INTEGER PRIMARY KEY NOT NULL,
  "Naziv" VARCHAR(45)
);
CREATE TABLE "Sezone"(
  "ID_Sezone" INTEGER PRIMARY KEY NOT NULL,
  "ID_Serije" INTEGER NOT NULL,
  "Naziv" VARCHAR(45) NOT NULL,
  "Opis" TEXT,
  "Broj_sezone" INTEGER,
  "Broj_epizoda" INTEGER,
  "Sezonecol" VARCHAR(45),
  CONSTRAINT "FK_Serija_Sezona"
    FOREIGN KEY("ID_Serije")
    REFERENCES "Serije"("ID_Serije")
);
CREATE INDEX "Sezone.ID_Serije_idx" ON "Sezone" ("ID_Serije");
CREATE TABLE "Korisnici"(
  "ID_Korisnik" INTEGER PRIMARY KEY NOT NULL,
  "Email" VARCHAR(80) NOT NULL,
  "Kor_ime" VARCHAR(45) NOT NULL,
  "Lozinka" VARCHAR(45) NOT NULL,
  "Ime" VARCHAR(45),
  "Prezime" VARCHAR(45),
  "Podatak_1" VARCHAR(45),
  "Podatak_2" VARCHAR(45),
  "Podatak_3" VARCHAR(45),
  "ID_Vrsta_korisnika" INTEGER NOT NULL,
  CONSTRAINT "Email_UNIQUE"
    UNIQUE("Email"),
  CONSTRAINT "Kor_ime_UNIQUE"
    UNIQUE("Kor_ime"),
  CONSTRAINT "ID_Vrsta_korisnika"
    FOREIGN KEY("ID_Vrsta_korisnika")
    REFERENCES "Vrsta_korisnika"("ID_Vrsta_korisnika")
    ON UPDATE CASCADE
);
CREATE INDEX "Korisnici.ID_Vrsta_korisnika_idx" ON "Korisnici" ("ID_Vrsta_korisnika");
CREATE TABLE "Dnenvik"(
  "ID_Dnevnik" INTEGER PRIMARY KEY NOT NULL,
  "ID_Korisnik" INTEGER NOT NULL,
  "Datum" DATE NOT NULL,
  "Vrijeme" TIME NOT NULL,
  "Vrsta_zahtjeva" VARCHAR(6) NOT NULL,
  "Trazeni_resurs" VARCHAR(45) NOT NULL,
  "Tijelo" VARCHAR(45),
  CONSTRAINT "ID_Korisnik"
    FOREIGN KEY("ID_Korisnik")
    REFERENCES "Korisnici"("ID_Korisnik")
);
CREATE INDEX "Dnenvik.ID_Korisnik_idx" ON "Dnenvik" ("ID_Korisnik");
CREATE TABLE "Favoriti"(
  "Korisnici_ID_Korisnik" INTEGER NOT NULL,
  "Serije_ID_Serije" INTEGER NOT NULL,
  PRIMARY KEY("Korisnici_ID_Korisnik","Serije_ID_Serije"),
  CONSTRAINT "fk_Korisnici_has_Serije_Korisnici1"
    FOREIGN KEY("Korisnici_ID_Korisnik")
    REFERENCES "Korisnici"("ID_Korisnik"),
  CONSTRAINT "fk_Korisnici_has_Serije_Serije1"
    FOREIGN KEY("Serije_ID_Serije")
    REFERENCES "Serije"("ID_Serije")
);
CREATE INDEX "Favoriti.fk_Korisnici_has_Serije_Serije1_idx" ON "Favoriti" ("Serije_ID_Serije");
CREATE INDEX "Favoriti.fk_Korisnici_has_Serije_Korisnici1_idx" ON "Favoriti" ("Korisnici_ID_Korisnik");
COMMIT;

INSERT INTO Vrsta_korisnika (Naziv) VALUES ('Admin');
INSERT INTO VRsta_korisnika (Naziv) VALUES ('Korisnik');

INSERT INTO Korisnici (Ime, Prezime, Kor_ime, Email, Lozinka, ID_Vrsta_korisnika)
VALUES ('ImeAdmina', 'PrezimeAdmina', 'admin', 'admin@example.com', '6f3d860525da2b9a169d94603731e792be079d8f1030928e03014eecfba447e2', 1);

INSERT INTO Korisnici (Ime, Prezime, Kor_ime, Email, Lozinka, ID_Vrsta_korisnika)
VALUES ('ImeKorisnika', 'PrezimeKorisnika', 'obican', 'user@example.com', '6f3d860525da2b9a169d94603731e792be079d8f1030928e03014eecfba447e2', 2);

SELECT * FROM Korisnici WHERE Kor_ime='admin';
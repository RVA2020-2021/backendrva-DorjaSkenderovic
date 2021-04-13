DROP TABLE IF EXISTS tip_racuna CASCADE;
DROP TABLE IF EXISTS kredit CASCADE;
DROP TABLE IF EXISTS klijent CASCADE;
DROP TABLE IF EXISTS racun CASCADE;

DROP SEQUENCE IF EXISTS tip_racuna_seq;
DROP SEQUENCE IF EXISTS kredit_seq;
DROP SEQUENCE IF EXISTS klijent_seq;
DROP SEQUENCE IF EXISTS racun_seq;

CREATE TABLE kredit(
	id integer not null,
	naziv varchar(100),
	oznaka varchar(20),
	opis varchar(500)
);

CREATE TABLE tip_racuna(
	id integer not null,
	naziv varchar(100),
	oznaka varchar(20),
	opis varchar(500)
);

CREATE TABLE klijent(
	id integer not null,
	ime varchar(50),
	prezime varchar(50),
	broj_lk integer,
	kredit integer not null
);

CREATE TABLE racun(
	id integer not null,
	naziv varchar(100),
	oznaka varchar(20),
	opis varchar(500),
	tip_racuna integer not null,
	klijent integer not null
);

ALTER TABLE tip_racuna ADD CONSTRAINT pk_tip_racuna PRIMARY KEY(id);
ALTER TABLE kredit ADD CONSTRAINT pk_kredit PRIMARY KEY(id);
ALTER TABLE klijent ADD CONSTRAINT pk_klijent PRIMARY KEY(id);
ALTER TABLE racun ADD CONSTRAINT pk_racun PRIMARY KEY(id);

ALTER TABLE klijent ADD CONSTRAINT fk_klijent_kredit FOREIGN KEY(kredit) 
REFERENCES kredit;
ALTER TABLE racun ADD CONSTRAINT fk_racun_klijent FOREIGN KEY(klijent) 
REFERENCES klijent;
ALTER TABLE racun ADD CONSTRAINT fk_racun_tip_racuna FOREIGN KEY(tip_racuna) 
REFERENCES tip_racuna;

CREATE INDEX idxpk_kredit ON kredit(id);
CREATE INDEX idxpk_tip_racuna ON tip_racuna(id);
CREATE INDEX idxpk_klijent ON klijent(id);
CREATE INDEX idxpk_racun ON racun(id);

CREATE INDEX idxfk_klijent_kredit ON klijent(kredit);
CREATE INDEX idxfk_racun_klijent ON racun(klijent);
CREATE INDEX idxfk_racun_tip_racuna ON racun(tip_racuna);

create sequence tip_racuna_seq increment 1;
create sequence kredit_seq increment 1;
create sequence klijent_seq increment 1;
create sequence racun_seq increment 1;

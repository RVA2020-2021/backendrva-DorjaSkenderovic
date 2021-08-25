--tip racuna podaci
INSERT INTO "tip_racuna"("id","naziv","oznaka","opis") 
VALUES (nextval('tip_racuna_seq'),'Tekuci racun','01TR','Koristi se za izvrsavanje platnih transakcija – uplata, prenos i isplata novcanih sredstava.'); 
INSERT INTO "tip_racuna"("id","naziv","oznaka","opis") 
VALUES (nextval('tip_racuna_seq'),'Ziro racun','02ZR','Žiro-račun je račun na kome pravna i fizička lica drže sredstva kod banke. Na njega mogu uplaćivati i isplaćivati novčana sredstva u raznim valutama zavisno od pravila banke.');
INSERT INTO "tip_racuna"("id","naziv","oznaka","opis") 
VALUES (nextval('tip_racuna_seq'),'Stedni racun','03SR',' Račun s posebnom namenom da se klijentima pomogne akumulirati velika svota novca ulaganjem malih, redovitih ušteđevina.'); 
INSERT INTO "tip_racuna"("id","naziv","oznaka","opis") 
VALUES (nextval('tip_racuna_seq'),'Namenski racun','04NR','Namenski račun je račun na kome pravna i fizička lica drže sredstva kod banke. Na njega mogu uplaćivati i isplaćivati novčana sredstva u raznim valutama zavisno od pravila banke.');
INSERT INTO "tip_racuna"("id","naziv","oznaka","opis") 
VALUES (nextval('tip_racuna_seq'),'Dinarski racun','05DR','Dinarski račun možete koristiti za lične uplate kao i za izvršavanje transakcija. Banka vrši otvaranje i namenskih računa za trgovanje hartijama od vrednosti, polaganje osnivačkih uloga za pravna lica i dr.');
INSERT INTO "tip_racuna"("id","naziv","oznaka","opis") 
VALUES (nextval('tip_racuna_seq'),'Devizni racun','06DVR','Devizni računi se vode kao beskamatni, odnosno Banka na iznos sredstava na računu ne vrši obračun i pripis kamate.Pored ličnih uplata, devizni račun može vam koristiti za prilive kako iz inostranstva, tako i iz zemlje. ');

INSERT INTO "tip_racuna"("id","naziv","oznaka","opis") 
VALUES (-100,'Test racun','Test oznaka', 'Test opis');

--kredit podaci
INSERT INTO "kredit"("id","naziv","oznaka","opis") 
VALUES (nextval('kredit_seq'),'Kes kredit','01KK','Do dodatnog novca možete doći jednostavno - bez depozita, bez žiranata (što zavisi od kreditne sposobnosti i visine redovnih mesečnih primanja). Bez ikakvih ograničenja u tome na šta ćete trošiti novac.'); 
INSERT INTO "kredit"("id","naziv","oznaka","opis") 
VALUES (nextval('kredit_seq'),'Studentski kredit','02SK','Studentski kredit je dinarski potrošački kredit posebno kreiran za plaćanje školarine državnih i privatnih fakulteta, kao i srednjih škola.');
INSERT INTO "kredit"("id","naziv","oznaka","opis") 
VALUES (nextval('kredit_seq'),'Gotovinski kredit','03GK','Gotovinski kredit je namenjen svima kojima je potreban veći iznos gotovine.');
INSERT INTO "kredit"("id","naziv","oznaka","opis") 
VALUES (nextval('kredit_seq'),'Kredit za refinansiranje','04KZR','Kredit za refinansiranje je kredit koji podrazumeva zamenu postojećeg duga po osnovu jednog ili više dobijenih kredita novim kreditom, obično u istom iznosu i sa istim sredstvima obezbeđenja, ali pod drugačijim uslovima.');
INSERT INTO "kredit"("id","naziv","oznaka","opis") 
VALUES (nextval('kredit_seq'),'Stambeni kredit','03STK','Stambeni kredit je namenski kredit i spada u posebnu kategoriju dugoročnih kredita. On se odobrava za kupovinu stana ili kuće, kao i za izgradnju, dogradnju, rekonstrukciju i adaptacijustambenog objekta.');

INSERT INTO "kredit"("id","naziv","oznaka","opis") 
VALUES (-100,'Test naziv','Test oznaka','Test opis');	

--klijent podaci
INSERT INTO "klijent"("id","ime","prezime","broj_lk","kredit")
VALUES (nextval('klijent_seq'),'Marko','Petovic','000000001',2);
INSERT INTO "klijent"("id","ime","prezime","broj_lk","kredit")
VALUES (nextval('klijent_seq'),'Petar','Markovic','000000002',5);
INSERT INTO "klijent"("id","ime","prezime","broj_lk","kredit")
VALUES (nextval('klijent_seq'),'Jovana','Milutinovic','000000003',1);
INSERT INTO "klijent"("id","ime","prezime","broj_lk","kredit")
VALUES (nextval('klijent_seq'),'Milutin','Jovanovic','000000004',2);
INSERT INTO "klijent"("id","ime","prezime","broj_lk","kredit")
VALUES (nextval('klijent_seq'),'Olivera','Simic','000000005',5);

INSERT INTO "klijent"("id","ime","prezime","broj_lk","kredit")
VALUES (-100,'Test ime','Test prezime','000000058',5);

--racun podaci
INSERT INTO "racun"("id","naziv","oznaka","opis","tip_racuna","klijent") 
VALUES (nextval('racun_seq'),'Naziv racuna01','01TRSK','Opis racuna01',1,1);
INSERT INTO "racun"("id","naziv","oznaka","opis","tip_racuna","klijent") 
VALUES (nextval('racun_seq'),'Naziv racuna02','02TRSTK','Opis racuna02',1,2);
INSERT INTO "racun"("id","naziv","oznaka","opis","tip_racuna","klijent") 
VALUES (nextval('racun_seq'),'Naziv racuna03','01DRSTK','Opis racuna03',5,5);
INSERT INTO "racun"("id","naziv","oznaka","opis","tip_racuna","klijent") 
VALUES (nextval('racun_seq'),'Naziv racuna04','02TRSK','Opis racuna04',1,4);

INSERT INTO "racun"("id","naziv","oznaka","opis","tip_racuna","klijent") 
VALUES (-100,'Test naziv','Test oznaka','Test opis',1,4);

title: "Kdo se do sněmovny dostal díky kroužkování?"
perex: "Obě koalice motivovaly voliče k nejmasivnějšímu použití preferenčních hlasů od roku 2010. O mandát připravili 22 Pirátů a šest občanských demokratů, vydělaly na něm STAN a KDU-ČSL. Podívejte se, kdo konkrétně."
coverimg: https://interaktivni.rozhlas.cz/brexit/media/cover.jpg
coverimg_note: "Foto <a href='https://ctk.cz'>ČTK</a>"
styles: ["https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"]
libraries: [] #jquery, d3, highcharts, datatables
options: [noheader, nopic] #wide, noheader (, nopic)

---

<wide><div id="app"></div></wide>

V roce 2010 vystrašila zavedené strany kampaň Defenestrace, která nabádala voliče kroužkovat poslední čtyři z každé kandidátky. Preferenční hlasování tehdy vyneslo do sněmovny 47 kandidátů, tedy čtvrtinu sněmovny. Ivan Langer z ODS, jednička olomoucké kandidátky, se propadl o sedm míst a zůstal bez mandátu.

Letos voliči vyvolali podobně silné zemětřesení: do sněmovny vykroužkovali 36 kandidátů. Motivovaly je koaliční kandidatury. Dělící linie mezi vítězi a poraženými není tentokrát uvnitř stran, ale uvnitř koalic.

<div id="krouzkovani-stan-pirati"></div><div id="krouzkovani-spolu"></div>
Také pořadí podle počtu preferenčních hlasů ovládli kandidáti STAN a KDU-ČSL. Prvních 23 míst drží pouze politici těchto stran na čele s poslankyní Věrou Kovářovou (STAN, 25 367 hlasů), tlumočníkem Hayato Okamurou (KDU-ČSL, 24 426 hlasů) a vysokoškolským učitelem Vladimírem Balašem (STAN, 21 241 hlasů). V minulých volbách byla tak vysoká čísla vzácná, Kovářová má vůbec nejvíc od roku 2006, kdy jsou k dispozici detailní data.

Zabodovala zčásti také kampaň [zakoužkuj ženu](https://zakrouzkujzenu.cz/). Ženy tvoří třetinu všech vykroužkovaných, 13 z 36. Historicky se tomuto poměru podobá pouze zmíněný rok 2010, kdy do sněmovny kroužky vynesly 14 žen ze 47 mandátů.

Nejvíc poskočil Feri, nejčastěji Benda
Historicky dokázal nejlépe využít kroužkování Marek Benda (ODS): ve volbách 2010, 2013 a 2017 ho voliči poslali do sněmovny ze 17., 10. a šestého místa. Letos už ke zvolení preferenční hlasy nepotřeboval.

Dalším politikem, kterému preference pomohly třikrát, se letos stal Milan Brázdil (ANO 2011), lékař letecké záchranné služby v Olomouckém kraji. Do sněmovny se probojoval z šestého místa.

Mezi největšími skokany vede někdejší student Dominik Feri (TOP 09), který se v minulých sněmovních volbách posunul z 36. na druhé místo.

<div id="krouzkovani-opakovani"></div>
Značně se letos rozšířil seznam neúspěšných. Langerův propad o sedm pozic letos rozšířila čtveřice pirátů z Prahy a Moravskoslezského kraje.

<div id="krouzkovani-top-skoky"></div>
<script>
const device = window.innerWidth < 600 ? "mob" : "des"; const path = "https://data.irozhlas.cz/datavis-2021-volby-krouzkovani/" const alt1 = "Triumf starostů, masakr Pirátů" const alt2 = "Kroužky přidaly šest poslanců lidovcům, ODS o pět připravily" const alt3 = "Opakovaní skokani a smolaři v letech 2006–2021" const alt4 = "Největší skokani v letech 2006–2021" document.getElementById("krouzkovani-stan-pirati").innerHTML = '<img src=' + path + 'krouzkovani-stan-pirati' + device + '.svg alt="' + alt1 + '">' document.getElementById("krouzkovani-spolu").innerHTML = '<img src=' + path + 'krouzkovani-spolu' + device + '.svg alt="' + alt2 + '">' document.getElementById("krouzkovani-opakovani").innerHTML = '<img src=' + path + 'krouzkovani-opakovani' + device + '.svg alt="' + alt3 + '">' document.getElementById("krouzkovani-top-skoky").innerHTML = '<img src=' + path + 'krouzkovani-top-skoky' + device + '.svg alt="' + alt4 + '">'
</script>

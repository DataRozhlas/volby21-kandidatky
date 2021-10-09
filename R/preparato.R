library(tidyverse)
library(jsonlite)
library(readr)
# Sys.setlocale("LC_ALL","cz_CZ.UTF8")


data <- read_csv("../data/data.csv")

pref_2021 <- read_csv("../data/krouzky_tocit.csv") %>% select(VOLKRAJ=1,KSTRANA=2,PORCISLO=3,MANDAT3=6)

pref_2021$ROK = 2021


# rozděl podle roku a ulož jako TSV

data %>% filter(ROK==2021) %>% select(MANDAT2) %>% sum()

data$MANDAT2 <- ifelse(((data$PORCISLO > data$POCMANDKRAJ) & data$MANDAT > 0), 2, data$MANDAT)

data %>% filter ( MANDAT2 ==2) %>% filter(ROK==2017)

data <- left_join(data, pref_2021, by=c("ROK", "VOLKRAJ", "PORCISLO", "KSTRANA"))

data$MANDAT3[is.na(data$MANDAT3)] <- 0

data$MANDAT4 <-  data$MANDAT2 + data$MANDAT3

roky <- c(2006, 2010, 2013, 2017, 2021)


for (i in roky) {
  data %>%
    filter(ROK==i) %>%
    mutate(id=row_number()) %>%
    select(id, k=VOLKRAJ, c=PORCISLO, t1=TITULPRED, t2=TITULZA, j=JMENO, p=PRIJMENI, a=VEK, s=POHLAVI, z=POVOLANI, v=VSTRANA, n=NSTRANA, m=MANDAT4, b=BYDLISTEN, o=OBYV) %>%
    arrange(c, k, v) %>%
   # write_json(paste0("../data/", i, ".json"))
     write_tsv(paste0("../data/", i, ".tsv"), na="")
}

data %>% filter(ROK==2017)  %>% select(MANDAT2)

# číselník krajů

data %>%
  select(VOLKRAJ, NAZVOLKRAJ) %>%
  distinct() %>%
  #write_json("../data/kraje.json")
  write_tsv("../data/kraje.json")



# číselník volebních stran

data %>%
  select(ROK, VSTRANA, ZKRATKAV8, ZKRATKAV30) %>%
  distinct() %>%
  write_tsv("../data/vstrany.json")

# číselník navrhujících stran

data %>%
  select(ROK, VSTRANA, NSTRANA, ZKRATKAN8, ZKRATKAN30) %>%
  distinct() %>%
  write_tsv("../data/nstrany.json")

# kódy všech koalic

data %>%
  filter(POCSTRVKO>1) %>%
  distinct(VSTRANA)

# nejdelší povolání

summary(nchar(data$POVOLANI))

# tituly

data %>%
  select(TITULPRED, TITULZA) %>%
  group_by(TITULPRED) %>%
  summarise(pocet=n()) %>%
  arrange(desc(pocet)) %>%
  slice(1:30)

# nej poradi na kandi

data %>% select(PORCISLO) %>% max()

# nej vek
data %>% select(VEK) %>% min()

# preferenční hlasy

data %>% filter(MANDAT==1) %>% filter(PORADIMAND>PORCISLO)

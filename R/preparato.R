library(tidyverse)
library(jsonlite)
Sys.setlocale("LC_ALL","cz_CZ.UTF8")


data <- read_csv("../data/data.csv")


# rozděl podle roku a ulož jako JSON

roky <- c(2006, 2010, 2013, 2017, 2021)

for (i in roky) {
  data %>%
    filter(ROK==i) %>%
    mutate(id=row_number()) %>%
    select(id, k=VOLKRAJ, c=PORCISLO, t1=TITULPRED, t2=TITULZA, j=JMENO, p=PRIJMENI, a=VEK, s=POHLAVI, z=POVOLANI, v=VSTRANA, n=NSTRANA, m=MANDAT) %>%
    arrange(v, c) %>%
    write_json(paste0("../data/", i, ".json"))
}

# číselník krajů

data %>%
  select(VOLKRAJ, NAZVOLKRAJ) %>%
  distinct() %>%
  write_json("../data/kraje.json")


# číselník volebních stran

data %>%
  select(ROK, VSTRANA, ZKRATKAV8, ZKRATKAV30) %>%
  distinct() %>%
  write_json("../data/vstrany.json")

# číselník navrhujících stran

data %>%
  select(ROK, VSTRANA, NSTRANA, ZKRATKAN8, ZKRATKAN30) %>%
  distinct() %>%
  write_json("../data/nstrany.json")

# kódy všech koalic

data %>%
  filter(POCSTRVKO>1) %>%
  distinct(VSTRANA)

# nejdelší povolání

summary(nchar(data$POVOLANI))

# tituly

data %>%
  select(TITULPRED, TITULZA) %>%
  group_by(TITULZA) %>%
  summarise(pocet=n()) %>%
  arrange(desc(pocet)) %>%
  slice(1:20)

# nej poradi na kandi

data %>% select(PORCISLO) %>% max()

# nej vek
data %>% select(VEK) %>% min()

# preferenční hlasy
data %>% filter(MANDAT==1) %>% filter(POCPROCVSE==T)

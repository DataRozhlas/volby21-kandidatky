library(tidyverse)
library(jsonlite)
Sys.setlocale("LC_ALL","cz_CZ.UTF8")


data <- read_csv("../data/data.csv")


# rozděl podle roku a ulož jako JSON

roky <- c(2006, 2010, 2013, 2017)

for (i in roky) {
  data %>%
    filter(ROK==i) %>%
    select(k=VOLKRAJ, c=PORCISLO, t1=TITULPRED, t2=TITULZA, j=JMENO, p=PRIJMENI, a=VEK, s=POHLAVI, z=POVOLANI, v=VSTRANA, n=NSTRANA) %>%
    write_json(paste0("../data/", i, ".json"))
}

# číselník krajů

data %>%
  select(VOLKRAJ, NAZVOLKRAJ) %>%
  distinct() %>%
  write_json("../data/kraje.json")


# číselník volebních stran

t <- data %>%
  select(VSTRANA, ZKRATKAV8, ZKRATKAV30) %>%
  distinct(VSTRANA, ZKRATKAV30)

%>%
  write_json("../data/vstrany.json")

# číselník navrhujících stran

data %>%
  select(NSTRANA, ZKRATKAN8, ZKRATKAN30) %>%
  distinct() %>%
  write_json("../data/nstrany.json")

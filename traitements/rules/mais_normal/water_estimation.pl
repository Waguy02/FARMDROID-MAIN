luminosite(600,1000).
eau_jour(0.32).


temperature_air(30,40).
humidite_air(60,80).
co2(0,000000.2).
luminosite(400,600).
temperature_sol(20,40).

dimunition_eau(0.2):- temperature_sol(X,Y),X>=40,Y>X.
dimunition_eau(0.01):- luminosite(X,Y),X>=600,Y>X.
dimunition_eau(0.1):-temperature_air(X,Y),X>=40,Y>X.
temperature_sol(45,60)
luminosite(600,1000).
eau_jour(0.32).
temp_sol(60).
temp_air(40).

temperature_air(30,40).
humidite_air(60,80).
co2(0,000000.2).
luminosite(400,600).
temperature_sol(20,40).


temp_sol(X+2):-temp_air(X).
dimunition_eau(0.3):- temperature_sol(X,Y),X>=40,Y>X.
dimunition_eau(0.1):- luminosite(X,Y),X>=600,Y>X.
dimunition_eau(0.2):-temperature_air(X,Y),X>=40,Y>X.

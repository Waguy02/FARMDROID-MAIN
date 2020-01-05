luminosite(400,600).
eau_jour(0.32).
dimunition_eau(0.1):- luminosite(600,1000).
dimunition_eau(0.2):- temperature_sol(40,60).
dimunition_eau(0.2):-temperature_air(30,40).
temperature_sol(X+2):-temperature_air(X).
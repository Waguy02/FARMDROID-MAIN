luminosite(600,1000).
eau_jour(0.32).
temp_sol(60).
temp_air(40).
temp_sol(X+2):-temp_air(X).
dimunition_eau(0.3):- temp_sol(60).
dimunition_eau(0.1):- luminosite(600,1000).
dimunition_eau(0.2):-temp_air(40).

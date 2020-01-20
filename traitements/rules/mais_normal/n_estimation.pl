
dimunition_n(R):- augmentation_eau(Z),R is (Z/10). 
augmentation_eau(R):- eau_actuel(X),eau_jour(Y),X>Y,R is X-Y.


dimunition_n(0.01):- luminosite(X,Y),X>=600,Y>X.
dimunition_n(0.09):- temperature_sol(X,Y),X>=40,Y>X .
dimunition_n(0.05):- temperature_air(X,Y),X>=40,Y>X.
luminosite(600,1000).
temperature_sol(45,60).
temperature_air(45,60).



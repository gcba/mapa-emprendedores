UPDATE luminarias SET status = floor(random() * 2)

SELECT status,updated_at as epoch_updated FROM puntos_nagio 

SELECT status,updated_at as epoch_updated FROM puntos_nagio WHERE current_timestamp-interval'1 minute' < updated_at

SELECT * FROM puntos_nagio WHERE current_timestamp-interval'1 minute' < updated_at
Visualización CUCC
##################

# Datos de CartoDB

## API KEY

	Key: f2d531bee1002c47a2bcc52f2262c3c28d6ef311

(Documentación sobre API)[http://docs.cartodb.com/cartodb-platform.html]

## Credenciales OAuth 

	Consumer Key: viBS44M8A8k4ykJZ3s2IbyYhSODeJjk3VLfAzvUv
	Consumer Secret: dDjgqfDIVu2qEUsUpyflMKzov8T62rTLcx4UsCXK

	Request token: https://baemprende.cartodb.com/oauth/request_token
	Access token: https://baemprende.cartodb.com/oauth/access_token

(Documentación sobre autenticación)[http://docs.cartodb.com/cartodb-platform/sql-api.html#authentication] 

	<?php

	function getConfig() {
	  $config = array();

	  $config['key'] = 'key';
	  $config['secret'] = 'secret';
	  $config['email'] = 'mail@example.com';
	  $config['password'] = 'password';
	  $config['subdomain'] = 'subdomain';

	  return $config;
	}
require 'mysql2'

SCHEDULER.every '10s' do
	begin
  		client = Mysql2::Client.new(:host => "localhost", :username => "root", :password =>"5Gonz4lol")
		client.query("USE emergencias")
		result = client.query("SELECT SUM(fc.total_pisos4*fe.porcentaje_sin_luz/100) as edificios_afectados 
										   FROM fracciones_estadistica as fe 
										   INNER JOIN fracciones_censo_pisos as fc 
										   ON fe.fraccion_id = fc.fraccion_id")

		edificios_afectados = 0

		result.each do |row|
			edificios_afectados = row["edificios_afectados"].round
		end

  		send_event('edificios', { current: edificios_afectados })

	rescue Mysql2::Error => e
		puts e.errno
		puts e.error

	ensure
		client.close if client
	end  	
end 	
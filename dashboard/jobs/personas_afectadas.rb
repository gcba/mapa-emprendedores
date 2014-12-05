require 'mysql2'

SCHEDULER.every '10s' do
	begin
  		client = Mysql2::Client.new(:host => "localhost", :username => "root", :password =>"password")
		client.query("USE emergencias")
		result = client.query("SELECT SUM(fc.total_personas*fe.porcentaje_sin_luz/100) as personas_afectadas 
										   FROM fracciones_estadistica as fe 
										   INNER JOIN fracciones_censo_pisos as fc 
										   ON fe.fraccion_id = fc.fraccion_id")

		personas_afectadas = 0

		result.each do |row|
			personas_afectadas = row["personas_afectadas"].round
		end

  		send_event('personas', { current: personas_afectadas })

	rescue Mysql2::Error => e
		puts e.errno
		puts e.error

	ensure
		client.close if client
	end  	
end 	
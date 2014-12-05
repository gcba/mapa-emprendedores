require 'mysql2'

SCHEDULER.every '10s' do
	begin
  		client = Mysql2::Client.new(:host => "localhost", :username => "root", :password =>"password")
		client.query("USE emergencias")
		result = client.query("SELECT fe.puntaje_ranking, fb.esquina 
										   FROM fracciones_estadistica AS fe 
										   INNER JOIN fracciones_barrios_esquinas AS fb
										   ON fe.fraccion_id = fb.fraccion_id
										   ORDER BY fe.puntaje_ranking DESC
										   LIMIT 10")

		items = Array.new

		result.each do |row|			
			item = {:label => row["esquina"], :value => row["puntaje_ranking"]}
			items.push(item)
		end

  		send_event('esquinas', { items: items })

	rescue Mysql2::Error => e
		puts e.errno
		puts e.error

	ensure
		client.close if client
	end  	
end 	
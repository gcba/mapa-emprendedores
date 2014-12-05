require 'mysql2'

SCHEDULER.every '10s' do
	begin
  		client = Mysql2::Client.new(:host => "localhost", :username => "root", :password =>"password")
		client.query("USE emergencias")
		result = client.query("SELECT avg(fe.puntaje_ranking) as puntaje_promedio, fb.barrio 
										   FROM fracciones_estadistica as fe 
										   INNER JOIN fracciones_barrios_esquinas as fb 
										   ON fe.fraccion_id = fb.fraccion_id 
										   WHERE fe.puntaje_ranking > 0 
										   GROUP BY fb.barrio 
										   ORDER BY puntaje_promedio DESC
										   LIMIT 5")

		items = Array.new

		result.each do |row|
			item = {:label => row["barrio"], :value => row["puntaje_promedio"]}
			items.push(item)
		end

  		send_event('barrios', { items: items })

	rescue Mysql2::Error => e
		puts e.errno
		puts e.error

	ensure
		client.close if client
	end  	
end 	
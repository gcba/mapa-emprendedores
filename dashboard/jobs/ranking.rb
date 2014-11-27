require 'mysql2'

SCHEDULER.every '10s' do
	begin
  		client = Mysql2::Client.new(:host => "localhost", :username => "root", :password =>"5Gonz4lol")
		client.query("USE emergencias")
		fracciones_ranking = client.query("select * from fracciones_estadistica order by puntaje_ranking desc limit 10")

		items = Array.new

		fracciones_ranking.each do |row|
			esquinas_fracciones = client.query("select * from fracciones_barrios_esquinas where fraccion_id = '#{row['fraccion_id']}'")
			esquina = ""
			esquinas_fracciones.each do |esquina_row|
				esquina = esquina_row["esquina"]
			end
			item = {:label => esquina, :value => row["puntaje_ranking"]}
			items.push(item)
		end

  		send_event('ranking', { items: items })

	rescue Mysql2::Error => e
		puts e.errno
		puts e.error

	ensure
		client.close if client
	end  	
end 	
require 'mysql2'

begin
	client = Mysql2::Client.new(:host => "localhost", :username => "root", :password =>"5Gonz4lol")
	client.query("USE emergencias")
	results = client.query("select * from fracciones_estadistica order by puntaje_ranking desc limit 10")

	results.each do |row|
		puts row
	end
rescue Mysql2::Error => e
	puts e.errno
	puts e.error

ensure
	client.close if client
end

# esquinas = ['CORRIENTES Y MALABIA', 'CORDOBA Y ARAOZ', 'ACOYTE Y RIVADAVIA'] 
# buzzword_counts = Hash.new({ value: 0 })

# SCHEDULER.every '2s' do
#   random_buzzword = buzzwords.sample
#   buzzword_counts[random_buzzword] = { label: random_buzzword, value: (buzzword_counts[random_buzzword][:value] + 1) % 30 }
  
#   send_event('ranking', { items: buzzword_counts.values })
# end
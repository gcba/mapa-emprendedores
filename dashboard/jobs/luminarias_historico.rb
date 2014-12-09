require 'mysql2'
require 'active_support/time'

SCHEDULER.every '5m' do
    begin    	
        client = Mysql2::Client.new(:host => "localhost", :username => "root", :password =>"password")
        client.query("USE emergencias")

        current_time = Time.new
        current_time = current_time.in_time_zone("Europe/Amsterdam")

        points = []

        for i in 1..48
            time_greater_than = current_time - i*60*60 # bottom of timeframe
            time_less_than = time_greater_than + 1*60*60 # top of timeframe

            result = client.query("SELECT COUNT(*) AS numero_luminarias FROM luminarias_historico WHERE status = 0 AND fecha < '#{time_less_than}' AND fecha > '#{time_greater_than}'")

            numero_luminarias = 0

            result.each do |row|
                    numero_luminarias = row["numero_luminarias"]
            end

            points << { x: i, y: numero_luminarias }
        end

        send_event('luminarias_historico', { points: points })

    rescue Exception => e
        puts e.message
    end
end
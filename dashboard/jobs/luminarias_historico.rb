require 'mongo'

include Mongo

SCHEDULER.every '5m' do
	begin
  		mongo_db = MongoClient.new("localhost", 27017).db("visualizacion-cucc")
		coll = mongo_db.collection("puntos_luminarias")

		current_time = Time.new
		
		points = []

  		for i in 1..48
  			time_greater_than = current_time - i*60*60 # bottom of timeframe
  			time_less_than = time_greater_than + 1*60*60 # top of timeframe
  			
  			hora = time_greater_than

  			result_distinct = coll.distinct("external_id", {"status" => 0, "updated_at" => {"$gt" =>  time_greater_than,"$lt" => time_less_than}})
			numero_luminarias = result_distinct.length
			
			points << { x: i, y: numero_luminarias }
  		end

  		send_event('luminarias_historico', { points: points })

	rescue Exception => e
		puts e.message
	end  	
end 	
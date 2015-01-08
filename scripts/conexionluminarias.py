from suds.client import Client
import config
import mysql.connector
from mysql.connector import errorcode

try:
    cnx = mysql.connector.connect(user=config.mysql['user'], password=config.mysql['password'],
                                  host='localhost',
                                  database='emergencias')
    cursor = cnx.cursor()
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exists")
    else:
        print(err)
    exit(0)

url = config.philips['wsdl_url']
public = config.philips['public_key']
private = config.philips['private_key']

client = Client(url, username=public, password=private)

# GetFaults desde la ultima revision
result = client.service.GetFaults(0)
fault_items = result.FaultItems

file_faults = open(config.philips['file_faults_url'], 'w')
file_faults.seek(0)
file_faults.write("fault_id, category_key, asset_external_id, creation_timestamp, is_active\n")

if (fault_items is not None):
    # Truncate tabla de fallas
    truncate_query = ("TRUNCATE TABLE fallas_philips")
    try:
        cursor.execute(truncate_query)
    except:
        print("No se pudo vaciar la tabla de fallas")

    for fault_item in fault_items:
        for fault in fault_item[1]:

            # Guardar fallas en un CSV para Marto :)            
            file_faults.write(str(fault.FaultId) + "," + fault.CategoryKey + "," + fault.AssetExternalId + "," + str(fault.CreationTimestamp) + "," + str(fault.IsActive) + "\n")

            if (fault.CategoryKey == 'Unreachable'):
                fault_id = int(fault.FaultId)
                asset_external_id = str(fault.AssetExternalId)
                creation_timestamp = str(fault.CreationTimestamp)  
                if (fault.IsActive):                     
                    insert_query = ("INSERT INTO fallas_philips "
                                    "(falla_id, asset_external_id, creation_timestamp) "
                                    "VALUES ('%s', %s, %s)")
                    try:
                        cursor.execute(insert_query, (fault_id, asset_external_id, creation_timestamp))                    
                    except:
                        print("No se pudo agregar falla " + fault_id)

cnx.commit()
file_faults.close() 
cursor.close()
cnx.close()
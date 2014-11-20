from suds.client import Client
import mysql.connector
from mysql.connector import errorcode

try:
    cnx = mysql.connector.connect(user='root', password='5Gonz4lol',
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

url = 'file:///Users/pilimayora/Downloads/AssetLink.wsdl'
public = 'f3ea773e-e5be-4f8d-ab7f-77f9ae9198cd_00puwFYd39xuOPMOGC0SSIFr'
private = 'pkt3KFvbNTFeijsOQb3tll3hr6ijQulML5u72DhWrV4mXxpH'

client = Client(url, username=public, password=private)

fileFaults = open('/Users/pilimayora/Sites/datos-luminarias/scripts/lastRevision.txt', 'r+')
ultima_revision = fileFaults.read()

# GetFaults desde la ultima revision
result = client.service.GetFaults(ultima_revision)
faultItems = result.FaultItems

fileFaults.seek(0)
fileFaults.write(str(result.Revision))

if (faultItems is not None):
    for faultItem in faultItems:
        for fault in faultItem[1]:
            if (fault.CategoryKey == 'Unreachable' and fault.IsActive):
                fault_id = int(fault.FaultId)
                asset_external_id = str(fault.AssetExternalId)
                creation_timestamp = str(fault.CreationTimestamp)   
                
                insert_query = ("INSERT INTO fallas_philips "
                                "(falla_id, asset_external_id, creation_timestamp) "
                                "VALUES ('%s', %s, %s)")
                try:
                    cursor.execute(insert_query, (fault_id, asset_external_id, creation_timestamp))                    
                except:
                    print("No se pudo agregar falla " + fault_id)
else:
    print("No hay nuevas fallas desde la ultima vez que se corrio el script")

cnx.commit()
fileFaults.close()
cursor.close()
cnx.close()
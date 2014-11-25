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

file_revision = open('/Users/pilimayora/Sites/datos-luminarias/scripts/lastRevision.txt', 'r+')
ultima_revision = file_revision.read()

# GetFaults desde la ultima revision
result = client.service.GetFaults(ultima_revision)
fault_items = result.FaultItems

file_revision.seek(0)
file_revision.write(str(result.Revision))

file_faults = open('/Users/pilimayora/Sites/datos-luminarias/scripts/faults.txt', 'w')
file_faults.seek(0)

if (fault_items is not None):
    for fault_item in fault_items:
        for fault in fault_item[1]:
            
            file_faults.write("Fault ---------------- \n")
            file_faults.write("FaultId: " + str(fault.FaultId) + "\n")
            file_faults.write("CategoryKey: " + fault.CategoryKey + "\n")
            file_faults.write("AssetExternalId: " + fault.AssetExternalId + "\n")
            file_faults.write("CreationTimestamp: " + str(fault.CreationTimestamp) + "\n")
            file_faults.write("IsActive: " + str(fault.IsActive) + "\n")

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
                else:
                    delete_query = ("DELETE FROM fallas_philips "
                                     "WHERE falla_id = %s")
                    try:
                        cursor.execute(delete_query, (falla_id))
                    except:
                        print("No se pudo borrar falla inactiva " + str(fault_id))
else:
    print("No hay nuevas fallas desde la ultima vez que se corrio el script")

cnx.commit()
file_faults.close()
file_revision.close()
cursor.close()
cnx.close()
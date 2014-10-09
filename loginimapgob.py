from lxml import html
import imaplib
import csv
import email
import itertools
import textwrap
import itertools
# http://yuji.wordpress.com/2011/06/22/python-imaplib-imap-example-with-gmail/
user = "alertaapagon@buenosaires.gob.ar"
pwd = "qegeba3u"
mail = imaplib.IMAP4_SSL('imap.buenosaires.gob.ar')
mail.login(user, pwd)
mail.list()
leninbox = mail.select("inbox") 
#
# connect to inbox.
# Out: list of "folders" aka labels in gmail.
# result, data = mail.search(None, "ALL")
# ids = data[0] # data is a list.
# id_list = ids.split() # ids is a space separated string
# latest_email_id = id_list[-1] # get the latest
# result, data = mail.fetch(latest_email_id, "(RFC822)") # fetch the email body (RFC822) for the given ID
# raw_email = data[0][1] # here's the body, which is raw text of the whole email
# including headers and alternate payloads
#
# def get_first_text_block(email_message_instance):
# 	maintype = email_message_instance.get_content_maintype()
# 	if maintype == 'multipart':
# 		for part in email_message_instance.get_payload():
# 			if part.get_content_maintype() == 'text':
# 				return part.get_payload()
# 	elif maintype == 'text':
# 		return email_message_instance.get_payload()
#
result, data = mail.uid('search', None, "ALL") # search and return uids instead
latest_email_uid = data[0].split()[-1]
result, data = mail.uid('fetch', latest_email_uid, '(RFC822)')
raw_email = data[0][1]
email_message = email.message_from_string(raw_email)
# 
#print email_message['To']
# for parsing "Yuji Tomita" <yuji@grovemade.com>
#print email_message.items() # print all headers
#
if email_message['From'] == 'Reporte Centros de Alerta <reportecentrosdealerta@gmail.com>':

	fileread = email_message.get_payload()[1].get_payload()
	dochtml = html.fromstring(fileread)
	lista = []
	table = dochtml.cssselect('table')

	try:
		for i in range(len(table[0].xpath('//tr[td]'))):
			if len(table[0].xpath('//tr[td]')[i].text_content().split('\r\n')) == 23:
				if table[0].xpath('//tr[td]')[i].text_content().split('\r\n')[8].replace(' ', '') == 'NoAlca=':
					lista.append([table[0].xpath('//tr[td]')[i].text_content().split('\r\n')[1].replace(' ', ''), "El OLC no esta alcanzable"])
			elif len(table[0].xpath('//tr[td]')[i].text_content().split('\r\n')) == 16:
				if table[0].xpath('//tr[td]')[i].text_content().split('\r\n')[8].replace(' ', '') == 'Aviso':
					lista.append([table[0].xpath('//tr[td]')[i].text_content().split('\r\n')[1].replace(' ', ''), "El OLC no esta alcanzable"])
				elif table[0].xpath('//tr[td]')[i].text_content().split('\r\n')[8].replace(' ', '') != 'Aviso':
					lista.append([table[0].xpath('//tr[td]')[i].text_content().split('\r\n')[1].replace(' ', ''), "El OLC no esta alcanzable"])
	except:
		pass

	with open('incidencias.csv', 'w') as out_file:
		writer = csv.writer(out_file)
		writer.writerow(("ID", "Categoria"))
		writer.writerows(lista)
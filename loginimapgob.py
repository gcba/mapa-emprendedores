from lxml import html
import imaplib
import csv
import email

# http://yuji.wordpress.com/2011/06/22/python-imaplib-imap-example-with-gmail/

user = "alertaapagon@buenosaires.gob.ar"
pwd = "qegeba3u"
mail = imaplib.IMAP4_SSL('imap.buenosaires.gob.ar')
mail.login(user, pwd)
mail.list()
leninbox = mail.select("inbox")

result, data = mail.uid('search', None, '(HEADER Subject "Incidencias comunicadas por CityTouch sobre sitio Ciudad Autonoma de Buenos Aires")')
ids = data[0] # data is a list.
id_list = ids.split() # ids is a space separated string
latest_email_id = id_list[-1] # get the latest
result, data = mail.fetch(latest_email_id, "(RFC822)") # fetch the email body (RFC822) for the given ID
raw_email = data[0][1]
email_message = email.message_from_string(raw_email)

if email_message['To'] == 'antoniomilanese@gmail.com':

	fileread = email_message.get_payload()
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
			elif len(table[0].xpath('//tr[td]')[i].text_content().split('\r\n')) == 19:
				if table[0].xpath('//tr[td]')[i].text_content().split('\r\n')[12].replace(' ', '') == "Nofluyecorrienteporla=":
					lista.append([table[0].xpath('//tr[td]')[i].text_content().split('\r\n')[1].replace(' ', ''), "No fluye corriente por la combinacion driver-lampara."])

		with open('incidencias.csv', 'w') as out_file:
			writer = csv.writer(out_file)
			writer.writerow(("ID", "Categoria"))
			writer.writerows(lista)

	except:
		pass
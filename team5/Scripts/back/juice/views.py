from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import Member, List
from .data import Data

global d  #全域變數
d = Data()

def index(request):
	return render(request, 'polls/index.html', {"name": d.get_name()})

def single(request):
	return render(request, 'polls/single.html', {"name":d.get_name()})

def about(request):
	return render(request, 'polls/about.html', {"name":d.get_name()})	

def contact(request):
	if d.get_name() == "":
		return render(request, 'polls/contact.html', {"name":d.get_name()})
	else:
		member = Member.objects.filter(id = d.get_id())
		return render(request, 'polls/contact.html', {"name":d.get_name(), "member":member})

def gallery(request):
	return render(request, 'polls/gallery.html', {"name":d.get_name()})

def icons(request):
	return render(request, 'polls/icons.html', {"name":d.get_name()})

def order(request):
	return render(request, 'polls/order.html', {"name":d.get_name()})

def membership(request):
	data_list = List.objects.filter(customer = d.get_id())
	return render(request, 'polls/membership.html', {"name":d.get_name(), "data_list":data_list})

def slot(request):
	return render(request, 'polls/slot.html', {"name":d.get_name()})	

def test(request):
	return render(request, 'polls/test.html', {"name":d.get_name()})

def typography(request):
	return render(request, 'polls/typography.html', {"name":d.get_name()})

def blog(request):
	global d
	if d.get_name() == "":
		return render(request, 'polls/blog.html', {"name":d.get_name()})
	else:
		data_list = List.objects.filter(customer = d.get_id())
		return render(request, 'polls/membership.html', {"name":d.get_name(), "data_list":data_list})

def registered(request):
	return render(request, 'polls/registered.html', {"name":d.get_name()})

def add_member(request):   #新增餐廳資料的函式
	c = ""

	account = request.POST['account']  #拿資料（是拿name）
	name = request.POST['name']
	email = request.POST['email']
	password = request.POST['password']
	phone = request.POST['phone']
	address = request.POST['address']

	for i in Member.objects.all():
		if account == i.Member_account or password == i.Member_password :
			c = "account or password already be used"

	if c == "":
		m = Member(Member_account = account, Member_name = name, Member_email = email, Member_password = password, Member_phone = phone, Member_address = address)  #新建Restaurant類別
		m.save()  #儲存
		return render(request, 'polls/blog.html', {"name":d.get_name()})
	else:
		return render(request, 'polls/registered.html', {"alert":c, "name":d.get_name()})

def login_check(request):

	c = "account or password have error"
	account = request.POST['account']
	password = request.POST['password']

	for i in Member.objects.all():
		if account == i.Member_account and password == i.Member_password :
			c = ""

			global d
			d = Data()
			d.set(i.Member_name, i.id)

			data_list = List.objects.filter(customer = d.get_id())  #success
			return render(request, 'polls/membership.html', {"name":d.get_name(), "data_list":data_list})

	return render(request, 'polls/blog.html', {"alert":c, "name":d.get_name()}) #fail into

def login_out(request):
	global d
	d = Data()
	d.set("", -1)

	return render(request, 'polls/blog.html', {"name":d.get_name()})

def add_list(request):
	content1 = request.POST['content1']
	content2 = request.POST['content2']
	content3 = request.POST['content3']
	total_number = request.POST['total_number']

	if content1 == "" and content2 == "" and content3 == "":
		return render(request, 'polls/order.html', {"name":d.get_name(), "alert":"You don't make a order"})
	else:
		price = 0
		if content1 != "":
			price = price +10

		if content2 != "":
			price = price +10

		if content3 != "":
			price = price+10

		price = int(price)  * int(total_number)

		l = List(customer = d.get_id(), List_content1 = content1, List_content2 = content2, List_content3 = content3, price = price, number = total_number)
		l.save()

		return render(request, 'polls/typography.html', {"name":d.get_name()})

def delete_list(request):
	list_id = request.POST['list_id']
	List.objects.get(id = list_id).delete()

	data_list = List.objects.filter(customer = d.get_id())  #success
	return render(request, 'polls/membership.html', {"name":d.get_name(), "data_list":data_list})

def bouns(request):
	l = List(customer = d.get_id(), List_content1 = "獎勵:蘋果", List_content2 = "", List_content3 = "", price = 0, number = 1)
	l.save()

	data_list = List.objects.filter(customer = d.get_id())  #success
	return render(request, 'polls/membership.html', {"name":d.get_name(), "data_list":data_list})

def mail(request):
	name = request.POST['name']
	email = request.POST['email']
	phone = request.POST['phone']
	message = request.POST['message']

	import smtplib
	import mimetypes
	from email.mime.multipart import MIMEMultipart
	from email import encoders
	from email.message import Message
	from email.mime.audio import MIMEAudio
	from email.mime.base import MIMEBase
	from email.mime.image import MIMEImage
	from email.mime.text import MIMEText

	# --- Email 的收件人與寄件人address ---
	emailfrom = "106team05@gmail.com" 
	emailto = "106team05@gmail.com" 
	username = "106team05@gmail.com" # --- 寄信的SMTP的帳號---- 
	password = "jerryjuice" # --- 寄信的SMTP的密碼---- 

	msg = MIMEMultipart() 
	msg["From"] = emailfrom 
	msg["To"] = emailto 
	# --- Email 的主旨 Subject ---
	msg["Subject"] = u"意見回饋" 

	#----- Email 的信件內容 Message ----- 
	part = MIMEText(u"姓名：" + name + "\n" + "信箱：" + email + "\n" + "電話：" + phone + "\n" + "訊息：" + message + "\n"
		, _charset="UTF-8") 
	msg.attach(part) 

	server = smtplib.SMTP('smtp.gmail.com', 587) 
	server.ehlo()
	server.starttls()
	# --- 如果SMTP server 不需要登入則可把 server.login 用 # mark 掉
	server.login(username,password)
	server.sendmail(emailfrom, emailto, msg.as_string())
	server.quit()

	return render(request, 'polls/contact.html', {"name":d.get_name()})







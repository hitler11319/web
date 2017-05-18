from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import Restaurant, Menu


def index(request):
    restaurant_list = Restaurant.objects.order_by('-restaurant_name')[:10]
    context = {'restaurant_list': restaurant_list}
    return render(request, 'polls/index.html', context)

def detail(request, restaurant_id):
    try:
        restaurant = Restaurant.objects.get(pk=restaurant_id)
    except Restaruant.DoesNotExist:
        raise Http404("Restaruant does not exist")
    return render(request, 'polls/detail.html', {'restaurant': restaurant})

def results(request, restaurant_id):
    restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
    return render(request, 'polls/results.html', {'restaurant': restaurant})

def vote(request, restaurant_id):
    restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
    try:
        selected_dish = restaurant.menu_set.get(pk=request.POST['menu'])
    except (KeyError, Menu.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'restaurant': restaurant,
            'error_message': "You didn't select a dish.",
        })
    else:
        selected_dish.population += 1
        selected_dish.save()
        return HttpResponseRedirect(reverse('polls:results', args=(restaurant.id,)))

def add_restaurant(request):   #新增餐廳資料的函式
    name = request.POST['restaurant_name']  #拿資料（是拿name）
    address = request.POST['address']

    res = Restaurant(restaurant_name = name , address = address)  #新建Restaurant類別
    res.save()  #儲存

    #重回index
    restaurant_list = Restaurant.objects.order_by('-restaurant_name')[:10]
    context = {'restaurant_list': restaurant_list}
    return render(request, 'polls/index.html', context)

